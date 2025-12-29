import Container from "../container/Container";
import Marquee from "react-fast-marquee";
import { useFetchBreakingNews } from "@/api/hooks/post"; // ১. ব্রেকিং নিউজ হুক ইম্পোর্ট করা হয়েছে
import { Link } from "react-router"; // নিউজ ক্লিকযোগ্য করার জন্য
import CallNowButton from "../callButton/CallNowButton";

const MarqueeTag: React.FC = () => {
  // ২. সব পোস্টের বদলে শুধু ব্রেকিং নিউজ ফেচ করা হচ্ছে
  const { data: breakingNews, isLoading } = useFetchBreakingNews();

  if (isLoading)
    return (
      <div className="h-[55px] bg-red-600 flex items-center justify-center text-white">
        লোড হচ্ছে...
      </div>
    );

  return (
    <div className="h-[55px] flex items-center bg-red-600 shadow-md w-full overflow-hidden">
      <Container className="w-full">
        <div className="flex items-center gap-x-3 w-full overflow-hidden">
          {/* LABEL */}
          <div className="shrink-0 z-10">
            <p
              className="text-red-600 text-center bg-white font-primary font-bold 
              text-[12px] md:text-[14px] py-1 px-3 rounded shadow-sm"
            >
              ব্রেকিং নিউজ
            </p>
          </div>

          {/* MARQUEE WRAPPER */}
          <div className="flex-1 overflow-hidden">
            <Marquee
              speed={60}
              pauseOnHover={true}
              gradient={false}
              className="text-white text-xs md:text-sm"
            >
              {breakingNews && breakingNews.length > 0 ? (
                breakingNews.map((post: any, i: number) => (
                  <div key={post._id || i} className="flex items-center">
                    {/* নিউজ টাইটেল এবং লিঙ্ক */}
                    <Link
                      to={`/single-post/${post._id}`}
                      className="px-4 hover:text-gray-200 transition-colors cursor-pointer"
                    >
                      {post.title}
                    </Link>

                    {/* ৩. প্রতিটি নিউজের পর "|" যোগ করা হয়েছে */}
                    <span className="text-white/60 font-light">|</span>
                  </div>
                ))
              ) : (
                <span className="px-4 italic">
                  কোনো ব্রেকিং নিউজ পাওয়া যায়নি।
                </span>
              )}
            </Marquee>
          </div>

          <div className="hidden md:block">
            <CallNowButton />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MarqueeTag;
