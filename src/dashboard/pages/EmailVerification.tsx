import React, { useState, useRef, useEffect } from "react";
import { Mail, Shield, RefreshCw, CheckCircle, ArrowLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function EmailVerification() {
  const [step, setStep] = useState<"send" | "verify">("send");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [success, setSuccess] = useState(false);

  // ১. Ref টাইপ ফিক্স (এটি এখন আর এরর দিবে না)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BASE_URL + "admin";

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && step === "verify") {
      setCanResend(true);
    }
  }, [timer, step]);

  // সেফ ফোকাস ফাংশন
  const focusInput = (index: number) => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) return setError("Please enter your email address");

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/request-verification`, {
        email,
      });
      setStep("verify");
      setTimer(120);
      setCanResend(false);
      toast.success(response.data.message || "OTP sent successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to send OTP.";
      setError(msg); // এরর সেট করা
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return setError("Please enter all 6 digits");

    setLoading(true);
    setError(""); // রিকোয়েস্টের আগে এরর ক্লিয়ার করা
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp: otpValue,
      });
      setSuccess(true);
      toast.success(response.data.message || "OTP Verified!");

      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 1500);
    } catch (err: any) {
      // ৩. ব্যাকএন্ডের এরর মেসেজ ধরার লজিক
      const msg =
        err.response?.data?.message || "Invalid OTP. Please try again.";
      setError(msg); // UI-তে এরর মেসেজ দেখানোর জন্য
      toast.error(msg);
      setOtp(["", "", "", "", "", ""]);
      focusInput(0);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    setError("");
    try {
      await axios.post(`${API_URL}/request-verification`, { email });
      setTimer(120);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      focusInput(0);
      toast.success("New OTP sent!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Resend failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) focusInput(index + 1); // পরের ঘরে যাওয়া
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      focusInput(index - 1); // আগের ঘরে ফেরা
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5 font-primary">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Verified!</h1>
          <p className="text-gray-600">Redirecting to Reset Password page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5 font-primary">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border-t-4 border-red-500">
        {step === "send" ? (
          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="text-center">
              <Mail className="text-red-500 w-14 h-14 mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-gray-800">Verify Email</h1>
              <p className="text-gray-500 text-sm mt-1">
                Request an OTP to reset password
              </p>
            </div>

            {/* ১ নম্বর ধাপের এরর রেন্ডারিং */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 animate-pulse">
                <p className="text-red-700 text-sm font-medium text-center">
                  {error}
                </p>
              </div>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-lg font-bold shadow-md transition-all active:scale-95"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="text-red-500 w-14 h-14 mx-auto mb-3" />
              <h1 className="text-2xl font-bold text-gray-800">Enter OTP</h1>
              <p className="text-sm text-gray-500">
                Code sent to:{" "}
                <span className="text-gray-800 font-semibold">{email}</span>
              </p>
            </div>

            {/* ওটিপি ধাপের এরর রেন্ডারিং (এটি আগে ছিল না) */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 animate-shake">
                <p className="text-red-700 text-sm font-medium text-center">
                  {error}
                </p>
              </div>
            )}

            <div className="flex gap-2 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  // ৪. Ref অ্যাসাইনমেন্ট ফিক্স
                  ref={(el) => {
                    inputRefs.current[i] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center border-2 rounded-lg text-xl font-bold bg-gray-50 border-gray-200 focus:border-red-500 outline-none transition-all focus:bg-white"
                />
              ))}
            </div>

            <div className="text-center">
              {!canResend ? (
                <div className="text-gray-500 text-sm">
                  Expires in{" "}
                  <span className="text-red-600 font-bold">
                    {Math.floor(timer / 60)}:
                    {(timer % 60).toString().padStart(2, "0")}
                  </span>
                </div>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-red-500 font-semibold hover:text-red-600 flex items-center gap-2 mx-auto text-sm"
                >
                  <RefreshCw
                    size={16}
                    className={loading ? "animate-spin" : ""}
                  />{" "}
                  Resend New Code
                </button>
              )}
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-lg font-bold shadow-md transition-all active:scale-95 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              onClick={() => setStep("send")}
              className="w-full text-gray-500 text-sm flex items-center justify-center gap-2 hover:text-red-500 transition-colors"
            >
              <ArrowLeft size={16} /> Back to Change Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
