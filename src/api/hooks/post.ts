import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { api } from "../axios";

// --- Types & Interfaces ---

interface SearchParams {
  query?: string;
  categoryName?: string;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  success: boolean;
  data: any[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// Updated Interface matching your Backend Controller
export interface CategoryPostResponse {
  success: boolean;
  data: any[]; // The Array of posts
  meta?: {
    filterType: string;
    filterName: string;
    filterId: string;
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
}

// --- Post Hooks ---

interface FetchPostsParams {
  page?: number;
  limit?: number;
}

export const useFetchAllPosts = (params?: FetchPostsParams) => {
  // ১. ডিফল্ট ভ্যালু সেট করা (যদি ইউজার কিছু না পাঠায়)
  const page = params?.page || 1;
  const limit = params?.limit || 10;

  return useQuery({
    // ২. Query Key-তে page এবং limit যোগ করা।
    // এর ফলে যখনই page বা limit চেঞ্জ হবে, React Query নতুন ডেটা আনবে।
    queryKey: ["posts", "all", page, limit],

    queryFn: async () => {
      // ৩. Axios এর params অপশন ব্যবহার করে কুয়েরি স্ট্রিং পাঠানো
      const res = await api.get("post", {
        params: {
          page: page,
          limit: limit,
        },
      });

      // ব্যাকএন্ড রেসপন্স { success, data, pagination } রিটার্ন করছে।
      // আমরা পুরো data টাই রিটার্ন করছি যাতে আপনি UI তে pagination ইনফো ব্যবহার করতে পারেন।
      return res.data.data;
    },

    // ৪. (Optional) পেজ চেঞ্জ করার সময় আগের ডেটা ধরে রাখা (UX ভালো করার জন্য)
    placeholderData: (previousData) => previousData,
  });
};
export const useFetchPostById = (id: string) => {
  return useQuery({
    queryKey: ["posts", id],
    queryFn: async () => {
      const res = await api.get(`post/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await api.post("post", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      _id,
      formData,
    }: {
      _id: string;
      formData: FormData;
    }) => {
      const res = await api.put(`post/${_id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["posts", variables._id] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`post/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "stats"] });
    },
  });
};

export const useFetchTrendingPosts = () => {
  return useQuery({
    queryKey: ["posts", "trending"],
    queryFn: async (): Promise<any[]> => {
      const res = await api.get("post/trending");
      return res.data.data;
    },
  });
};

export const useSearchPosts = (params: SearchParams) => {
  return useQuery({
    queryKey: ["posts", "search", params],
    queryFn: async (): Promise<SearchResponse> => {
      const res = await api.get("post/search", {
        params: {
          query: params.query,
          categoryName: params.categoryName,
          page: params.page || 1,
          limit: params.limit || 10,
        },
      });
      return res.data;
    },
    enabled: true,
  });
};

/**
 * UPDATED: Category/Filter Hook with Pagination
 * Note: Added placeholderData: keepPreviousData for smooth UI transitions
 */
export const useFetchPostsByCategory = (
  slugOrId: string,
  page: number = 1,
  limit: number = 6,
) => {
  return useQuery({
    queryKey: ["posts", "category", slugOrId, page, limit],
    queryFn: async (): Promise<CategoryPostResponse> => {
      // The backend handles "all" correctly now, so we can pass it directly
      const res = await api.get(`post/filter/${slugOrId}`, {
        params: { page, limit },
      });
      return res.data;
    },
    enabled: !!slugOrId,
    placeholderData: keepPreviousData, // Keeps old data while fetching new page
    staleTime: 1000 * 60 * 5,
  });
};

// --- Breaking News Hooks ---

export const useFetchBreakingNews = () => {
  return useQuery({
    queryKey: ["posts", "breaking"],
    queryFn: async (): Promise<any[]> => {
      const res = await api.get("post/breaking");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 2,
  });
};

export const useRemoveFromBreakingNews = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (postId: string) => {
      const res = await api.delete(`post/breaking/${postId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts", "breaking"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
    },
  });
};
