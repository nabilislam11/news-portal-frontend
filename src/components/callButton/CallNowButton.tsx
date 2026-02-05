import React from "react";
import { Phone } from "lucide-react";

interface CallButtonProps {
  number?: string;
  label?: string;
}

const CallNowButton: React.FC<CallButtonProps> = ({
  number = "01628970723", // আপনার ফিক্সড নাম্বার
  label = "সরাসরি কল করুন",
}) => {
  return (
    // inline-flex ব্যবহার করা হয়েছে যাতে এটি আশেপাশের জায়গা কম নেয়
    <div className="inline-flex justify-center items-center py-1">
      <a
        href={`tel:${number}`}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white 
                   px-2 py-1.5 md:px-5 md:py-2 
                   rounded-full font-semibold shadow-md 
                   transition-all duration-300 hover:scale-105 active:scale-95 group"
      >
        {/* আইকন সাইজ মোবাইলে একটু ছোট (w-4) এবং বড় স্ক্রিনে (w-5) */}
        <Phone className="w-4 h-4 md:w-5 md:h-5 group-hover:animate-bounce" />

        <div className="flex flex-col items-start leading-tight">
          {/* টেক্সট সাইজ রেসপনসিভ করা হয়েছে */}
          <span className="text-[11px] md:text-[13px] whitespace-nowrap">
            {label}
          </span>
        </div>
      </a>
    </div>
  );
};

export default CallNowButton;
