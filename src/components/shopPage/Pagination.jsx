import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function Pagination() {
  const [tabActive, setTabActive] = useState(0);
  const tabs = 6;

  const NavigationBtnClasses = `
    border border-[#0000001A] rounded-lg py-2 px-3.5 text-[14px] leading-5 font-medium
    flex gap-2 items-center transition-colors duration-200
    hover:bg-[#00000010] active:bg-[#00000020] disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
  `;

  return (
    <div className="flex justify-between items-center text-[#000000]">
      {/* Previous Button */}
      <button onClick={() => tabActive !== 0 && setTabActive(tabActive - 1)} className={NavigationBtnClasses} disabled={tabActive === 0}>
        <FaArrowLeft />
        <span>Previous</span>
      </button>

      {/* Tabs */}
      <div className="tabs flex gap-2">
        {Array.from({ length: tabs }).map((_, i) => (
          <button
            onClick={() => setTabActive(i)}
            key={i}
            className={`tab w-10 h-10 rounded-lg leading-5 text-[14px] font-medium transition-colors duration-200
              ${tabActive === i ? "bg-[#0000000F] text-[#000000]" : "text-[#00000080] hover:bg-[#00000010]"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button onClick={() => tabActive !== tabs - 1 && setTabActive(tabActive + 1)} className={NavigationBtnClasses} disabled={tabActive === tabs - 1}>
        <span>Next</span>
        <FaArrowRight />
      </button>
    </div>
  );
}
