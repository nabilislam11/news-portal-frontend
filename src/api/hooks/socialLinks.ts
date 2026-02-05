// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "../axios";

// // ১. টাইপ ডিফাইন করা (আপনার কন্ট্রোলার অনুযায়ী)
// export type SocialLinks = {
//   facebook: string;
//   twitter: string;
//   linkedin: string;
//   instagram: string;
//   youtube: string;
// };

// // ২. সোশ্যাল লিঙ্কগুলো ফেচ করার হুক (যাতে ফর্মে আগের ডাটা দেখানো যায়)
// export const useFetchSocialLinks = () => {
//   return useQuery({
//     queryKey: ["socialLinks"],
//     queryFn: async (): Promise<SocialLinks> => {
//       const res = await api.get("admin/social-links");
//       // যদি ডাটা না থাকে তবে খালি স্ট্রিং সহ অবজেক্ট রিটার্ন করবে
//       return (
//         res.data.data || {
//           facebook: "",
//           twitter: "",
//           linkedin: "",
//           instagram: "",
//           youtube: "",
//         }
//       );
//     },
//   });
// };

// // ৩. সোশ্যাল লিঙ্ক আপডেট করার হুক
// export const useUpdateSocialLinks = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: Partial<SocialLinks>) => {
//       // আপনার কন্ট্রোলার রাউট অনুযায়ী URL দিন
//       const res = await api.put("admin/socials", data);
//       return res.data.data;
//     },

//     onSuccess: () => {
//       // আপডেট সফল হলে ডাটা রিফ্রেশ করা
//       queryClient.invalidateQueries({
//         queryKey: ["socialLinks"],
//       });
//       // যদি আপনার কোনো 'admin-profile' কুয়েরি থাকে তবে সেটিও ইনভ্যালিডেট করতে পারেন
//       queryClient.invalidateQueries({
//         queryKey: ["admin"],
//       });
//     },
//   });
// };
