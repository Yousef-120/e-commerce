import { brands } from "../modules/core";

export default function Brands() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="container flex flex-col items-center">
        <h1 className="integral-font text-center font-bold text-[32px] md:text-5xl leading-[100%] tracking-normal">Our Brands</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 w-full max-w-5xl text-center mt-12">
          {brands.map((brand, index) => (
            <div key={index} className="p-6 bg-gray-100 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer">
              <p className="text-black font-bold text-2xl">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
