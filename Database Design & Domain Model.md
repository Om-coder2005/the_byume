\# Document 7 — **Database Design \& Domain Model**



\# Project: the\_byume (Working Title)



\*\*Version:\*\* 1.0

\*\*Status:\*\* Production Database Architecture



> \*\*Purpose:\*\* This document defines the complete data architecture for the application. It serves as the foundation for backend development, API design, business logic, reporting, and future scalability. The database is designed to support today's single-artist workflow while allowing seamless evolution into a multi-artist platform.



\---



\# Table of Contents



```text

PART I

1\. Database Philosophy

2\. Why PostgreSQL

3\. Database Architecture

4\. Domain Driven Design

5\. Core Domains



PART II

6\. Entity Relationship Diagram

7\. Table Definitions

8\. Relationships

9\. Constraints

10\. Indexing Strategy



PART III

11\. Audit System

12\. Notification System

13\. Media Storage

14\. Security

15\. Soft Delete



PART IV

16\. Scalability

17\. Migration Strategy

18\. Future Expansion

```



\---



\# PART I



\# 1. Database Philosophy



The database should answer three questions reliably:



\* \*\*What happened?\*\*

\* \*\*Who did it?\*\*

\* \*\*When did it happen?\*\*



Every important business action should be traceable.



This is especially important because the application manages:



\* Custom orders

\* Customer references

\* Artist communication

\* Reviews

\* Progress updates



\---



\# Database Goals



✅ Fast



✅ Secure



✅ Highly normalized



✅ Easy to query



✅ Audit friendly



✅ Analytics friendly



✅ Future proof



\---



\# 2. Why PostgreSQL?



We evaluated three options.



| Database   | Verdict                                                |

| ---------- | ------------------------------------------------------ |

| SQLite     | Good for prototypes, not production                    |

| MongoDB    | Flexible, but relational data becomes harder to manage |

| PostgreSQL | \*\*Recommended\*\*                                        |



Reason:



This project has many relationships:



```text

User



↓



Orders



↓



References



↓



Media



↓



Feedback



↓



Notifications

```



Relational databases handle this naturally.



\---



\# 3. Database Architecture



Instead of one huge schema,



we divide the database into logical domains.



```text

Authentication



↓



Customer



↓



Orders



↓



Gallery



↓



Feedback



↓



Notifications



↓



Media



↓



Analytics



↓



Administration

```



Each domain owns its own tables.



\---



\# 4. Domain Model



The application consists of the following domains.



\---



\## Authentication Domain



Responsible for



\* Login

\* Registration

\* Sessions

\* Refresh Tokens

\* OAuth



\---



\## Customer Domain



Stores



\* Profile

\* Addresses

\* Preferences

\* Saved Inspirations



\---



\## Gallery Domain



Stores



\* Categories

\* Products

\* Product Images

\* Tags



\---



\## Order Domain



Stores



\* Orders

\* References

\* Status

\* Timeline

\* Revisions



\---



\## Feedback Domain



Stores



\* Reviews

\* Ratings

\* Images

\* Featured Feedback



\---



\## Notification Domain



Stores



\* Messages

\* Read Status

\* Delivery Status



\---



\## Media Domain



Stores



Cloudinary references.



Never images.



\---



\# PART II



\# Core Entities



```

Users



Addresses



Orders



OrderStatus



OrderRevisions



ReferenceImages



Gallery



GalleryImages



Categories



Tags



Feedback



PinnedFeedback



Notifications



MediaFiles



AuditLogs



Settings

```



\---



\# Entity Relationship Diagram



```text

&#x20;                USERS

&#x20;                   │

&#x20;    ┌──────────────┼──────────────┐

&#x20;    │              │              │

&#x20;ORDERS      NOTIFICATIONS    FEEDBACK

&#x20;    │              │

&#x20;    │              │

REFERENCE\_IMAGES

&#x20;    │

MEDIA\_FILES



GALLERY

&#x20;    │

GALLERY\_IMAGES

&#x20;    │

CATEGORY

&#x20;    │

TAGS

```



\---



\# Users Table



```text

users



id



uuid



name



email



phone



password\_hash



provider



role



profile\_image



is\_verified



status



created\_at



updated\_at



deleted\_at

```



\---



Role



```text

CUSTOMER



ADMIN



SUPER\_ADMIN

```



\---



Indexes



Email



Phone



Role



\---



\# Address Table



One customer can have multiple addresses.



```text

addresses



id



user\_id



full\_name



phone



country



state



city



postal\_code



address\_line1



address\_line2



landmark



is\_default

```



\---



Relationship



```text

User



1



↓



Many Addresses

```



\---



\# Orders Table



The heart of the application.



```text

orders



id



uuid



order\_number



customer\_id



status



estimated\_price



final\_price



budget



deadline



gift\_message



priority



notes



accepted\_at



completed\_at



created\_at



updated\_at

```



\---



Order Number



Example



```text

TT-2026-00125

```



Human readable.



\---



\# Order Status Table



Instead of storing text repeatedly.



```text

order\_status



id



name



color



sequence



```



Values



```text

Draft



Submitted



Under Review



Accepted



Materials



In Progress



Quality Check



Packing



Shipped



Delivered



Completed



Cancelled

```



\---



\# Order Timeline



Instead of overwriting status.



Store history.



```text

order\_timeline



id



order\_id



status\_id



message



created\_by



created\_at

```



Example



```text

Started crocheting sunflower petals.

```



\---



\# Order Revision



Every edit.



```text

order\_revisions



id



order\_id



version



changed\_by



changes



created\_at

```



Never lose history.



\---



\# Reference Images



```text

reference\_images



id



order\_id



media\_id



caption



priority



uploaded\_by

```



\---



