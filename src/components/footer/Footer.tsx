import { Link } from "react-router";
import Logo from "../logo/Logo";
import { useEffect, useState } from "react"; // useState ও useEffect যোগ করা হয়েছে
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io5";
import MiniCard from "../banner/MiniCart";
import Container from "../container/Container";
import { useFetchAllPosts } from "@/api/hooks/post";
import { useFetchNavMenu } from "@/api/hooks/navMenu";
import { api } from "@/api/axios";

// আইকন ম্যাপিং (আগের মতোই)
const socialIcons: { [key: string]: React.ReactNode } = {
  facebook: <FaFacebookF />,
  linkedin: <FaLinkedinIn />,
  youtube: <FaYoutube />,
  twitter: <IoLogoTwitter />,
  instagram: <FaInstagram />,
};

const Footer = () => {
  const { data: latestNews } = useFetchAllPosts();
  const { data: navItems } = useFetchNavMenu();

  // ১. সোশ্যাল লিঙ্কগুলো রাখার জন্য স্টেট
  const [socialLinks, setSocialLinks] = useState<any>(null);

  // ২. ম্যানুয়াল useEffect লজিক
  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        // ব্যাকএন্ড থেকে এডমিন ডাটা ফেচ করা
        const res = await api.get("admin/me");

        // যদি ডাটার ভেতর socialLinks অবজেক্টটি থাকে তবে সেটি সেভ করা
        if (res.data?.data?.socialLinks) {
          setSocialLinks(res.data.data.socialLinks);
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };

    fetchSocialData();
  }, []); // এটি শুধু একবার রান করবে

  return (
    <div className="bg-gray-200 py-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4">
          {/* Section 1: Logo & Info */}
          <div className="text-left">
            <Logo />
            <h2 className="font-semibold font-secondary text-[14px] pt-3 leading-7 text-gray-600">
              বাংলাদেশের সর্বাধিক জনপ্রিয় এবং বিশ্বাসযোগ্য সংবাদপত্র।
            </h2>
          </div>

          {/* Section 2: Categories */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full mb-4">
              বিভাগ
            </h2>
            <div className="flex flex-col gap-3">
              {Array.isArray(navItems) &&
                navItems.slice(0, 6).map((nav: any) => (
                  <Link
                    key={nav._id}
                    to={`/category/${nav._id}`}
                    className="hover:text-red-600 transition"
                  >
                    {nav.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* Section 3: ডাইনামিক সোশ্যাল লিঙ্ক */}
          <div className="flex flex-col items-center lg:items-start">
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full mb-4">
              আমাদের সম্পর্কে
            </h2>
            <div className="flex flex-col gap-4">
              {/* ৩. socialLinks অবজেক্টটি ম্যাপ করা হচ্ছে */}
              {socialLinks &&
                Object.entries(socialLinks).map(
                  ([platform, url]) =>
                    // শুধুমাত্র লিঙ্ক ভ্যালু থাকলে তবেই আইকন দেখাবে
                    url && (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group hover:text-red-600 transition"
                      >
                        <span className="border border-gray-300 rounded p-2 text-[18px] group-hover:border-red-500 transition">
                          {socialIcons[platform]}
                        </span>
                        <span className="text-sm font-medium capitalize">
                          {platform}
                        </span>
                      </a>
                    )
                )}
            </div>
          </div>

          {/* Section 4: Latest News */}
          <div>
            <h2 className="font-bold font-secondary text-[17px] pb-4 border-b border-gray-300 w-full mb-4">
              Latest News
            </h2>
            <div className="flex flex-col gap-y-4">
              {latestNews?.slice(0, 3).map((post: any) => (
                <Link key={post._id} to={`/single-post/${post._id}`}>
                  <MiniCard title={post?.title} image={post?.image} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
