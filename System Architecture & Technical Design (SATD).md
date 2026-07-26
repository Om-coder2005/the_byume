\# Document 4 — **System Architecture \& Technical Design (SATD)**



\## Project: the\_byume (Working Title)



\*\*Version:\*\* 1.0

\*\*Status:\*\* Architecture Draft



> \*\*Purpose:\*\* This document defines the complete technical foundation of the application before any UI or code is written. It explains \*\*how the system will work internally\*\*, how components communicate, and how it can scale from one artist to a complete handmade marketplace in the future.



\---



\# Table of Contents



```text

1\. Architecture Philosophy



2\. High-Level System Architecture



3\. Technology Stack



4\. Frontend Architecture



5\. Backend Architecture



6\. Database Layer



7\. Storage Architecture



8\. Notification Architecture



9\. Authentication Architecture



10\. Communication Flow



11\. Caching Strategy



12\. File Upload Pipeline



13\. Security Layers



14\. Logging \& Monitoring



15\. Deployment Architecture



16\. Scalability Plan



17\. Development Standards



18\. Risk Analysis



19\. Future Architecture

```



\---



\# 1. Architecture Philosophy



This application is designed with \*\*four core engineering principles\*\*.



\## Principle 1



Feature First



Not



```

Controllers



Models



Views

```



Instead



```

Orders



Gallery



Feedback



Notifications



Users



Authentication

```



Each feature owns its own logic.



\---



\## Principle 2



Loose Coupling



Every module should be independent.



For example



Gallery should never directly depend on Feedback.



Instead



```

Gallery



↓



API



↓



Database



```



\---



\## Principle 3



Scalable



The architecture should support



Today



```

1 Artist

```



Later



```

100 Artists



↓



10000 Customers



↓



Marketplace

```



without rewriting everything.



\---



\## Principle 4



Clean Architecture



Business logic should never depend on frameworks.



Changing



```

FastAPI



↓



NestJS



↓



Go



```



should not affect



Orders



Gallery



Feedback



Business Rules.



\---



\# 2. High-Level Architecture



```text

&#x20;                 INTERNET



&#x20;                     │



&#x20;            Cloudflare CDN



&#x20;                     │



────────────────────────────────────────────



&#x20;             Next.js Frontend



&#x20;         (React + TypeScript)



&#x20;                     │



&#x20;         HTTPS REST API



&#x20;                     │



────────────────────────────────────────────



&#x20;            FastAPI Backend



────────────────────────────────────────────



&#x20;Authentication



&#x20;Orders



&#x20;Gallery



&#x20;Feedback



&#x20;Notifications



&#x20;File Upload



&#x20;Admin



────────────────────────────────────────────



&#x20;       PostgreSQL Database



&#x20;             Redis Cache



&#x20;         Background Workers



&#x20;        Cloudinary Storage



────────────────────────────────────────────



&#x20;Email



&#x20;WhatsApp



&#x20;Instagram (Future)



&#x20;Analytics

```



\---



\# 3. Technology Stack



\## Frontend



| Technology      | Reason                        |

| --------------- | ----------------------------- |

| Next.js 15      | SSR, SEO, App Router          |

| React 19        | UI                            |

| TypeScript      | Type Safety                   |

| TailwindCSS     | Design System                 |

| Framer Motion   | UI Animations                 |

| GSAP            | Hero \& artistic animations    |

| React Hook Form | Forms                         |

| Zod             | Validation                    |

| TanStack Query  | API caching \& synchronization |

| Zustand         | Lightweight client state      |

| Axios           | HTTP client                   |

| React Dropzone  | Reference uploads             |

| React Hot Toast | Notifications                 |

| next-themes     | Theme management (future)     |



\---



\## Backend



| Technology              | Reason                           |

| ----------------------- | -------------------------------- |

| FastAPI                 | High performance \& async support |

| SQLAlchemy 2            | ORM                              |

| Alembic                 | Database migrations              |

| Pydantic                | Validation                       |

| PostgreSQL              | Relational database              |

| Redis                   | Cache \& queues                   |

| Celery (or Dramatiq/RQ) | Background jobs                  |

| JWT                     | Authentication                   |

| Passlib                 | Password hashing                 |

