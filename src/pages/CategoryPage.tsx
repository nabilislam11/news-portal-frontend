import { useMemo } from "react";
import { Link, useParams } from "react-router";
import Container from "../components/container/Container";
import CategoriesCard from "../components/categoriescard/CategoriesCard";
import {
  useFetchAllCategories,
  useFetchCategoryById,
} from "@/api/hooks/category";
import { useFetchAllPosts, useFetchPostsByCategory } from "@/api/hooks/post";
import DateFormatter from "@/components/DateFormatter";
import { PostContent } from "@/components/post/PostContent";
import type { CardProps } from "@/types/CardProps";
import RecentPost from "@/components/recentpost/RecentPost";
import Subcribtion from "@/components/subscribtion/Subcribtion";
import SquareAds from "@/components/ads/SquareAds";
import { Badge } from "@/components/ui/badge";

const CategoryPage = () => {
  const { id } = useParams();

  // ১. ডাটা ফেচিং
  const { data: categoriesList } = useFetchAllCategories();
  const { data: allPosts, isLoading: isAllLoading } = useFetchAllPosts();
  const { data: categoryResponse, isLoading: isCatLoading } =
    useFetchPostsByCategory(id as string);
  const { data: categoryInfo } = useFetchCategoryById(id as string);

  /**
   * ২. ডাটা নরমালাইজেশন (সবচেয়ে গুরুত্বপূর্ণ অংশ)
   * আপনার নতুন হুক অনুযায়ী:
   * 'all' হলে সরাসরি অ্যারে আসে।
   * নির্দিষ্ট আইডি হলে একটি অবজেক্ট আসে যার ভেতর .data তে অ্যারে থাকে।
   */
  const finalPosts = useMemo(() => {
    if (id === "all") {
      return Array.isArray(allPosts) ? allPosts : [];
    }
    // আপনার আপডেট করা হুক অনুযায়ী res.data রিটার্ন হচ্ছে, তাই .data চেক করতে হবে
    return Array.isArray(categoryResponse?.data) ? categoryResponse.data : [];
  }, [id, allPosts, categoryResponse]);

  const isLoading = id === "all" ? isAllLoading : isCatLoading;

  // ৩. শিরোনাম লজিক
  const categoryName = useMemo(() => {
    if (id === "all") return "All News";
    return categoryResponse?.meta?.filterName || categoryInfo?.name || "News";
  }, [id, categoryResponse, categoryInfo]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 pt-32 md:pt-40 min-h-screen">
      <Container>
        {/* Category Header */}
        <div className="text-center mb-10 bg-white py-8 rounded-lg shadow-sm border-b-4 border-pink-600">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-800 uppercase tracking-tight">
            Category : <span className="text-pink-600">{categoryName}</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Showing {finalPosts.length} posts found in this section
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {finalPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {finalPosts.map((article: CardProps) => (
                  <div
                    key={article._id}
                    className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                  >
                    {/* Image Section */}
                    <div className="relative overflow-hidden group">
                      <img
                        src={article?.image?.url}
                        alt={article.title}
                        className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                      {article.category && (
                        <Badge className="absolute top-4 left-4 bg-yellow-400 text-black hover:bg-yellow-500 border-none">
                          {article.category.name}
                        </Badge>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-[11px] text-gray-500 mb-3 uppercase tracking-wider font-semibold">
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600 text-sm">📅</span>
                          <DateFormatter date={article.createdAt} />
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="text-pink-600 text-sm">👤</span>{" "}
                          Admin
                        </span>
                      </div>

                      <Link to={`/single-post/${article._id}`}>
                        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-pink-600 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h2>
                      </Link>

                      <div className="text-gray-600 text-sm mb-5 line-clamp-3 flex-grow leading-relaxed">
                        <PostContent content={article.content} />
                      </div>

                      <Link
                        to={`/single-post/${article._id}`}
                        className="mt-auto inline-flex items-center text-pink-600 font-bold text-sm hover:gap-2 transition-all"
                      >
                        CONTINUE READING <span className="ml-1 text-lg">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-20 text-center shadow-sm">
                <div className="text-5xl mb-4">📂</div>
                <h2 className="text-xl font-bold text-gray-400 italic">
                  No posts found in this category yet.
                </h2>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <RecentPost />

            <div className="sticky top-24 space-y-8">
              <CategoriesCard categories={categoriesList || []} />

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-pink-600 pb-2">
                  Newsletter
                </h3>
                <Subcribtion />
              </div>

              <SquareAds />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
