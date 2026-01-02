import { Link } from "react-router-dom";
import hero from "../../assets/hero.png";
import star from "../../assets/star.png";

export default function Hero() {
  return (
    <div className="w-full bg-[#F2F0F1] flex justify-center">
      <div className="container lg:flex justify-between text-[#000000]">
        <div className="hero-info content-center">
          <h1 className="uppercase integral-font font-bold text-[38px] md:text-[48px] lg:text-[64px] leading-11 md:leading-12 lg:leading-16 mt-10 lg:mt-0">
            <span className="block">find clothes</span>
            <span className="block">that matches</span>
            <span className="block">your style</span>
          </h1>
          <p className="mt-5 mb-6 lg:mb-8 lg:mt-8 text-[#00000099] max-w-full ">
            Browse through our diverse range of meticulously crafted garments, designed
            <br className="hidden md:block" />
            to bring out your individuality and cater to your sense of style.
          </p>
          <Link to='/shop' className="block bg-[#000000] rounded-full py-[15px] px-16 text-[#FFFFFF] cursor-pointer hover:bg-[#1a1a1a] transition-colors duration-300 w-auto md:w-fit text-center">Shop Now</Link>

          <div className="lg franchises gap-8 mt-12 hidden md:flex">
            <div className="franchise">
              <span className="font-bold text-[40px] tracking-normal leading-[100%]">200+</span>
              <h5 className="text-[#00000099] leading-[22px] tracking-normal">International Brands</h5>
            </div>

            <div className="bg-[#0000001A] w-px"></div>

            <div className="franchise">
              <span className="font-bold text-[40px] tracking-normal leading-[100%]">2,000+</span>
              <h5 className="text-[#00000099] leading-[22px] tracking-normal">High-Quality Products</h5>
            </div>

            <div className="bg-[#0000001A] w-px"></div>

            <div className="franchise">
              <span className="font-bold text-[40px] tracking-normal leading-[100%]">20,000+</span>
              <h5 className="text-[#00000099] leading-[22px] tracking-normal">Happy Customers</h5>
            </div>
          </div>

          <div className="sm franchises mt-8 px-10 block md:hidden">
            <div className="top flex gap-8 justify-center">
              <div className="franchise">
                <span className="font-bold text-[32px] tracking-normal leading-[100%]">200+</span>
                <h5 className="text-[#00000099] leading-[22px] tracking-normal text-[12px]">International Brands</h5>
              </div>

              <div className="bg-[#0000001A] w-px"></div>

              <div className="franchise">
                <span className="font-bold text-[32px] tracking-normal leading-[100%]">2,000+</span>
                <h5 className="text-[#00000099] leading-[22px] tracking-normal text-[12px]">High-Quality Products</h5>
              </div>
            </div>

            <div className="bottom w-full flex justify-center">
              <div className="franchise mt-4">
                <span className="font-bold text-[32px] tracking-normal leading-[100%]">20,000+</span>
                <h5 className="text-[#00000099] leading-[22px] tracking-normal text-[12px]">Happy Customers</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="img-wrapper relative content-end">
          <img className="absolute left-0 w-14 h-14 top-1/2 -translate-y-1/2" src={star} alt="" />
          <img src={hero} alt="hero img" className="max-h-[650px]" />
          <img className="absolute right-0 w-[90px] h-[90px] top-18" src={star} alt="" />
        </div>
      </div>
    </div>
  );
}
