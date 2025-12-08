export enum UserRole {
  FULL_ADMIN = 'full_admin',
  SEMI_ADMIN = 'semi_admin',
  SUPPORT = 'support',
}

export enum Permission {
  // News Management
  CREATE_NEWS = 'create_news',
  EDIT_NEWS = 'edit_news',
  DELETE_NEWS = 'delete_news',
  PUBLISH_NEWS = 'publish_news',
  ARCHIVE_NEWS = 'archive_news',
  VIEW_NEWS = 'view_news',
  
  // Announcement Management
  CREATE_ANNOUNCEMENT = 'create_announcement',
  EDIT_ANNOUNCEMENT = 'edit_announcement',
  DELETE_ANNOUNCEMENT = 'delete_announcement',
  PUBLISH_ANNOUNCEMENT = 'publish_announcement',
  ARCHIVE_ANNOUNCEMENT = 'archive_announcement',
  VIEW_ANNOUNCEMENT = 'view_announcement',
  
  // Member Management
  CREATE_MEMBER = 'create_member',
  EDIT_MEMBER = 'edit_member',
  DELETE_MEMBER = 'delete_member',
  VIEW_MEMBER = 'view_member',
  MANAGE_MEMBER_ROLES = 'manage_member_roles',
  
  // Role Management
  CREATE_ROLE = 'create_role',
  EDIT_ROLE = 'edit_role',
  DELETE_ROLE = 'delete_role',
  VIEW_ROLE = 'view_role',
  ASSIGN_ROLE = 'assign_role',
  
  // System
  VIEW_LOGS = 'view_logs',
  MANAGE_SETTINGS = 'manage_settings',
}

export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  customRole?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  createdBy: string | User;
  createdAt: string;
  updatedAt: string;
}

export enum NewsStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export interface News {
  _id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string | User;
  status: NewsStatus;
  publishedAt?: string;
  archivedAt?: string;
  tags: string[];
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export enum AnnouncementPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum AnnouncementType {
  GENERAL = 'general',
  ACADEMIC = 'academic',
  EVENT = 'event',
  EMERGENCY = 'emergency',
}

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  priority: AnnouncementPriority;
  type: AnnouncementType;
  author: string | User;
  isActive: boolean;
  targetAudience: string[];
  expiresAt?: string;
  imageUrl?: string;
  status?: NewsStatus;
  createdAt: string;
  updatedAt: string;
}
