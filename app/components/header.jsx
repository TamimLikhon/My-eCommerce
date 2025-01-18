import Link from "next/link";
import SearchComponent from "./search";
import CustomUserData from "@/app/components/CustomUserData";
import UserAvatar from "./UserAvatar";
import { ShoppingCart, Home, Smartphone, Headphones } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Thrilling Tech
            </span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-xl font-medium"
            >
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link 
              href="/categories/Mobile" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-xl font-medium"
            >
              <Smartphone size={18} />
              <span>Mobile</span>
            </Link>
            <Link 
              href="/categories/Neckbands" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-xl font-medium"
            >
              <Headphones size={18} />
              <span>Neckbands</span>
            </Link>
            <Link 
              href="/categories/Laptop" 
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-xl font-medium"
            >
              <Headphones size={18} />
              <span>Laptop</span>
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:block">
              <SearchComponent />
            </div>

            {/* Cart */}
            <Link href="/cart">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
      
                </span>
              </button>
            </Link>

            {/* User Section */}
            <div className="flex items-center space-x-3">
              <div className="hidden sm:block">
                <CustomUserData />
              </div>
              <div className="border-l pl-3">
                <UserAvatar />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search - Shown only on mobile */}
        <div className="sm:hidden py-2">
          <SearchComponent />
        </div>
      </nav>
    </header>
  );
}