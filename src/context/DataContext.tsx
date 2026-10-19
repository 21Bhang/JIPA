import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  NavigationPage,
  CountyInfo,
  NewsItem,
  MeetingItem,
  CandidateItem,
  PriorityItem,
  DocumentItem,
  ConfidentialReport,
  MemberRegistration,
  SiteSettings,
} from '../types';
import {
  initialCounties,
  initialNews,
  initialMeetings,
  allPriorities,
  initialCandidates,
  initialDocuments,
  initialSiteSettings,
} from '../data/initialData';

interface DataContextType {
  currentPage: NavigationPage;
  setCurrentPage: (page: NavigationPage) => void;
  navigateTo: (page: NavigationPage, extraParam?: string) => void;
  selectedCountyId: string;
  setSelectedCountyId: (id: string) => void;
  selectedNewsId: string | null;
  setSelectedNewsId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  counties: CountyInfo[];
  updateCounty: (county: CountyInfo) => void;
  news: NewsItem[];
  addNews: (item: Omit<NewsItem, 'id'>) => void;
  updateNews: (item: NewsItem) => void;
  deleteNews: (id: string) => void;
  meetings: MeetingItem[];
  addMeeting: (item: Omit<MeetingItem, 'id'>) => void;
  updateMeeting: (item: MeetingItem) => void;
  deleteMeeting: (id: string) => void;
  candidates: CandidateItem[];
  addCandidate: (item: Omit<CandidateItem, 'id' | 'verifiedDate'>) => void;
  updateCandidate: (item: CandidateItem) => void;
  priorities: PriorityItem[];
  documents: DocumentItem[];
  addDocument: (doc: Omit<DocumentItem, 'id'>) => void;
  registrations: MemberRegistration[];
  addRegistration: (reg: Omit<MemberRegistration, 'id' | 'timestamp'>) => void;
  confidentialReports: ConfidentialReport[];
  addConfidentialReport: (report: Omit<ConfidentialReport, 'id' | 'trackingCode' | 'timestamp' | 'status'>) => string;
  notification: string | null;
  showNotification: (msg: string) => void;
  clearNotification: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'jipa_south_sudan_';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const VALID_PAGES: NavigationPage[] = [
    'home', 'about', 'leadership', 'pac', 'counties', 'candidates',
    'elections', 'action', 'priorities', 'report', 'join', 'news',
    'meetings', 'documents', 'contact', 'admin',
  ];

