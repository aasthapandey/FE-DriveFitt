"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { BlogsTableProps, BlogEntry } from "@/types/adminPortal";

const BlogsTable = ({ blogs, onEdit, onDelete }: BlogsTableProps) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (blogId: string) => {
    setActiveDropdown(activeDropdown === blogId ? null : blogId);
  };

  const handleEdit = (blog: BlogEntry) => {
    setActiveDropdown(null);
    onEdit(blog);
  };

  const handleDelete = (blogId: string) => {
    setActiveDropdown(null);
    onDelete(blogId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest?.("[data-menu-root]")) setActiveDropdown(null);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="h-full px-10">
      <div className="bg-[#1D1D1D] rounded-2xl overflow-hidden border border-[#333333] h-full flex flex-col">
        {/* Table Header */}
        <div className="bg-[#333333] border border-[#333333] rounded-t-2xl px-10 py-4 flex items-center gap-6">
          <div className="flex-1 min-w-0">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Title
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Description
            </span>
          </div>
          <div className="w-32">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Slug
            </span>
          </div>
          <div className="w-24">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Date
            </span>
          </div>
          <div className="w-20">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Image
            </span>
          </div>
          <div className="w-24">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Created
            </span>
          </div>
          <div className="w-24">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Edited
            </span>
          </div>
          <div className="w-12">
            <span className="font-medium text-xs leading-4 tracking-[0%] text-[#8A8A8A]">
              Actions
            </span>
          </div>
        </div>

        {/* Table Body - Scrollable */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#333333]">
          {blogs.map((blog, index) => (
            <div
              key={blog.id}
              className={`px-10 py-2 flex items-center gap-6 hover:bg-[#262626] transition-colors duration-200 ${
                index === blogs.length - 1 ? "rounded-b-2xl" : ""
              }`}
            >
              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white truncate">
                  {blog.title}
                </p>
              </div>

              {/* Description */}
              <div className="flex-1 min-w-0">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white truncate">
                  {blog.description}
                </p>
              </div>

              {/* Slug */}
              <div className="w-32">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white truncate">
                  {blog.slug}
                </p>
              </div>

              {/* Date */}
              <div className="w-24">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white">
                  {blog.date}
                </p>
              </div>

              {/* Image */}
              <div className="w-20">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#333333]">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Created */}
              <div className="w-24">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white">
                  {blog.created}
                </p>
              </div>

              {/* Edited */}
              <div className="w-24">
                <p className="font-light text-sm leading-5 tracking-[0%] text-white">
                  {blog.edited}
                </p>
              </div>

              {/* Actions */}
              <div className="w-12 flex justify-center">
                <div className="relative" data-menu-root>
                  <button
                    type="button"
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleDropdown(blog.id);
                    }}
                    className="w-8 h-8 flex items-center justify-center hover:bg-[#333333] rounded"
                  >
                    <Image
                      src="/images/careers/dots-vertical.svg"
                      alt="Actions"
                      width={16}
                      height={16}
                    />
                  </button>
                  {activeDropdown === blog.id && (
                    <div
                      className="absolute right-0 bg-[#1D1D1D] border border-[#333333] rounded shadow-lg z-50"
                      data-menu-root
                      style={{
                        // Position above for last 2 items, below for others
                        ...(index >= blogs.length - 2
                          ? { bottom: "100%", marginBottom: "4px" }
                          : { top: "100%", marginTop: "4px" }),
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          // handleMarkAsFeatured(blog.id);
                          setActiveDropdown(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-white hover:bg-[#333333]"
                      >
                        Mark as featured
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleEdit(blog);
                          setActiveDropdown(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-white hover:bg-[#333333]"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDelete(blog.id);
                          setActiveDropdown(null);
                        }}
                        className="block w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-[#333333]"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="px-10 py-12 text-center">
              <p className="text-[#8A8A8A] text-sm">No blogs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsTable;
