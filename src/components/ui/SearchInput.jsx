import { useRef } from "react";

export default function SearchInput({
  search,
  setSearch,
  setShowDropdown,
  className = "",
  placeholder = "Search for products...",
}) {
  return (
    <input
      type="search"
      value={search}
      placeholder={placeholder}
      onFocus={() => {
        if (search.trim() !== "") {
          setShowDropdown(true);
        }
      }}
      onChange={(e) => {
        setSearch(e.target.value);
        setShowDropdown(true);
      }}
      className={`w-full outline-0 py-3 px-4 rounded-full bg-[#F0F0F0] hidden md:block ${className}`}
    />
  );
}