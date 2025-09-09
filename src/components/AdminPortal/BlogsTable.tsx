"use client";

import { useState } from "react";
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

  return (
    <div className="h-full p-10">
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
              className={`px-10 py-6 flex items-center gap-6 hover:bg-[#262626] transition-colors duration-200 ${
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
              <div className="w-12 relative">
                <button
                  onClick={() => toggleDropdown(blog.id)}
                  className="p-1 hover:bg-[#333333] rounded transition-colors duration-200"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="2" r="1.5" fill="white" />
                    <circle cx="8" cy="8" r="1.5" fill="white" />
                    <circle cx="8" cy="14" r="1.5" fill="white" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === blog.id && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-[#1D1D1D] border border-[#333333] rounded-lg shadow-lg z-50">
                    <div className="p-1">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#333333] rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#333333] rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
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
