# Traffix AI: Efficient Traffic Management System Using Deep Learning

**Traffix AI** is a state-of-the-art urban neural network designed to eliminate traffic congestion and automate municipal enforcement. By leveraging high-speed instance segmentation and optical character recognition, the platform provides real-time governance of city intersections.

---

## 🚀 Key Features

### 1. Real-Time Neural Feed
*   **Live Camera Integration**: Connects to municipal IP cameras via browser-native APIs.
*   **Automated Registration**: Every unique number plate detected is instantly cross-referenced and registered in the municipal database if not already present.
*   **Sub-second Latency**: Processing frames through Gemini 3 Flash for immediate violation detection (Speeding, Red Light Jumps).

### 2. Forensic Video Suite
*   **Post-Event Analysis**: Upload multi-lane surveillance footage for deep-pixel reconstruction.
*   **SOLO v2 & SSD Simulation**: Simulates the pipeline for Instance Segmentation (SOLO) and Single Shot MultiBox Detector (SSD) to track vehicle trajectories.
*   **Auto-Challan System**: Generates electronic fines (localized in **₹ Rupee**) with cryptographically secured evidence logs.

### 3. Unified Vehicle Registry
*   **CRUD Management**: Full control over vehicle records, including the ability to delete forensic data or audit history.
*   **Violation Tracking**: Comprehensive history for every vehicle, tracking fine status (Paid/Pending) and location-specific data.

### 4. AI Traffic Assistant
*   **Gemini 3 Integration**: A professional AI specialist capable of explaining traffic density patterns, model architectures, and city planning strategies.

---

## 🛠️ Tech Stack & Libraries

### **Core Frontend**
- **React 19**: Utilizing the latest concurrent rendering features and hooks.
- **TypeScript**: Ensuring type safety across complex vehicle and fine record structures.
- **Tailwind CSS**: A utility-first CSS framework for a sleek, "Forensic-Dark" and "High-Contrast" aesthetic.
- **Lucide/Font-Awesome**: Premium iconography for professional utility.

### **Intelligence & Computer Vision**
- **Google Gemini API (@google/genai)**:
    - `gemini-3-flash-preview`: Used for real-time visual analysis and plate recognition.
    - `gemini-3-pro-preview`: Powers the high-reasoning AI Assistant for operator queries.
- **HTML5 Canvas**: Used for frame capturing and pixel data extraction from video streams.

### **Architecture**
- **Spatio-Temporal Logic**: Simulated logic for determining vehicle maneuver violations based on frame-by-frame coordinate analysis.
- **Mobile-First Design**: Fully responsive sidebar drawer and layout system that adjusts from 4K command centers to mobile field-operator devices.

---

## 📁 Project Structure

- `/components`: Modular UI elements (LiveFeed, VideoUploader, Database, ChatBot, etc.)
- `/services`: Interface for Google GenAI integration.
- `/constants`: Mock database and global theme configuration.
- `types.ts`: Centralized TypeScript interfaces for system-wide consistency.

---

## 🔧 Installation & Setup

1. **Environment Requirements**:
   - The system requires a valid Google Gemini API Key injected via `process.env.API_KEY`.
   - Camera permissions must be granted for the "Live Dashboard" feature.

2. **Local Execution**:
   - The app uses ES6 modules. Ensure your server supports module-loading for `index.tsx`.
   - Run via a standard Vite or ESM-compatible bundler.

---

## ⚖️ Compliance & Governance
Traffix AI is designed to adhere to standard municipal data protection laws. All forensic evidence is simulated to demonstrate the potential for cryptographically signed records in a production environment. 

**Currency Localization**: All monetary values are processed in **Indian Rupee (₹)** to align with regional traffic authority standards.

---
*Developed by the CSE-90 Team.*
