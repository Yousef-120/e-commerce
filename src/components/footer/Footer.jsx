import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";
import NewsletterBanner from "./NewsletterBanner";

export default function Footer() {
  return (
    <div className="w-full flex justify-center bg-[#F0F0F0] mt-[200px]">
      <div className="container pt-[196px] lg:pt-[164px] pb-20 relative">
        <NewsletterBanner />
        <div className="footer-content">
          <FooterTop />
        </div>
        <div className="footer-bottom">
          <FooterBottom />
        </div>
      </div>
    </div>
  );
}
