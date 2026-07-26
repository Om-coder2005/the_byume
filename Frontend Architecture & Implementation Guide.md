\# Document 10 — **Frontend Architecture \& Implementation Guide**



\# Project: the\_byume (Working Title)



\*\*Version:\*\* 1.0

\*\*Status:\*\* Production Frontend Blueprint



> \*\*Purpose:\*\* This document defines how the frontend should be architected, implemented, tested, and maintained. It establishes the project structure, rendering strategy, state management, routing, data fetching, animation architecture, performance guidelines, accessibility, and engineering standards. It is intended to be the definitive implementation guide for the Next.js application.



\---



\# Table of Contents



```text

PART I

1\. Frontend Philosophy

2\. Technology Stack

3\. Project Structure

4\. Next.js App Router Architecture

5\. Routing Strategy

6\. Rendering Strategy



PART II

7\. Component Architecture

8\. State Management

9\. Data Fetching

10\. Forms

11\. Authentication

12\. Layout System



PART III

13\. Animation Architecture

14\. Performance

15\. Accessibility

16\. Responsive Strategy

17\. Error Handling



PART IV

18\. Code Standards

19\. Testing Strategy

20\. CI/CD

21\. Future Scalability

```



\---



\# PART I



\# 1. Frontend Philosophy



The frontend is \*\*not\*\* just a collection of pages.



It is a \*\*design system powered application\*\*.



Every screen should be built from reusable business components.



Never duplicate UI.



Instead



```text

Design Tokens



↓



Primitive Components



↓



Business Components



↓



Layouts



↓



Pages

```



\---



\## Core Principles



✔ Component First



✔ Mobile First



✔ Accessibility First



✔ Performance First



✔ Animation Supports UX



✔ Reusable Everything



\---



\# 2. Technology Stack



\## Framework



| Technology | Purpose     |

| ---------- | ----------- |

| Next.js 15 | App Router  |

| React 19   | UI          |

| TypeScript | Type Safety |



\---



\## Styling



| Technology     | Purpose             |

| -------------- | ------------------- |

| TailwindCSS    | Styling             |

| CSS Variables  | Design Tokens       |

| clsx           | Conditional classes |

| tailwind-merge | Class merging       |



\---



\## State



| Library        | Usage                 |

| -------------- | --------------------- |

| TanStack Query | Server State          |

| Zustand        | Client State          |

| React Context  | Theme \& Auth Provider |



\---



\## Forms



React Hook Form



\*



Zod



\---



\## Animations



Framer Motion



GSAP



Lenis (optional smooth scrolling)



\---



\## Utilities



Axios



date-fns



React Dropzone



React Hot Toast



Lucide Icons (until custom icon pack is ready)



\---



\# 3. Folder Structure



```text

src/



app/



components/



features/



hooks/



lib/



providers/



services/



stores/



styles/



types/



utils/



constants/



assets/



public/

```



\---



\## Features Folder



```text

features/



auth/



gallery/



orders/



feedback/



notifications/



profile/



admin/



home/

```



Every feature owns:



\* Components

\* Hooks

\* API calls

\* Types

\* Utilities



\---



\## Components Folder



```text

components/



ui/



navigation/



cards/



forms/



layout/



timeline/



feedback/



gallery/



animations/

```



Only reusable components belong here.



\---



\# 4. App Router Architecture



```text

app/



(layout.tsx)



(page.tsx)



gallery/



orders/



profile/



admin/



login/



register/

```



Each route owns:



```text

loading.tsx



error.tsx



page.tsx



layout.tsx



not-found.tsx

```



\---



Example



```text

orders/



page.tsx



loading.tsx



error.tsx



\[id]/



page.tsx

```



\---



\# 5. Routing Strategy



Public



```text

/



/gallery



/about



/contact



/login

```



\---



Protected



```text

/orders



/profile



/notifications



/settings

```



\---



Admin



```text

/admin



/admin/orders



/admin/gallery



/admin/feedback

```



Middleware protects restricted routes.



\---



\# 6. Rendering Strategy



One of the most important decisions.



