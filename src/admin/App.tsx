import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ArticleList } from './components/articles/ArticleList';
import { ContactList } from './components/contacts/ContactList';
import { PublicSite } from './components/public/PublicSite';

export default function AppAdmin() {
  return (
      <DataProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/contacts" element={<ContactList />} />
            <Route path="/public-site" element={<PublicSite />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </DataProvider>
  );
}
