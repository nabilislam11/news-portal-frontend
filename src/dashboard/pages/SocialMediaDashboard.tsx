import { useState, useEffect } from "react";
import {
  Edit,
  ExternalLink,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  X,
  Save,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { api } from "@/api/axios";
import { FaTiktok } from "react-icons/fa";

interface SocialLinks {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  tiktok: string;
}

export default function SocialMediaDashboard() {
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

  const showNotification = (message: string, type: "success" | "error") => {
    setStatus({ show: true, message, type });
    setTimeout(() => {
      setStatus((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        const res = await api.get("admin/me");
        if (res.data?.data?.socialLinks) {
          setSocialLinks(res.data.data.socialLinks);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialData();
  }, []);

  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "linkedin":
        return <Linkedin className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      case "tiktok":
        return <FaTiktok className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getColor = (platform: string) => {
    switch (platform) {
      case "facebook":
        return "bg-blue-600";
      case "twitter":
        return "bg-sky-500";
      case "instagram":
        return "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500";
      case "linkedin":
        return "bg-blue-700";
      case "youtube":
        return "bg-red-600";
      case "tiktok":
        return "bg-black";
      default:
        return "bg-gray-600";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.put("admin/socials", socialLinks);
      setShowModal(false);
      showNotification("Social links updated successfully!", "success");
    } catch (error: any) {
      console.error("Error:", error);
      showNotification(
        error.response?.data?.message || "Failed to update. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const getTotalLinks = () => {
    return Object.values(socialLinks).filter(
      (link) => link && link.trim() !== ""
    ).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-100 p-6 relative">
      {status.show && (
        <div
          className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-top-4 ${
            status.type === "success"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle className="w-6 h-6" />
          ) : (
            <AlertCircle className="w-6 h-6" />
          )}
          <p className="font-semibold">{status.message}</p>
        </div>
      )}

      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-red-900 mb-2">
              Social Media
            </h1>
            <p className="text-red-700">
              Manage your social media platform links
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors shadow-lg"
          >
            <Edit className="w-5 h-5" /> Edit Links
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Save className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Platforms</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-red-100">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-lg">
                <ExternalLink className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Configured Links</p>
                <p className="text-2xl font-bold text-gray-900">
                  {getTotalLinks()}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(socialLinks).map(([platform, url]) => (
            <div
              key={platform}
              className="bg-white rounded-xl shadow-sm border border-red-100 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`${getColor(
                      platform
                    )} text-white p-3 rounded-lg`}
                  >
                    {getIcon(platform)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 capitalize">
                      {platform}
                    </h3>
                    <p className="text-sm text-gray-500 italic">
                      Official Link
                    </p>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    url?.trim()
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {url?.trim() ? "Configured" : "Not Set"}
                </div>
              </div>
              <div>
                {url?.trim() ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1 break-all"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" /> {url}
                  </a>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No link configured
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-md">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
              <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  Edit Social Media Links
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                {Object.entries(socialLinks).map(([platform, url]) => (
                  <div key={platform}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                      <div className="flex items-center gap-2">
                        <div
                          className={`${getColor(
                            platform
                          )} text-white p-1 rounded`}
                        >
                          {getIcon(platform)}
                        </div>
                        {platform}
                      </div>
                    </label>
                    <input
                      type="url"
                      value={url}
                      onChange={(e) =>
                        setSocialLinks({
                          ...socialLinks,
                          [platform]: e.target.value,
                        })
                      }
                      placeholder={`https://${platform}.com/yourprofile`}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex gap-3 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 border-2 rounded-lg font-semibold hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{loading ? "Updating..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
