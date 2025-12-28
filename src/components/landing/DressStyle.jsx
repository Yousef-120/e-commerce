import { styles } from "../../modules/core/constants/constants";
import Style from "./Style";
import useDeviceType from "../../modules/core/components/useDeviceType";

export default function DressStyle() {
  const device = useDeviceType();

  return (
    <div className="w-full flex justify-center mt-20">
      <div className="container">
        <div className="content bg-[#F0F0F0] rounded-[40px] pt-[70px] pb-[76px] px-6 lg:px-16!">
          <h3 className="uppercase font-bold text-[32px] md:text-[40px] lg:text-5xl leading-9 lg:leading-[100%] tracking-normal text-[#000000] integral-font text-center">BROWSE BY dress STYLE</h3>
          <div className="styles mt-7 md:mt-16 grid gap-5">
            {device != "desktop" ? (
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
    </div>
  );
}
