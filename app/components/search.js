'use client';
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import ProductData from "./fetchdata";

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const data = ProductData();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setIsOpen(true);

    if (query.trim() === "") {
      setSearchResult([]);
      return;
    }

    const results = data.filter(
      (item) =>
        (item.brand && item.brand.toLowerCase().includes(query.toLowerCase())) ||
        (item.model && item.model.toLowerCase().includes(query.toLowerCase()))
    );
    setSearchResult(results);
  };

  return (
    <div className="relative w-full max-w-md" ref={dropdownRef}>
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {isOpen && searchQuery && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 ease-in-out z-50">
          {searchResult.length > 0 ? (
            <div className="max-h-64 overflow-y-auto">
              <h4 className="px-4 py-2 text-sm font-semibold text-black-600 bg-gray-50">
                Similar Results
              </h4>
              <ul className="py-1">
                {searchResult.map((item) => (
                  <li key={item.id}>
                    <Link 
                      href={`/categories/${item.model}`}
                      className="block px-4 py-2 text-sm text-black font-bold hover:bg-blue-50 transition-colors duration-150"
                    >
                      <span className="font-medium">{item.brand}</span> - {item.model}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;