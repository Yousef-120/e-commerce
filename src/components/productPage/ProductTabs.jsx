import { useState } from "react";
import ProductRating from "./ProductRating";

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState(1);
  const tabs = ["Product Details", "Rating & Reviews", "FAQs"];

  return (
    <div className="tabs-section flex justify-center mb-">
      <div className="container">
        <div className="tabs border-b border-[#0000001A] grid grid-cols-3 justify-between relative mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`text-[16px] lg:text-[20px] leading-[22px] tracking-normal p-2 lg:p-5 cursor-pointer transition-colors duration-300 text-center ${activeTab === index ? "text-[#000000]" : "text-[#00000099]"}`}
            >
              {tab}
            </button>
          ))}

          <span
            className="absolute bottom-0 h-0.5 bg-black transition-all duration-300"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(100 / tabs.length) * activeTab}%`,
            }}
          ></span>
        </div>
        <div className="content">{activeTab === 0 || 1 || 2 ? <ProductRating /> : ''}</div>
      </div>
    </div>
  );
}
