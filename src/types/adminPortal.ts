export interface AdminUser {
  name: string;
  email: string;
  avatar?: string;
}

export interface BlogEntry {
  id: string;
  title: string;
  description: string;
  slug: string;
  date: string;
  image: string;
  categoryId?: number; // 0 or undefined means unassigned
  categoryHeading?: string; // denormalized helper for UI listing
  created: string;
  edited: string;
}

export interface AdminNavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  subItems?: AdminNavItem[];
}

export interface AdminPortalState {
  selectedOption: string;
  user: AdminUser | null;
}

export interface BlogFormData {
  title: string;
  description: string;
  slug: string;
  image: string;
  content?: string;
  isPublished?: number;
  // category handling
  categoryId?: number; // send 0 or omit to keep unassigned
}

export interface BlogCategory {
  id: number;
  heading: string;
  status: string; // keep string to align with DB schema provided
  created_at?: string;
  updated_at?: string;
}

export interface AdminHeaderProps {
  title: string;
  user: AdminUser;
  onSearch?: (query: string) => void;
  onAdd?: () => void;
  showSearchButton?: boolean;
  showAddButton?: boolean;
}

export interface LeftSidebarProps {
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  navItems: AdminNavItem[];
}

export interface BlogsTableProps {
  blogs: BlogEntry[];
  onEdit: (blog: BlogEntry) => void;
  onDelete: (blogId: string) => void;
}

export interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (blog: BlogFormData) => void;
  blog?: BlogEntry;
  mode: "create" | "edit";
}
