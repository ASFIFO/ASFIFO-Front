import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Article, ContactMessage, Stats, ToastNotification } from '../types';
import { initialArticles, initialMessages } from '../data/initialData';

interface DataContextType {
  articles: Article[];
  messages: ContactMessage[];
  stats: Stats;
  toasts: ToastNotification[];
  addToast: (type: ToastNotification['type'], title: string, message?: string) => void;
  removeToast: (id: string) => void;
  
  // Articles CRUD
  addArticle: (data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>) => Article;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  togglePublishArticle: (id: string) => void;
  toggleFeaturedArticle: (id: string) => void;
  getArticleById: (id: string) => Article | undefined;

  // Contact Messages CRUD
  addContactMessage: (data: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => ContactMessage;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  replyToMessage: (id: string, replyNotes: string) => void;
  deleteContactMessage: (id: string) => void;
  archiveContactMessage: (id: string) => void;
  getMessageById: (id: string) => ContactMessage | undefined;

  // Data Management & Utilities
  resetToDefaults: () => void;
  exportJSON: () => string;
  importJSON: (jsonString: string) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const ARTICLES_KEY = 'backoffice_articles_v1';
const MESSAGES_KEY = 'backoffice_messages_v1';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem(ARTICLES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading articles from localStorage', e);
    }
    return initialArticles;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error loading messages from localStorage', e);
    }
    return initialMessages;
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
  }, [articles]);

  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save messages to localStorage', e);
    }
  }, [messages]);

  const addToast = (type: ToastNotification['type'], title: string, message?: string) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Stats calculation
  const stats: Stats = {
    totalArticles: articles.length,
    publishedArticles: articles.filter((a) => a.is_published).length,
    draftArticles: articles.filter((a) => !a.is_published).length,
    featuredArticles: articles.filter((a) => a.featured).length,
    totalMessages: messages.length,
    unreadMessages: messages.filter((m) => m.status === 'new').length,
    repliedMessages: messages.filter((m) => m.status === 'replied').length,
    archivedMessages: messages.filter((m) => m.status === 'archived').length,
  };

  // Article handlers
  const addArticle = (data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>): Article => {
    const newId = 'art-' + Date.now();
    const now = new Date().toISOString();
    const newArticle: Article = {
      ...data,
      id: newId,
      created_at: now,
      updated_at: now,
      views: 0,
    };
    setArticles((prev) => [newArticle, ...prev]);
    addToast('success', 'Article créé', `L'article "${newArticle.title}" a été créé avec succès.`);
    return newArticle;
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    const now = new Date().toISOString();
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          return { ...art, ...updates, updated_at: now };
        }
        return art;
      })
    );
    addToast('success', 'Article mis à jour', 'Les modifications ont été enregistrées.');
  };

  const deleteArticle = (id: string) => {
    const art = articles.find((a) => a.id === id);
    setArticles((prev) => prev.filter((a) => a.id !== id));
    addToast('info', 'Article supprimé', art ? `L'article "${art.title}" a été supprimé.` : undefined);
  };

  const togglePublishArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextState = !art.is_published;
          addToast(
            nextState ? 'success' : 'info',
            nextState ? 'Article publié' : 'Article passé en brouillon',
            `"${art.title}" est maintenant ${nextState ? 'public' : 'en brouillon'}.`
          );
          return { ...art, is_published: nextState, updated_at: new Date().toISOString() };
        }
        return art;
      })
    );
  };

  const toggleFeaturedArticle = (id: string) => {
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const nextState = !art.featured;
          addToast(
            'info',
            nextState ? 'Article mis en avant' : 'Mise en avant retirée',
            `"${art.title}" ${nextState ? 'est maintenant mis en avant sur la page d\'accueil' : 'n\'est plus mis en avant'}.`
          );
          return { ...art, featured: nextState, updated_at: new Date().toISOString() };
        }
        return art;
      })
    );
  };

  const getArticleById = (id: string) => articles.find((a) => a.id === id);

  // Contact Message Handlers
  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'created_at' | 'status'>): ContactMessage => {
    const newId = 'msg-' + Date.now();
    const now = new Date().toISOString();
    const newMessage: ContactMessage = {
      ...data,
      id: newId,
      created_at: now,
      status: 'new',
    };
    setMessages((prev) => [newMessage, ...prev]);
    addToast('info', 'Nouveau message reçu', `Message de ${newMessage.name} ("${newMessage.subject}")`);
    return newMessage;
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return { ...msg, status };
        }
        return msg;
      })
    );
    addToast('info', 'Statut du message modifié', `Statut mis à jour : ${status}`);
  };

  const replyToMessage = (id: string, replyNotes: string) => {
    const now = new Date().toISOString();
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === id) {
          return {
            ...msg,
            status: 'replied',
            reply_notes: replyNotes,
            replied_at: now,
          };
        }
        return msg;
      })
    );
    addToast('success', 'Réponse envoyée', 'La réponse a été enregistrée et le message est marqué comme "Répondu".');
  };

  const deleteContactMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    addToast('info', 'Message supprimé', 'Le message a été supprimé définitivement.');
  };

  const archiveContactMessage = (id: string) => {
    updateMessageStatus(id, 'archived');
  };

  const getMessageById = (id: string) => messages.find((m) => m.id === id);

  // Data management
  const resetToDefaults = () => {
    setArticles(initialArticles);
    setMessages(initialMessages);
    localStorage.removeItem(ARTICLES_KEY);
    localStorage.removeItem(MESSAGES_KEY);
    addToast('info', 'Données réinitialisées', 'Les articles et messages par défaut ont été restaurés.');
  };

  const exportJSON = (): string => {
    const exportObject = {
      version: '1.0',
      exported_at: new Date().toISOString(),
      articles,
      messages,
    };
    return JSON.stringify(exportObject, null, 2);
  };

  const importJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed.articles) && Array.isArray(parsed.messages)) {
        setArticles(parsed.articles);
        setMessages(parsed.messages);
        addToast('success', 'Données importées', 'Les articles et messages ont été importés avec succès.');
        return true;
      } else {
        throw new Error('Format JSON invalide');
      }
    } catch (e) {
      addToast('error', 'Erreur d\'importation', 'Le fichier JSON n\'est pas valide.');
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        articles,
        messages,
        stats,
        toasts,
        addToast,
        removeToast,
        addArticle,
        updateArticle,
        deleteArticle,
        togglePublishArticle,
        toggleFeaturedArticle,
        getArticleById,
        addContactMessage,
        updateMessageStatus,
        replyToMessage,
        deleteContactMessage,
        archiveContactMessage,
        getMessageById,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
