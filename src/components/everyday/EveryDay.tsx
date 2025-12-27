import { useFetchAllPosts } from "@/api/hooks/post";
import Container from "../container/Container";
import EveryDayCard from "./EveryDayCard";
import { useSubscribe } from "@/api/hooks/subscribtion";
import { useState } from "react";
import { toast } from "sonner";
import SquareAds from "../ads/SquareAds";

const EveryDay = () => {
  const subscripMutation = useSubscribe();
  const [subEmail, setSubEmail] = useState("");

  // posts ডাটা এবং error অবজেক্ট নিয়ে আসা হলো
  const { data: posts } = useFetchAllPosts();

  const handleSubmit = () => {
    if (!subEmail || !subEmail.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    // আপনার হুক যদি সরাসরি স্ট্রিং নেয় তবে subEmail দিন, আর অবজেক্ট নিলে {email: subEmail} দিন
    // আমি এখানে আপনার হুকের আগের প্যাটার্ন অনুযায়ী সরাসরি subEmail দিচ্ছি
    subscripMutation.mutate(subEmail, {
      onSuccess: () => {
        toast.success("Subscribed successfully!");
        setSubEmail("");
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Failed to subscribe");
      },
    });
  };

  return (
    <div className="py-8 bg-gray-50">
      <Container>
        <div className="flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <div className="w-[5px] bg-red-500 h-7"></div>
            <h2 className="font-extrabold text-[27px] font-primary text-black">
              বিশেষ প্রতিবেদন
            </h2>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between py-8">
          <div className="pb-8 w-full lg:w-[67%]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {/* ডাটাবেস থেকে আসা posts যদি সরাসরি অ্যারে হয় তবেই ম্যাপ হবে */}
              {Array.isArray(posts) &&
                posts
                  .slice(0, 6)
                  .map((card: any) => (
                    <EveryDayCard key={card._id} {...card} />
                  ))}
            </div>
          </div>

          <div className="w-full lg:w-[30%]">
            <div className="flex flex-col gap-y-5">
              <div className="bg-gradient-to-r from-red-600 via-red-500 to-green-700 p-6 flex flex-col gap-y-2 rounded-lg">
                <h2 className="font-bold font-secondary text-[17px] text-white">
                  নিউজলেটার সাবস্ক্রাইব করুন
                </h2>
                <p className="font-semibold font-secondary text-[14px] text-white">
                  সর্বশেষ খবর সরাসরি আপনার ইমেইলে পান
                </p>

                <input
                  type="email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder="Your Email..."
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white text-black"
                />

                <button
                  onClick={handleSubmit}
                  disabled={subscripMutation.isPending}
                  className="font-semibold font-primary text-[15px] text-black cursor-pointer bg-white py-3 rounded-lg disabled:bg-gray-300 transition-all"
                >
                  {subscripMutation.isPending ? "Subscribing..." : "Subscribe"}
                </button>

                {/* সাবস্ক্রিপশন এরর মেসেজ দেখানোর জন্য আলাদা স্টেট ব্যবহার করা নিরাপদ */}
                {subscripMutation.isError && (
                  <p className="text-sm text-yellow-200 mt-2 font-medium">
                    {(subscripMutation.error as any)?.response?.data?.message ||
                      "Subscription failed"}
                  </p>
                )}
              </div>
              <SquareAds />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EveryDay;