\---



\## Server Components



Use for



Gallery



Homepage



Categories



About



FAQ



SEO pages



\---



Benefits



Fast



SEO



Less JavaScript



\---



\## Client Components



Only when necessary.



Examples



Forms



Search



Timeline



Filters



Animations



Upload



Notifications



\---



Rule



> Default to \*\*Server Components\*\*.



Only use `"use client"` when interactivity requires it.



\---



\# PART II



\# 7. Component Architecture



Hierarchy



```text

Primitive



↓



Composite



↓



Business



↓



Layouts



↓



Pages

```



\---



Example



```text

Button



↓



Product Card



↓



Gallery Grid



↓



Gallery Page

```



Never skip layers.



\---



\# Component Communication



Preferred



```text

Props



↓



Callbacks



↓



Hooks

```



Avoid deeply nested prop drilling.



For shared client state, use Zustand.



\---



\# 8. State Management



Three kinds of state.



\---



\## Server State



Orders



Gallery



Feedback



Notifications



Managed by



TanStack Query



\---



\## Client State



Drawer



Theme



Filters



Current Step



Shopping Draft



Managed by



Zustand



\---



\## Form State



React Hook Form



Never store form state in Zustand.



\---



State Diagram



```text

Database



↓



API



↓



Query



↓



Component



↓



User



↓



Mutation



↓



API

```



\---



\# Query Keys



Example



```text

gallery



gallery-featured



gallery-category



orders



order-detail



feedback



notifications



profile

```



Consistent naming enables reliable caching and invalidation.



\---



\# 9. Data Fetching



Pattern



```text

Page



↓



Custom Hook



↓



API Service



↓



Axios



↓



Backend

```



\---



Never



```text

Page



↓



Axios

```



\---



Example



```text

useOrders()



↓



OrderService



↓



GET /orders

```



\---



Caching



Gallery



10 minutes



Categories



1 hour



Profile



5 minutes



Notifications



30 seconds



\---



\# Optimistic Updates



Use for



Wishlist



Save Inspiration



Notification Read



Profile Update



\---



Avoid optimistic updates for



Order Submission



Payment (future)



File Upload



\---



\# 10. Forms



Architecture



```text

React Hook Form



↓



Zod



↓



Submit



↓



Mutation



↓



Toast



↓



Navigate

```



\---



Validation



Client



↓



Server



Never trust only client validation.



\---



Reusable Components



```text

TextInput



Textarea



Select



DatePicker



Upload



OTP



Search

```



\---



\# Form Guidelines



\* Inline validation

\* Helpful helper text

\* Preserve user input on failure

\* Disable submit during mutation

\* Auto-focus first invalid field



\---



\# 11. Authentication



Flow



```text

Login



↓



JWT



↓



Cookies / Secure Storage



↓



Protected Routes



↓



Refresh



↓



Logout

```



\---



Frontend Responsibilities



Store auth state



Refresh session



Redirect



Permission checks



\---



Never



Decode permissions throughout components.



Use centralized auth hooks.



\---



\# 12. Layout System



Three layouts.



\---



Public



Navbar



Footer



\---



Customer



Navbar



Dashboard



Bottom Navigation



\---



Admin



Sidebar



Top Bar



Workspace



\---



Nested layouts



Provided by



Next.js App Router.



\---



\# PART III



\# 13. Animation Architecture



Animations should improve understanding.



Never distract.



\---



Tools



Framer Motion



UI



GSAP



Hero



Landing



SVG drawing



\---



Use Cases



| Library       | Best For            |

| ------------- | ------------------- |

| Framer Motion | Components          |

| GSAP          | Complex sequences   |

| CSS           | Simple hover states |



\---



Animation Rules



Hover



150ms



Click



100ms



Page



350ms



Hero



600ms



\---



Signature Animations



Yarn Loader



Thread Drawing



Envelope Opening



Timeline Growth



Polaroid Drop



Paper Stack Hover



Feedback Pinning



\---



Reduced Motion



Always respect



```css

prefers-reduced-motion

```



\---



