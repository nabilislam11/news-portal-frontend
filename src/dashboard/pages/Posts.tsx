import DataTable from "@/components/dataTable/DataTable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { Post } from "@/validators/post";
import { Pencil, Trash } from "lucide-react";

const mockPosts = [
  {
    id: "1",
    title: "category 1",
    category: "category 1",
    subCategory: "sub category 1",
    slug: "category-1",
    tags: ["tag 1", "tag 2", "tag 3"],
    content: "description 1",
    image: "https://picsum.photos/200/300",
    isDraft: false,
  },
  {
    id: "2",
    title: "category 2",
    category: "category 2",
    subCategory: "sub category 2",
    slug: "category-2",
    tags: ["tag 1", "tag 2", "tag 3"],
    content: "description 2",
    image: "https://picsum.photos/200/300",
    isDraft: false,
  },
  {
    id: "3",
    title: "category 3",
    category: "category 3",
    subCategory: "sub category 3",
    slug: "category-3",
    tags: ["tag 1", "tag 2", "tag 3"],
    content: "description 3",
    image: "https://picsum.photos/200/300",
    isDraft: false,
  },
];

const Posts = () => {
  const column = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "subCategory",
      header: "Sub Category",
    },
    {
      accessorKey: "tags",
      header: "Tags",
    },
    {
      accessorKey: "content",
      header: "Content",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell:({row}: {row: {original: Post}})=>{

        return <img src={row.original.image} className="w-10" alt="" />

      }
    },
    {
      header: "Actions",
      cell: () => (
        <div className="flex justify-center text-center items-center gap-2">
          <Button
            variant={"secondary"}
            className="bg-blue-500 text-white"
            size={"sm"}
          >
            {" "}
            <Pencil />{" "}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} size={"sm"}>
                {" "}
                <Trash />{" "}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this Category
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable search="title" data={mockPosts} columns={column} />
    </div>
  );
};

export default Posts;
