"use client";

import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminPortal/AdminHeader";
import BlogsTable from "@/components/AdminPortal/BlogsTable";
import BlogModal from "@/components/AdminPortal/BlogModal";
import { AdminUser, BlogEntry, BlogFormData } from "@/types/adminPortal";
import { blogAPI } from "@/services/blogAPI";
import { BlogStatus } from "@/constants/enums";

// Mock user data - in real implementation, this would come from authentication
const mockUser: AdminUser = {
  name: "Admin",
  email: "admin@drivefitt.com",
};

const mockBlogs: BlogEntry[] = [];

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState<BlogEntry[]>(mockBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogEntry[]>(mockBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBlog, setSelectedBlog] = useState<BlogEntry | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const list = await blogAPI.list();
        setAllBlogs(list);
        setFilteredBlogs(list);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      // If search query is empty, show all blogs
      setFilteredBlogs(allBlogs);
    } else {
      // Filter blogs based on title (case-insensitive)
      const filtered = allBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(filtered);
    }
  };

  const handleAddBlog = () => {
    setModalMode("create");
    setSelectedBlog(undefined);
    setIsModalOpen(true);
  };

  const handleEditBlog = (blog: BlogEntry) => {
    setModalMode("edit");
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const handleDeleteBlog = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    await blogAPI.remove(blogId);
    const updated = allBlogs.filter((b) => String(b.id) !== String(blogId));
    setAllBlogs(updated);
    setFilteredBlogs(updated);
  };

  const handleSaveBlog = async (blogData: BlogFormData) => {
    if (modalMode === "create") {
      const created = await blogAPI.create(blogData);
      const updated = [created, ...allBlogs];
      setAllBlogs(updated);
      setFilteredBlogs(updated);
    } else if (modalMode === "edit" && selectedBlog) {
      const updatedItem = await blogAPI.update(selectedBlog.id, blogData);
      const updated = allBlogs.map((b) =>
        String(b.id) === String(selectedBlog.id) ? updatedItem : b
      );
      setAllBlogs(updated);
      setFilteredBlogs(updated);
    }
  };

  return (
    <div className="h-full bg-[#0D0D0D] flex flex-col">
      <AdminHeader
        title="Blogs"
        user={mockUser}
        onSearch={handleSearch}
        onAdd={handleAddBlog}
        showSearchButton={true}
        showAddButton={true}
      />

      <div className="flex-1 overflow-hidden">
        <BlogsTable
          blogs={filteredBlogs}
          onEdit={handleEditBlog}
          onDelete={handleDeleteBlog}
        />
      </div>

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveBlog}
        blog={selectedBlog}
        mode={modalMode}
      />
    </div>
  );
}
