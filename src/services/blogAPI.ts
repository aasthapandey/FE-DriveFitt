import { BlogEntry, BlogFormData } from "@/types/adminPortal";

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  }
  return "";
};

export const blogAPI = {
  async list(): Promise<BlogEntry[]> {
    const res = await fetch(`${getBaseUrl()}/api/blogs`, { cache: "no-store" });
    const json = await res.json();
    if (!res.ok || json?.status === false) {
      throw new Error(json?.error || "Failed to fetch blogs");
    }
    return (json.data || json) as BlogEntry[];
  },

  async create(payload: BlogFormData): Promise<BlogEntry> {
    const res = await fetch(`${getBaseUrl()}/api/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || json?.status === false) {
      throw new Error(json?.error || "Failed to create blog");
    }
    return (json.data || json) as BlogEntry;
  },

  async update(
    id: number | string,
    payload: Partial<BlogFormData>
  ): Promise<BlogEntry> {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok || json?.status === false) {
      throw new Error(json?.error || "Failed to update blog");
    }
    return (json.data || json) as BlogEntry;
  },

  async remove(id: number | string): Promise<{ success: boolean }> {
    const res = await fetch(`${getBaseUrl()}/api/blogs/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    if (!res.ok || json?.status === false) {
      throw new Error(json?.error || "Failed to delete blog");
    }
    return { success: true };
  },
};