  // Read page from clean pathname: /about → 'about', / → 'home'
  const getPageFromPath = (): NavigationPage => {
    const segment = window.location.pathname.replace(/^\//, '').split('/')[0];
    if (VALID_PAGES.includes(segment as NavigationPage)) {
      return segment as NavigationPage;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<NavigationPage>(getPageFromPath());
  const [selectedCountyId, setSelectedCountyId] = useState<string>('bor');
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Sync state to clean URL pathname
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => setCurrentPage(getPageFromPath());
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (page: NavigationPage, extraParam?: string) => {
    setCurrentPage(page);
    if (page === 'counties' && extraParam) {
      setSelectedCountyId(extraParam);
    }
    if (page === 'news' && extraParam) {
      setSelectedNewsId(extraParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const clearNotification = () => setNotification(null);

  // Persistent State Helpers
  const usePersistentState = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [state, setState] = useState<T>(() => {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_PREFIX + key);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(`Error loading ${key} from storage:`, e);
      }
      return initialValue;
    });

    useEffect(() => {
      try {
        localStorage.setItem(LOCAL_STORAGE_PREFIX + key, JSON.stringify(state));
      } catch (e) {
        console.error(`Error saving ${key} to storage:`, e);
      }
    }, [key, state]);

    return [state, setState];
  };

  const [siteSettings, setSiteSettings] = usePersistentState<SiteSettings>('settings', initialSiteSettings);
  const [counties, setCounties] = usePersistentState<CountyInfo[]>('counties', initialCounties);
  const [news, setNews] = usePersistentState<NewsItem[]>('news', initialNews);
  const [meetings, setMeetings] = usePersistentState<MeetingItem[]>('meetings', initialMeetings);
  const [candidates, setCandidates] = usePersistentState<CandidateItem[]>('candidates', initialCandidates);
  const [documents, setDocuments] = usePersistentState<DocumentItem[]>('documents', initialDocuments);
  const [registrations, setRegistrations] = usePersistentState<MemberRegistration[]>('registrations', []);
  const [confidentialReports, setConfidentialReports] = usePersistentState<ConfidentialReport[]>('reports', []);

  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
    showNotification('Site settings updated successfully.');
  };

  const updateCounty = (updated: CountyInfo) => {
    setCounties((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showNotification(`County details for ${updated.name} updated.`);
  };

  const addNews = (item: Omit<NewsItem, 'id'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
    };
    setNews((prev) => [newItem, ...prev]);
    showNotification('News article published successfully.');
  };

  const updateNews = (updated: NewsItem) => {
    setNews((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
    showNotification('News article updated.');
  };

  const deleteNews = (id: string) => {
    setNews((prev) => prev.filter((n) => n.id !== id));
    showNotification('News article removed.');
  };

  const addMeeting = (item: Omit<MeetingItem, 'id'>) => {
    const newMeeting: MeetingItem = {
      ...item,
      id: `meet-${Date.now()}`,
    };
    setMeetings((prev) => [newMeeting, ...prev]);
    showNotification('New meeting added to schedule.');
  };

  const updateMeeting = (updated: MeetingItem) => {
    setMeetings((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    showNotification('Meeting details updated.');
  };

  const deleteMeeting = (id: string) => {
    setMeetings((prev) => prev.filter((m) => m.id !== id));
    showNotification('Meeting removed from schedule.');
  };

  const addCandidate = (item: Omit<CandidateItem, 'id' | 'verifiedDate'>) => {
    const newCand: CandidateItem = {
      ...item,
      id: `cand-${Date.now()}`,
      verifiedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    };
    setCandidates((prev) => [newCand, ...prev]);
    showNotification('Candidate profile registered.');
  };

  const updateCandidate = (updated: CandidateItem) => {
    setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    showNotification('Candidate information updated.');
  };

  const addDocument = (doc: Omit<DocumentItem, 'id'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
    showNotification('Official document uploaded.');
  };

  const addRegistration = (reg: Omit<MemberRegistration, 'id' | 'timestamp'>) => {
    const newReg: MemberRegistration = {
      ...reg,
      id: `reg-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setRegistrations((prev) => [newReg, ...prev]);
    showNotification('Registration received! Welcome to JIPA.');
  };

  const addConfidentialReport = (
    report: Omit<ConfidentialReport, 'id' | 'trackingCode' | 'timestamp' | 'status'>
  ): string => {
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const trackingCode = `JIPA-CR-2026-${randomHex}`;
    const newReport: ConfidentialReport = {
      ...report,
      id: `report-${Date.now()}`,
      trackingCode,
      timestamp: new Date().toISOString(),
      status: 'Received & Logged',
    };
    setConfidentialReports((prev) => [newReport, ...prev]);
    showNotification(`Confidential report secured. Tracking ID: ${trackingCode}`);
    return trackingCode;
  };

  return (
    <DataContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateTo,
        selectedCountyId,
        setSelectedCountyId,
        selectedNewsId,
        setSelectedNewsId,
        isSearchOpen,
        setIsSearchOpen,
        siteSettings,
        updateSiteSettings,
        counties,
        updateCounty,
        news,
        addNews,
        updateNews,
        deleteNews,
        meetings,
        addMeeting,
        updateMeeting,
        deleteMeeting,
        candidates,
        addCandidate,
        updateCandidate,
        priorities: allPriorities,
        documents,
        addDocument,
        registrations,
        addRegistration,
        confidentialReports,
        addConfidentialReport,
        notification,
        showNotification,
        clearNotification,
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
