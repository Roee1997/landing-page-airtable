# LaunchPro — E-commerce & ERP Implementation Landing Page

A landing page for an e-commerce/ERP implementation company. Visitors fill out an onboarding form and their data is sent securely to Airtable, where it's stored as a new implementation lead.

Built with Next.js 16, React 19, and Tailwind CSS v4.

---

## Tech Stack

Next.js 16 (App Router) — framework, routing, and server-side API Routes  
React 19 — UI components and client-side interactivity  
Tailwind CSS v4 — utility-first styling  
Airtable API — stores form submissions as implementation leads  

---

## Features

Typewriter animation in the Hero section — cycles through service phrases in a loop  
Service cards with hover scale and pulse glow effect  
Process steps with a continuous floating animation on the step numbers  
Contact form fields that slide in when scrolled into view  
Mobile hamburger navigation menu  
Form validation with per-field error messages and email format check  
Server-side whitelist validation for Business Type  
Secure Airtable integration — API token is never exposed to the browser  
Responsive layout for mobile, tablet, and desktop  

---

## Project Structure

```
airtable-landing-page/
├── app/
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── api/
│       └── contact/
│           └── route.js
├── components/
│   ├── Navbar.js
│   ├── Hero.js
│   ├── Services.js
│   ├── Process.js
│   └── ContactForm.js
├── public/
├── .env.local              ← not committed to Git
├── .gitignore
├── package.json
└── README.md
```

---

## File Descriptions

### app/layout.js
The root layout that wraps every page. Loads the Geist font, imports global CSS, and sets the page title and meta description. Next.js applies this automatically to all routes — you never call it directly.

### app/page.js
The main page. Imports and renders all sections in order: Navbar, Hero, Services, Process, ContactForm, and the footer. It's a Server Component — no interactivity here, just composition.

### app/globals.css
Global styles. Contains the Tailwind import, the overflow fix for mobile horizontal scroll, and the CSS keyframe animations used by Services (pulse glow), Process (float), and ContactForm (slide-in).

### app/api/contact/route.js
The server-side POST handler. Receives form data from the browser, validates required fields (Full Name, Email, Message), checks that Business Type is from the allowed list, then forwards the data to Airtable using the API token from environment variables. The token never reaches the browser.

### components/Navbar.js
The sticky top navigation bar. A Client Component — uses React state to toggle the mobile hamburger menu open and closed. On desktop, shows inline nav links. On mobile (below 640px), shows a hamburger button that opens a dropdown menu.

### components/Hero.js
The full-screen hero section with the gradient background. A Client Component — uses React state and a timer loop to implement the typewriter animation that cycles through service phrases in the blue heading text.

### components/Services.js
Displays three service cards in a grid. A Server Component — no interactivity. The hover animation (scale + pulse glow) is handled entirely in CSS via the card-pulse class defined in globals.css.

### components/Process.js
Displays four numbered implementation steps in a grid. A Server Component. Each step's numbered circle has a continuous floating animation applied via inline CSS with a staggered delay, creating a wave effect.

### components/ContactForm.js
The onboarding form. A Client Component — manages form state, validation errors, and submission status. Uses an Intersection Observer to trigger a slide-in animation on the form fields when the section enters the viewport. On submit, sends data to /api/contact and shows a success or error state.

---

## How to Run Locally

**1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/airtable-landing-page.git
cd airtable-landing-page
```

**2. Install dependencies**
```bash
npm install
```

**3. Create an Airtable table**

Create a table named `Implementation Requests` with these fields:

| Field | Type |
|---|---|
| Full Name | Single line text |
| Business Email | Email |
| Company Name | Single line text |
| Business Type | Single select: E-commerce, Retail, Wholesale, Services, Other |
| Current ERP | Single line text |
| Message | Long text |
| Status | Single select: New, In Review, Contacted, Won, Lost |

**4. Set up environment variables**

Create a `.env.local` file in the project root:
```
AIRTABLE_API_TOKEN=your_personal_access_token
AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
AIRTABLE_TABLE_NAME=Implementation Requests
```

**5. Start the dev server**
```bash
npm run dev
```

Open http://localhost:3000

---

## How the Airtable Integration Works

The form sends a POST request to `/api/contact` — a Next.js API Route that runs on the server. The server validates the data, then forwards it to Airtable using the API token from the environment. The token is only available server-side and is never included in the JavaScript sent to the browser.

```
Browser fills form
  → POST /api/contact  (Next.js server)
    → Validates fields
    → POST api.airtable.com  (with secret token)
    → Returns success or error
  → Form shows result to user
```

---

## Environment Variables

| Variable | Description |
|---|---|
| AIRTABLE_API_TOKEN | Personal Access Token from Airtable |
| AIRTABLE_BASE_ID | Base ID from the Airtable URL — starts with "app" |
| AIRTABLE_TABLE_NAME | Table name — default is "Implementation Requests" |
