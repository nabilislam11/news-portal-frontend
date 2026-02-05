import { useFetchPostsByCategory } from "@/api/hooks/post";
import MiniCard from "@/components/banner/MiniCart";
import type { Post } from "@/validators/post";
import { Link } from "react-router";

const CategoryWorld = () => {
  const WORLD_CATEGORY_ID = "6946f58367dcf7069a85c502";
  const currentCategory = "bisho";

  const { data: categoryData, isLoading } =
    useFetchPostsByCategory(WORLD_CATEGORY_ID);

  // কন্ডিশনাল ডাটা সেটআপ
  const displayPosts = currentCategory === "bisho" ? categoryData : null;

  if (isLoading)
    return <p className="text-center font-primary py-4">লোড হচ্ছে...</p>;

  // ডাটা কি সরাসরি অ্যারে নাকি অবজেক্টের ভেতরে .data হিসেবে আছে তা চেক করা
  const finalPosts = Array.isArray(displayPosts)
    ? displayPosts
    : (displayPosts as any)?.data || [];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-col gap-x-2 mb-5">
        <div className="flex items-center gap-x-2">
          <div className="w-[5px] bg-red-500 h-7"></div>
          <h2 className="font-extrabold text-[22px] md:text-[25px] font-primary text-black">
            বিশ্ব সংবাদ
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        {/* finalPosts সরাসরি ম্যাপ করা হচ্ছে */}
        {finalPosts.length > 0
          ? finalPosts.slice(0, 3).map((item: Post) => (
              <Link
                key={item._id}
                to={`/single-post/${item._id}`}
                className="block group transition-all"
              >
                <MiniCard
                  title={item.title}
                  createdAt={item.createdAt}
                  image={item.image}
                />
                <div className="border-b border-gray-100 mt-3 group-last:border-none"></div>
              </Link>
            ))
          : (console.log("Current Data Structure:", categoryData),
            (
              <p className="text-gray-500 text-sm italic">
                কোনো নিউজ পাওয়া যায়নি।
              </p>
            ))}
      </div>
    </div>
  );
  {
    /* কনসোলে চেক করে নিশ্চিত হোন আসলে কী ডাটা আসছে */
  }
};
export default CategoryWorld;
