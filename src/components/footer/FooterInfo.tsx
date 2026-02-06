const FooterInfo = () => {
  return (
    <section className="border-y border-gray-300 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
        {/* বাম পাশ: সম্পাদকীয় এবং ঠিকানা */}
        <div className="flex flex-col gap-y-4">
          <div className="text-[15px] md:text-[16px] text-gray-900 leading-tight">
            <p>
              <span className="font-bold">সম্পাদক: রিয়াজ মুন্সী ।</span>{" "}
              <span className="font-bold">প্রকাশক: মিজানুর রহমান সাকিব</span>
            </p>
          </div>

          <p className="text-gray-700 text-[14px] leading-relaxed">
            প্রতিদিন জনতার মিডিয়া লিমিটেডের পক্ষে প্রকাশক কর্তৃক ৯৪/৭/১,
            আলহাজ্ব মকবুল হোসেন কলেজ রোড, ঢাকা-১২০৭ থেকে প্রকাশিত।
          </p>
        </div>

        {/* ডান পাশ: যোগাযোগ এবং বিভাগসমূহ */}
        <div className="text-gray-800 text-[14px] space-y-1.5 leading-relaxed">
          <p className="font-bold font-secondary text-[15px] ">
            <span className="font-bold font-secondary text-[15px]">ফোন :</span>{" "}
            ০১৬২৮-৯৭০৭২৩, ০১৭৪২-৯৩৯৭৪৪ ।
          </p>
          <p className="font-medium   font-secondary text-[15px]">
            <span className="font-bold font-secondary text-[15px]">
              হোয়াটসঅ্যাপ:
            </span>{" "}
            +৮৮০ ১৬২৮-৯৭০৭২৩ ।
          </p>
          <p className="font-medium   font-secondary text-[15px]">
            <span className="font-bold font-secondary text-[15px]">
              ই-মেইল:
            </span>{" "}
            Info@protidinjonotarnews.com
          </p>
          <p className="font-medium    font-secondary text-[15px]">
            <span className="font-bold font-secondary text-[15px]">
              বিজ্ঞাপন বিভাগ: ফোন:
            </span>{" "}
            ০১৬২৮-৯৭০৭২৩ ।{" "}
            <span className="font-bold    font-secondary text-[15px]">
              ই-মেইল:
            </span>{" "}
            info@protidinjonotarnews.com
          </p>
          <p className="font-medium    font-secondary text-[15px]">
            <span className="font-bold font-secondary text-[15px]">ফোন:</span>{" "}
            ০১৬২৮-৯৭০৭২৩ ।
          </p>
          <p className="pt-2 font-medium">
            প্রতিদিন জনতার মিডিয়া লিমিটেডের একটি প্রকাশনা।
          </p>
        </div>
      </div>
    </section>
  );
};

export default FooterInfo;
