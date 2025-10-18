"use client";

import { Bell, Package, Search } from "lucide-react";
import { useState } from "react";
import { handleLogout } from "@/utils/helpers";
import { LogoutDialog } from "./logout-dialog";
import { UserMenu } from "./user-menu";

export function Navbar() {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [notificationCount] = useState(3);

  const handleLogoutConfirm = () => {
    handleLogout();
    setShowLogoutDialog(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
                  <Package className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                  ProductHub
                </h1>
                <p className="text-xs text-gray-500 -mt-0.5">
                  Inventory Management
                </p>
              </div>
            </div>

            <UserMenu onLogoutClick={() => setShowLogoutDialog(true)} />
          </div>
        </div>
      </header>

      {/* Logout Dialog */}
      <LogoutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogoutConfirm}
      />
    </>
  );
}
