'use client';
import { useState } from 'react';
import Link from "next/link";
import { Menu, X, ShoppingCart, Home, Smartphone, Headphones, Laptop } from 'lucide-react';
import CustomUserData from "@/app/components/CustomUserData";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/categories/Mobile", icon: Smartphone, label: "Mobile" },
    { href: "/categories/Neckbands", icon: Headphones, label: "Neckbands" },
    { href: "/categories/Laptop", icon: Laptop, label: "Laptop" },
  ];

  return (
    <div className="md:hidden relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full mt-2 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="py-4 space-y-4">
          {navLinks.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
            >
              <Icon size={18} />
              <span>{label}</span>
              
            </Link>
          ))}
          
          <div className="border-t pt-4 px-4 flex items-center justify-between">
            <Link 
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
            </Link>
          </div>
        </div>
        <CustomUserData />
      </div>
    </div>
  );
};

export default MobileNav;
