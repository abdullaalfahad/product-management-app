"use client";

import { ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";

interface UserMenuProps {
  onLogoutClick: () => void;
}

export function UserMenu({ onLogoutClick }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center cursor-pointer gap-2 px-3 py-2 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-full flex items-center justify-center ring-2 ring-indigo-100">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="hidden sm:block text-sm font-medium text-gray-700">
          Account
        </span>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 z-20 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                onLogoutClick();
              }}
              className="w-full cursor-pointer flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
