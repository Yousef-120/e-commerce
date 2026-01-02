import FooterColumn from "./FooterColumn";
import FooterMainColumn from "./FooterMainColumn";
import { links } from "../../modules/core/index";
import useDeviceType from "../../modules/core/components/useDeviceType"

export default function FooterTop() {
  const device = useDeviceType()
  return (
    <>
      {device != "desktop" && <FooterMainColumn />}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-8 justify-between lg:justify-start lg:gap-[114px] pb-[50px] items-center border-b border-[#0000001A] mt-[26px] md:mt-9 lg:mt-0">
        {device == "desktop" && <FooterMainColumn />}
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
