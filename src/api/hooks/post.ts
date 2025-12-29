import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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

interface CategoryPostResponse {
  success: boolean;
  data: any[];
  categoryName: string;
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

// --- Post Hooks ---

export const useFetchAllPosts = () => {
  return useQuery({
    queryKey: ["posts", "all"],
    queryFn: async () => {
      const res = await api.get("post");
      return res.data.data;
    },
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
      // রিলোড ছাড়া আপডেট নিশ্চিত করার জন্য কি-গুলো রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["posts"] }); // সব পোস্ট কোয়েরি রিফ্রেশ করবে
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
      return res.data; // পুরো অবজেক্ট রিটার্ন করা হয়েছে প্যাজিনেশনের জন্য
    },
    enabled: true,
  });
};

export const useFetchPostsByCategory = (
  slugOrId: string,
  page: number = 1,
  limit: number = 6
) => {
  return useQuery({
    queryKey: ["posts", "category", slugOrId, { page, limit }],
    queryFn: async (): Promise<CategoryPostResponse> => {
      const res = await api.get(`post/filter/${slugOrId}`, {
        params: { page, limit },
      });
      // ফিক্স: শুধু .data নয়, পুরো res.data রিটার্ন করা হয়েছে যাতে pagination পাওয়া যায়
      return res.data;
    },
    enabled: !!slugOrId,
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
      // ব্রেকিং নিউজ এবং পোস্ট লিস্ট রিফ্রেশ করা
      queryClient.invalidateQueries({ queryKey: ["posts", "breaking"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
    },
  });
};
