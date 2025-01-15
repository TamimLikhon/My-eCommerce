import Link from "next/link";
import SearchComponent from "./search";
import CustomUserData from "@/app/components/CustomUserData"
import UserAvatar from "./UserAvatar";

export default function Header() {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-black">Thrilling Tech</h1>

        <div className="flex space-x-4 text-xl">
          <Link href="/" className="text-black hover:text-gray-800 font-bold">
            Home
          </Link>
          <Link
            href="/categories/Mobile"
            className="text-black hover:text-gray-800 font-bold"
          >
            Mobile
          </Link>
          <Link
            href="/categories/Neckbands"
            className="text-black hover:text-gray-800 font-bold"
          >
            Neckbands
          </Link>
          <Link
            href="/categories/bluettooth-airbuds"
            className="text-black hover:text-gray-800 font-bold"
          >
            Airbuds
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-xl">
            <SearchComponent />
          </span>

          <span className="relative">
          <UserAvatar />
          </span>

          <span className="relative">
          <CustomUserData />
          </span>
        </div>
      </div>
    </div>
  );
}