\# Media Files



Instead of



binary.



```text

media\_files



id



cloudinary\_public\_id



url



width



height



mime



size



checksum



created\_at

```



\---



\# Gallery Table



```text

gallery



id



title



description



category\_id



difficulty



estimated\_days



price\_from



price\_to



featured



slug



created\_at

```



\---



\# Gallery Images



One product



Many images.



```text

gallery\_images



id



gallery\_id



media\_id



sort\_order

```



\---



\# Categories



```text

categories



id



name



slug



icon



parent\_id

```



Allows nesting.



Example



Flowers



↓



Sunflowers



\---



\# Tags



```text

tags



id



name



slug

```



Many-to-many



Gallery



↓



Tags



\---



\# Feedback



```text

feedback



id



order\_id



customer\_id



rating



letter



public



anonymous



created\_at

```



\---



\# Feedback Images



```text

feedback\_media



id



feedback\_id



media\_id

```



\---



\# Pinned Feedback



```text

featured\_feedback



id



feedback\_id



featured\_type



priority



expires\_at

```



\---



Type



```text

Today's Favorite



Weekly Favorite



Artist Pick

```



\---



\# Inspiration Board



One of our custom features.



```text

boards



id



customer\_id



title



description

```



\---



Board Items



```text

board\_items



id



board\_id



gallery\_id



notes



created\_at

```



\---



\# Notifications



```text

notifications



id



user\_id



type



title



message



read



created\_at

```



\---



Types



```text

ORDER



SYSTEM



FEEDBACK



UPDATE



PROMOTION

```



\---



\# Notification Delivery



Tracks delivery.



```text

notification\_delivery



id



notification\_id



channel



status



sent\_at

```



\---



Channels



```text

Email



Web



Push



WhatsApp



Instagram (Future)

```



\---



\# Audit Logs



Every important action.



```text

audit\_logs



id



user\_id



entity



entity\_id



action



old\_value



new\_value



ip



device



created\_at

```



Example



```text

Changed



Deadline



From



July 12



To



July 18

```



\---



\# PART III



\# Relationships



\---



User



↓



Many Orders



\---



Order



↓



Many References



\---



Order



↓



Many Timeline Entries



\---



Order



↓



Many Revisions



\---



Gallery



↓



Many Images



\---



Category



↓



Many Gallery Products



\---



Feedback



↓



Many Images



\---



Board



↓



Many Inspirations



\---



Notification



↓



Many Deliveries



\---



\# Foreign Keys



Every FK should use UUID references internally.



Human-readable IDs are for display only.



Examples:



\* `orders.customer\_id → users.id`

\* `reference\_images.order\_id → orders.id`

\* `feedback.order\_id → orders.id`

\* `gallery.category\_id → categories.id`



This keeps relationships consistent and avoids exposing sequential IDs publicly.



\---



\# Constraints



Examples:



\* Email must be unique.

\* Phone number (if provided) should be unique.

\* Rating must be between 1 and 5.

\* Price values cannot be negative.

\* Deadline cannot be before order creation.

\* Gallery slug must be unique.

\* Only one default address per user.



\---



\# Indexing Strategy



Indexes should prioritize the most common queries.



| Table         | Index                           |

| ------------- | ------------------------------- |

| users         | email, phone                    |

| orders        | customer\_id, status, created\_at |

| gallery       | category\_id, featured, slug     |

| feedback      | order\_id, customer\_id           |

| notifications | user\_id, read                   |

| audit\_logs    | entity, created\_at              |



Composite indexes can be added later after observing production query patterns.



\---



\# Soft Delete Strategy



Important business records should not be permanently deleted.



Tables using soft deletes:



\* Users

\* Orders

\* Gallery

\* Feedback

\* Categories



Implementation:



```text

deleted\_at TIMESTAMP NULL

```



If `deleted\_at` is null, the record is active.



\---



\# Data Retention



Recommended retention policy:



| Data            | Retention                                |

| --------------- | ---------------------------------------- |

| Orders          | Permanent                                |

| Feedback        | Permanent (unless user requests removal) |

| Notifications   | 180 days                                 |

| Audit logs      | 2 years                                  |

| Upload failures | 30 days                                  |



Policies should comply with local privacy regulations.



\---



\# PART IV



\# Migration Strategy



Database changes must never be made manually in production.



Use migration tools (Alembic) for:



\* Creating tables.

\* Altering columns.

\* Adding indexes.

\* Renaming entities.

\* Data migrations.



Every migration should be reversible where practical.



\---



\# Future Expansion



The schema is intentionally designed to support future additions without major restructuring.



Potential future domains:



\* Payments

\* Shipping providers

\* Multi-artist support

\* Loyalty points

\* Gift cards

\* Workshop bookings

\* AI recommendations

\* Customer messaging

\* Marketplace storefronts



These can be added as separate modules while reusing the existing user, media, and notification infrastructure.



\---



\# Database Design Summary



The proposed schema provides:



\* A normalized relational model.

\* Clear domain separation.

\* Strong referential integrity.

\* Complete auditability.

\* Flexible media handling.

\* Efficient indexing.

\* Safe soft-delete behavior.

\* Room for future growth into a much larger platform.



\---



\# Recommendation Before Coding



This database design is intentionally implementation-agnostic. Before writing backend code, I recommend producing \*\*Document 8 — API Specification (OpenAPI)\*\*. That document should define:



\* Every endpoint.

\* Request and response schemas.

\* Authentication rules.

\* Validation rules.

\* Error codes.

\* Pagination.

\* File upload contracts.

\* Notification APIs.

\* Webhook interfaces (for future integrations).



Designing the API contract first allows the frontend and backend to be developed in parallel while ensuring both teams work against the same interface, reducing integration issues later.



