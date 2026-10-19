<div align="center">

<img src="src/public/assets/JIPA_Logo.png" alt="JIPA Logo" width="140" />

# JONGLEI INDEPENDENT POLITICAL ALLIANCE

### Official Website — `www.jipasouthsudan.org`

**POWER TO THE PEOPLE**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Private-FFD700?style=flat-square)](LICENSE)

</div>

---

## About JIPA

The **Jonglei Independent Political Alliance (JIPA)** is an emerging grassroots political movement established to identify, organize, mobilize and support independent political candidates from **Jonglei State, South Sudan**.

JIPA unites prospective independent candidates, undecided voters, young people, professionals, and community representatives from all **nine counties of Jonglei State**:

> Bor · Twic East · Duk · Akobo · Nyirol · Uror · Ayod · Pigi · Fangak

**Contact:** info@jipasouthsudan.org · **Social:** @JIPASouthSudan

---

## About This Project

This is the official JIPA website — a full-featured political alliance platform built as a single-page React application with a Node.js/Express backend and Gemini AI integration.

### Key Features

| Feature | Description |
|---|---|
| 🗳️ **16 Page Sections** | Home, About, Leadership, PAC, Counties, Candidates, Elections, Priorities, News, Meetings, Documents, Join, Report, Contact, Political Action, Admin |
| 🗺️ **Interactive Map** | Real Jonglei State county map with clickable regions |
| 🤖 **AI Assistant** | Gemini-powered chatbot answering questions about JIPA |
| 🌍 **Multilingual** | English and Arabic language support with RTL layout |
| 📱 **Mobile-First** | Fully responsive across all screen sizes |
| 🔒 **Confidential Reporting** | Encrypted atrocity reporting vault with tracking codes |
| 👥 **Member Registration** | Full membership signup with diaspora support |
| 🗂️ **Admin Dashboard** | PIN-protected panel with full CRUD for all content |
| 💾 **Local Persistence** | All data persisted to localStorage |
| ✉️ **WhatsApp Widget** | Floating contact button with custom message |

---

## Tech Stack

```
Frontend          React 19 + TypeScript 7 + Vite 8
Styling           Tailwind CSS v4 (no config file — CSS-native)
Animations        Motion (Framer Motion v12)
Icons             Lucide React
Backend           Express 4 (Node.js)
AI                Google Gemini 2.0 Flash (@google/genai)
Font              Plus Jakarta Sans (Google Fonts)
```

---

## Project Structure

```
jonglei-independent-political-alliance-(jipa)/
├── public/
│   ├── JIPA_Logo.png                  # Logo (transparent background)
│   └── Jonglei_State_Counties.svg.webp # Real Jonglei map image
├── src/
│   ├── components/
│   │   ├── AiAssistant.tsx            # Gemini AI chatbot widget
│   │   ├── FloatingWhatsApp.tsx       # WhatsApp contact button
│   │   ├── Footer.tsx
│   │   ├── Header.tsx                 # Navigation + sitemap drawer
│   │   ├── JipaLogo.tsx               # Logo component (uses real PNG)
│   │   ├── JongleiMap.tsx             # Interactive county map
│   │   ├── LanguageToggle.tsx         # EN / Arabic switcher
│   │   ├── SearchModal.tsx
│   │   └── ShareButtons.tsx
│   ├── context/
│   │   ├── DataContext.tsx            # Global state + localStorage persistence
│   │   └── LanguageContext.tsx        # i18n (EN / AR)
│   ├── data/
│   │   └── initialData.ts             # Seed data: counties, candidates, news, etc.
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── AdminPage.tsx              # PIN: 2026
│   │   ├── CandidatesPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── CountiesPage.tsx
│   │   ├── DocumentsPage.tsx
│   │   ├── ElectionsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── JoinPage.tsx
│   │   ├── LeadershipPage.tsx
│   │   ├── MeetingsPage.tsx
│   │   ├── NewsPage.tsx
│   │   ├── PacPage.tsx
│   │   ├── PoliticalActionPage.tsx
│   │   ├── PrioritiesPage.tsx
│   │   └── ReportAtrocitiesPage.tsx
│   ├── types/
│   │   └── index.ts                   # All TypeScript interfaces
│   ├── App.tsx                        # Root component + page router
│   ├── index.css                      # Tailwind + JIPA brand tokens
│   └── main.tsx
├── server.js                          # Express backend + Gemini API proxy
├── .env.example                       # Environment variables reference
├── index.html
├── package.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) v18 or later
- A [Gemini API key](https://aistudio.google.com/app/apikey) (free)

### 1. Clone the repository

```bash
git clone https://github.com/21Bhang/JIPA.git
cd JIPA
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
APP_URL=http://localhost:3000
PORT=3000
```

### 4. Run in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server on port 3000 |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run start` | Run the Express backend server (serves built `dist/`) |
| `npm run start:dev` | Run Express backend with tsx (no build required) |
| `npm run lint` | TypeScript type check |

