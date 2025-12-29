import { Link } from "react-router";
import Logo from "../logo/Logo";
import { useEffect, useState } from "react";
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
import FooterInfo from "./FooterInfo";

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
  const [socialLinks, setSocialLinks] = useState<any>(null);

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

  return (
    <footer className="bg-gray-100 pt-12 pb-6 border-t border-gray-200">
      <Container>
        {/* উপরের ইনফো সেকশন */}
        <div className="mb-10">
          <FooterInfo />
        </div>

        {/* মেইন ফুটার গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 px-4 md:px-0">
          {/* ১. লোগো ও বর্ণনা - মোবাইলে সেন্টারে থাকবে */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Logo />
            <p className="font-medium text-gray-600 text-sm mt-4 leading-relaxed max-w-xs">
              বাংলাদেশের সর্বাধিক জনপ্রিয় এবং বিশ্বাসযোগ্য সংবাদপত্র।
              প্রতিদিনের খবর সবার আগে পেতে আমাদের সাথেই থাকুন।
            </p>
          </div>

          {/* ২. বিভাগ - মোবাইলে ২ কলামে ভাগ হবে জায়গা বাঁচাতে */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h2 className="font-bold text-gray-800 text-lg pb-3 border-b-2 border-red-500 w-full mb-6 text-center md:text-left">
              বিভাগ
            </h2>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 w-full text-center md:text-left">
              {Array.isArray(navItems) &&
                navItems.slice(0, 8).map((nav: any) => (
                  <Link
                    key={nav._id}
                    to={`/category/${nav._id}`}
                    className="text-gray-600 hover:text-red-600 transition-colors text-[15px] font-medium"
                  >
                    {nav.name}
                  </Link>
                ))}
            </div>
          </div>

          {/* ৩. সোশ্যাল লিঙ্ক */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h2 className="font-bold text-gray-800 text-lg pb-3 border-b-2 border-red-500 w-full mb-6 text-center md:text-left">
              আমাদের সাথে থাকুন
            </h2>
            <div className="grid grid-cols-1 gap-4 w-full justify-items-center md:justify-items-start">
              {socialLinks &&
                Object.entries(socialLinks).map(
                  ([platform, url]) =>
                    url && (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group text-gray-600 hover:text-red-600 transition-all"
                      >
                        <span className="bg-white border border-gray-300 rounded-full p-2.5 text-[16px] group-hover:border-red-500 group-hover:bg-red-50 shadow-sm transition-all">
                          {socialIcons[platform]}
                        </span>
                        <span className="text-sm font-semibold capitalize">
                          {platform}
                        </span>
                      </a>
                    )
                )}
            </div>
          </div>

          {/* ৪. লেটেস্ট নিউজ */}
          <div className="flex flex-col items-center md:items-start w-full">
            <h2 className="font-bold text-gray-800 text-lg pb-3 border-b-2 border-red-500 w-full mb-6 text-center md:text-left">
              সর্বশেষ সংবাদ
            </h2>
            <div className="flex flex-col gap-y-5 w-full">
              {latestNews?.slice(0, 3).map((post: any) => (
                <Link
                  key={post._id}
                  to={`/single-post/${post._id}`}
                  className="hover:opacity-80 transition-opacity"
                >
                  <MiniCard title={post?.title} image={post?.image} />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 text-xs ">
          <Link to="/privacy-policy">
            <p className=" font-primary font-semibold cursor-pointer border-b border-gray-400 text-black text-[16px] ">
              {" "}
              গোপনীয়তার নীতি
            </p>
          </Link>
          <Link to="/terms-and-condition">
            <p className="font-primary cursor-pointer   font-semibold  border-b border-gray-400 text-black text-[16px]">
              {" "}
              শর্তাবলি
            </p>
          </Link>
        </div>

        {/* কপিরাইট সেকশন */}
        <div className="mt-16 pt-6 border-t border-gray-300 text-center">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} প্রতিদিন জনতা। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
