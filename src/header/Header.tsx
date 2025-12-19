import { useState } from "react";
import Container from "../components/container/Container";
import Logo from "../components/logo/Logo";
import { Link } from "react-router";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import NewsCard from "@/components/newsitems/NewsCard";
import { useFetchNavMenu } from "@/api/hooks/navMenu";

interface NavItem {
  name: string;
  path?: string;
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  
  const { data } = useFetchNavMenu();
  const navItems = data as unknown as NavItem[];

  const newsItems = [
    {
      image: "https://images.unsplash.com/photo-1494252713559-f26b4bf0b174?w=800&h=600&fit=crop",
      title: "ভোলা-বরিশাল সেতুর দাবিতে উত্তাল ভোলা- ইস্টিকোর গ্যাসবাহী গাড়ি আটক",
      date: "November 25, 2025",
      comments: 0,
      description: "রাজধানীর বিন আলামগীরের শোরাল কোথাপাড়ায় তোলার পাঁচ দশা দাবি বাস্তবায়ন সরকারের নীরবতার বিরুদ্ধে আজ ভোলাসুত্রে অবস্থানের মর্যাদাহীনান",
    },
    {
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
      title: "শিক্ষা প্রতিষ্ঠানে নতুন নিয়ম জারি",
      date: "November 25, 2025",
      comments: 12,
      description: "দেশের সকল শিক্ষা প্রতিষ্ঠানে নতুন নিয়মকানুন জারি করেছে শিক্ষা মন্ত্রণালয়। এতে শিক্ষার্থীদের উপস্থিতি এবং পরীক্ষা পদ্ধতিতে বড় পরিবর্তন আনা হয়েছে।",
    },
    {
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=800&h=600&fit=crop",
      title: "কৃষকদের জন্য নতুন ভর্তুকি ঘোষণা",
      date: "November 24, 2025",
      comments: 8,
      description: "সরকার কৃষকদের জন্য সার ও বীজে নতুন ভর্তুকি ঘোষণা করেছে। এতে কৃষকরা আগামী মৌসুমে কম খরচে চাষাবাদ করতে পারবেন বলে আশা করা হচ্ছে।",
    },
  ];

  return (
    <header className="w-full bg-white shadow-md fixed top-9 left-0 z-50 shadow-gray-200">
      <Container>
        <div className="w-full">
          <div className="mx-auto py-5 flex justify-between items-center">
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center text-gray-700 font-medium">
              {Array.isArray(navItems) && navItems.map((nav, i) => (
                <Link
                  key={i}
                  to={`/category/${nav.name}`}
                  className="cursor-pointer hover:text-red-600 transition"
                >
                  {nav.name}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="mx-4 hidden lg:flex max-w-[250px]">
              <Dialog>
                <DialogTrigger className="ms-auto" asChild>
                  <Button variant="outline" className="size-10">
                    <CiSearch />
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[750px] max-h-[90%] p-7 overflow-y-auto">
                  <DialogHeader>
                    <Label>Search News</Label>
                  </DialogHeader>

                  <Input type="text" placeholder="Search..." />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>

                  <div className="space-y-4 mt-4">
                    {newsItems.length === 0 && (
                      <p className="text-gray-500">No result found</p>
                    )}

                    {newsItems.map((item, index) => (
                      <NewsCard
                        key={index}
                        comments={item.comments}
                        date={item.date}
                        description={item.description}
                        image={item.image}
                        title={item.title}
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Hamburger Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="focus:outline-none"
              >
                <div className="space-y-1">
                  <span className={`block h-0.5 w-6 bg-gray-700 transition ${isOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                  <span className={`block h-0.5 w-6 bg-gray-700 transition ${isOpen ? "opacity-0" : ""}`} />
                  <span className={`block h-0.5 w-6 bg-gray-700 transition ${isOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 py-3 grid grid-cols-2 gap-2">
              {Array.isArray(navItems) && navItems.map((nav, i) => (
                <Link
                  key={i}
                  to={`/category/${nav.name}`}
                  className="hover:text-red-600 p-2"
                  onClick={() => setIsOpen(false)}
                >
                  {nav.name}
                </Link>
              ))}

              <div className="col-span-2 px-2">
                 <input
                  type="text"
                  placeholder="Search..."
                  className="w-full mt-2 border rounded-md p-2"
                />
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}