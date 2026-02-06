import { useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import Container from "../components/container/Container";
import CategoriesCard from "../components/categoriescard/CategoriesCard";
import { useFetchAllCategories, useFetchCategoryById } from "@/api/hooks/category";
import { useFetchPostsByCategory } from "@/api/hooks/post";
import DateFormatter from "@/components/DateFormatter";
import { PostContent } from "@/components/post/PostContent";
import type { CardProps } from "@/types/CardProps";
import RecentPost from "@/components/recentpost/RecentPost";
import Subcribtion from "@/components/subscribtion/Subcribtion";
import SquareAds from "@/components/ads/SquareAds";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CategoryPage = () => {
  const { id } = useParams();

  // 1. Pagination State
  const [page, setPage] = useState(1);
  const limit = 6;

  // --- FIX STARTS HERE ---
  // We track the previous ID to detect changes
  const [prevId, setPrevId] = useState(id);

  // If the ID changes (user clicked a new category), reset page immediately
  // This runs *during* render, preventing the "cascading render" error
  if (id !== prevId) {
    setPrevId(id);
    setPage(1);
  }
  // --- FIX ENDS HERE (Removed the useEffect) ---

  // 2. Data Fetching
  const { data: categoriesList } = useFetchAllCategories();

  const { data: postResponse, isLoading, isPlaceholderData } = useFetchPostsByCategory(id || "all", page, limit);

  const { data: categoryInfo } = useFetchCategoryById(id as string);

  // 3. Data Normalization
  const posts = useMemo(() => {
    return Array.isArray(postResponse?.data) ? postResponse.data : [];
  }, [postResponse]);

  const pagination = postResponse?.pagination;

  // 4. Title Logic
  const categoryName = useMemo(() => {
    if (id === "all") return "All News";
    return postResponse?.meta?.filterName || categoryInfo?.name || "News";
  }, [id, postResponse, categoryInfo]);

  // 5. Scroll to top on page change
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            Showing Page {pagination?.currentPage} of {pagination?.totalPages}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 flex flex-col">
            {posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  {posts.map((article: CardProps) => (
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
                          <Badge className="absolute top-4 left-4 bg-red-500 text-white hover:bg-red-500 border-none">
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
                            <span className="text-pink-600 text-sm">👤</span> Admin
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
                          className="mt-auto inline-flex items-center text-red-500 font-bold text-sm hover:gap-2 transition-all"
                        >
                          CONTINUE READING <span className="ml-1 text-lg">→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* --- Pagination Controls --- */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-auto pb-8">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(Math.max(page - 1, 1))}
                      disabled={page === 1 || isPlaceholderData}
                      className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={20} />
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => {
                      if (
                        pageNum === 1 ||
                        pageNum === pagination.totalPages ||
                        (pageNum >= page - 1 && pageNum <= page + 1)
                      ) {
                        return (
                          <button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            disabled={isPlaceholderData}
                            className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-all ${
                              page === pageNum
                                ? "bg-pink-600 text-white shadow-md transform scale-105"
                                : "bg-white text-gray-600 border border-gray-300 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600"
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      } else if (pageNum === page - 2 || pageNum === page + 2) {
                        return (
                          <span key={pageNum} className="text-gray-400">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(Math.min(page + 1, pagination.totalPages))}
                      disabled={page === pagination.totalPages || isPlaceholderData}
                      className="p-2 rounded-lg border border-gray-300 bg-white text-gray-600 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg p-20 text-center shadow-sm">
                <div className="text-5xl mb-4">📂</div>
                <h2 className="text-xl font-bold text-gray-400 italic">No posts found in this category yet.</h2>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <RecentPost />

            <div className="sticky top-24 space-y-8">
              <CategoriesCard categories={categoriesList || []} />

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-pink-600 pb-2">Newsletter</h3>
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
