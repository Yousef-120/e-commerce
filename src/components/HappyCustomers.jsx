import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoStar } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { HiOutlineArrowSmRight } from "react-icons/hi";
import useIsMobile from "../modules/core/components/useIsMobile";

export default function HappyCustomers() {
  const isMobile = useIsMobile()
  const happyCustomers = [
    {
      stars: 5,
      name: "Sarah M.",
      comment: `"I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."`,
    },
    {
      stars: 5,
      name: "Alex K.",
      comment: `"Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."`,
    },
    {
      stars: 5,
      name: "James L.",
      comment: `"As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."`,
    },
    {
      stars: 5,
      name: "Daniel R.",
      comment: `"Excellent quality and service. I love how comfortable the clothes are and how well they hold up after washing."`,
    },
    {
      stars: 5,
      name: "Layla S.",
      comment: `"Shop.co never disappoints! The fabric feels so soft, and the attention to detail is impressive."`,
    },
    {
      stars: 5,
      name: "Omar H.",
      comment: `"Amazing customer support and top-notch quality. I’ve already recommended Shop.co to my friends."`,
    },
  ];

  return (
    <div className="w-full py-20 overflow-visible">
      <div className="w-full relative flex justify-center mb-16">
        <div className="content container flex justify-between items-center">
          {!isMobile && <p></p>}
          <h5 className="integral-font uppercase font-bold text-[32px] md:text-5xl md:text-center leading-9 md:leading-[100%] tracking-normal">OUR HAPPY CUSTOMERS</h5>
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
        spaceBetween={30}
        slidesPerView={isMobile ? 1 : 3}
        centeredSlides={false}
        loop={false}
        speed={600}
        className="container overflow-visible cursor-grab active:cursor-grabbing select-none"
      >
        {happyCustomers.map((customer, i) => (
          <SwiperSlide key={i} className="overflow-visible px-4 md:px-0">
            <div className="bg-white rounded-3xl px-8 py-7 shadow-sm h-60 flex flex-col border border-[#0000001A]">
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
                <p className="text-[#00000099] text-[14px] md:text-[22px]">{customer.comment}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
