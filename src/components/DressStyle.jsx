import { div } from "framer-motion/client";
import img1 from "../assets/dressStyles/img-1.png";
import img2 from "../assets/dressStyles/img-2.png";
import img3 from "../assets/dressStyles/img-3.png";
import img4 from "../assets/dressStyles/img-4.png";
import Style from "./Style";
import useIsMobile from "../modules/core/components/useIsMobile";
export default function DressStyle() {
  const isMobile = useIsMobile();

  const styles = [
    { styleName: "Casual", styleImg: img1 },
    { styleName: "Formal", styleImg: img2 },
    { styleName: "Party", styleImg: img3 },
    { styleName: "Gym", styleImg: img4 },
  ];
  return (
    <div className="w-full flex justify-center mt-20">
      <div className="container bg-[#F0F0F0] rounded-[40px] pt-[70px] pb-[76px] px-6 md:px-16!">
        <h3 className="uppercase font-bold text-[32px] md:text-5xl leading-9 md:leading-[100%] tracking-normal text-[#000000] integral-font text-center">BROWSE BY dress STYLE</h3>
        <div className="styles mt-7 md:mt-16 grid gap-5">
          {isMobile ? (
            <div className="flex flex-col gap-4">
              {styles.map((style, i) => (
                <Style key={i} style={style} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-[3fr_7fr] gap-5">
                {styles.slice(0, 2).map((style, i) => (
                  <Style key={i} style={style} />
                ))}
              </div>
              <div className="grid grid-cols-[7fr_3fr] gap-5">
                {styles.slice(2, 4).map((style, i) => (
                  <Style key={i} style={style} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
