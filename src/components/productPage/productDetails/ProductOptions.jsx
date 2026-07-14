import { MdCheck } from "react-icons/md";
import Line from "../../ui/Line";

export default function ProductOptions({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
}) {
  return (
    <>
      <Line />

      {/* Colors */}
      <div className="colors flex flex-col gap-4">
        <span className="text-[#00000099]">Select Color</span>

        <div className="flex gap-4 flex-wrap">
          {product.colors.map((color) => (
            <div
              key={color.id}
              onClick={() => setSelectedColor(color.name)}
              className="w-[37px] h-[37px] rounded-full cursor-pointer relative"
              style={{ backgroundColor: color.hex }}
            >
              {selectedColor === color.name && (
                <MdCheck
                  size={22}
                  className="absolute inset-0 m-auto text-white"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <Line />

      {/* Sizes */}
      <div className="sizing flex flex-col gap-4">
        <span className="text-[#00000099]">Select Size</span>

        <div className="sizes flex flex-wrap gap-3">
          {product.sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size.name)}
              className={`py-3 px-6 rounded-full transition
                ${
                  selectedSize === size.name
                    ? "bg-black text-white"
                    : "bg-[#F0F0F0] text-[#00000099]"
                }
              `}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <Line />
    </>
  );
}
