const FooterInfo = () => {
  return (
    <section className=" border-y border-gray-300 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* বাম পাশ: সম্পাদকীয় এবং ঠিকানা */}
        <div className="flex flex-col gap-y-4">
          <div className="text-[15px] md:text-[16px] text-gray-900 leading-tight">
            <span className="font-bold">সম্পাদক: সন্তোষ শর্মা ।</span>{" "}
            <span className="font-bold">
              প্রকাশক: মিয়া নুরুদ্দিন আহাম্মদ অপু
            </span>
          </div>

          <p className="text-gray-700 text-[14px] leading-relaxed">
            কালবেলা মিডিয়া লিমিটেডের পক্ষে প্রকাশক কর্তৃক নিউমার্কেট সিটি
            কমপ্লেক্স, ৪৪/১, রহিম স্কয়ার, নিউমার্কেট, ঢাকা থেকে প্রকাশিত এবং
            ২৮/বি, টয়েনবি সার্কুলার রোড, মতিঝিল ঢাকা, শরীয়তপুর প্রিন্টিং প্রেস
            থেকে মুদ্রিত।
          </p>
        </div>

        {/* ডান পাশ: যোগাযোগ এবং বিভাগসমূহ */}
        <div className="text-gray-800 text-[14px] space-y-1.5 leading-relaxed">
          <p>
            <span className="font-bold">ফোন :</span> +৮৮ ০২ ৪৪৬১৭০০৩, +৮৮ ০২
            ৪৪৬১৭০০৪ ।
          </p>
          <p>
            <span className="font-bold">ফ্যাক্স :</span> +৮৮ ০২ ৪৪৬১৭০০২ ।{" "}
            <span className="font-bold">ই-মেইল:</span> news@kalbela.com.
          </p>
          <p>
            <span className="font-bold">বিজ্ঞাপন বিভাগ: ফোন:</span> +৮৮ ০২
            ৪৪৬১৭০০৫, ০১৭৩০ ০৯৩৩২৮ । <span className="font-bold">ই-মেইল:</span>{" "}
            ads@kalbela.com.
          </p>
          <p>
            <span className="font-bold">সার্কুলেশন : ফোন:</span> ০১৭৩০ ০৯৩৩৪৭ ।
            কালবেলা মিডিয়া লিমিটেডের একটি প্রকাশনা।
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterInfo;
