import { paymentMethods } from "../../modules/core/index";

export default function FooterBottom() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between items-center mt-[25px] gap-4 md:gap-0">
      <p className="text-sm text-[#00000099] text-[14px] leading-[100%]">Shop.co © 2000-2023, All Rights Reserved</p>
      <div className="payment-methods flex flex-wrap gap-1 md:gap-3">
        {paymentMethods.map((payment, i) => (
          <img className="w-16" key={i} src={payment.img} alt={payment.name} />
        ))}
      </div>
    </div>
  );
}
