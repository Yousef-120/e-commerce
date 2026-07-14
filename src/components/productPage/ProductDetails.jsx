import ProductGallery from "./productDetails/ProductGallery";
import ProductInfo from "./productDetails/ProductInfo";
import ProductOptions from "./productDetails/ProductOptions";
import ProductOrder from "./productDetails/ProductOrder";
import ProductDetailsSkeleton from "./productDetails/ProductDetailsSkeleton";
import useProductDetails from "./productDetails/hooks/useProductDetails";

export default function ProductDetails({ product, loading }) {
  const isLoading = loading || !product;
  const {
    selectedColor,
    setSelectedColor,

    selectedSize,
    setSelectedSize,

    selectedQty,
    setSelectedQty,

    btnLoading,

    hasDiscount,
    finalPrice,
    inCart,

    handleAddToCart,
  } = useProductDetails(product);

  return (
    <div className="w-full flex justify-center mb-[118px]">
      <div className="container flex flex-col lg:flex-row gap-10 lg:items-stretch">
        {isLoading ? (
          <ProductDetailsSkeleton />
        ) : (
          <>
            <ProductGallery product={product} />

            <div className="w-full lg:w-1/2 flex lg:block flex-col justify-between">
              <ProductInfo
                product={product}
                finalPrice={finalPrice}
                hasDiscount={hasDiscount}
              />

              {/* Actions */}
              <div className="actions">
                <ProductOptions
                  product={product}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                />
                {/* Order */}
                <ProductOrder
                  product={product}
                  selectedQty={selectedQty}
                  setSelectedQty={setSelectedQty}
                  btnLoading={btnLoading}
                  inCart={inCart}
                  handleAddToCart={handleAddToCart}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
