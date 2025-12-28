import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoStar } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import useDeviceType from "../../modules/core/components/useDeviceType";
import { happyCustomers } from "../../modules/core";

export default function HappyCustomers() {
  const device = useDeviceType()

  return (
    <div className="w-full py-20 overflow-visible">
      <div className="w-full relative flex justify-center mb-16">
        <div className="content container flex justify-between items-center">
          
          <h5 className="integral-font uppercase font-bold text-[32px] md:text-[40px] lg:text-5xl md:text-center leading-9 lg:leading-[100%] tracking-normal">OUR HAPPY CUSTOMERS</h5>
          <div className="controls flex items-center gap-3">
            <button className="control-left cursor-pointer">
              <HiOutlineArrowSmLeft size="28px" />
            </button>
            <button className="control-right cursor-pointer">
              <HiOutlineArrowSmRight size="28px" />
            </button>
          </div>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".control-right",
          prevEl: ".control-left",
        }}
        spaceBetween={20}
        slidesPerView={device != "desktop" ? 1 : 3}
        centeredSlides={false}
        loop={false}
        speed={600}
        className="container overflow-visible cursor-grab active:cursor-grabbing select-none"
      >
        {happyCustomers.map((customer, i) => (
          <SwiperSlide key={i} className="overflow-hidden px-4 lg:px-0">
            <div className="bg-white rounded-3xl px-8 py-7 shadow-sm h-60 flex flex-col border border-[#0000001A] overflow-hidden">
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
              <div className="customer-comment mt-3 ">
                <p className="text-[#00000099] overflow-hidden text-[14px] md:text-[18px] leading-5 md:leading-[22px]">{customer.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
