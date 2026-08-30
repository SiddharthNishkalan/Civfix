# 🌾 CiviFix - Rural Civic Infrastructure & Village Empowerment Platform

> **Empowering Village Panchayats with AI-Enabled Governance & Rapid Civic Action**

CiviFix is a modern, voice-first rural governance and civic issue resolution platform designed specifically for Gram Panchayats, citizens, field engineers, and district administrators. Centered on **South Indian rural infrastructure (Kovilpatti, Thoothukudi District, Tamil Nadu)**, CiviFix streamlines village grievance reporting, dispatch routing, SLA monitoring, and proof-of-work verification.

---

## 🌟 Key Features

### 1. 👥 Multi-Role Persona Switcher & Authentication
- **Citizen Persona (`Selvi Murugan`)**: Report civic issues via Voice AI or Camera, track active tickets, and redeem community points for subsidized rural passes and solar equipment.
- **Field Officer Portal (`Er. Senthil Kumar`)**: Assistant Engineer view for TWAD Board & Rural Roads; dispatch crews, track SLAs, update repair progress, and upload resolution proof.
- **District Command Center (`District Collector Office - Thoothukudi HQ`)**: High-level civic intelligence, department-wise SLA tracking, budget utilization, and AI anomaly alerts.
- **Panchayat President / Sarpanch (`Thiru Arumugam`)**: Local council verification, Gram Sabha resolutions, and village cleanliness rankings.
- **Flexible Login**: Mobile OTP (demo code `5842`), Mobile + Password, or instant 1-click persona quick-launchers.

### 2. 🎙️ Multimodal Voice AI & Instant Grievance Reporting
- **Voice AI Assistant**: Speak in natural language; the system transcribes, extracts category, location, and severity, auto-filling the report.
- **Interactive Multi-Step Wizard**: 5-step guided filing with category picker, ward/street landmark selector, camera photo evidence, and AI department triage.
- **Live GIS GPS Auto-Detect**: Pins coordinates with 3.5m accuracy onto the Panchayat map.

### 3. 🔍 Track Grievance & Completed Work Verification
- **5-Stage Pipeline Stepper**: `Reported` ➔ `AI Verified` ➔ `Assigned` ➔ `In Progress` ➔ `Resolution Certified`.
- **48-Hour SLA Countdown Timer**: Real-time SLA urgency tracker with countdown clock and severity score (0–100).
- **Interactive Before vs After Verification**:
  - **Comparison Slider Mode**: Interactive drag handle to compare damage vs repair.
  - **Side-by-Side Mode**: View unzoomed before & after images simultaneously.
  - **100% Full-Frame Unzoomed**: Aspect-ratio-preserving container (`object-contain`) on contrast backdrop.
- **District Collector (DM) Escalation**: One-click grievance escalation modal for delayed tickets.
- **Direct Officer Call & Gram Sabha Discussion**: Contact assigned field engineers and discuss solutions with fellow villagers.

### 4. 🗺️ Live Leaflet GIS Heatmap & Dashboard
- Interactive village map centered on Kovilpatti Block with categorized custom status markers (urgent red, in-progress amber, resolved green).
- High-level Panchayat health metrics: Clean Water Uptime, Road Quality Index, Solar Street Lighting %, and Clean Village Ranking.

### 5. 🏆 Civic Gamification & Community Rewards
- Earn Civic Points for reporting and verifying public infrastructure.
- Redeem vouchers for **TNSTC Monthly Rural Bus Passes**, **TEDA Solar Emergency Lanterns**, **Organic Seed & Bio-Fertilizer Kits**, and **Priority Gram Sabha Motions**.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom **Rural Civic Modern** design system (`#00452d` Deep Forest Green, `#3c6938` Earth Green, `#eefdf4` Surface, `#efc052` Warm Gold)
- **Icons**: [Lucide React](https://lucide.dev/) & [Google Material Symbols Outlined](https://fonts.google.com/icons)
- **Mapping**: [Leaflet](https://leafletjs.com/) & OpenStreetMap
- **State Management**: React Context API with automatic `localStorage` persistence

---

## 📂 Project Structure

```
stitch_civifix_rural_empowerment_platform/
├── public/
│   ├── favicon.svg                # Native vector logo emblem
│   └── images/
│       ├── handpump_before.jpg    # Reported handpump damage evidence
│       └── handpump_after.jpg     # Completed restoration photo
├── src/
│   ├── components/
│   │   └── common/
│   │       ├── BeforeAfterSlider.tsx   # Interactive full-frame comparison slider
│   │       ├── MapView.tsx             # Interactive Leaflet OpenStreetMap
│   │       ├── Navbar.tsx              # Navigation bar with persona dropdown
│   │       ├── NotificationToast.tsx   # Floating alert toast system
│   │       ├── Sidebar.tsx             # Collapsible side navigation
│   │       └── VoiceAssistantModal.tsx # Simulated Voice AI assistant
│   ├── context/
│   │   └── AppContext.tsx         # Central state, multi-role auth & local storage
│   ├── data/
│   │   └── mockData.ts            # South India dataset (issues, departments, rewards)
│   ├── pages/
│   │   ├── AdminAnalyticsPage.tsx # District Collector intelligence dashboard
│   │   ├── CitizenDashboard.tsx   # Citizen home & community grievance feed
│   │   ├── CivicRewardsPage.tsx   # Gamification & rewards catalog
│   │   ├── LoginPage.tsx          # Initial entry authentication gateway
│   │   ├── OfficerDashboardPage.tsx # Field engineer taskforce portal
│   │   ├── RegisterPage.tsx       # Citizen onboarding with Panchayat hierarchy
│   │   ├── ReportIssuePage.tsx    # 5-step grievance reporting wizard
│   │   ├── ReportSuccessPage.tsx  # Digital receipt with QR tracking code
│   │   ├── TrackIssuePage.tsx     # 5-stage SLA tracking & Before/After verification
│   │   └── WelcomePage.tsx        # Public landing & feature highlights
│   ├── types/
│   │   └── index.ts               # Complete TypeScript data contracts
│   ├── App.tsx                    # Main view router
│   ├── index.css                  # Tailwind styles & theme variables
│   └── main.tsx                   # App entrypoint
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone or navigate to the repository:**
   ```bash
   cd stitch_civifix_rural_empowerment_platform
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 👤 Demo Personas & Quick Login

On the initial login screen or through the top navbar dropdown, you can instantly test any role:

| Persona | Role | Location | Focus Area |
|---|---|---|---|
| **Selvi Murugan** | Citizen | Ward 4 (West Street / Melur) | Report issues, voice filing & reward redemption |
| **Er. Senthil Kumar** | Assistant Engineer | Kovilpatti Cluster | TWAD Board & Rural Roads work orders |
| **District Collector** | District Admin | Thoothukudi HQ | Civic analytics, SLA compliance & anomaly detection |
| **Thiru Arumugam** | Council President | Kovilpatti Village Panchayat | Panchayat council oversight & Gram Sabha |

---

## 📄 License
This project is developed for rural civic infrastructure empowerment and community governance.
