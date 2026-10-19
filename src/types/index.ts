export type NavigationPage =
  | 'home'
  | 'about'
  | 'leadership'
  | 'pac'
  | 'counties'
  | 'candidates'
  | 'elections'
  | 'action'
  | 'priorities'
  | 'report'
  | 'join'
  | 'news'
  | 'meetings'
  | 'documents'
  | 'contact'
  | 'admin';

export interface CountyInfo {
  id: string;
  name: string;
  headquarters: string;
  populationEstimate: string;
  geographicZone: string;
  keyFeatures: string[];
  description: string;
  payams: string[];
  sampleBomas: string[];
  priorities: string[];
  coordinatorName: string;
  coordinatorPhone: string;
  coordinatorWhatsApp: string;
  officeLocation: string;
  meetingsCount: number;
}

export interface NewsItem {
  id: string;
  title: string;
  category: 'Latest News' | 'Announcements' | 'Public Statements' | 'Speeches and Interviews' | 'Archive';
  date: string;
  summary: string;
  content: string;
  author: string;
  county?: string;
  imageUrl: string;
  featured?: boolean;
}

export interface MeetingItem {
  id: string;
  title: string;
  type: 'PAC Meetings' | 'County Meetings' | 'Payam Meetings' | 'Boma Meetings' | 'Community Meetings';
  date: string;
  time: string;
  county: string;
  location: string;
  agenda: string;
  contactPerson: string;
  contactPhone: string;
  openToPublic: boolean;
}

export interface CandidateItem {
  id: string;
  name: string;
  office: 'Presidential' | 'National Parliamentary' | 'Jonglei Governor' | 'State Parliamentary' | 'County Commissioner' | 'Local Council';
  county: string;
  payam?: string;
  bio: string;
  photoUrl: string;
  keyCommitments: string[];
  status: 'Vetted & Endorsed' | 'Application Under Review' | 'Nominated';
  verifiedDate: string;
}

export interface PriorityItem {
  id: number;
  number: string;
  title: string;
  category: 'Peace & Security' | 'Infrastructure & Transport' | 'Social Services' | 'Economic Development' | 'Environment & Governance';
  summary: string;
  fullDescription: string;
  actionPoints: string[];
  keyCounties: string[];
}

export interface DocumentItem {
  id: string;
  title: string;
  category: 'Guiding Principles' | 'Operating Guidelines' | 'PAC Documents' | 'Candidate Guidelines' | 'Gubernatorial Manifesto' | 'Election Documents' | 'Public Statements' | 'Meeting Records';
  date: string;
  fileSize: string;
  description: string;
  downloadUrl?: string;
}

export interface ConfidentialReport {
  id: string;
  trackingCode: string;
  timestamp: string;
  incidentType:
    | 'Attacks on Civilians and Killings'
    | 'Child Abductions'
    | 'Sexual Violence'
    | 'Torture and Detention'
    | 'Disappearances'
    | 'Forced Displacement'
    | 'Burning and Looting'
    | 'Other Serious Abuses';
  dateOfIncident: string;
  county: string;
  payam: string;
  boma: string;
  description: string;
  victimCount?: string;
  perpetratorDetails?: string;
  isWitnessProtected: boolean;
  reporterContact?: string; // Optional if anonymous
  status: 'Received & Logged' | 'Under Confidential Verification' | 'Referred to Legal Desk';
}

export interface MemberRegistration {
  id: string;
  timestamp: string;
  fullName: string;
  gender: string;
  phone: string;
  whatsapp: string;
  county: string;
  payam: string;
  boma: string;
  isDiaspora: boolean;
  diasporaCountry?: string;
  interests: string[];
  notes?: string;
}

export interface SiteSettings {
  siteName: string;
  slogan: string;
  domain: string;
  email: string;
  whatsappNumber: string;
  whatsappMessageDefault: string;
  phone: string;
  socials: {
    facebook: string;
    twitter: string; // X
    instagram: string;
    tiktok: string;
    youtube: string;
  };
  headquartersAddress: string;
  adminPin: string;
}
