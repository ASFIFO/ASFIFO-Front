import type React from 'react';
import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { ToastContainer } from '../common/ToastContainer';
import { DataModal } from '../common/DataModal';
import { ConfirmModal } from '../common/ConfirmModal';
import { clearAuthSession, getAuthUser } from '../../../lib/auth';
import {
  LayoutDashboard,
  FileText,
  Mail,
  Globe,
  LogOut,
  Menu,
  X,
  Plus,
  Database,
  Sparkles
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { stats, addToast } = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const authUser = getAuthUser();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Determine current page title
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
      case '/admin/dashboard':
        return 'Tableau de bord';
      case '/admin/articles':
        return 'Gestion des Articles';
      case '/admin/contacts':
        return 'Boîte de Réception Contacts';
      case '/admin/public-site':
        return 'Aperçu du Site Public';
      default:
        return 'Administration';
    }
  };

  const navItems = [
    {
      to: '/admin',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/admin/articles',
      label: 'Articles',
      icon: FileText,
      badge: stats.totalArticles > 0 ? `${stats.publishedArticles}/${stats.totalArticles}` : null,
      badgeColor: 'bg-teal-900/60! text-teal-200!',
    },
    {
      to: '/admin/contacts',
      label: 'Contacts',
      icon: Mail,
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : null,
      badgeColor: 'bg-blue-500! text-white! animate-pulse!',
    },
  ];

  const handleLogout = () => {
    addToast('info', 'Déconnexion effectuée', 'Vous avez été déconnecté en toute sécurité.');
    clearAuthSession();
    setIsLogoutModalOpen(false);
    navigate('/login', { replace: true });
  };

  const userName = authUser?.name || authUser?.email || 'Administrateur';
  // const userRole = authUser?.role || 'Admin';
  const userInitials = userName
    .split(' ')
    .map((part: string) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen! bg-[#F5F7F7]! text-[#1E2626]! flex! flex-col! md:flex-row! font-sans!">
      {/* Sidebar Navigation - Fixed Desktop & Mobile Drawer */}
      <aside
        className={`fixed! md:sticky! top-0! left-0! z-40! h-screen! w-64! bg-[#004851]! text-white! flex! flex-col! justify-between! transition-transform! duration-300! shadow-xl! ${
          mobileMenuOpen ? 'translate-x-0!' : '-translate-x-full! md:translate-x-0!'
        }`}
      >
        {/* Top Branding Header */}
        <div>
          <div className="p-6! border-b! border-teal-800/60! flex! items-center! justify-between!">
            <div className="flex! items-center! gap-3!">
              <div className="w-10! h-10! rounded-xl! bg-white/10! flex! items-center! justify-center! border! border-white/20! shadow-xs!">
                <Sparkles className="w-5! h-5! text-amber-300!" />
              </div>
              <div>
                <h1 className="font-extrabold! text-lg! text-white! leading-none! tracking-tight!">
                  ASFIFO Admin
                </h1>
                <span className="text-[11px]! font-medium! text-teal-200/80! mt-1! block!">
                  Blog & Contacts
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden! text-teal-200! hover:text-white! p-1!"
            >
              <X className="w-6! h-6!" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-4! space-y-1.5!">
            <span className="px-3! text-[10px]! font-bold! uppercase! tracking-wider! text-teal-300/60! block! mb-2!">
              Menu Principal
            </span>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex! items-center! justify-between! px-3.5! py-3! rounded-xl! text-sm! font-semibold! transition-all! group! ${
                      isActive
                        ? 'bg-white! text-[#004851]! shadow-md!'
                        : 'text-teal-100/90! hover:bg-white/10! hover:text-white!'
                    }`
                  }
                >
                  <div className="flex! items-center! gap-3!">
                    <Icon className="w-5! h-5! shrink-0! transition-transform! group-hover:scale-105!" />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== null && item.badge !== undefined && (
                    <span
                      className={`px-2! py-0.5! text-[11px]! font-bold! rounded-full! ${
                        item.badgeColor || 'bg-teal-900/60! text-teal-100!'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions & Data Management */}
        <div className="p-4! border-t! border-teal-800/60! space-y-3! bg-[#00383f]!">
          <button
            onClick={() => setIsDataModalOpen(true)}
            className="w-full! px-3.5! py-2.5! text-xs! font-semibold! text-teal-100! hover:text-white! bg-white/10! hover:bg-white/15! rounded-xl! flex! items-center! justify-between! transition-colors! cursor-pointer!"
          >
            <div className="flex! items-center! gap-2!">
              <Database className="w-4! h-4! text-teal-300!" />
              <span>Données JSON</span>
            </div>
            <span className="text-[10px]! text-teal-300! bg-teal-900/60! px-1.5! py-0.5! rounded-md!">Export/Import</span>
          </button>

          {/* User Profile Mini Badge */}
          <div className="flex! items-center! justify-between! pt-2!">
            <div className="flex! items-center! gap-2.5! min-w-0!">
              <div className="w-8! h-8! rounded-full! bg-[#745568]! text-white! flex! items-center! justify-center! font-bold! text-xs! shrink-0! border! border-white/20!">
                {userInitials}
              </div>
              <div className="min-w-0!">
                <span className="text-xs! font-bold! text-white! block! truncate! leading-tight!">Sophie Martin</span>
                <span className="text-[10px]! text-teal-300/80! block! truncate!">Admin Système</span>
              </div>
            </div>

            <button
              onClick={() => setIsLogoutModalOpen(true)}
              title="Se déconnecter"
              className="text-teal-200! hover:text-rose-300! p-1.5! hover:bg-white/10! rounded-lg! transition-colors! cursor-pointer!"
            >
              <LogOut className="w-4! h-4!" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="flex-1! flex! flex-col! min-w-0!">
        {/* Top Header */}
        <header className="sticky! top-0! z-30! bg-white/95! backdrop-blur-md! border-b! border-slate-200! px-4! sm:px-8! py-3.5! flex! items-center! justify-between! shadow-2xs!">
          <div className="flex! items-center! gap-3!">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden! p-2! text-slate-600! hover:text-[#004851]! rounded-xl! hover:bg-slate-100! transition-colors!"
            >
              <Menu className="w-6! h-6!" />
            </button>

            <div>
              <h2 className="text-lg! font-bold! text-[#1E2626]! leading-tight!">{getPageTitle()}</h2>
              <span className="text-xs! text-slate-400! hidden! sm:block!">
                ASFIFO Backoffice • 
              </span>
            </div>
          </div>

          <div className="flex! items-center! gap-3!">
            {/* Quick Link to Public Site */}
            <NavLink
              to="/"
              className="px-3! py-1.5! text-xs! font-medium! text-[#745568]! bg-[#745568]/10! hover:bg-[#745568]/20! rounded-xl! hidden! sm:flex! items-center! gap-1.5! transition-colors!"
            >
              <Globe className="w-3.5! h-3.5!" />
              Voir site public
            </NavLink>

            {/* Quick Add Article */}
            <NavLink
              to="/admin/articles"
              className="px-3.5! py-2! text-xs! font-semibold! text-white! bg-[#004851]! hover:bg-[#00363d]! rounded-xl! flex! items-center! gap-1.5! shadow-xs! transition-colors!"
            >
              <Plus className="w-4! h-4!" />
              <span className="hidden! sm:inline!">Gérer articles</span>
            </NavLink>
          </div>
        </header>

        {/* Dynamic Page Content Container */}
        <main className="flex-1! p-4! sm:p-8! max-w-7xl! w-full! mx-auto!">
          {children}
        </main>
      </div>

      {/* Global Toast Container */}
      <ToastContainer />

      {/* JSON Import/Export Modal */}
      <DataModal isOpen={isDataModalOpen} onClose={() => setIsDataModalOpen(false)} />

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="Se déconnecter ?"
        message="Voulez-vous vraiment vous déconnecter de votre session d'administration ?"
        confirmText="Déconnexion"
        cancelText="Annuler"
        variant="warning"
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};