| Uvicorn                 | ASGI server                      |



\---



\## Infrastructure



| Technology                 | Reason              |

| -------------------------- | ------------------- |

| Cloudinary                 | Image storage       |

| Supabase PostgreSQL / Neon | Managed PostgreSQL  |

| Vercel                     | Frontend deployment |

| Railway / Render           | Backend deployment  |

| Cloudflare                 | CDN \& security      |

| GitHub Actions             | CI/CD               |



\---



\# 4. Why FastAPI Instead of Flask?



| Flask                   | FastAPI                   |

| ----------------------- | ------------------------- |

| Mostly synchronous      | Native async              |

| Manual validation       | Automatic validation      |

| Manual API docs         | Swagger/OpenAPI generated |

| More boilerplate        | Cleaner code              |

| Better for smaller apps | Better for scalable APIs  |



Since this application will include:



\* Image uploads

\* Notifications

\* Admin APIs

\* Future analytics

\* Background jobs



FastAPI provides a stronger long-term foundation.



\---



\# 5. System Modules



Instead of one large backend,



we divide it into modules.



```

Authentication



↓



Users



↓



Orders



↓



Gallery



↓



Feedback



↓



Notifications



↓



Uploads



↓



Analytics (Future)



↓



Admin



↓



Settings

```



Each module owns:



\* Routes

\* Services

\* Database models

\* Validation schemas

\* Tests



\---



\# 6. Frontend Architecture



```

UI



↓



Components



↓



Hooks



↓



State



↓



API Layer



↓



Backend

```



Never



```

UI



↓



Database

```



Everything goes through APIs.



\---



\## Frontend Layers



```

Presentation Layer



↓



Business Layer



↓



API Layer



↓



Infrastructure

```



\---



Presentation



Only UI.



\---



Business



Hooks.



Logic.



Validation.



\---



API



Communication.



\---



Infrastructure



Storage.



Cookies.



Authentication.



\---



\# 7. Backend Architecture



```

Request



↓



Router



↓



Authentication



↓



Validation



↓



Service



↓



Repository



↓



Database



↓



Response

```



Business logic stays inside the Service layer, keeping controllers (routers) thin and easy to maintain.



\---



\# 8. Database Layer



We will use a normalized PostgreSQL schema.



Core entities include:



\* Users

\* Orders

\* Order Items (future)

\* References

\* Gallery

\* Categories

\* Tags

\* Feedback

\* Notifications

\* Audit Logs

\* Media Files



The detailed ER diagram will be created in the Database Design document.



\---



\# 9. Storage Architecture



Images should never be stored directly in PostgreSQL.



Instead:



```

Customer Upload



↓



FastAPI



↓



Cloudinary



↓



URL returned



↓



Store URL in PostgreSQL

```



Benefits:



\* Smaller database

\* Faster backups

\* Global CDN delivery

\* Automatic image optimization



\---



\# 10. File Upload Pipeline



```

Customer



↓



Upload Image



↓



Frontend Validation



↓



Backend Validation



↓



Virus Scan (Future)



↓



Cloudinary



↓



Database



↓



Success

```



Accepted formats:



\* JPG

\* JPEG

\* PNG

\* WEBP



Maximum size (initially):



10 MB per image



\---



\# 11. Authentication Architecture



Customer



```

Google OAuth



or



Email + OTP



↓



JWT Access Token



↓



Refresh Token



↓



Protected Routes

```



Admin



```

Google



↓



Password



↓



Two-Factor Authentication (Phase 2)



↓



Admin Dashboard

```



\---



\# 12. Communication Flow



Example: Customer creates an order.



```

Frontend



↓



POST /orders



↓



Authentication



↓



Validation



↓



Business Logic



↓



Database



↓



Notification Queue



↓



Response

```



The notification is handled asynchronously so the customer doesn't wait for emails or alerts to be sent.



\---



\# 13. Notification Architecture



Events trigger notifications rather than pages sending them directly.



```

New Order



↓



Event



↓



Notification Service



↓



Email



↓



Dashboard Alert



↓



Push (Future)



↓



WhatsApp (Future)

```



This event-driven approach makes it easy to add new channels later.



\---



\# 14. Caching Strategy



Redis will be used for:



