# Digital Flora Catalog (Sapa Flora Alamendah)

## 1. Project Overview
The "Digital Flora Catalog" is a responsive, mobile-first web application functioning as a digital botanical encyclopedia. It is specifically designed to facilitate tourists in physical public parks; by scanning a physical QR code attached to a plant, visitors are instantly directed to a comprehensive information page about that specific specimen.

This system was developed as part of the KKN-PM (Community Service Program) Period 2, 2026, by the Rancabali Merona cluster from Universitas Gadjah Mada (UGM) to support the digitization of botanical assets in Desa Alamendah.

## 2. Architecture & Tech Stack
- **Frontend:** Next.js (React Framework, App Router), Tailwind CSS
- **Database:** Local JSON File (`data/plants.json`)
- **Deployment:** Vercel (Hobby Tier)
- **Visual Assets:** Stored locally in `/public/images/plants/`
- **Additional Libraries:** `qrcode.react` (Automated QR Generator)
- **Security:** Manual Next.js Middleware (for Admin route protection)

## 3. Key Features
- **Mobile-First Botanical UI:** A clean, high-contrast, and highly legible design optimized for outdoor readability under direct sunlight.
- **Dynamic QR Routing:** The system automatically generates a downloadable QR code for every plant in the database, linking directly to its dynamic route (`/flora/[id]`).
- **Git-Based CMS:** Lightweight data management utilizing a local JSON file, completely eliminating the need for complex external database setups during the field deployment phase.
- **Protected Admin Dashboard:** A secure, hidden interface for data entry (Create, Read, Update, Delete) accessible only via environment variable credentials.

## 4. Getting Started

### Prerequisites
- Node.js (v18.17 or higher)
- npm, yarn, or pnpm

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd digital-flora-catalog
2. Install the required dependencies:
    ```bash
    npm instal
3. Configure environment variables:
    ```bash
    Create a `.env.local` file in the root directory and define the credentials for the admin dashboard:

    ADMIN_USERNAME=your_secure_username
    ADMIN_PASSWORD=your_secure_password
4. Start the development server:
    ```bash
    npm run dev
Open `http://localhost:3000` in your browser to view the application.

## 5. Deployment & Data Management Workflow

This project is configured for deployment on Vercel. Because Vercel utilizes a serverless architecture, the runtime filesystem is ephemeral (read-only).

To manage data effectively, this application employs a **Git-Based CMS approach**:

1. Run the application in your **local development environment** (`localhost`).
2. Log in to the Admin Dashboard to add new plants, update descriptions, and upload images.
3. The system will write the changes to `data/plants.json` and save images to `/public/images/plants/`.
4. Commit the changes and push them to your repository (`git push origin main`).
5. Vercel will automatically catch the webhook, rebuild the application, and deploy the updated, read-only botanical catalog with zero downtime.

## 6. License

Copyright © 2026 Desa Alamendah & KKN-PM UGM Rancabali Merona. All rights reserved.

