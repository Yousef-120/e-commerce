export default function Breadcrumbs() {
  return (
    <div className="breadcrumb text-sm text-gray-500 mb-9 flex justify-center">
      <div className="container">
        <span className="hover:text-black cursor-pointer transition">Home</span>
        <span className="mx-2">{">"}</span>
        <span className="hover:text-black cursor-pointer transition">Shop</span>
        <span className="mx-2">{">"}</span>
        <span className="hover:text-black cursor-pointer transition">Men</span>
        <span className="mx-2">{">"}</span>
        <span className="text-black font-medium">T-Shirts</span>
      </div>
    </div>
  );
}
