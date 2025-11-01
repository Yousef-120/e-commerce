import FooterColumn from "./FooterColumn";
import FooterMainColumn from "./FooterMainColumn";
import { links } from "../modules/core/index";
import useIsMobile from "../modules/core/components/useIsMobile";

export default function FooterTop() {
  const isMobile = useIsMobile()
  return (
    <>
      {isMobile && <FooterMainColumn />}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 justify-between md:justify-start md:gap-[114px] pb-[50px] items-center border-b border-[#0000001A] mt-[26px] md:mt-0">
        {!isMobile && <FooterMainColumn />}
        {links.map((section, i) => {
          const sectionName = section.sectionName;
          const key = Object.keys(section)[1];
          const linksInfo = section[key];
          return <FooterColumn key={i} sectionName={sectionName} links={linksInfo} />;
        })}
      </div>
    </>
  );
}
