import { motion } from "framer-motion";
import useDeviceType from "../../modules/core/components/useDeviceType";
import { brands } from "../../modules/core/constants/constants";

export default function Brands() {
  const device = useDeviceType();

  return (
    <div className="w-full bg-black overflow-hidden py-11 block md:flex justify-center">
      {device != "desktop" ? (
        <motion.div
          className="flex gap-[34px] w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 25, 
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {brands.map((brand, i) => (
            <img key={`first-${i}`} src={brand.img} alt={brand.name} className="" />
          ))}

          {brands.map((brand, i) => (
            <img key={`second-${i}`} src={brand.img} alt={brand.name} className="" />
          ))}
        </motion.div>
      ) : (
        <div className="container hidden md:flex justify-between items-center">
          {brands.map((brand, i) => (
            <img key={`first-${i}`} src={brand.img} alt={brand.name} />
          ))}
        </div>
      )}
    </div>
  );
}
