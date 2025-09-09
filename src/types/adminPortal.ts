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
  created: string;
  edited: string;
}

export interface AdminNavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
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
