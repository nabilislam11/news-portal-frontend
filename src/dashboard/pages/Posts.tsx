import { useMemo, useState } from "react";
import {
  useDeletePost,
  useFetchAllPostsPaginated,
  useUpdatePost,
  useFetchBreakingNews,
  useRemoveFromBreakingNews,
} from "@/api/hooks/post";
import { EditPost } from "@/components/dashboard/post/EditPost";
import DataTable from "@/components/dataTable/DataTable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Trash, Zap } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { PostContent } from "@/components/post/PostContent";
import Switch from "@/components/switch/Switch";

// Interfaces
interface Tag {
  _id: string;
  name: string;
}
interface Category {
  _id: string;
  name: string;
}
interface PostImage {
  publicId: string;
  url: string;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  category: Category;
  tags: Tag[];
  image: PostImage;
  views: number;
  isDraft: boolean;
}

const Posts = () => {
  // --- Pagination State ---
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  // --- Data Fetching ---
  const { data, isLoading } = useFetchAllPostsPaginated({
    page: pageIndex + 1, // API is 1-based, table is 0-based
    limit: pageSize,
  });

  const { data: breakingNewsData } = useFetchBreakingNews();

  // --- Memoized Data & Pagination Values ---
  const posts = useMemo(() => data?.data || [], [data]);
  const totalRows = useMemo(() => data?.pagination?.totalPosts || 0, [data]);
  const pageCount = useMemo(() => data?.pagination?.totalPages || 0, [data]);

  const deletePost = useDeletePost();
  const updatePost = useUpdatePost();
  const removeBreaking = useRemoveFromBreakingNews();

  const breakingIds = useMemo(() => {
    return new Set(breakingNewsData?.map((p: any) => p._id));
  }, [breakingNewsData]);

  const handleToggleSwitch = (postId: string) => {
    const isCurrentlyBreaking = breakingIds.has(postId);

    if (isCurrentlyBreaking) {
      removeBreaking.mutate(postId, {
        onSuccess: () => toast.success("ব্রেকিং নিউজ থেকে সরানো হয়েছে"),
      });
    } else {
      const formData = new FormData();
      formData.append("addToBreaking", "true");

      updatePost.mutate(
        { _id: postId, formData },
        {
          onSuccess: () => toast.success("ব্রেকিং নিউজে যুক্ত করা হয়েছে!"),
        },
      );
    }
  };

  const column = [
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }: any) => (
        <p className="font-medium line-clamp-1">{row.original.title}</p>
      ),
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }: { row: { original: Post } }) => (
        <img
          src={row.original.image?.url}
          className="w-12 h-8 object-cover rounded shadow-sm"
          alt="img"
        />
      ),
    },
    {
      accessorKey: "isBreaking",
      header: "Breaking Ticker",
      cell: ({ row }: { row: { original: Post } }) => {
        const isBreaking = breakingIds.has(row.original._id);
        return (
          <div className="flex items-center gap-3">
            <Switch
              checked={isBreaking}
              onToggle={() => handleToggleSwitch(row.original._id)}
            />
            {isBreaking && (
              <Badge className="bg-red-600 animate-pulse flex gap-1 items-center">
                <Zap size={10} fill="white" /> LIVE
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: "Actions",
      cell: ({ row }: { row: { original: Post } }) => (
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Eye size={16} />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl bg-white text-black p-6">
              <img
                src={row.original.image?.url}
                className="w-full rounded-lg mb-4 object-cover"
                alt="cover"
              />

              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold leading-tight flex-1 mr-4">
                  {row.original.title}
                </h2>
                <Badge className="shrink-0">
                  {row.original.category?.name || "No Category"}
                </Badge>
              </div>

              <div className="prose prose-sm max-w-none mb-6">
                <PostContent content={row.original.content} />
              </div>

              <div className="border-t pt-4 mt-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {row.original.tags?.map((tag) => (
                    <Badge key={tag._id} variant="secondary">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Views: {row.original.views || 0}</span>
                  {breakingIds.has(row.original._id) && (
                    <span className="text-red-600 flex items-center gap-1 font-bold">
                      <Zap size={14} fill="currentColor" /> Breaking News
                    </span>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <EditPost data={row.original as any} />

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-black">
                  আপনি কি নিশ্চিত?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  এই পোস্টটি স্থায়ীভাবে মুছে যাবে।
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>বাতিল</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600"
                  onClick={() =>
                    deletePost.mutate(row.original._id, {
                      onSuccess: () => toast.success("মুছে ফেলা হয়েছে"),
                    })
                  }
                >
                  মুছে ফেলুন
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div className="p-2">
      <div className="flex justify-between mb-8 items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div>
          <h2 className="font-extrabold text-2xl text-gray-800">
            Post Management
          </h2>
          <p className="text-gray-500 text-sm">
            নিউজগুলো এখান থেকে ম্যানেজ করুন
          </p>
        </div>
        <Link to="/dashboard/add-post">
          <Button className="bg-red-600 hover:bg-red-700">Add New Post</Button>
        </Link>
      </div>

      <DataTable
        loading={isLoading || updatePost.isPending || removeBreaking.isPending}
        search="title"
        data={posts}
        columns={column}
        // --- Server-Side Pagination Props ---
        pageCount={pageCount}
        pagination={{ pageIndex, pageSize }}
        onPaginationChange={setPagination}
        totalRows={totalRows}
      />
    </div>
  );
};

export default Posts;