\# 14. Performance



Goals



First Load



<2 seconds



Lighthouse



95+



\---



Strategies



Lazy loading



Dynamic imports



Image optimization



Code splitting



Prefetch routes



Memoization



Suspense



Streaming



\---



Images



Always use



Next Image



Never



HTML img



\---



Fonts



Self-host



Variable Fonts



Preload primary fonts



\---



\# Bundle Strategy



Split by route.



Load only what is needed.



Admin code



Should never load



for customers.



\---



\# 15. Accessibility



WCAG AA minimum.



Checklist



Keyboard navigation



Visible focus



ARIA labels



Alt text



Screen readers



Semantic HTML



Contrast ratio



44px touch target



Logical heading order



\---



Forms



Every input



Must have



Label



Helper Text



Error



Description



\---



\# 16. Responsive Strategy



Mobile First.



Breakpoints



```text

sm



md



lg



xl



2xl

```



\---



Navigation



Mobile



Bottom Bar



\---



Tablet



Compact Navbar



\---



Desktop



Full Navbar



\---



Grid



Mobile



1 column



Tablet



2 columns



Desktop



4 columns



\---



Touch



Minimum



44px



Spacing



16px



\---



\# 17. Error Handling



Each route includes



```text

loading.tsx



error.tsx



not-found.tsx

```



Global Error Boundary



Captures



Unexpected failures.



\---



API Errors



Display



Friendly messages.



Never expose server stack traces.



\---



Offline UX



Detect offline state.



Queue retryable actions where appropriate.



\---



\# PART IV



\# 18. Code Standards



TypeScript Strict Mode



Enabled.



\---



Naming



Components



PascalCase



Hooks



useSomething



Functions



camelCase



Constants



UPPER\_CASE



Files



kebab-case



\---



One component



One responsibility.



\---



Avoid



Files larger than



300–400 lines



\---



Imports



Absolute imports



using aliases



```text

@/components



@/features



@/hooks

```



\---



\# 19. Testing Strategy



Unit



Vitest



React Testing Library



\---



Component Tests



Buttons



Forms



Cards



Timeline



Gallery



\---



Integration



Page



API



Hooks



\---



End-to-End



Playwright



Flows



Register



Login



Create Order



Upload References



Submit Feedback



\---



Target Coverage



80%+



Critical UI



90%+



\---



\# 20. CI/CD



Every PR



Runs



```text

Type Check



↓



ESLint



↓



Unit Tests



↓



Build



↓



Preview Deploy

```



Production deploy only after all checks pass.



\---



\# 21. Future Scalability



The architecture should support:



\* Internationalization (i18n)

\* Dark mode

\* Multiple artists

\* Offline support (PWA)

\* Push notifications

\* AI-assisted ordering

\* Native mobile apps sharing the same API



Avoid introducing unnecessary complexity until there is a clear need.



\---



\# Frontend Architecture Summary



This frontend architecture establishes:



\* A scalable Next.js App Router structure.

\* Clear separation between server and client components.

\* Predictable state management with TanStack Query and Zustand.

\* Reusable component-driven development.

\* Strong performance and accessibility standards.

\* Consistent animation principles.

\* Robust testing and deployment practices.



Together with the backend architecture, this forms a complete implementation blueprint for the application.



\---



\# Recommendation for the Next Document



At this point, the \*\*product, UX, UI, backend, frontend, database, and APIs are all defined\*\*.



The next document should shift from architecture to execution:



\# \*\*Document 11 — Development Roadmap \& Sprint Planning\*\*



It should include:



\* Complete development phases

\* Sprint-by-sprint breakdown (12–16 weeks)

\* Task prioritization (MoSCoW)

\* Git branching workflow

\* Feature dependency graph

\* Milestones

\* Definition of Done (DoD)

\* QA checklist

\* Release strategy

\* Risk register

\* MVP vs Phase 2 vs Phase 3 planning

\* Estimated effort for every feature

\* Team responsibilities (even if you're currently solo, to support future contributors)



This document becomes the project's execution manual and is the last major planning document before implementation begins.



