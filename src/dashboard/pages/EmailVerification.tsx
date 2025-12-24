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

  const inputRefs = useRef<HTMLInputElement[]>([]);
  const navigate = useNavigate();

  // Backend API URL
  const API_URL = import.meta.env.VITE_BASE_URL + "admin";

  // Timer Countdown Logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && step === "verify") {
      setCanResend(true);
    }
  }, [timer, step]);

  // ১. OTP পাঠানোর ফাংশন (Request OTP)
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
      setTimer(120); // ২ মিনিট সময়
      setCanResend(false);
      toast.success(response.data.message || "OTP sent successfully!");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Failed to send OTP.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ২. OTP ভেরিফাই করার ফাংশন (Verify OTP)
  const handleVerifyOTP = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return setError("Please enter all 6 digits");

    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp: otpValue,
      });

      setSuccess(true);
      toast.success(response.data.message || "OTP Verified!");

      // সফল হলে Reset Password পেজে রিডাইরেক্ট (Email সহ)
      setTimeout(() => {
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Invalid OTP.";
      setError(msg);
      toast.error(msg);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  // ৩. পুনরায় ওটিপি পাঠানো (Resend)
  const handleResend = async () => {
    if (!canResend) return;
    setLoading(true);
    try {
      await axios.post(`${API_URL}/request-verification`, { email });
      setTimer(120);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      toast.success("New OTP sent!");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Resend failed.");
    } finally {
      setLoading(false);
    }
  };

  // OTP Input Logic
  const handleChange = (index: number, value: string) => {
    if (value && !/^\d+$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">Email Verified!</h1>
          <p className="text-gray-600">Redirecting to Reset Password page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {step === "send" ? (
          <form onSubmit={handleSendEmail} className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-red-500 w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold">Verify Your Email</h1>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3.5 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none transition-all"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-lg font-bold disabled:bg-gray-400"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-red-500 w-8 h-8" />
              </div>
              <h1 className="text-2xl font-bold">Enter OTP</h1>
              <p className="text-sm text-gray-500 mt-1">
                Code sent to: <b>{email}</b>
              </p>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded">
                {error}
              </p>
            )}
            <div className="flex gap-2 justify-center">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el!)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="w-12 h-14 text-center border-2 rounded-lg text-xl font-bold focus:border-red-500 outline-none transition-all"
                />
              ))}
            </div>
            <div className="text-center">
              {!canResend ? (
                <p className="text-2xl font-bold text-red-500">
                  {Math.floor(timer / 60)}:
                  {(timer % 60).toString().padStart(2, "0")}
                </p>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={loading}
                  className="text-red-500 font-medium flex items-center gap-2 mx-auto"
                >
                  <RefreshCw size={16} /> Resend Code
                </button>
              )}
            </div>
            <button
              onClick={handleVerifyOTP}
              disabled={loading || otp.join("").length !== 6}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3.5 rounded-lg font-bold disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>
            <button
              onClick={() => setStep("send")}
              className="w-full text-gray-500 text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} /> Change Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
