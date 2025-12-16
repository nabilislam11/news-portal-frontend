import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";


export type Category = {
  _id: string;
  name: string;
  slug: string;
  description?: string | null;
  isActive: boolean;
  createdAt: string;
};


export const useFetchAllCategories = () => {
  return useQuery({
    queryKey: ["categories", "all"],
    queryFn: async (): Promise<Category[]> => {
      const res = await api.get("category");
      return res.data.data;
    },
  });
};



export const useFetchCategoryById = (id: string) => {
  return useQuery({
    queryKey: ["categories", id],
    queryFn: async (): Promise<Category> => {
      const res = await api.get(`category/${id}`);
      return res.data.data;
    },
    enabled: !!id, 
  });
};



type CreateCategoryInput = {
  name: string;
  description?: string;
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryInput) => {
      const res = await api.post("category", data);
      return res.data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "all"],
      });
    },
  });
};



type UpdateCategoryInput = {
  id: string;
  name?: string;
  description?: string;
  isActive?: boolean;
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCategoryInput) => {
      const res = await api.patch(`category/${id}`, data);
      return res.data.data;
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories", "all"] });

      queryClient.invalidateQueries({
        queryKey: ["categories", variables.id],
      });
    },
  });
};


export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.delete(`category/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories", "all"],
      });
    },
  });
};
