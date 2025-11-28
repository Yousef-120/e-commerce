import { MdOutlineMail } from "react-icons/md";

export default function NewsletterBanner() {
  return (
    <div className="absolute top-0 -translate-y-1/2 w-[calc(100%-32px)] md:w-full left-1/2 -translate-x-1/2  md:left-1/2 px-6 py-8 md:py-9 md:px-16 rounded-[20px] flex flex-col gap-8 md:grid grid-cols-[7fr_3fr] items-center bg-[#000000] text-[#FFFFFF] z-50">
      <h4 className="uppercase font-bold text-[32px] md:text-[40px] leading-[35px] md:leading-[45px] integral-font">
        <span className="inline md:block">STAY UPTO DATE ABOUT </span>OUR LATEST OFFERS
      </h4>
      <form action="" className="flex flex-col gap-3.5 w-full md:w-auto">
        <div className="input-div relative h-full">
          <MdOutlineMail className="absolute top-1/2 -translate-y-1/2 text-[#00000066] w-6 h-6 left-4" />
          <input
            placeholder="Enter your email address"
            className="w-full bg-[#FFFFFF] rounded-full py-4 px-12 text-[#000000] placeholder-[#00000066] outline-hidden transition-transform duration-300 focus:scale-[1.02] h-[54px]"
            type="email"
            name=""
            id=""
          />
        </div>
        <button type="submit" className="text-[#000000] font-medium leading-[100%] bg-[#FFFFFF] rounded-full py-4 px-4 w-full h-[54px] outline-hidden transition-transform duration-300 hover:scale-[1.02] cursor-pointer">
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  );
}
