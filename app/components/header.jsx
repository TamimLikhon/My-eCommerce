import Link from "next/link";
import SearchComponent from "./search";
import CustomUserData from "@/app/components/CustomUserData";
import UserAvatar from "./UserAvatar";
import { ShoppingCart, Home, Smartphone, Headphones, Laptop } from 'lucide-react';
import MobileNav from "@/app/components/ui/mobilenav"

export default function Header() {
  const navLinks = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/categories/Mobile", icon: Smartphone, label: "Mobile" },
    { href: "/categories/Neckbands", icon: Headphones, label: "Neckbands" },
    { href: "/categories/Laptop", icon: Laptop, label: "Laptop" },
  ];

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

          {/* Mobile Menu */}


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ href, icon: Icon, label }) => (
              <Link 
                key={href}
                href={href} 
                className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors text-xl font-medium"
              >
                <Icon size={18} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="hidden sm:block">
              <SearchComponent />
            </div>

            <Link href="/cart">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                </span>
              </button>
            </Link>

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

        {/* Mobile Search */}
        <div className="sm:hidden py-2 flex">
          <MobileNav />
          <SearchComponent />
          
        </div>
        
      </nav>
    </header>
  );
}