import React from 'react'

export default function SearchInput({
    search,
    setSearch,
    className = "",
    placeholder = "Search for products...",
  }) {
    return (
      <input
        type="search"
        value={search}
        placeholder={placeholder}
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full outline-0 py-3 px-4 rounded-full bg-[#F0F0F0] hidden md:block ${className}`}
      />
    );
  }