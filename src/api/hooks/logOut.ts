import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../axios";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Ensure this route matches your backend (e.g. /auth/logout)
      const res = await api.delete("admin/logout");
      return res.data;
    },
    onSuccess: () => {
      // 1. Clear any LocalStorage items (if you used them)
      localStorage.removeItem("token");
      localStorage.removeItem("accessToken");

      // 2. Clear React Query Cache (Removes all cached user data immediately)
      queryClient.clear();

      // 3. Force Redirect to Login (Hard reload ensures no memory leaks)
      window.location.href = "/login";
    },
    onError: (error: any) => {
      console.error(
        "Logout error details:",
        error.response?.data || error.message
      );

      // Safety Fallback: Even if the server errors, we still clear the client session
      queryClient.clear();
      window.location.href = "/login";
    },
  });
};
