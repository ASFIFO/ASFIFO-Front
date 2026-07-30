export type ArticleStatusFilter = 'all' | 'published' | 'draft' | 'featured';

export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived';

export type MessageStatusFilter = 'all' | 'new' | 'read' | 'replied' | 'archived';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  slug?: string;
  content: string;
  image_url: string;
  tags: string[];
  featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  views: number;
  author: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  phone?: string;
  message: string;
  organization?: string; 
  created_at: string;
  status: ContactMessageStatus;
  reply_notes?: string;
  replied_at?: string;
}

export interface Stats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  featuredArticles: number;
  totalMessages: number;
  unreadMessages: number;
  repliedMessages: number;
  archivedMessages: number;
}

export interface ToastNotification {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
}
