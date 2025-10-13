"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { AdminHeaderProps } from "@/types/adminPortal";

const AdminHeader = ({
  title,
  user,
  onSearch,
  onAdd,
  showSearchButton = false,
  showAddButton = false,
}: AdminHeaderProps) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearchClick = () => {
    setShowSearchInput(!showSearchInput);
    if (showSearchInput && searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch?.(searchQuery);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Close search input when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSearchInput(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowSearchInput(false);
      }
    };

    if (showSearchInput) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showSearchInput]);

  return (
    <div className="h-fit bg-[#0D0D0D] mb-6 mt-10 px-10 flex items-start justify-between">
      {/* Title */}
      <h1 className="font-normal text-[28px] leading-8 tracking-[0%] text-white">
        {title}
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        {showSearchButton && (
          <div className="relative" ref={searchRef}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              placeholder="Search blog titles..."
              className="bg-[#0D0D0D] border border-[#333333] rounded-lg pl-10 pr-4 py-2 text-white placeholder-[#8A8A8A] focus:outline-none focus:border-[#00DBDC] transition-colors duration-200"
              style={{ width: "240px", height: "40px" }}
            />
            <Image
              src="/images/careers/career-search.svg"
              alt="Search"
              width={16}
              height={16}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#8A8A8A]"
            />
          </div>
        )}

        {/* Add Button */}
        {showAddButton && (
          <button
            type="button"
            onClick={onAdd || (() => {})}
            className="w-9 h-9 bg-[#1D1D1D] border border-[#333333] rounded-lg p-2 flex items-center justify-center hover:bg-[#333333] transition-colors duration-200"
          >
            <Image
              src="/images/careers/plus.svg"
              alt="Search"
              width={20}
              height={20}
            />
          </button>
        )}

        {/* User Profile */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
            className="flex items-center gap-2 hover:bg-[#1D1D1D] p-2 rounded-lg transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-[#00DBDC] rounded-full flex items-center justify-center">
              <span className="text-[#0D0D0D] font-medium text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-white font-medium text-sm">{user.name}</span>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              className={`transform transition-transform duration-200 ${
                showUserDropdown ? "rotate-180" : ""
              }`}
            >
              <path
                d="M1 1L6 6L11 1"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* User Dropdown */}
          {showUserDropdown && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#1D1D1D] border border-[#333333] rounded-lg shadow-lg z-50">
              <div className="p-3 border-b border-[#333333]">
                <p className="text-white font-medium text-sm">{user.name}</p>
                <p className="text-[#8A8A8A] text-xs">{user.email}</p>
              </div>
              <div className="p-1">
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333] rounded">
                  Profile Settings
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333] rounded">
                  Account Settings
                </button>
                <hr className="border-[#333333] my-1" />
                <button className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#333333] rounded">
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
