import { useId } from 'react';
import React, { useState, useEffect } from 'react';
import { DataContext } from './Data-Context';
import type { Article, ContactMessage, ContactMessageStatus, Stats, ToastNotification } from '../types';
import api from '../../lib/api';



interface ApiContactMessage {
  id: string | number;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  organization?: string | null;
  message: string;
  status: ContactMessageStatus;
  reply_notes?: string | null;
  replied_at?: string | null;
  created_at: string;
}
// Convertit un message renvoyé par l'API Laravel (id numérique) au format attendu par le front (id string)
const mapApiMessage = (m:ApiContactMessage): ContactMessage => ({
  id: String(m.id),
  name: m.name,
  email: m.email,
  phone: m.phone ?? undefined,
  subject: m.subject ?? '',
  organization: m.organization ?? undefined,
  message: m.message,
  status: m.status,
  reply_notes: m.reply_notes ?? undefined,
  replied_at: m.replied_at ?? undefined,
  created_at: m.created_at,
});

// Convertit un article renvoyé par l'API Laravel (id numérique) au format attendu par le front (id string)
const mapApiArticle = (a: Article): Article => ({
  id: String(a.id),
  title: a.title,
  slug: a.slug,
  excerpt: a.excerpt ?? '',
  content: a.content,
  image_url: a.image_url ?? '',
  tags: a.tags ?? [],
  featured: a.featured,
  is_published: a.is_published,
  views: a.views ?? 0,
  author: a.author ?? '',
  created_at: a.created_at,
  updated_at: a.updated_at,
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const id = useId()
  const [articles, setArticles] = useState<Article[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

const addToast = (type: ToastNotification['type'], title: string, message?: string) => {
  const toastId = `${id}`;
  setToasts((prev) => [...prev, { id: toastId, type, title, message }]);

  setTimeout(() => {
    removeToast(toastId);
  }, 4000);
};

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ---- Chargement initial ----

  const refreshArticles = () => {
    api
      .get('/admin/articles', { params: { per_page: 100 } })
      .then((res) => {
        const list = res.data.data ?? res.data;
        setArticles(list.map(mapApiArticle));
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des articles', err);
        addToast('error', 'Erreur', 'Impossible de charger les articles.');
      });
  };

  const refreshMessages = () => {
    api
      .get('/admin/contact-messages', { params: { per_page: 100 } })
      .then((res) => {
        const list = res.data.data ?? res.data;
        setMessages(list.map(mapApiMessage));
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des messages', err);
        addToast('error', 'Erreur', 'Impossible de charger les messages.');
      });
  };

  useEffect(() => {
    refreshArticles();
    refreshMessages();
  }, []);

  // Stats calculées depuis les données chargées depuis l'API
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

  // ---- Article Handlers : connectés à l'API ----

  const addArticle = async (
    data: Omit<Article, 'id' | 'created_at' | 'updated_at' | 'views'>
  ): Promise<Article | undefined> => {
    try {
      const res = await api.post('/admin/articles', data);
      const newArticle = mapApiArticle(res.data);
      setArticles((prev) => [newArticle, ...prev]);
      addToast('success', 'Article créé', `L'article "${newArticle.title}" a été créé avec succès.`);
      return newArticle;
    } catch (err) {
      console.error(err);
      addToast('error', 'Erreur', "L'article n'a pas pu être créé.");
      return undefined;
    }
  };

  const updateArticle = async (id: string, updates: Partial<Article>): Promise<void> => {
    try {
      const res = await api.put(`/admin/articles/${id}`, updates);
      const updated = mapApiArticle(res.data);
      setArticles((prev) => prev.map((art) => (art.id === id ? updated : art)));
      addToast('success', 'Article mis à jour', 'Les modifications ont été enregistrées.');
    } catch (err) {
      console.error(err);
      addToast('error', 'Erreur', "L'article n'a pas pu être mis à jour.");
    }
  };

  const deleteArticle = (id: string) => {
    const art = articles.find((a) => a.id === id);
    api
      .delete(`/admin/articles/${id}`)
      .then(() => {
        setArticles((prev) => prev.filter((a) => a.id !== id));
        addToast('info', 'Article supprimé', art ? `L'article "${art.title}" a été supprimé.` : undefined);
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', "L'article n'a pas pu être supprimé.");
      });
  };

  const togglePublishArticle = (id: string) => {
    api
      .patch(`/admin/articles/${id}/publish`)
      .then((res) => {
        const updated = mapApiArticle(res.data);
        setArticles((prev) => prev.map((art) => (art.id === id ? updated : art)));
        addToast(
          updated.is_published ? 'success' : 'info',
          updated.is_published ? 'Article publié' : 'Article passé en brouillon',
          `"${updated.title}" est maintenant ${updated.is_published ? 'public' : 'en brouillon'}.`
        );
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', 'Impossible de modifier la publication.');
      });
  };

  const toggleFeaturedArticle = (id: string) => {
    api
      .patch(`/admin/articles/${id}/featured`)
      .then((res) => {
        const updated = mapApiArticle(res.data);
        setArticles((prev) => prev.map((art) => (art.id === id ? updated : art)));
        addToast(
          'info',
          updated.featured ? 'Article mis en avant' : 'Mise en avant retirée',
          `"${updated.title}" ${updated.featured ? "est maintenant mis en avant sur la page d'accueil" : "n'est plus mis en avant"}.`
        );
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', 'Impossible de modifier la mise en avant.');
      });
  };

  const getArticleById = (id: string) => articles.find((a) => a.id === id);

  // ---- Contact Message Handlers : connectés à l'API ----

  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'created_at' | 'status'>) => {
    api
      .post('/contact-messages', data)
      .then(() => {
        addToast('info', 'Nouveau message reçu', `Message de ${data.name}`);
        refreshMessages();
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', "Le message n'a pas pu être envoyé.");
      });
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    api
      .patch(`/admin/contact-messages/${id}/status`, { status })
      .then((res) => {
        const updated = mapApiMessage(res.data);
        setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
        addToast('info', 'Statut du message modifié', `Statut mis à jour : ${status}`);
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', 'Impossible de mettre à jour le statut.');
      });
  };

  const replyToMessage = (id: string, replyNotes: string) => {
    api
      .post(`/admin/contact-messages/${id}/reply`, { reply_notes: replyNotes })
      .then((res) => {
        const updated = mapApiMessage(res.data);
        setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
        addToast('success', 'Réponse envoyée', 'La réponse a été enregistrée et le message est marqué comme "Répondu".');
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', "La réponse n'a pas pu être enregistrée.");
      });
  };

  const deleteContactMessage = (id: string) => {
    api
      .delete(`/admin/contact-messages/${id}`)
      .then(() => {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        addToast('info', 'Message supprimé', 'Le message a été supprimé définitivement.');
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', 'Impossible de supprimer le message.');
      });
  };

  const archiveContactMessage = (id: string) => {
    api
      .patch(`/admin/contact-messages/${id}/archive`)
      .then((res) => {
        const updated = mapApiMessage(res.data);
        setMessages((prev) => prev.map((m) => (m.id === id ? updated : m)));
        addToast('info', 'Message archivé', 'Le message a été archivé.');
      })
      .catch((err) => {
        console.error(err);
        addToast('error', 'Erreur', "Impossible d'archiver le message.");
      });
  };

  const getMessageById = (id: string) => messages.find((m) => m.id === id);

  // ---- Data management (les données viennent désormais du serveur) ----

  const resetToDefaults = () => {
    refreshArticles();
    refreshMessages();
    addToast('info', 'Données rechargées', 'Les articles et messages ont été rechargés depuis le serveur.');
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

  const importJSON = (): boolean => {
    addToast('error', 'Import désactivé', "L'import JSON n'est plus disponible : les données viennent désormais du serveur.");
    return false;
  };

  const uploadArticleImage = async (id: string, file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const res = await api.post(`/admin/articles/${id}/image`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    const updated = mapApiArticle(res.data);
    setArticles((prev) => prev.map((art) => (art.id === id ? updated : art)));
  } catch (err) {
    console.error(err);
    addToast('error', 'Erreur', "L'image n'a pas pu être envoyée.");
  }
};

  return (
    <DataContext.Provider
      value={{
        articles,
        messages,
        stats,
        toasts,
        uploadArticleImage,
        addToast,
        removeToast,
        addArticle,
        updateArticle,
        deleteArticle,
        togglePublishArticle,
        toggleFeaturedArticle,
        getArticleById,
        refreshArticles,
        addContactMessage,
        updateMessageStatus,
        replyToMessage,
        deleteContactMessage,
        archiveContactMessage,
        getMessageById,
        refreshMessages,
        resetToDefaults,
        exportJSON,
        importJSON,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

// export const useData = () => {
//   const context = useContext(DataContext);
//   if (!context) {
//     throw new Error('useData must be used within a DataProvider');
//   }
//   return context;
// };
