import { Link } from "react-router-dom";
import { socialLinks } from "../../modules/core/index";

export default function FooterMainColumn() {
  return (
    <div className="main-column">
      <h1 className="integral-font text-[28px] md:text-[34px] font-bold leading-[100%] tracking-normal mb-[25px]">
        <Link to="/">Shop.co</Link>
      </h1>
      <p className="text-[14px] text-[#00000099] leading-[22px]">We have clothes that suits your style and which you’re proud to wear. From women to men.</p>
      <div className="social-links flex gap-3 mt-5">
        {socialLinks.map((link, i) => {
          const Icon = link.ico;
          return (
            <Link
              key={i}
              to={link.url}
              className="w-8 h-8 rounded-full bg-[#FFFFFF] text-[#000000] border border-[#00000033] flex justify-center items-center p-1 hover:bg-[#000000] transition-colors duration-300 hover:text-[#FFFFFF]"
            >
              {<Icon size={16} />}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
