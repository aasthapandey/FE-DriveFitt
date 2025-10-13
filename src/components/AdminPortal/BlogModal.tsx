"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BlogModalProps, BlogFormData } from "@/types/adminPortal";

const BlogModal = ({ isOpen, onClose, onSave, blog, mode }: BlogModalProps) => {
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    description: "",
    slug: "",
    image: "",
    content: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);
  const [saveButtonText, setSaveButtonText] = useState("Save");
  const [date, setDate] = useState("");

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
        slug: blog.slug,
        image: blog.image,
        content: "",
      });
      setDate(blog.date);
    } else {
      setFormData({
        title: "",
        description: "",
        slug: "",
        image: "",
        content: "",
      });
      // Set current date
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      });
      setDate(currentDate);
    }
    setSaveButtonText("Save");
    setShowDropdown(false);
  }, [blog, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };

      // Auto-generate slug when title changes
      if (name === "title") {
        newData.slug = generateSlug(value);
      }

      return newData;
    });
  };

  const handleSave = () => {
    setSaveButtonText("Saved");
    // Add isPublished: 0 for save
    onSave({ ...formData, isPublished: 0 });
    setTimeout(() => {
      setSaveButtonText("Save");
      onClose();
    }, 1000);
  };

  const handlePublish = () => {
    // Add isPublished: 1 for publish
    onSave({ ...formData, isPublished: 1 });
    onClose();
  };

  const handleDelete = () => {
    if (blog && confirm("Are you sure you want to delete this blog?")) {
      // Handle delete logic here - you may need to pass a delete handler
      setShowDropdown(false);
      onClose();
    }
  };

  const handlePreview = () => {
    // Handle preview logic here
    console.log("Preview blog:", formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className="bg-[#1D1D1D] rounded-lg p-10 my-8 mx-auto max-h-full overflow-y-auto"
        style={{
          width: "720px",
          maxHeight: "calc(100vh - 64px)",
          gap: "33px",
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#282828] rounded-lg p-1 flex items-center justify-center hover:bg-[#333333] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Right Side Buttons */}
          <div className="flex gap-4">
            {/* 3 Dots Menu */}
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-8 h-8 bg-[#282828] rounded-lg p-1.5 flex items-center justify-center hover:bg-[#333333] transition-colors"
                style={{
                  width: "32px",
                  height: "32px",
                  gap: "10px",
                  borderRadius: "8px",
                  padding: "6px",
                  backgroundColor: "#282828",
                }}
              >
                <Image
                  src="/images/dots.png"
                  alt="Menu"
                  width={20}
                  height={20}
                />
              </button>
              {showDropdown && (
                <div className="absolute top-10 right-0 w-32 bg-[#1D1D1D] border border-[#333333] rounded-lg shadow-lg z-50">
                  <button
                    onClick={handleDelete}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#333333] rounded"
                  >
                    Delete Blog
                  </button>
                </div>
              )}
            </div>

            {/* Preview Button */}
            <button
              onClick={handlePreview}
              className="w-8 h-8 bg-[#282828] rounded-md flex items-center justify-center hover:bg-[#333333] transition-colors"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "6px",
                paddingTop: "10px",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingLeft: "12px",
              }}
            >
              <Image
                src="/images/play-preview.svg"
                alt="Preview"
                width={10}
                height={12}
              />
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-17 h-8 bg-[#282828] rounded px-4 py-2 flex items-center justify-center hover:bg-[#333333] transition-colors"
            >
              <span className="text-[#BFBFBF] text-xs font-medium leading-4">
                {saveButtonText}
              </span>
            </button>

            {/* Publish Button */}
            <button
              onClick={handlePublish}
              className="w-[74px] h-8 bg-[#00DBDC] rounded px-4 py-2 flex items-center justify-center hover:bg-[#00c5c6] transition-colors"
            >
              <span className="text-[#0D0D0D] text-xs font-medium leading-4">
                Publish
              </span>
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Title */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full h-10 bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border"
              placeholder="Enter blog title"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border resize-none"
              placeholder="Enter blog description"
              required
            />
          </div>

          {/* Slug */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Slug
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full h-10 bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border"
              placeholder="blog-slug"
              required
            />
          </div>

          {/* Date */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-10 bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border"
              placeholder="02/04/2025"
            />
          </div>

          {/* Image */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Image
            </label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#333333] rounded-lg flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <Image
                    src={formData.image}
                    alt="Blog image"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#8A8A8A] text-xs">No image</span>
                )}
              </div>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="flex-1 h-10 bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border"
                placeholder="Enter image URL"
              />
              <button
                type="button"
                className="text-[#00DBDC] text-sm hover:text-[#00c5c6] transition-colors"
              >
                Add image
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Content
            </label>
            {/* WYSIWYG Editor */}
            <div className="w-full bg-[#282828] rounded-lg p-4">
              <div className="flex items-center gap-2 mb-4 border-b border-[#333333] pb-2">
                <select className="bg-[#333333] text-white text-sm rounded px-2 py-1">
                  <option>Paragraph</option>
                </select>
                <div className="flex gap-1">
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white font-bold"
                  >
                    B
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white italic"
                  >
                    I
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white"
                  >
                    ❝❞
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white"
                  >
                    {"<>"}
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    className="p-1 hover:bg-[#333333] rounded text-white"
                  >
                    1.
                  </button>
                </div>
              </div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className="w-full bg-transparent text-white placeholder-[#8A8A8A] resize-none focus:outline-none"
                placeholder="Start writing your blog content..."
              />
            </div>
          </div>

          {/* Save Blog Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSave}
              className="w-[98px] h-9 bg-[#00DBDC] rounded px-4 py-2 flex items-center justify-center hover:bg-[#00c5c6] transition-colors"
            >
              <span className="text-[#0D0D0D] text-sm font-medium leading-5">
                Save blog
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
