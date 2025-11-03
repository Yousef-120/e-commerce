import { IoStar } from "react-icons/io5";
import { FaCheck } from "react-icons/fa";

export default function Rating({ customer }) {
  return (
    <div className="bg-white rounded-3xl px-8 py-7 flex flex-col justify-between shadow-sm h-72 lg:h-60 border border-[#0000001A]">
      <div className="customer-info">
        <div className="stars flex gap-2 mb-[15px]">
          {[...Array(5)].map((_, index) => (
            <IoStar key={index} className="text-[#FFC633] text-[24px]" />
          ))}
        </div>
        <div className="customer-name flex gap-2 items-center">
          <h6 className="font-bold text-[20px] text-[#000000] leading-[22px]">{customer.name}</h6>
          <div className="w-[19.5px] h-[19.5px] p-1 rounded-full bg-[#01AB31] flex justify-center items-center">
            <FaCheck size="12px" color="#FFFFFF" />
          </div>
        </div>
        <div className="customer-comment mt-3">
          <p className="text-[#00000099] text-[14px] lg:text-[16px] leading-[20x] lg:leading-[22px]">{customer.comment}</p>
        </div>
      </div>

      <div className="customer-post-date">
        <p className="text-[#00000099] text-[14px] lg:text-[16px] leading-[22px] tracking-normal">Posted On {customer.date}</p>
      </div>
    </div>
  );
}