---

## Production Deployment

```bash
# Build the frontend
npm run build

# Start the Express server (serves both API and frontend)
npm run start
```

The Express server (`server.js`) serves:
- `POST /api/chat` — Gemini AI chat endpoint
- `GET  /api/health` — Health check
- All other routes → `dist/index.html` (SPA fallback)

---

## Pages & Navigation

The site uses the HTML5 History API for clean URLs — no `#` hashes.

| URL | Page |
|---|---|
| `/` | Home |
| `/about` | About JIPA |
| `/leadership` | Leadership Structure |
| `/pac` | Political Action Committee |
| `/counties` | Nine Counties of Jonglei |
| `/candidates` | Independent Candidates |
| `/elections` | Elections & Voting |
| `/action` | Political Action |
| `/priorities` | Our 20 Priorities |
| `/report` | Report Atrocities (Confidential) |
| `/join` | Join JIPA |
| `/news` | News & Statements |
| `/meetings` | Meetings & Schedule |
| `/documents` | Official Documents |
| `/contact` | Contact & Offices |
| `/admin` | Admin Panel (PIN: `2026`) |

---

## Brand Colors

Extracted from the official JIPA logo:

| Color | Hex | Usage |
|---|---|---|
| **Black** | `#111111` | Outer ring, text, backgrounds |
| **Yellow** | `#FFD700` | Inner circle, CTAs, highlights |
| **Red** | `#CC0000` | Torch flames, alerts, danger |
| **White** | `#FFFFFF` | Text on dark, torch stripes |

---

## Data & Admin

All content is stored in `localStorage` under the prefix `jipa_south_sudan_`. The admin panel at `/#/admin` (PIN: `2026`) provides full CRUD for:

- News articles
- Meetings
- Candidates
- Counties
- Site settings
- Member registrations (read + export)
- Confidential reports (read only)

To reset all data to defaults, clear `localStorage` in your browser developer tools.

---

## AI Assistant

The JIPA AI Assistant uses **Gemini 2.0 Flash** via the Express backend. It has access to live site data (candidates, counties, news, priorities) as context and supports both English and Arabic queries.

The chatbot falls back gracefully to keyword-based responses if the API is unavailable.

---

## The Nine Counties

| County | Headquarters | Population |
|---|---|---|
| Bor | Bor Town | ~320,000 |
| Twic East | Panyagor | ~160,000 |
| Duk | Duk Padiet / Duk Payuel | ~145,000 |
| Akobo | Akobo Town | ~210,000 |
| Nyirol | Pading | ~175,000 |
| Uror | Yuai | ~190,000 |
| Ayod | Ayod Town | ~165,000 |
| Pigi (Canal) | Canal Town / Khorfulus | ~120,000 |
| Fangak | Old Fangak / New Fangak | ~155,000 |

---

## JIPA's 20 Priorities

Spanning five categories agreed by grassroots assemblies across Jonglei State:

- **Peace & Security** — Reconciliation, child recovery, anti-raiding, boundary disputes, displaced families
- **Infrastructure & Transport** — Roads, airstrips, electricity, communications
- **Social Services** — Hospitals, schools, water & sanitation, refugees
- **Economic Development** — Agriculture, livestock, fisheries, markets, land rights
- **Environment & Governance** — Flood management, wildlife, accountability

---

## Contributing

This is the official repository for the JIPA website. For content updates, candidate submissions, or technical contributions:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## License

This project is the intellectual property of the **Jonglei Independent Political Alliance (JIPA)**. All rights reserved.

Website: [www.jipasouthsudan.org](https://www.jipasouthsudan.org)  
Email: [info@jipasouthsudan.org](mailto:info@jipasouthsudan.org)  
GitHub: [github.com/21Bhang/JIPA](https://github.com/21Bhang/JIPA)  
Social: [@JIPASouthSudan](https://twitter.com/JIPASouthSudan)

---

<div align="center">

**POWER TO THE PEOPLE**

*Jonglei Independent Political Alliance — Jonglei State, South Sudan*

</div>
