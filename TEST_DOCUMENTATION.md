4. [Test Suite Structure](#4-test-suite-structure)
5. [Layer 1 — Unit / Component# AutoNxt — UI Test Suite Documentation

**Project:** AutoNxt Automation (Electric Tractor Marketing Website)  
**Test Framework:** [Playwright](https://playwright.dev/) v1.60  
**Language:** JavaScript (ES Modules)  
**Base URL:** `http://localhost:5173`  
**Date:** June 2026  

---

## Table of Contents

1. [Overview](#1-overview)
2. [QA Pyramid Strategy](#2-qa-pyramid-strategy)
3. [Project & Tech Stack](#3-project--tech-stack)
 Tests](#5-layer-1--unit--component-tests)
   - [Navbar Component](#51-navbar-component)
   - [Home Page Sections](#52-home-page-sections)
   - [Booking Form Fields](#53-booking-form-fields)
6. [Layer 2 — Integration Tests](#6-layer-2--integration-tests)
   - [Home ↔ Navigation](#61-home--navigation)
   - [Product Listing ↔ Detail](#62-product-listing--detail)
   - [Industry Listing ↔ Detail](#63-industry-listing--detail)
   - [Language Switcher](#64-language-switcher)
   - [Gallery](#65-gallery)
   - [News & EV Blog](#66-news--ev-blog)
   - [Contribution, Privacy, Terms & 404](#67-contribution-privacy-terms--404)
7. [Layer 3 — End-to-End (E2E) Tests](#7-layer-3--end-to-end-e2e-tests)
   - [Book a Test Drive Journey](#71-book-a-test-drive-journey)
   - [Product Discovery Journey](#72-product-discovery-journey)
   - [Responsive Design & Accessibility](#73-responsive-design--accessibility)
   - [Performance & Error Monitoring](#74-performance--error-monitoring)
   - [Full-Site Smoke Tests](#75-full-site-smoke-tests)
8. [Complete Test Case Index](#8-complete-test-case-index)
9. [Running the Tests](#9-running-the-tests)
10. [Test Configuration](#10-test-configuration)
11. [Coverage Summary](#11-coverage-summary)

---

## 1. Overview

This document describes the complete UI test suite written for the **AutoNxt** website — a React 18 + TypeScript marketing and booking platform for AutoNxt Automation's electric tractor product line.

The suite contains **~142 test cases** organized across **15 spec files** following the formal **QA Pyramid** model. Tests are written entirely in Playwright and cover every public-facing route, all interactive components, and multiple real-user journeys.

### Scope

| Area | Routes Covered |
|---|---|
| Marketing pages | `/`, `/about`, `/contribution`, `/gallery`, `/news`, `/blog`, `/ev-blog` |
| Product pages | `/product`, `/product/x45h2`, `/product/x25h2`, `/product/attachment/*` |
| Industry pages | `/industry`, `/industry/biomass`, `/industry/cement`, `/industry/construction`, `/industry/defence`, `/industry/airport`, `/industry/metal` |
| Booking | `/book` |
| Content pages | `/privacy`, `/terms`, `/careers` |
| Error handling | Unknown routes (404) |

---

## 2. QA Pyramid Strategy

The QA Pyramid is a formal testing methodology that balances speed, cost, and confidence by layering tests from the most granular to the most comprehensive.

```
          ▲
         /E2E\          ← Few, slow, high-confidence user journeys
        /─────\
       / Integ \        ← Medium — components talking to each other
      /─────────\
     /   Unit    \      ← Many, fast, isolated component checks
    /─────────────\
```

### Why this approach?

| Layer | Count | Speed | Confidence | Purpose |
|---|---|---|---|---|
| **Unit** | 53 tests | Fast | Component-level | Verify individual UI elements render and behave correctly in isolation |
| **Integration** | 65 tests | Medium | Feature-level | Verify multiple components / pages work correctly together |
| **E2E** | ~124 tests | Slower | User-journey-level | Simulate complete real-user flows from first click to last action |

This structure means:
- **Unit tests** run first and catch regressions in specific components quickly
- **Integration tests** catch broken wiring between pages and sections
- **E2E tests** act as the final confidence gate before any release

---

## 3. Project & Tech Stack

| Category | Technology |
|---|---|
| Framework | React 18.3 + TypeScript |
| Bundler | Vite 6.0 |
| Router | Wouter 3.3 (client-side) |
| Styling | Tailwind CSS 4.0 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Animation | Framer Motion 11 |
| 3D Graphics | three.js + @react-three/fiber |
| Forms | React Hook Form + Zod |
| i18n | Custom LanguageProvider (EN / HI / MR / TE) |
| Backend | AWS DynamoDB + Nodemailer |
| Test Runner | Playwright 1.60 |

### Pages Under Test

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, stats, partner logos, product teaser, industry cards, tech showcase, FAQ |
| `/product` | Product Listing | Filter buttons, tractor + attachment cards |
| `/product/x45h2` | Tractor Detail | Specs, features, applications, 3D model |
| `/product/x25h2` | Tractor Detail | Smaller model variant |
| `/product/attachment/bucket` | Attachment Detail | Bucket specs and features |
| `/product/attachment/catcher` | Attachment Detail | Catcher specs and features |
| `/product/attachment/loader` | Attachment Detail | Loader specs and features |
| `/industry` | Industry Listing | 6 industry solution cards |
| `/industry/:slug` | Industry Detail | Per-industry detail (6 pages) |
| `/gallery` | Gallery | Image grid + lightbox |
| `/about` | About | Company story, team, advisors |
| `/book` | Book / Contact | Contact form + info sidebar |
| `/blog` | Blog | Article cards, search, filters |
| `/ev-blog` | EV Blog | EV articles + animated stats |
| `/news` | News | Press and media articles |
| `/careers` | Careers | Job listings + application CTA |
| `/contribution` | Contribution | Impact / contribution section |
| `/privacy` | Privacy Policy | Legal text |
| `/terms` | Terms & Conditions | Legal text |
| `*` | 404 | Not-found fallback |

---

## 4. Test Suite Structure

```
tests/
│
├── unit/                          ← Layer 1: Component Tests
│   ├── navbar.spec.js             (15 tests)
│   ├── home-sections.spec.js      (17 tests)
│   └── form-fields.spec.js        (21 tests)
│
├── integration/                   ← Layer 2: Integration Tests
│   ├── home-navigation.spec.js    (11 tests)
│   ├── product-flow.spec.js       (16 tests)
│   ├── industry-flow.spec.js      (12 tests)
│   ├── language-switcher.spec.js  (7 tests)
│   ├── gallery.spec.js            (6 tests)
│   ├── news-evblog.spec.js        (8 tests)
│   └── contribution-privacy-terms.spec.js  (11 tests)
│
├── e2e/                           ← Layer 3: End-to-End Tests
│   ├── book-a-test-drive.spec.js  (9 tests)
│   ├── product-discovery.spec.js  (8 tests)
│   ├── responsive-and-accessibility.spec.js  (18 tests)
│   ├── performance-and-errors.spec.js  (32 tests)
│   └── full-site-smoke.spec.js    (24 tests)
│
│   [Legacy — pre-existing tests, retained for compatibility]
├── home.spec.js
├── smoke.spec.js
├── products.spec.js
├── navigation.spec.js
├── contact.spec.js
├── about.spec.js
├── blog.spec.js
├── careers.spec.js
└── industry.spec.js
```

---

## 5. Layer 1 — Unit / Component Tests

Unit tests verify that individual UI components render correctly and behave as expected **in isolation** — no multi-page flows, just: is the element present, does it have the right state, can the user interact with it?

---

### 5.1 Navbar Component

**File:** `tests/unit/navbar.spec.js`  
**Total Tests:** 15

The Navbar is a fixed, globally-shared component that renders on every page. It contains the logo, 6 navigation links, a Resources dropdown, a Language switcher, and a Book Now CTA. On mobile it collapses into a hamburger menu.

| Test ID | Test Name | What is verified |
|---|---|---|
| UNIT-NAV-001 | Navbar renders on every page | `<nav>` element is visible on `/` |
| UNIT-NAV-002 | Logo is visible | `data-testid="link-home-logo"` element is visible |
| UNIT-NAV-003 | Brand name "AutoNxt" is visible | Text `/autonxt/i` exists inside `<nav>` |
| UNIT-NAV-004 | All 6 desktop nav links are present | Count of `nav a[data-testid^="link-nav-"]` equals 6 |
| UNIT-NAV-005 | "Book Now" CTA button is visible in navbar | Book Now link is visible inside `<nav>` |
| UNIT-NAV-006 | Navbar gains background after scroll | After 200px scroll, `bg-white` class is applied |
| UNIT-NAV-007 | Active route link is visually distinguished | `link-nav-product` testid visible when on `/product` |
| UNIT-NAV-008 | Language switcher button is visible | Button matching `/EN\|HI\|MR\|TE/i` in navbar |
| UNIT-NAV-009 | Language switcher opens on click | Clicking shows Hindi/English/Marathi/Telugu options |
| UNIT-NAV-010 | Mobile hamburger button visible on small screens | Last SVG button visible at 375px width |
| UNIT-NAV-011 | Mobile menu opens when hamburger is clicked | Nav links become visible after click |
| UNIT-NAV-012 | Mobile menu closes after selecting a link | Clicking About navigates to `/about` |
| UNIT-NAV-013 | Resources dropdown is present in desktop nav | Text `/resources/i` visible in `<nav>` |
| UNIT-NAV-014 | Resources dropdown shows News, Blog, EV Blog | Hovering Resources reveals News and Blog links |
| UNIT-NAV-015 | Navbar has no detached ARIA roles | `<nav>` has a `class` attribute |

---

### 5.2 Home Page Sections

**File:** `tests/unit/home-sections.spec.js`  
**Total Tests:** 17

The Home page is composed of 10+ lazy-loaded sections. These tests verify each section renders its expected content.

| Test ID | Test Name | Section | What is verified |
|---|---|---|---|
| UNIT-HOME-001 | Hero section headline is visible | Hero | `<h1>` exists and is visible |
| UNIT-HOME-002 | Hero CTA "Explore Products" is visible | Hero | Link with text `/explore products/i` |
| UNIT-HOME-003 | Hero CTA "Book Now" is visible | Hero | Link with text `/book now/i` |
| UNIT-HOME-004 | Hero description text rotates every 5s | Hero | Page remains stable after 5.5s |
| UNIT-HOME-005 | Stats bar section is visible | Stats | Text `/150\+/` visible |
| UNIT-HOME-006 | "Trusted By" partner logos section is visible | Partners | `data-testid="logo-partner-0"` visible |
| UNIT-HOME-007 | At least one partner logo image loads | Partners | Count of `logo-partner-*` > 0 |
| UNIT-HOME-008 | Product teaser cards section is visible | Products | Heading with X45H2 or X25H2 |
| UNIT-HOME-009 | Product teaser card shows spec icons | Products | Card with `data-testid="card-product-*"` or product name |
| UNIT-HOME-010 | Industrial Solutions section heading is visible | Industries | Heading with `/industrial solutions\|powering/i` |
| UNIT-HOME-011 | All 6 industry cards are rendered | Industries | Biomass, Cement, Construction, Defence, Airport, Metal text visible |
| UNIT-HOME-012 | Field photo banner image is visible | Banner | First `<img>` role is visible |
| UNIT-HOME-013 | Bottom CTA "Ready to Go Electric?" visible | CTA | Text `/go electric\|book now\|get started/i` after scroll |
| UNIT-HOME-014 | Footer is visible on Home page | Footer | `<footer>` visible |
| UNIT-HOME-015 | Footer contains company email link | Footer | `footer a[href^="mailto:"]` visible |
| UNIT-HOME-016 | Page `<title>` contains "AutoNxt" | SEO | `page.title()` matches `/AutoNxt/i` |
| UNIT-HOME-017 | Page has a meta description | SEO | `meta[name="description"]` content length > 10 |

---

### 5.3 Booking Form Fields

**File:** `tests/unit/form-fields.spec.js`  
**Total Tests:** 21  
**Setup:** Each test navigates to `/book` via `beforeEach`

| Test ID | Test Name | Category | What is verified |
|---|---|---|---|
| UNIT-FORM-001 | Name input is visible and enabled | Rendering | `input[name="name"]` visible + enabled |
| UNIT-FORM-002 | Email input is visible and enabled | Rendering | `input[name="email"]` visible + enabled |
| UNIT-FORM-003 | Phone input has type="tel" | Input type | `type` attribute === `"tel"` |
| UNIT-FORM-004 | Email input has type="email" | Input type | `type` attribute === `"email"` |
| UNIT-FORM-005 | Preferred date input has type="date" | Input type | `type` attribute === `"date"` |
| UNIT-FORM-006 | Message textarea is visible | Rendering | `textarea[name="message"]` visible |
| UNIT-FORM-007 | Name field label shows required asterisk | Required marker | Label contains `*` |
| UNIT-FORM-008 | Email field label shows required asterisk | Required marker | Label contains `*` |
| UNIT-FORM-009 | Message field label shows required asterisk | Required marker | Label contains `*` |
| UNIT-FORM-010 | Name field accepts text input | Value binding | `.fill()` + `toHaveValue()` |
| UNIT-FORM-011 | Email field accepts a valid email | Value binding | `test@autonxt.in` accepted |
| UNIT-FORM-012 | Phone field accepts numeric input | Value binding | `9876543210` accepted |
| UNIT-FORM-013 | Location field accepts text input | Value binding | `Pune, Maharashtra` accepted |
| UNIT-FORM-014 | Subject field accepts text input | Value binding | `Test Drive Request` accepted |
| UNIT-FORM-015 | Message textarea accepts multi-line text | Value binding | Multi-line string accepted |
| UNIT-FORM-016 | Submit button is visible and type=submit | Submit button | `type === "submit"` |
| UNIT-FORM-017 | Submit button is not disabled initially | Submit button | Not disabled on page load |
| UNIT-FORM-018 | Phone contact link is a tel: link | Contact sidebar | `a[href^="tel:"]` href matches phone pattern |
| UNIT-FORM-019 | Email contact link is a mailto: link | Contact sidebar | `a[href^="mailto:"]` contains `@` |
| UNIT-FORM-020 | Copy phone button is visible | Contact sidebar | `button[title="Copy to clipboard"]` visible |
| UNIT-FORM-021 | Tractor image on the right panel is visible | Contact sidebar | `img[alt="AutoNxt X45H2 Electric Tractor"]` visible |

---

## 6. Layer 2 — Integration Tests

Integration tests verify that **two or more components or pages interact correctly**. They test routing, state propagation, and cross-page data consistency — things no unit test can catch alone.

---

### 6.1 Home ↔ Navigation

**File:** `tests/integration/home-navigation.spec.js`  
**Total Tests:** 11

| Test ID | Test Name | What is verified |
|---|---|---|
| INT-HOMENAV-001 | "Explore Products" CTA navigates to /product | URL becomes `/product` |
| INT-HOMENAV-002 | "Book Now" hero CTA navigates to /book | URL becomes `/book` |
| INT-HOMENAV-003 | Navbar logo click from internal page returns home | From `/product`, logo click → `/` |
| INT-HOMENAV-004 | Industry card click navigates to /industry | URL matches `/industr/` |
| INT-HOMENAV-005 | Home product card "View Details" links to product | URL changes from `/` |
| INT-HOMENAV-006 | Navigating to a new page resets scroll to top | `window.scrollY === 0` after nav |
| INT-HOMENAV-007 | Resources > Blog navigates to /blog | URL becomes `/blog` |
| INT-HOMENAV-008 | Resources > News navigates to /news | URL becomes `/news` |
| INT-HOMENAV-009 | Resources > EV Blog navigates to /ev-blog | URL becomes `/ev-blog` |
| INT-HOMENAV-010 | Footer Privacy link navigates to /privacy | URL becomes `/privacy` |
| INT-HOMENAV-011 | Footer Terms link navigates to /terms | URL becomes `/terms` |

---

### 6.2 Product Listing ↔ Detail

**File:** `tests/integration/product-flow.spec.js`  
**Total Tests:** 16

| Test ID | Test Name | Category | What is verified |
|---|---|---|---|
| INT-PROD-001 | "All" filter shows both tractors and attachments | Filter | X45H2 visible after All click |
| INT-PROD-002 | "Tractors" filter removes attachment products | Filter | X45H2 still visible after Tractors filter |
| INT-PROD-003 | "Attachments" filter shows attachment cards | Filter | bucket/catcher/loader text visible |
| INT-PROD-004 | Switching filters back to "All" restores all cards | Filter | X45H2 visible after cycling filters |
| INT-PROD-005 | X45H2 detail page loads from product listing | Routing | URL matches `/product/.+` |
| INT-PROD-006 | X45H2 detail URL is /product/x45h2 | Routing | URL matches `/product/x45h2/i` |
| INT-PROD-007 | Detail page "Back" link returns to /product | Back navigation | URL becomes `/product` |
| INT-PROD-008 | All 4 detail sections exist on X45H2 page | Content | Technical, Features, Applications visible |
| INT-PROD-009 | X25H2 detail page loads correctly | Routing | URL `/x25h2`, heading visible |
| INT-PROD-010 | Bucket attachment detail page loads | Routing | URL `/bucket`, h1 visible |
| INT-PROD-011 | Bucket page shows Technical Details section | Content | Text "Technical Details" visible |
| INT-PROD-012 | Catcher attachment detail page loads | Routing | URL `/catcher`, h1 visible |
| INT-PROD-013 | Loader attachment detail page loads | Routing | URL `/loader`, h1 visible |
| INT-PROD-014 | "Reserve Now" on product listing goes to /book | CTA routing | URL becomes `/book` |
| INT-PROD-015 | "Schedule Test Drive" on detail page goes to /book | CTA routing | URL becomes `/book` |
| INT-PROD-016 | Unknown product slug shows 404 or redirects gracefully | Error handling | Page does not crash |

---

### 6.3 Industry Listing ↔ Detail

**File:** `tests/integration/industry-flow.spec.js`  
**Total Tests:** 12

| Test ID | Test Name | What is verified |
|---|---|---|
| INT-IND-001 | Industry listing shows all 6 industry cards | All 6 industry names visible on `/industry` |
| INT-IND-002 | Industry listing tractor section shows both models | X45H2 and X25H2 headings visible |
| INT-IND-003-biomass | Biomass detail page loads at /industry/biomass | URL + h1 visible |
| INT-IND-003-cement | Cement detail page loads at /industry/cement | URL + h1 visible |
| INT-IND-003-construction | Construction detail page loads | URL + h1 visible |
| INT-IND-003-defence | Defence detail page loads | URL + h1 visible |
| INT-IND-003-airport | Airport detail page loads | URL + h1 visible |
| INT-IND-003-metal | Metal detail page loads | URL + h1 visible |
| INT-IND-009 | Industry detail page has a back/breadcrumb link | Back link visible |
| INT-IND-010 | Industry detail page back link navigates to /industry | URL becomes `/industry` |
| INT-IND-011 | Industry detail page has CTA to book or contact | Book/Contact link visible |
| INT-IND-012 | Unknown industry slug does not crash the page | Body visible, no crash |

---

### 6.4 Language Switcher

**File:** `tests/integration/language-switcher.spec.js`  
**Total Tests:** 7

| Test ID | Test Name | What is verified |
|---|---|---|
| INT-LANG-001 | Language switcher renders in the navbar | Switcher button visible |
| INT-LANG-002 | Language dropdown lists all 4 languages | Hindi, Marathi, Telugu, English options shown |
| INT-LANG-003 | Switching to Hindi (HI) updates the UI | Navbar button shows HI or हिंदी |
| INT-LANG-004 | Switching to Marathi (MR) updates the UI | Navbar button shows MR or मराठी |
| INT-LANG-005 | Switching to Telugu (TE) updates the UI | Navbar button shows TE or తెలుగు |
| INT-LANG-006 | Switching back to English (EN) restores English text | EN visible in navbar |
| INT-LANG-007 | Selected language persists after navigating to another page | HI still active after going to `/product` |

---

### 6.5 Gallery

**File:** `tests/integration/gallery.spec.js`  
**Total Tests:** 6

| Test ID | Test Name | What is verified |
|---|---|---|
| INT-GAL-001 | Gallery page loads successfully | URL `/gallery`, h1 visible |
| INT-GAL-002 | Gallery images are visible | First image visible |
| INT-GAL-003 | Gallery grid has at least 4 images | Image count ≥ 4 |
| INT-GAL-004 | Clicking a gallery image opens a lightbox/modal | Dialog or lightbox element visible |
| INT-GAL-005 | Gallery page has no JS errors | `pageerror` listener captures 0 errors |
| INT-GAL-006 | Gallery page footer is visible | `<footer>` visible |

---

### 6.6 News & EV Blog

**File:** `tests/integration/news-evblog.spec.js`  
**Total Tests:** 8

| Test ID | Test Name | Page | What is verified |
|---|---|---|---|
| INT-NEWS-001 | News page loads at /news | News | URL + h1 |
| INT-NEWS-002 | At least one news article card is visible | News | Image count > 0 |
| INT-NEWS-003 | News page has no JS errors | News | 0 pageerrors |
| INT-NEWS-004 | News page footer is visible | News | `<footer>` visible |
| INT-EVBLOG-001 | EV Blog page loads at /ev-blog | EV Blog | URL + h1 |
| INT-EVBLOG-002 | EV Blog animated stats section is visible | EV Blog | Text with `%` or `+` visible |
| INT-EVBLOG-003 | EV Blog article cards are visible | EV Blog | Image count > 0 |
| INT-EVBLOG-004 | EV Blog has no JS errors | EV Blog | 0 pageerrors |

---

### 6.7 Contribution, Privacy, Terms & 404

**File:** `tests/integration/contribution-privacy-terms.spec.js`  
**Total Tests:** 11

| Test ID | Test Name | Page | What is verified |
|---|---|---|---|
| INT-CONTRIB-001 | Contribution page loads at /contribution | Contribution | URL + h1 |
| INT-CONTRIB-002 | Page content is visible | Contribution | `<main>` visible |
| INT-CONTRIB-003 | No JS errors on Contribution page | Contribution | 0 pageerrors |
| INT-PRIV-001 | Privacy page loads at /privacy | Privacy | URL + h1 |
| INT-PRIV-002 | Privacy policy text is rendered | Privacy | `main p` visible |
| INT-PRIV-003 | No JS errors on Privacy page | Privacy | 0 pageerrors |
| INT-TERMS-001 | Terms page loads at /terms | Terms | URL + h1 |
| INT-TERMS-002 | Terms text is rendered | Terms | `main p` visible |
| INT-TERMS-003 | No JS errors on Terms page | Terms | 0 pageerrors |
| INT-404-001 | Unknown route renders a 404/not-found page | 404 | Body visible, no crash |
| INT-404-002 | 404 page has a link back to home | 404 | Home link navigates to `/` |

---

## 7. Layer 3 — End-to-End (E2E) Tests

E2E tests simulate a **real user** opening a browser and completing a full workflow. They exercise the entire system — routing, lazy loading, form state, API calls, and error handling — all in one sequence.

---

### 7.1 Book a Test Drive Journey

**File:** `tests/e2e/book-a-test-drive.spec.js`  
**Total Tests:** 9

These tests cover the primary conversion journey of the site.

| Test ID | Test Name | Journey Step | What is verified |
|---|---|---|---|
| E2E-BOOK-001 | Full journey: Home → Product → Book | Full happy path | 5-step sequence: land → explore → detail → book → fill form |
| E2E-BOOK-002 | Navbar "Book Now" button leads to booking form | Direct booking | From any page, navbar CTA reaches `/book` |
| E2E-BOOK-003 | User can fill all required fields without errors | Form completion | All 5 required fields accept input, button stays enabled |
| E2E-BOOK-004 | User can fill optional location and date fields | Optional fields | Location and date fields accept and hold values |
| E2E-BOOK-005 | Submit button shows loading spinner on click | Loading state | Button becomes disabled after submit |
| E2E-BOOK-006 | Clicking copy phone button shows checkmark | Copy interaction | SVG icon visible after clipboard copy |
| E2E-BOOK-007 | Tel link has correct phone number format | Contact sidebar | `href` matches `tel:+?91` pattern |
| E2E-BOOK-008 | Mailto link has correct domain | Contact sidebar | `href` contains `autonxt.in` |
| E2E-BOOK-009 | Booking form is usable on mobile viewport | Responsive | Form renders and accepts input at 390×844 |

---

### 7.2 Product Discovery Journey

**File:** `tests/e2e/product-discovery.spec.js`  
**Total Tests:** 8

| Test ID | Test Name | Journey | What is verified |
|---|---|---|---|
| E2E-PROD-001 | Discover X45H2: Home → Product → X45H2 detail | Full discovery | Navbar → listing → detail, all key sections present |
| E2E-PROD-002 | Browse both tractor models back to back | Multi-model browse | X45H2 → back → X25H2, both pages load |
| E2E-PROD-003 | Filter to Attachments and open Bucket detail | Filter + attachment | Attachment filter → Bucket detail page |
| E2E-PROD-004 | Discover industry solution from Home page | Industry discovery | Home industry card → `/industry` route |
| E2E-PROD-005 | Industry detail → back → explore another | Industry browse | Biomass → back → Cement detail |
| E2E-PROD-006 | Interactive Model section loads on product detail | 3D model | Canvas element present on X45H2, no crash |
| E2E-PROD-007 | X45H2 detail page has a meaningful page title | SEO | Title length > 5, matches `/X45H2\|AutoNxt/i` |
| E2E-PROD-008 | Attachment detail page has a meaningful title | SEO | Title length > 5 |

---

### 7.3 Responsive Design & Accessibility

**File:** `tests/e2e/responsive-and-accessibility.spec.js`  
**Total Tests:** 18

#### Responsive Design (8 tests)

| Test ID | Viewport | What is verified |
|---|---|---|
| E2E-RESP-001 | Desktop 1440×900 | Nav + h1 + footer all visible |
| E2E-RESP-002 | Laptop 1280×800 | Nav + h1 + footer all visible |
| E2E-RESP-003 | Tablet 768×1024 | Nav + h1 + footer all visible |
| E2E-RESP-004 | Mobile 390×844 | Nav + h1 + footer all visible |
| E2E-RESP-005 | Mobile 375×812 | Hamburger button present |
| E2E-RESP-006 | Mobile 390×844 | Product listing readable |
| E2E-RESP-007 | Mobile 390×844 | Booking form submit button reachable |
| E2E-RESP-008 | Tablet 768×1024 | Nav visible (no hamburger expected) |

#### Accessibility Basics (10 tests)

| Test ID | Test Name | WCAG Principle | What is verified |
|---|---|---|---|
| E2E-A11Y-001 | All main pages have `<h1>` elements | 1.3.1 Info & Relationships | h1 count ≥ 1 on 8 key routes |
| E2E-A11Y-002 | Images have alt attributes | 1.1.1 Non-text Content | First 10 images on `/product` have non-null alt |
| E2E-A11Y-003 | Navigation landmark is present | 1.3.6 Identify Purpose | `<nav>` visible |
| E2E-A11Y-004 | Main content landmark is present | 1.3.6 Identify Purpose | `<main>` visible |
| E2E-A11Y-005 | Footer landmark is present | 1.3.6 Identify Purpose | `<footer>` visible |
| E2E-A11Y-006 | Tab key cycles through interactive elements | 2.1.1 Keyboard | Focus element visible after Tab |
| E2E-A11Y-007 | Book button in navbar is keyboard focusable | 2.1.1 Keyboard | Tab sequence reaches Book Now |
| E2E-A11Y-008 | Form inputs have associated labels | 1.3.1 Info & Relationships | name, email, phone inputs visible with labels |
| E2E-A11Y-009 | Logo link has accessible text / alt | 1.1.1 Non-text Content | Logo img has non-empty alt |
| E2E-A11Y-010 | Page does not have duplicate id attributes | 4.1.1 Parsing | Zero duplicate `id` attributes on home page |

> **Note:** Full WCAG compliance requires manual testing with assistive technologies (screen readers, voice control) and expert accessibility audit. These automated checks cover common structural requirements only.

---

### 7.4 Performance & Error Monitoring

**File:** `tests/e2e/performance-and-errors.spec.js`  
**Total Tests:** 32

#### Zero JS Errors — All Routes (24 tests)

One test per route. Each test:
1. Attaches a `pageerror` listener
2. Navigates to the route
3. Asserts `errors.length === 0`

Routes covered: `/`, `/product`, `/product/x45h2`, `/product/x25h2`, all 3 attachment pages, `/industry` + 6 industry detail pages, `/gallery`, `/contribution`, `/about`, `/book`, `/news`, `/blog`, `/ev-blog`, `/careers`, `/privacy`, `/terms`

#### No Broken Links (3 tests)

| Test ID | Test Name | What is verified |
|---|---|---|
| E2E-LINK-001 | No 404 network responses on Home page | Response listener, filters non-critical URLs |
| E2E-LINK-002 | No 404 network responses on Product page | Same pattern |
| E2E-LINK-003 | No 404 network responses on Booking page | Same pattern |

#### Performance Baselines (5 tests)

| Test ID | Test Name | Threshold |
|---|---|---|
| E2E-PERF-001 | Home page DOM content loaded within 5 seconds | `domcontentloaded` < 5000ms |
| E2E-PERF-002 | Product page DOM content loaded within 5 seconds | `domcontentloaded` < 5000ms |
| E2E-PERF-003 | Booking page DOM content loaded within 5 seconds | `domcontentloaded` < 5000ms |
| E2E-PERF-004 | Blog page DOM content loaded within 5 seconds | `domcontentloaded` < 5000ms |
| E2E-PERF-005 | 3D model does NOT block initial hero render | `<h1>` visible within 3 seconds |

#### Console Error Monitoring (3 tests)

| Test ID | Page | What is verified |
|---|---|---|
| E2E-CONSOLE-001 | Home | 0 `console.error` calls (excluding GA) |
| E2E-CONSOLE-002 | Product listing | 0 `console.error` calls |
| E2E-CONSOLE-003 | Booking page | 0 `console.error` calls |

---

### 7.5 Full-Site Smoke Tests

**File:** `tests/e2e/full-site-smoke.spec.js`  
**Total Tests:** 24 (one per route)

The smoke suite is the first gate in any CI pipeline. For each of the 24 routes it asserts:

1. `<body>` is visible
2. At least one heading (`h1` or `h2`) exists
3. `<nav>` is visible
4. Zero unhandled JavaScript exceptions

| Test ID | Page | Route |
|---|---|---|
| SMOKE-000 | Home | `/` |
| SMOKE-001 | Product Listing | `/product` |
| SMOKE-002 | Product X45H2 Detail | `/product/x45h2` |
| SMOKE-003 | Product X25H2 Detail | `/product/x25h2` |
| SMOKE-004 | Attachment Bucket | `/product/attachment/bucket` |
| SMOKE-005 | Attachment Catcher | `/product/attachment/catcher` |
| SMOKE-006 | Attachment Loader | `/product/attachment/loader` |
| SMOKE-007 | Industry Listing | `/industry` |
| SMOKE-008 | Industry Biomass | `/industry/biomass` |
| SMOKE-009 | Industry Cement | `/industry/cement` |
| SMOKE-010 | Industry Construction | `/industry/construction` |
| SMOKE-011 | Industry Defence | `/industry/defence` |
| SMOKE-012 | Industry Airport | `/industry/airport` |
| SMOKE-013 | Industry Metal | `/industry/metal` |
| SMOKE-014 | Gallery | `/gallery` |
| SMOKE-015 | Contribution | `/contribution` |
| SMOKE-016 | About | `/about` |
| SMOKE-017 | Book / Contact | `/book` |
| SMOKE-018 | News | `/news` |
| SMOKE-019 | Blog | `/blog` |
| SMOKE-020 | EV Blog | `/ev-blog` |
| SMOKE-021 | Careers | `/careers` |
| SMOKE-022 | Privacy Policy | `/privacy` |
| SMOKE-023 | Terms & Conditions | `/terms` |

---

## 8. Complete Test Case Index

| ID | Layer | File | Description |
|---|---|---|---|
| UNIT-NAV-001–015 | Unit | navbar.spec.js | Navbar component (15 tests) |
| UNIT-HOME-001–017 | Unit | home-sections.spec.js | Home page sections (17 tests) |
| UNIT-FORM-001–021 | Unit | form-fields.spec.js | Booking form fields (21 tests) |
| INT-HOMENAV-001–011 | Integration | home-navigation.spec.js | Home CTA & nav routing (11 tests) |
| INT-PROD-001–016 | Integration | product-flow.spec.js | Product filter & detail routing (16 tests) |
| INT-IND-001–012 | Integration | industry-flow.spec.js | Industry listing & detail (12 tests) |
| INT-LANG-001–007 | Integration | language-switcher.spec.js | i18n switcher (7 tests) |
| INT-GAL-001–006 | Integration | gallery.spec.js | Gallery & lightbox (6 tests) |
| INT-NEWS-001–004 | Integration | news-evblog.spec.js | News page (4 tests) |
| INT-EVBLOG-001–004 | Integration | news-evblog.spec.js | EV Blog page (4 tests) |
| INT-CONTRIB-001–003 | Integration | contribution-privacy-terms.spec.js | Contribution page (3 tests) |
| INT-PRIV-001–003 | Integration | contribution-privacy-terms.spec.js | Privacy page (3 tests) |
| INT-TERMS-001–003 | Integration | contribution-privacy-terms.spec.js | Terms page (3 tests) |
| INT-404-001–002 | Integration | contribution-privacy-terms.spec.js | 404 handling (2 tests) |
| E2E-BOOK-001–009 | E2E | book-a-test-drive.spec.js | Booking journey (9 tests) |
| E2E-PROD-001–008 | E2E | product-discovery.spec.js | Product discovery (8 tests) |
| E2E-RESP-001–008 | E2E | responsive-and-accessibility.spec.js | Responsive viewports (8 tests) |
| E2E-A11Y-001–010 | E2E | responsive-and-accessibility.spec.js | Accessibility checks (10 tests) |
| E2E-ERR-000–023 | E2E | performance-and-errors.spec.js | Zero JS errors, all routes (24 tests) |
| E2E-LINK-001–003 | E2E | performance-and-errors.spec.js | No 404 responses (3 tests) |
| E2E-PERF-001–005 | E2E | performance-and-errors.spec.js | Load time baselines (5 tests) |
| E2E-CONSOLE-001–003 | E2E | performance-and-errors.spec.js | Console error checks (3 tests) |
| SMOKE-000–023 | E2E | full-site-smoke.spec.js | Full site smoke (24 tests) |

**Total: ~142 test cases across 15 spec files**

---

## 9. Running the Tests

### Step 1 — One-time Setup

```bash
# Install all npm dependencies
npm install

# Install Playwright browsers (Chromium, Firefox, WebKit)
# Only needed once after first clone
npx playwright install
```

---

### Step 2 — Start the Dev Server

The test suite needs the site running before any tests execute.
Open a terminal and start the dev server — keep it running while tests run:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.  
All test files use the `baseURL` from `playwright.config.cjs` — **no hardcoded URLs anywhere**.

---

### Step 3 — Run Tests

Open a **second terminal** and run any of the commands below:

```bash
# ── FULL SUITE ──────────────────────────────────────────────────
# Run every test across all layers and browsers
npx playwright test

# ── BY LAYER ────────────────────────────────────────────────────
# Layer 1 — Unit / Component tests (fast, ~30 seconds)
npx playwright test tests/unit/

# Layer 2 — Integration tests (~1 minute)
npx playwright test tests/integration/

# Layer 3 — E2E tests (~3 minutes)
npx playwright test tests/e2e/

# Layout, typography, content, animation tests
npx playwright test tests/layout/

# Cross-browser tests (runs on Chrome, Firefox, Edge, Pixel 5, iPhone 12)
npx playwright test tests/cross-browser/

# Legacy smoke tests (original test files)
npx playwright test tests/smoke.spec.js tests/navigation.spec.js

# ── BY BROWSER ──────────────────────────────────────────────────
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=msedge
npx playwright test --project=mobile-chrome
npx playwright test --project=mobile-safari

# ── SINGLE FILE ─────────────────────────────────────────────────
npx playwright test tests/e2e/book-a-test-drive.spec.js
npx playwright test tests/e2e/full-site-smoke.spec.js
npx playwright test tests/layout/typography.spec.js

# ── SINGLE TEST BY ID ───────────────────────────────────────────
npx playwright test --grep "E2E-BOOK-001"
npx playwright test --grep "SMOKE-000"
npx playwright test --grep "UNIT-NAV-004"

# ── REPORTS ─────────────────────────────────────────────────────
# Open the HTML report after a test run
npx playwright show-report

# Run with live HTML report output
npx playwright test --reporter=html
```

---

### Recommended CI / Pre-commit Order

Run layers in order — catch cheap failures first before running expensive ones:

```bash
# Gate 1 — Smoke: confirms every page renders (fastest, ~1 min)
npx playwright test tests/e2e/full-site-smoke.spec.js --project=chromium

# Gate 2 — Unit: component-level checks (~30 sec)
npx playwright test tests/unit/ --project=chromium

# Gate 3 — Integration: cross-page flows (~1 min)
npx playwright test tests/integration/ --project=chromium

# Gate 4 — Layout: spacing, typography, content (~45 sec)
npx playwright test tests/layout/ --project=chromium

# Gate 5 — E2E: full user journeys (~3 min)
npx playwright test tests/e2e/ --project=chromium

# Gate 6 — Cross-browser: all 5 browser profiles (~8 min)
npx playwright test tests/cross-browser/
```

---

### Quick Reference — Common Scenarios

| Goal | Command |
|---|---|
| Check nothing broke after a code change | `npx playwright test tests/e2e/full-site-smoke.spec.js` |
| Verify booking form still works | `npx playwright test tests/unit/form-fields.spec.js` |
| Test a specific page | `npx playwright test --grep "SMOKE-017"` (Book page) |
| Run on mobile only | `npx playwright test --project=mobile-chrome` |
| Run on Firefox only | `npx playwright test --project=firefox` |
| See what failed last run | `npx playwright show-report` |
| Debug a failing test visually | `npx playwright test --debug tests/e2e/book-a-test-drive.spec.js` |

---

## 10. Test Configuration

**File:** `playwright.config.cjs`

```js
{
  testDir: './tests',
  testMatch: '**/*.spec.{js,ts}',
  retries: 1,               // Retry flaky tests once
  fullyParallel: true,      // Files run in parallel
  workers: 4,               // 4 browser workers locally, 2 in CI

  use: {
    baseURL: 'http://localhost:5173',
    headless: false,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },

  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ]
}
```

**Key settings explained:**

| Setting | Value | Reason |
|---|---|---|
| `retries: 1` | 1 | Catches timing-related flakiness without masking real failures |
| `fullyParallel: true` | true | Each spec file runs in its own browser worker |
| `screenshot: 'only-on-failure'` | on-failure | Saves screenshots to `playwright-report/` only when a test fails |
| `trace: 'on-first-retry'` | on-first-retry | Records a full trace ZIP on the first retry for debugging |
| `headless: false` | false | Browser window is visible during local runs (set to `true` for CI) |

---

## 11. Coverage Summary

### By Page

| Page | Unit | Integration | E2E | Total |
|---|---|---|---|---|
| Home (`/`) | ✅ 17 | ✅ 11 | ✅ 5 | 33 |
| Product listing | ✅ 2 | ✅ 8 | ✅ 4 | 14 |
| Product X45H2 | — | ✅ 4 | ✅ 4 | 8 |
| Product X25H2 | — | ✅ 2 | ✅ 1 | 3 |
| Attachments (3) | — | ✅ 4 | ✅ 2 | 6 |
| Industry listing | — | ✅ 2 | ✅ 2 | 4 |
| Industry detail (6) | — | ✅ 10 | ✅ 2 | 12 |
| Book / Contact | ✅ 21 | — | ✅ 9 | 30 |
| Navbar (global) | ✅ 15 | ✅ 3 | ✅ 2 | 20 |
| Blog | — | ✅ 0 (legacy) | ✅ 1 | 1 |
| EV Blog | — | ✅ 4 | ✅ 1 | 5 |
| News | — | ✅ 4 | ✅ 1 | 5 |
| Gallery | — | ✅ 6 | ✅ 1 | 7 |
| Careers | — | — | ✅ 1 | 1 |
| About | — | — | ✅ 1 | 1 |
| Privacy / Terms | — | ✅ 6 | ✅ 2 | 8 |
| Contribution | — | ✅ 3 | ✅ 1 | 4 |
| 404 | — | ✅ 2 | — | 2 |

### By Test Category

| Category | Test Count |
|---|---|
| Component rendering | 31 |
| Value binding / input | 10 |
| Navigation / routing | 28 |
| Filter / state | 4 |
| Form validation | 9 |
| Language / i18n | 7 |
| Responsive design | 8 |
| Accessibility | 10 |
| JS error monitoring | 27 |
| Performance baselines | 5 |
| Network health (404) | 3 |
| Smoke (all pages) | 24 |
| **Total** | **~142** |

---

