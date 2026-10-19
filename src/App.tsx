/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { DataProvider, useData } from './context/DataContext';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AiAssistant } from './components/AiAssistant';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { LeadershipPage } from './pages/LeadershipPage';
import { PacPage } from './pages/PacPage';
import { CountiesPage } from './pages/CountiesPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { ElectionsPage } from './pages/ElectionsPage';
import { PoliticalActionPage } from './pages/PoliticalActionPage';
import { PrioritiesPage } from './pages/PrioritiesPage';
import { ReportAtrocitiesPage } from './pages/ReportAtrocitiesPage';
import { JoinPage } from './pages/JoinPage';
import { NewsPage } from './pages/NewsPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { CheckCircle2, X } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentPage, notification, clearNotification } = useData();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'leadership':
        return <LeadershipPage />;
      case 'pac':
        return <PacPage />;
      case 'counties':
        return <CountiesPage />;
      case 'candidates':
        return <CandidatesPage />;
      case 'elections':
        return <ElectionsPage />;
      case 'action':
        return <PoliticalActionPage />;
      case 'priorities':
        return <PrioritiesPage />;
      case 'report':
        return <ReportAtrocitiesPage />;
      case 'join':
        return <JoinPage />;
      case 'news':
        return <NewsPage />;
      case 'meetings':
        return <MeetingsPage />;
      case 'documents':
        return <DocumentsPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#111111] font-sans antialiased selection:bg-[#FFD700] selection:text-[#0a0a0a]">
      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 max-w-sm bg-[#111111] text-white px-4 py-3 rounded-xl shadow-2xl border border-[#FFD700] flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#FFD700] shrink-0" />
            <span>{notification}</span>
          </div>
          <button
            onClick={clearNotification}
            className="text-[#999999] hover:text-white p-1"
            aria-label="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Header with Navigation & Sitemap Menu */}
      <Header />

      {/* Dynamic Page Router */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Main Footer */}
      <Footer />

      {/* Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp />

      {/* JIPA AI Assistant */}
      <AiAssistant />

      {/* Site-wide Search Modal */}
      <SearchModal />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </LanguageProvider>
  );
}
