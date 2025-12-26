import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  X,
  Shield,
  ArrowRight,
} from "lucide-react";
import { api } from "@/api/axios";
import { Link } from "react-router";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
    const colors = [
      "bg-red-500",
      "bg-orange-500",
      "bg-yellow-500",
      "bg-blue-500",
      "bg-green-500",
    ];

    return {
      strength,
      label: labels[strength - 1] || "",
      color: colors[strength - 1] || "",
    };
  };

  const passwordStrength = getPasswordStrength(formData.newPassword);

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.newPassword.length >= 8 },
    { label: "One lowercase letter", met: /[a-z]/.test(formData.newPassword) },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.newPassword) },
    { label: "One number", met: /[0-9]/.test(formData.newPassword) },
    {
      label: "One special character",
      met: /[^A-Za-z0-9]/.test(formData.newPassword),
    },
  ];

  const handleSubmit = async () => {
    setError("");

    // Validation
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("New password must be different from current password");
      return;
    }

    if (passwordStrength.strength < 3) {
      setError("Please choose a stronger password");
      return;
    }

    setLoading(true);

    try {
      // API call using axios
      // Make sure to import: import { api } from '@/api/axios';
      const response = await api.put("admin/change-password", {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      // Axios response data is in response.data
      //   const data = response.data;

      setShowSuccessScreen(true);
    } catch (err: any) {
      // Axios error handling
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to change password. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError("");
  };

  // Success Screen
  if (showSuccessScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full animate-in fade-in zoom-in duration-300">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Password Changed Successfully!
            </h1>

            <p className="text-gray-600 mb-8 leading-relaxed">
              Your password has been updated successfully. Your account is now
              more secure.
            </p>

            <div className="space-y-3">
              <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2">
                <Link to="/dashboard">Back to Dashboard</Link>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-red-900 mb-2">
            Change Password
          </h1>
          <p className="text-red-700">
            Update your account password to keep it secure
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
          </div>

          {/* Success Message */}
          {/* Removed inline success - now showing full screen */}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6 animate-in slide-in-from-top duration-300">
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Form */}
          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Current Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.current ? "text" : "password"}
                  id="currentPassword"
                  value={formData.currentPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentPassword: e.target.value,
                    })
                  }
                  placeholder="Enter current password"
                  className="w-full pl-4 pr-12 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      current: !showPasswords.current,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.current ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.new ? "text" : "password"}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, newPassword: e.target.value })
                  }
                  placeholder="Enter new password"
                  className="w-full pl-4 pr-12 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      new: !showPasswords.new,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.new ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {formData.newPassword && (
                <div className="mt-3">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs font-medium text-gray-600">
                    Strength:{" "}
                    <span
                      className={
                        passwordStrength.strength >= 3
                          ? "text-green-600"
                          : "text-orange-600"
                      }
                    >
                      {passwordStrength.label}
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Confirm New Password *
              </label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="Confirm new password"
                  className="w-full pl-4 pr-12 py-3.5 text-base bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswords({
                      ...showPasswords,
                      confirm: !showPasswords.confirm,
                    })
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Match Indicator */}
              {formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2">
                  {formData.newPassword === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <p className="text-xs text-green-600 font-medium">
                        Passwords match
                      </p>
                    </>
                  ) : (
                    <>
                      <X className="w-4 h-4 text-red-500" />
                      <p className="text-xs text-red-600 font-medium">
                        Passwords do not match
                      </p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Password Requirements */}
            {formData.newPassword && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <p className="text-xs font-semibold text-gray-700 mb-3">
                  Password must contain:
                </p>
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {req.met ? (
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-300 flex-shrink-0" />
                    )}
                    <p
                      className={`text-xs ${
                        req.met ? "text-green-600 font-medium" : "text-gray-500"
                      }`}
                    >
                      {req.label}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900 mb-1">
                    Security Tips
                  </p>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Use a unique password not used on other websites</li>
                    <li>• Avoid using personal information in your password</li>
                    <li>
                      • Consider using a password manager for strong passwords
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleReset}
                disabled={loading}
                className="flex-1 px-6 py-3.5 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3.5 px-6 rounded-lg transition-all hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Changing...</span>
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            After changing your password, you'll remain logged in on this
            device.
          </p>
        </div>
      </div>
    </div>
  );
}
