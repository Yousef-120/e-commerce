import filterPng from "../../assets/filter.png";
import { IoChevronDown } from "react-icons/io5";
import Rating from "./Rating";
import { customersReviews } from "../../modules/core";
import useIsMobile from "../../modules/core/components/useIsMobile";

export default function ProductRating() {
  const isMobile = useIsMobile();
  return (
    <div>
      <div className="top text-[#000000] flex justify-between items-center mb-8">
        <div className="heading flex gap-2">
          <h3 className="font-bold text-[20px] lg:text-2xl leading-[100%] tracking-normal">All Reviews</h3>
          <span className="leading-[22px] text-[#00000099] text-[14px] lg:text-[16px] content-end">{"(451)"}</span>
        </div>
        <div className="filters flex gap-2.5">
          <button className="bg-[#F0F0F0] rounded-full py-3 px-3">
            <img className="w-6 h-6" src={filterPng} alt="" />
          </button>
          {!isMobile && (
            <button className="bg-[#F0F0F0] rounded-full py-3 px-5 flex gap-4 items-center">
              <span className="font-medium text-[16px] leading-[100%] tracking-normal">Latest</span>
              <IoChevronDown />
            </button>
          )}
          <button className="bg-[#000000] rounded-full py-3 px-4 lg:px-7 text-[#FFFFFF] font-medium text-[14px] lg:text-[16px] leading-[100%] tracking-normal">Write a Review</button>
        </div>
      </div>
      <div className="rating grid grid-cols-1 lg:grid-cols-2 gap-5">
        {customersReviews.map((customer, i) => (
          <Rating key={i} customer={customer} />
        ))}
      </div>
      <div className="btn-div flex justify-center mt-9">
        <button className="rounded-full border border-[#0000001A] py-4 px-9 lg:px-[54px] font-medium text-[16px] leading-[100%] tracking-normal text-[#000000] hover:scale-[1.03] transition-transform duration-300">
          Load More Reviews
        </button>
      </div>
    </div>
  );
}
