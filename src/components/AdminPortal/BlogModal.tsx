"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BlogModalProps,
  BlogFormData,
  BlogCategory,
} from "@/types/adminPortal";
import { blogCategoryAPI } from "@/services/blogCategoryAPI";
import { uploadAPI } from "@/services/uploadAPI";

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
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [categoryMode, setCategoryMode] = useState<
    "none" | "select" | "create"
  >("none");
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >(undefined);
  const [newCategoryHeading, setNewCategoryHeading] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [selectedTag, setSelectedTag] = useState("p");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  useEffect(() => {
    // load categories when modal opens
    if (isOpen) {
      blogCategoryAPI
        .list()
        .then((list) => setCategories(list))
        .catch(() => setCategories([]));
    }

    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
        slug: blog.slug,
        image: blog.image,
        content: "",
      });
      setDate(blog.date);
      setSelectedCategoryId(
        blog.categoryId && blog.categoryId > 0 ? blog.categoryId : undefined
      );
      setCategoryMode(
        blog.categoryId && blog.categoryId > 0 ? "select" : "none"
      );
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
      setSelectedCategoryId(undefined);
      setCategoryMode("none");
      setNewCategoryHeading("");
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
    // compute categoryId based on mode
    const categoryId =
      categoryMode === "select" ? selectedCategoryId : undefined;
    onSave({ ...formData, isPublished: 0, categoryId });
    setTimeout(() => {
      setSaveButtonText("Save");
      onClose();
    }, 1000);
  };

  const handlePublish = () => {
    const categoryId =
      categoryMode === "select" ? selectedCategoryId : undefined;
    onSave({ ...formData, isPublished: 1, categoryId });
    onClose();
  };

  const handleCreateCategory = async () => {
    if (!newCategoryHeading.trim()) return;
    try {
      const created = await blogCategoryAPI.create({
        heading: newCategoryHeading.trim(),
      });
      setCategories((prev) => [created, ...prev]);
      setSelectedCategoryId(created.id);
      setCategoryMode("select");
      setNewCategoryHeading("");
    } catch (_e) {
      // noop UI
    }
  };

  // Rich text editor functions
  const insertTextAtCursor = (beforeText: string, afterText: string = "") => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const content = formData.content || "";
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = beforeText + selectedText + afterText;

    const newContent =
      content.substring(0, start) + newText + content.substring(end);

    setFormData((prev) => ({ ...prev, content: newContent }));

    // Set cursor position after the inserted text
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + beforeText.length,
        start + beforeText.length + selectedText.length
      );
    }, 0);
  };

  const wrapWithTag = (tag: string) => {
    insertTextAtCursor(`<${tag}>`, `</${tag}>`);
  };

  const handleBold = () => insertTextAtCursor("**", "**");
  const handleItalic = () => insertTextAtCursor("*", "*");
  const handleQuote = () => insertTextAtCursor("> ", "");
  const handleBulletList = () => insertTextAtCursor("- ", "");
  const handleNumberedList = () => insertTextAtCursor("1. ", "");

  const handleUrlEmbed = () => {
    const url = prompt("Enter URL:");
    if (url) {
      const linkText = prompt("Enter link text (optional):") || url;
      insertTextAtCursor(`[${linkText}](${url})`, "");
    }
  };

  const applyHtmlTag = () => {
    if (selectedTag === "p") return;
    wrapWithTag(selectedTag);
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
              <div className="relative">
                <input
                  id="blog-image-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const inputEl = e.currentTarget as HTMLInputElement;
                    if (!inputEl.files || !inputEl.files[0]) return;
                    const file = inputEl.files[0];
                    try {
                      setUploadingImage(true);
                      const presign = await uploadAPI.getPresignURL(
                        "blog-image",
                        file.name,
                        file.type || "application/octet-stream"
                      );
                      await uploadAPI.putFileToS3(presign.uploadUrl, file);
                      setFormData((prev) => ({
                        ...prev,
                        image: presign.cdnUrl,
                      }));
                    } finally {
                      setUploadingImage(false);
                      inputEl.value = "";
                    }
                  }}
                />
                <label
                  htmlFor="blog-image-input"
                  className="text-[#00DBDC] text-sm cursor-pointer"
                >
                  {uploadingImage ? "Uploading..." : "Add image"}
                </label>
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-4">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Category (optional)
            </label>
            <div className="flex flex-col gap-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryMode("none")}
                  className={`px-3 py-1 rounded text-xs ${
                    categoryMode === "none"
                      ? "bg-[#00DBDC] text-[#0D0D0D]"
                      : "bg-[#282828] text-white"
                  }`}
                >
                  Unassigned
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryMode("select")}
                  className={`px-3 py-1 rounded text-xs ${
                    categoryMode === "select"
                      ? "bg-[#00DBDC] text-[#0D0D0D]"
                      : "bg-[#282828] text-white"
                  }`}
                >
                  Select existing
                </button>
                <button
                  type="button"
                  onClick={() => setCategoryMode("create")}
                  className={`px-3 py-1 rounded text-xs ${
                    categoryMode === "create"
                      ? "bg-[#00DBDC] text-[#0D0D0D]"
                      : "bg-[#282828] text-white"
                  }`}
                >
                  Create new
                </button>
              </div>

              {categoryMode === "select" && (
                <select
                  value={selectedCategoryId ?? ""}
                  onChange={(e) =>
                    setSelectedCategoryId(
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  className="w-full h-10 bg-[#282828] rounded-lg px-5 py-3 text-white text-sm focus:outline-none focus:border-[#00DBDC] focus:border"
                >
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.heading}
                    </option>
                  ))}
                </select>
              )}

              {categoryMode === "create" && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryHeading}
                    onChange={(e) => setNewCategoryHeading(e.target.value)}
                    className="flex-1 h-10 bg-[#282828] rounded-lg px-5 py-3 text-white placeholder-[#BFBFBF] text-sm leading-4 focus:outline-none focus:border-[#00DBDC] focus:border"
                    placeholder="Category heading"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    className="px-4 rounded bg-[#00DBDC] text-[#0D0D0D] text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-5">
            <label className="block text-xs font-normal leading-4 text-[#BFBFBF]">
              Content
            </label>
            {/* Rich Text Editor */}
            <div className="w-full bg-[#282828] rounded-lg overflow-hidden">
              {/* Editor Toolbar */}
              <div className="bg-[#1E1E1E] px-4 py-3 border-b border-[#333333]">
                <div className="flex items-center gap-4">
                  {/* HTML Tag Selector */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="bg-[#333333] text-white text-sm rounded-md px-3 py-1.5 border border-[#444444] focus:outline-none focus:border-[#00DBDC] min-w-[100px]"
                    >
                      <option value="p">Paragraph</option>
                      <option value="h1">Heading 1</option>
                      <option value="h2">Heading 2</option>
                      <option value="h3">Heading 3</option>
                      <option value="h4">Heading 4</option>
                      <option value="h5">Heading 5</option>
                      <option value="h6">Heading 6</option>
                      <option value="blockquote">Blockquote</option>
                      <option value="code">Code Block</option>
                    </select>
                    {selectedTag !== "p" && (
                      <button
                        type="button"
                        onClick={applyHtmlTag}
                        className="bg-[#00DBDC] text-[#0D0D0D] px-2 py-1 rounded text-xs font-medium hover:bg-[#00c5c6] transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>

                  {/* Divider */}
                  <div className="w-px h-6 bg-[#444444]"></div>

                  {/* Formatting Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleUrlEmbed}
                      className="p-2 hover:bg-[#333333] rounded-md text-white transition-colors flex items-center justify-center w-8 h-8"
                      title="Insert Link"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={handleBold}
                      className="p-2 hover:bg-[#333333] rounded-md text-white font-bold transition-colors flex items-center justify-center w-8 h-8"
                      title="Bold"
                    >
                      B
                    </button>

                    <button
                      type="button"
                      onClick={handleItalic}
                      className="p-2 hover:bg-[#333333] rounded-md text-white italic transition-colors flex items-center justify-center w-8 h-8"
                      title="Italic"
                    >
                      I
                    </button>

                    <button
                      type="button"
                      onClick={handleQuote}
                      className="p-2 hover:bg-[#333333] rounded-md text-white transition-colors flex items-center justify-center w-8 h-8"
                      title="Quote"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                        <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                      </svg>
                    </button>

                    {/* Divider */}
                    <div className="w-px h-6 bg-[#444444] mx-1"></div>

                    <button
                      type="button"
                      onClick={handleBulletList}
                      className="p-2 hover:bg-[#333333] rounded-md text-white transition-colors flex items-center justify-center w-8 h-8"
                      title="Bullet List"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      onClick={handleNumberedList}
                      className="p-2 hover:bg-[#333333] rounded-md text-white transition-colors flex items-center justify-center w-8 h-8"
                      title="Numbered List"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <line x1="10" y1="6" x2="21" y2="6" />
                        <line x1="10" y1="12" x2="21" y2="12" />
                        <line x1="10" y1="18" x2="21" y2="18" />
                        <path d="M4 6h1v4" />
                        <path d="M4 10h2" />
                        <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Area */}
              <div className="p-4">
                <textarea
                  ref={textareaRef}
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full bg-transparent text-white placeholder-[#8A8A8A] resize-none focus:outline-none leading-relaxed"
                  placeholder="Start writing your blog content..."
                />
              </div>
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