\* Frequently viewed gallery pages

\* Popular collections

\* Session data (if needed)

\* Background job queues

\* Rate limiting

\* Temporary OTP storage



Customer-specific data (orders, drafts) should always come from the database to ensure accuracy.



\---



\# 15. Logging \& Monitoring



Every important action should generate logs.



Examples:



\* Login attempts

\* Order creation

\* Order edits

\* Status changes

\* Failed uploads

\* Authentication failures



Monitoring should include:



\* API response times

\* Error rates

\* Queue health

\* Database performance

\* Storage usage



\---



\# 16. Deployment Architecture



```

GitHub



↓



GitHub Actions



↓



Build



↓



Tests



↓



Deploy



↓



Vercel (Frontend)



↓



Railway/Render (Backend)



↓



Managed PostgreSQL



↓



Cloudinary



↓



Cloudflare

```



Development, staging, and production environments should use separate configuration values.



\---



\# 17. Environment Configuration



Sensitive information should never be committed to Git.



Examples:



```

DATABASE\_URL



JWT\_SECRET



CLOUDINARY\_API\_KEY



CLOUDINARY\_SECRET



EMAIL\_API\_KEY



REDIS\_URL



GOOGLE\_CLIENT\_ID



GOOGLE\_CLIENT\_SECRET

```



Each environment (local, staging, production) should have its own configuration.



\---



\# 18. Scalability Plan



\### Phase 1



\* Single server

\* One admin

\* Hundreds of users



\### Phase 2



\* Separate worker service

\* Background jobs

\* Thousands of users



\### Phase 3



\* Multiple application instances

\* Load balancer

\* Distributed Redis

\* Object storage scaling



\### Phase 4



\* Multi-region deployment

\* CDN optimization

\* Marketplace architecture

\* AI services as separate microservices



The initial architecture should remain modular enough that these transitions require minimal changes.



\---



\# 19. Engineering Standards



To keep the codebase maintainable:



\* Use TypeScript on the frontend.

\* Follow feature-based folder organization.

\* Keep API routes thin; business logic belongs in services.

\* Validate every request on both client and server.

\* Write database migrations instead of manual schema changes.

\* Document APIs with OpenAPI.

\* Prefer composition over inheritance.

\* Avoid tight coupling between modules.



\---



\# 20. Technical Risks \& Mitigations



| Risk                           | Mitigation                                        |

| ------------------------------ | ------------------------------------------------- |

| Large image uploads            | Client/server validation, Cloudinary optimization |

| Notification delivery failures | Queue retries and logging                         |

| API abuse                      | Rate limiting, authentication, Cloudflare         |

| Growing gallery size           | CDN caching, lazy loading, pagination             |

| Database growth                | Indexing, query optimization, backups             |

| Future feature expansion       | Modular architecture and feature isolation        |



\---



\# 21. Architecture Decisions (ADR)



To make future maintenance easier, every major technical decision should be recorded.



Examples:



\* Why FastAPI instead of Flask.

\* Why PostgreSQL instead of MongoDB.

\* Why Cloudinary instead of local storage.

\* Why TanStack Query instead of Redux for server state.

\* Why feature-based architecture instead of MVC folders.



Keeping Architecture Decision Records (ADRs) helps future contributors understand the reasoning behind choices instead of guessing.



\---



\# End of System Architecture \& Technical Design



At this stage, the project now has:



\* ✅ Product vision and requirements.

\* ✅ User research and UX strategy.

\* ✅ Information architecture and navigation.

\* ✅ Technical architecture and engineering foundation.



\## Recommended Next Document



The next document should be the \*\*Design System\*\*, and it should be one of the most comprehensive parts of the project. Rather than just listing colors and fonts, it will define the complete visual language:



\* Design philosophy ("Thread \& Paper" system)

\* Color tokens

\* Typography scale

\* 8-point spacing system

\* Grid and layout rules

\* Iconography

\* Illustration style

\* Yarn-inspired microinteractions

\* Motion guidelines

\* Components (buttons, cards, forms, timelines, postcards, notifications)

\* Accessibility and responsive behavior

\* Design tokens ready for Figma and Tailwind CSS



This document will become the single source of truth for every screen built afterward.



