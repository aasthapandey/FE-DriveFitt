"use client";

import { useState } from "react";
import AdminHeader from "@/components/AdminPortal/AdminHeader";
import BlogsTable from "@/components/AdminPortal/BlogsTable";
import BlogModal from "@/components/AdminPortal/BlogModal";
import { AdminUser, BlogEntry, BlogFormData } from "@/types/adminPortal";

// Mock user data - in real implementation, this would come from authentication
const mockUser: AdminUser = {
  name: "Admin",
  email: "admin@drivefitt.com",
};

// Mock blogs data - in real implementation, this would come from an API
const mockBlogs: BlogEntry[] = [
  {
    id: "1",
    title: "Boxing Workouts vs. Other Cardio Options",
    description:
      "A comprehensive comparison of boxing workouts with other cardiovascular exercises",
    slug: "boxing-workouts-vs-other-cardio-options",
    date: "2/4/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "2/4/25",
    edited: "2/4/25",
  },
  {
    id: "2",
    title: "Cricket Training Fundamentals",
    description:
      "Essential techniques and drills for cricket players of all levels",
    slug: "cricket-training-fundamentals",
    date: "2/3/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "2/3/25",
    edited: "2/3/25",
  },
  {
    id: "3",
    title: "Fitness Recovery Methods",
    description: "Best practices for post-workout recovery and muscle repair",
    slug: "fitness-recovery-methods",
    date: "2/2/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "2/2/25",
    edited: "2/2/25",
  },
  {
    id: "4",
    title: "Nutrition for Athletes",
    description:
      "Complete guide to sports nutrition and performance optimization",
    slug: "nutrition-for-athletes",
    date: "2/1/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "2/1/25",
    edited: "2/1/25",
  },
  {
    id: "5",
    title: "Boxing Techniques for Beginners",
    description: "Step-by-step guide to learning basic boxing techniques",
    slug: "boxing-techniques-for-beginners",
    date: "1/31/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/31/25",
    edited: "1/31/25",
  },
  {
    id: "6",
    title: "Cricket Mental Game",
    description: "Developing mental toughness and focus for cricket players",
    slug: "cricket-mental-game",
    date: "1/30/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/30/25",
    edited: "1/30/25",
  },
  {
    id: "7",
    title: "Fitness Equipment Guide",
    description: "Choosing the right equipment for your fitness journey",
    slug: "fitness-equipment-guide",
    date: "1/29/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/29/25",
    edited: "1/29/25",
  },
  {
    id: "8",
    title: "Boxing Safety Tips",
    description: "Essential safety guidelines for boxing training",
    slug: "boxing-safety-tips",
    date: "1/28/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/28/25",
    edited: "1/28/25",
  },
  {
    id: "9",
    title: "Cricket Fitness Training",
    description: "Specialized fitness programs for cricket players",
    slug: "cricket-fitness-training",
    date: "1/27/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/27/25",
    edited: "1/27/25",
  },
  {
    id: "10",
    title: "Fitness Motivation Tips",
    description: "Staying motivated and consistent with your fitness routine",
    slug: "fitness-motivation-tips",
    date: "1/26/25",
    image: "https://da8nru77lsio9.cloudfront.net/images/homec/card1.webp",
    created: "1/26/25",
    edited: "1/26/25",
  },
];

export default function BlogsPage() {
  const [allBlogs, setAllBlogs] = useState<BlogEntry[]>(mockBlogs);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogEntry[]>(mockBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [selectedBlog, setSelectedBlog] = useState<BlogEntry | undefined>(
    undefined
  );

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

  const handleDeleteBlog = (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      const updatedAllBlogs = allBlogs.filter((blog) => blog.id !== blogId);
      setAllBlogs(updatedAllBlogs);
      setFilteredBlogs(updatedAllBlogs);
    }
  };

  const handleSaveBlog = (blogData: BlogFormData) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "numeric",
      day: "numeric",
      year: "2-digit",
    });

    if (modalMode === "create") {
      const newBlog: BlogEntry = {
        id: Date.now().toString(),
        ...blogData,
        date: currentDate,
        created: currentDate,
        edited: currentDate,
      };
      const updatedAllBlogs = [newBlog, ...allBlogs];
      setAllBlogs(updatedAllBlogs);
      setFilteredBlogs(updatedAllBlogs);
    } else if (modalMode === "edit" && selectedBlog) {
      const updatedAllBlogs = allBlogs.map((blog) =>
        blog.id === selectedBlog.id
          ? { ...blog, ...blogData, edited: currentDate }
          : blog
      );
      setAllBlogs(updatedAllBlogs);
      setFilteredBlogs(updatedAllBlogs);
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
