import { motion } from "framer-motion";
import versace from "../../assets/sponsers/versace.png";
import zara from "../../assets/sponsers/zara.png";
import gucci from "../../assets/sponsers/gucci.png";
import prada from "../../assets/sponsers/prada.png";
import calvinKlein from "../../assets/sponsers/calvinKlein.png";
import useIsMobile from "../../modules/core/components/useIsMobile";

export default function Sponsors() {
  const sponsorsImages = [versace, zara, gucci, prada, calvinKlein];
  const isMobile = useIsMobile();

  return (
    <div className="w-full bg-black overflow-hidden py-11 block md:flex justify-center">
      {isMobile ? (
        <motion.div
          className="flex gap-[34px] w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25, // كل ما تزود الرقم تقل السرعة
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {sponsorsImages.map((img, i) => (
            <img key={`first-${i}`} src={img} alt="Sponsor" className="" />
          ))}

          {sponsorsImages.map((img, i) => (
            <img key={`second-${i}`} src={img} alt="Sponsor" className="" />
          ))}
        </motion.div>
      ) : (
        <div className="container hidden md:flex justify-between items-center">
          {sponsorsImages.map((img, i) => (
            <img key={`first-${i}`} src={img} alt="Sponsor" />
          ))}
        </div>
      )}
    </div>
  );
}
