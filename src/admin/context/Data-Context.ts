import { createContext } from 'react';
import type { Article, ContactMessage, Stats, ToastNotification } from '../types';

interface DataContextType {
  articles: Article[];
  messages: ContactMessage[];
  stats: Stats;
  toasts: ToastNotification[];
 uploadArticleImage: (id: string, file: File) => Promise<void>;
  addToast: (type: ToastNotification['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Articles CRUD (connecté à l'API)
  addArticle: (data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>) => Promise<Article | undefined>;
  updateArticle: (id: string, updates: Partial<Article>) => Promise<void>;
  deleteArticle: (id: string) => void;
  togglePublishArticle: (id: string) => void;
  toggleFeaturedArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;
  refreshArticles: () => void;

  // Contact Messages CRUD (connecté à l'API)
  addContactMessage: (data: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  replyToMessage: (id: string, replyNotes: string) => void;
  deleteContactMessage: (id: string) => void;
  archiveContactMessage: (id: string) => void;
  getMessageById: (id: string) => ContactMessage | undefined;
  refreshMessages: () => void;

  // Data Management & Utilities
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
}
export const DataContext = createContext<DataContextType | undefined>(undefined);