import { useState, useMemo } from "react";
import { Link } from "react-router";
import Container from "../components/container/Container";
import { useFetchAllCategories } from "@/api/hooks/category";

interface Category {
  _id: string;
  name: string;
  slug: string;
}

const CategoriesPage = () => {
  const { data, isLoading } = useFetchAllCategories();
  const [searchTerm, setSearchTerm] = useState("");

  // ১. ডাটা সেফটি চেক: এপিআই থেকে সরাসরি অ্যারে বা অবজেক্ট থেকে ডাটা বের করা
  const allCategories = useMemo(() => {
    return Array.isArray(data) ? data : (data as any)?.data || [];
  }, [data]);

  // ২. ক্লায়েন্ট-সাইড ফিল্টারিং (দ্রুত ক্যাটাগরি খুঁজে পাওয়ার জন্য)
  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat: Category) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCategories, searchTerm]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <Container>
        {/* Header and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-x-2 mb-1">
              <div className="w-[4px] bg-red-600 h-7"></div>
              <h1 className="font-extrabold text-2xl md:text-3xl font-primary text-gray-900">
                সব ক্যাটাগরি
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              মোট {allCategories.length}টি বিভাগ রয়েছে
            </p>
          </div>

          {/* সার্চ বক্স */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="বিভাগ খুঁজুন..."
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-white shadow-sm"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredCategories.map((category: Category) => (
                <Link
                  key={category._id}
                  to={`/category/${category._id}`} // আইডি দিয়ে ক্যাটাগরি পেজে নেভিগেশন
                  className="flex items-center justify-center p-5 rounded-xl border border-gray-100 bg-gray-50 hover:bg-white hover:border-red-500 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                >
                  <span className="font-bold text-gray-700 group-hover:text-red-600 text-center transition-colors">
                    {category.name}
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-gray-400">
              <p className="text-lg">
                "{searchTerm}" নামে কোনো বিভাগ পাওয়া যায়নি।
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesPage;
