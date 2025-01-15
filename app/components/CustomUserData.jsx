// components/Header.js
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, LogOut, ChevronDown } from 'lucide-react';

export default function CustomUserData() {
  const [userEmail, setUserEmail] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      setUserEmail(email);
    }

    // Click outside to close dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    setUserEmail('');
    setIsDropdownOpen(false);
    router.push('/signin');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Get user initials for avatar
  const getInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
          </div>

          <div className="flex items-center">
            {userEmail ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {getInitials(userEmail)}
                      </span>
                    </div>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-600 transform transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {userEmail}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-2" />
                        Your Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} className="mr-2" />
                        Sign out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/Signin"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}