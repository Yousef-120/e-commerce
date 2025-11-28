import { FiMinus, FiPlus } from "react-icons/fi";
import { useStore } from "../../modules/shop/store/useStore";
import { useEffect } from "react";

export default function QtySelector({ className , iconSize}) {
  const { selectedQty, setSelectedQty } = useStore();
  useEffect(() => {
    setSelectedQty(1);
  }, []);
  const handleDecrease = () => {
    selectedQty !== 1 && setSelectedQty(selectedQty - 1);
  };
  const handleIncrease = () => {
    selectedQty !== 10 && setSelectedQty(selectedQty + 1);
  };

  return (
    <div className={`qty-selector py-2.5 px-4 flex items-center sm:gap-[38px] bg-[#F0F0F0] rounded-full w-full sm:w-fit ${className}`}>
      {/* Minus Button */}
      <button onClick={handleDecrease} className="p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors">
        <FiMinus size={iconSize || 26} />
      </button>

      {/* Quantity Display */}
      <div className="w-5 flex justify-center items-center">
        <span className="font-bold text-[14px">{selectedQty}</span>
      </div>

      {/* Plus Button */}
      <button onClick={handleIncrease} className="p-1.5 rounded-full hover:bg-[#e0e0e0] transition-colors">
        <FiPlus size={iconSize || 26} />
      </button>
    </div>
  );
}
