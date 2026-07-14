import QtySelector from "../../common/QtySelector";
import SmallLoader from "../../ui/SmallLoader";

export default function ProductOrder({
  product,
  selectedQty,
  setSelectedQty,
  btnLoading,
  inCart,
  handleAddToCart,
}) {
  return (
    <div className="order flex flex-col sm:flex-row gap-5">
      <QtySelector
        selectedQty={selectedQty}
        setSelectedQty={setSelectedQty}
        product={product}
      />

      <button
        onClick={handleAddToCart}
        disabled={btnLoading || inCart}
        className={`w-full py-4 px-12 rounded-full font-medium transition
          ${btnLoading && "flex justify-center items-center"}
          ${
            inCart
              ? "bg-[#2d2d2d] text-[#aaaaaa] cursor-not-allowed"
              : "bg-black text-white hover:bg-[#1f1f1f]"
          }
        `}
      >
        {btnLoading ? (
          <SmallLoader className="w-6! h-6!" />
        ) : inCart ? (
          "Added To Cart"
        ) : (
          "Add To Cart"
        )}
      </button>
    </div>
  );
}