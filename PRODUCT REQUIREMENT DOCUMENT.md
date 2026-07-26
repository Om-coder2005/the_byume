\# **PRODUCT REQUIREMENT DOCUMENT (PRD)**



\*\*Project Name (Working Title)\*\*



> \*\*the\_byume\*\*

> \*A Digital Craft Studio for Custom Crochet \& Handmade Creations\*



\*(We'll decide the final branding later based on your friend's Instagram brand.)\*



\---



\# Version



```

Version: 1.0

Status: Draft

Document Type: Product Requirement Document (PRD)

Author: Om Kagilkar

Product Owner: TBD

Last Updated: July 2026

```



\---



\# Table of Contents



```

1\. Executive Summary



2\. Vision



3\. Problem Statement



4\. Product Goals



5\. Target Audience



6\. Product Scope



7\. Out of Scope



8\. Core Features



9\. Functional Requirements



10\. Non Functional Requirements



11\. User Roles



12\. Customer Journey



13\. Admin Journey



14\. Business Rules



15\. Success Metrics



16\. Future Scope



17\. Risks



18\. Assumptions



19\. MVP



20\. Release Plan

```



\---



\# 1 Executive Summary



\## Overview



This project aims to build a \*\*production-ready web application\*\* that enables customers to browse handcrafted crochet products, explore previous custom creations, place personalized orders, communicate efficiently with the artist, and leave meaningful feedback after receiving their orders.



Unlike a traditional e-commerce platform where products are purchased instantly, this application focuses on \*\*custom-made creations\*\*, making the order process collaborative rather than transactional.



The platform also provides an artist dashboard for managing orders, references, customer communication, and showcasing customer appreciation through a curated feedback wall.



The ultimate goal is to reduce repetitive Instagram DMs while offering customers a professional, memorable, and enjoyable experience that reflects the craftsmanship behind every handmade product.



\---



\# 2 Vision



\## Vision Statement



> To create the most delightful digital experience for handmade crochet businesses, where ordering a custom creation feels as personal and artistic as receiving the finished product.



\---



\## Product Philosophy



This is \*\*not an online shop.\*\*



It is a



> Digital Craft Studio.



Every interaction should communicate



\* warmth

\* creativity

\* craftsmanship

\* trust

\* personalization



The website should feel like walking into an artist's cozy workspace rather than browsing a commercial marketplace.



\---



\# 3 Problem Statement



Currently, the business operates primarily through Instagram Direct Messages.



While Instagram is effective for discovery, it presents several operational challenges:



\### Customers repeatedly ask



\* "Can you show me flower bouquet examples?"

\* "Do you have sunflower references?"

\* "Can you make anime characters?"

\* "Can I see previous custom orders?"

\* "How much will this cost?"



The artist must manually search previous work and resend reference images for nearly every inquiry.



\---



\### Order information becomes scattered



Customer sends



```

Reference image



↓



Another reference



↓



Budget



↓



Delivery date



↓



Color preference



↓



New changes



↓



Voice note



↓



Another image

```



Important information becomes difficult to track.



\---



\### Feedback is difficult to organize



Satisfied customers send kind messages in Instagram DMs, but those messages are:



\* difficult to find later

\* difficult to showcase

\* impossible to search

\* not reusable as social proof



\---



\### Business growth becomes difficult



As order volume increases,



\* customer communication

\* organization

\* reference management

\* follow-ups



become increasingly time-consuming.



\---



\# 4 Product Goals



\## Primary Goals



\### G1



Reduce repetitive Instagram conversations by at least \*\*70%\*\*.



\---



\### G2



Provide customers with a beautiful browsing experience for previous creations.



\---



\### G3



Allow customers to submit complete order requirements in one place.



\---



\### G4



Improve organization of custom orders.



\---



\### G5



Create a memorable customer experience that reflects the handmade nature of the products.



\---



\### G6



Centralize customer feedback into a structured system.



\---



\### G7



Provide the artist with an easy-to-use admin dashboard.



\---



\# 5 Target Audience



\## Primary Audience



Customers looking for customized handmade products.



Examples



\* Birthday gifts

\* Anniversary gifts

\* Wedding gifts

\* Pet replicas

\* Anime characters

\* Personalized bouquets

\* Mini dolls

\* Keychains

\* Home decor



Age



18–40



\---



\## Secondary Audience



People browsing for inspiration before placing an order.



\---



\## Tertiary Audience



Returning customers who already trust the artist and want to reorder.



\---



\# 6 Product Scope



The application includes:



\### Customer Side



\* Homepage

\* Gallery

\* Categories

\* Search

\* Filters

\* Product Details

\* Inspiration Board

\* Custom Order Builder

\* Order Tracking

\* Feedback Postcard

\* Customer Profile

\* Notifications

\* Saved References



\---



\### Artist/Admin Side



Dashboard



Orders



Gallery Management



Feedback Wall



Pinned Reviews



Customer Management



Notifications



Analytics (future)



Settings



\---



\# 7 Out of Scope (Version 1)



The following are intentionally excluded from the initial release:



\* AI chatbot

\* Multi-language support

\* Multiple artists

\* Marketplace for different sellers

\* Inventory management

\* Automated sentiment analysis

\* Native Android/iOS applications

\* Live video consultations

\* Subscription plans

\* International currency conversion

\* Advanced recommendation engine



These may be considered in future versions based on business growth and user feedback.



\---



\# 8 Core Features



\## Customer Features



\### Product Gallery



Customers can browse categorized examples of previous crochet creations.



\---



\### Smart Search



Search by



\* Flowers

\* Anime

\* Bouquet

\* Pet

\* Doll

\* Color

\* Occasion



\---



\### Inspiration Collections



Customers can save favorite products.



\---



\### Custom Order Builder



A guided experience for submitting custom orders with:



\* Product type

\* Reference images

\* Budget

\* Color preferences

\* Delivery timeline

\* Additional notes



Orders remain editable until accepted by the artist.



\---



\### Order Timeline



Customers can track order progress through stages such as:



\* Submitted

\* Accepted

\* In Progress

\* Packing

\* Shipped

\* Delivered



\---



\### Feedback Postcards



After delivery, customers receive a digital postcard to share their experience.



Feedback can include:



\* Written message

\* Rating

\* Optional product photo



\---



\## Admin Features



\### Dashboard



Overview of:



\* New orders

\* Pending orders

\* Active work

\* Delivered orders

\* Recent feedback



\---



\### Gallery Manager



Upload and organize product images into categories with tags, pricing ranges, estimated completion times, and customization notes.



\---



\### Order Management



Review, accept, reject, update, or communicate regarding customer orders.



\---



\### Feedback Wall



Pin selected feedback postcards for daily or weekly highlights and export them as story-ready graphics for Instagram.



\---



\### Notifications



Receive alerts for new orders, updates, and customer activity through configurable notification channels.



\---



\# 9 Unique Selling Proposition (USP)



Most handmade businesses rely on fragmented communication through social media.



This platform combines:



\* Inspiration gallery

\* Custom order workflow

\* Customer communication

\* Project tracking

\* Showcase-ready feedback

\* Artist-focused management tools



into a single cohesive experience tailored for custom handmade products.



\---



\# 10 Product Principles



Every feature should satisfy at least one of the following principles:



1\. \*\*Craftsmanship\*\* — The interface should reflect the care and artistry of handmade work.

2\. \*\*Clarity\*\* — Customers should always know what information is needed and what happens next.

3\. \*\*Personalization\*\* — Custom orders should feel collaborative rather than transactional.

4\. \*\*Efficiency\*\* — Reduce repetitive manual work for the artist.

5\. \*\*Trust\*\* — Protect customer data and provide transparent order tracking.

6\. \*\*Scalability\*\* — Design decisions should support future expansion without major rewrites.



\---



\# 11 Success Metrics (Initial KPIs)



During the first few months after launch, success can be measured through:



| Metric                                               | Target            |

| ---------------------------------------------------- | ----------------- |

| Reduction in repetitive Instagram reference requests | ≥ 70%             |

| Percentage of orders submitted through the website   | ≥ 60%             |

| Average order completion form accuracy               | ≥ 90%             |

| Customer feedback submission rate                    | ≥ 40%             |

| Average website performance (Lighthouse)             | ≥ 90              |

| Mobile responsiveness issues                         | 0 critical issues |

| Order management time reduction                      | ≥ 50%             |



\---



\# 12 MVP (Minimum Viable Product)



The first production release should focus on the core workflow:



\* Landing page

\* Product gallery

\* Category browsing

\* Product detail pages

\* Custom order builder

\* Reference image uploads

\* Editable orders (before acceptance)

\* Artist dashboard

\* Order management

\* Notification system

\* Feedback postcards

\* Authentication

\* Responsive design

\* Basic security

\* Production deployment



Advanced analytics, AI features, and recommendation systems will be deferred to later phases.



\---



\# Product Requirement Document (PRD)



\## Part 2 — Functional Requirements \& System Behaviour



\*\*Version:\*\* 1.0

\*\*Status:\*\* Draft



\---



\# 11. Functional Requirements



Every functional requirement is assigned a unique ID for future development, testing, and traceability.



\---



\# Module A — Authentication



\---



\## FR-001 User Registration



The system shall allow customers to register using:



\* Google Account

\* Email + OTP



Future



\* Apple Login

\* Phone OTP



\---



\## FR-002 Login



The system shall authenticate users securely.



Requirements



\* JWT Authentication

\* Refresh Tokens

\* Remember Me

\* Session Expiration



\---



\## FR-003 Profile



Users can



\* Edit Name

\* Change Profile Picture

\* Change Email

\* Change Phone

\* Manage Saved Addresses



\---



\## FR-004 Logout



Logout from



\* Current Device



or



\* All Devices



\---



\# Module B — Homepage



\---



\## FR-005 Landing Page



Homepage shall include



\* Hero Section

\* Featured Products

\* Popular Categories

\* Recently Made

\* Customer Stories

\* Instagram Feed

\* CTA



\---



\## FR-006 Search



Customer can search



Examples



```text

Sunflower



Rose



Anime



Totoro



Cat



Dog



Wedding



Birthday



Bouquet



Keychain

```



\---



\## FR-007 Category Navigation



Categories



```text

Flowers



Bouquets



Pets



Anime



Mini Dolls



Bookmarks



Pipe Cleaner



Home Decor



Wedding



Custom

```



\---



\## FR-008 Filters



Users can filter by



Difficulty



Budget



Color



Occasion



Time Required



Newest



Most Popular



\---



\# Module C — Gallery



\---



\## FR-009 Gallery Grid



Every product card contains



Photo



Name



Category



Price Range



Time Required



Quick View



Save



\---



\## FR-010 Product Detail



Displays



Gallery



Description



Available Colors



Customization Options



Estimated Price



Estimated Time



Related Products



\---



\## FR-011 Save Inspiration



User can save products.



Saved items become



"Inspiration Board"



\---



\## FR-012 Share



Customer can



Copy Link



Share WhatsApp



Share Instagram



Share Pinterest



\---



\# Module D — Custom Order Builder



This is the heart of the application.



\---



\## FR-013 Start New Order



Customer clicks



Create Custom Order



\---



\## FR-014 Step 1



Choose Product Type



Example



Bouquet



Keychain



Mini Doll



Pet



Anime



Custom



\---



\## FR-015 Step 2



Upload References



Supports



PNG



JPG



JPEG



WEBP



Maximum



10 Images



\---



\## FR-016 Step 3



Reference Notes



Every uploaded image can contain



Caption



Highlight Area



Color Notes



Priority



\---



\## FR-017 Step 4



Customization



Customer enters



Size



Colors



Accessories



Pose



Packaging



Gift Message



\---



\## FR-018 Step 5



Budget



Optional



Minimum



Maximum



Flexible Budget



\---



\## FR-019 Step 6



Delivery Date



Calendar Picker



Priority Option



Gift Deadline



\---



\## FR-020 Step 7



Additional Notes



Rich Text



Emoji



Bullet Points



\---



\## FR-021 Draft Saving



Every change automatically saves.



\---



\## FR-022 Resume Draft



User can continue later.



\---



\## FR-023 Edit Order



Until



Artist Accepts



Customer can edit



Images



Budget



Deadline



Notes



\---



\## FR-024 Cancel Order



Allowed before acceptance.



\---



\# Module E — Order Lifecycle



\---



\## FR-025 Order Status



Possible states



```text

Draft



Submitted



Under Review



Accepted



Waiting for Materials



In Progress



Quality Check



Packing



Shipped



Delivered



Completed



Cancelled

```



\---



\## FR-026 Timeline



Customer sees



Animated progress.



\---



\## FR-027 Artist Notes



Admin can add



Progress Messages



Example



```text

Started making petals 🌸



Completed bouquet wrapping



Packaging today

```



\---



\## FR-028 Progress Photos



Artist uploads



Work in Progress images.



\---



\## FR-029 Shipping Details



Admin enters



Courier



Tracking ID



Tracking URL



Expected Delivery



\---



\# Module F — Notifications



\---



\## FR-030 Customer Notification



Notify customer when



Order Accepted



Progress Updated



Image Uploaded



Shipped



Delivered



Feedback Available



\---



\## FR-031 Admin Notification



Notify artist when



New Order



Edited Order



Cancelled Order



New Feedback



\---



\## FR-032 Notification Center



Maintain notification history.



\---



\# Module G — Feedback



\---



\## FR-033 Feedback Request



Automatically sent



after order marked



Delivered.



\---



\## FR-034 Feedback Postcard



Customer receives



Interactive postcard.



Includes



Letter



Rating



Photo



Optional Video



\---



\## FR-035 Ratings



1–5 Stars



\---



\## FR-036 Public Permission



Customer decides



Show publicly



Yes



No



\---



\## FR-037 Anonymous Mode



Hide Name



Optional



\---



\## FR-038 Edit Feedback



Allowed



within



7 Days



\---



\# Module H — Feedback Wall



\---



\## FR-039 Pin Feedback



Admin pins



Daily Favorite



Weekly Favorite



Artist's Choice



\---



\## FR-040 Generate Story



Creates



1080×1920



Instagram Story



Automatically.



\---



\## FR-041 Download



PNG



JPEG



PDF



\---



\# Module I — Admin Dashboard



\---



\## FR-042 Dashboard



Display



Today's Orders



Pending



Revenue



Feedback



Messages



Notifications



\---



\## FR-043 Order Manager



Accept



Reject



Pause



Complete



Archive



\---



\## FR-044 Gallery Manager



Upload



Edit



Delete



Categories



\---



\## FR-045 Customer Manager



View



History



Orders



Feedback



\---



\## FR-046 Reports



Future



Revenue



Orders



Growth



Popular Products



\---



\# 12. User Stories



\---



\## Customer



"As a customer,



I want to browse previous crochet creations,



so I can decide what I want."



\---



"As a customer,



I want to upload reference images,



so the artist understands my expectations."



\---



"As a customer,



I want to edit my order before it's accepted,



so I can correct mistakes."



\---



"As a customer,



I want to track progress,



so I know when my product will arrive."



\---



"As a customer,



I want to leave a beautiful handwritten review,



so I can appreciate the artist."



\---



\## Artist



"As an artist,



I want all references organized,



so I don't search Instagram chats."



\---



"As an artist,



I want automatic notifications,



so I never miss an order."



\---



"As an artist,



I want to pin customer feedback,



so I can build trust."



\---



"As an artist,



I want to upload progress photos,



so customers stay excited."



\---



\# 13. Business Rules



\---



\### BR-001



Order cannot be edited



after acceptance.



\---



\### BR-002



Maximum



10 Reference Images.



\---



\### BR-003



Every uploaded image



must be below



10 MB.



\---



\### BR-004



Customer must provide



at least



1 Reference Image.



\---



\### BR-005



Feedback allowed only



after delivery.



\---



\### BR-006



Only admin can pin feedback.



\---



\### BR-007



Deleted orders



remain archived.



\---



\### BR-008



Customer cannot delete



completed orders.



\---



\### BR-009



Progress photos



are visible



only to the customer who placed the order and the admin.



\---



\### BR-010



Every status change



creates an audit log.



\---



\# 14. Edge Cases



\### Customer closes browser



↓



Draft restored.



\---



Customer uploads corrupted image



↓



Reject upload.



\---



Admin loses internet



↓



Retry update.



\---



Two tabs editing order



↓



Latest version conflict detected.



\---



Customer edits



after acceptance



↓



Edit disabled.



\---



Order deadline expired



↓



Notify admin.



\---



Large upload



↓



Chunk upload.



\---



Duplicate feedback



↓



Prevent submission.



\---



Notification failure



↓



Retry queue.



\---



\# 15. Acceptance Criteria



Example



\---



\### Create Order



Customer uploads



references



fills information



submits



Result



Order appears in dashboard.



Admin notified.



Customer receives confirmation.



\---



\### Feedback



Customer opens postcard



writes review



clicks submit



Result



Stored successfully.



Visible in dashboard.



Eligible for pinning.



\---



\### Order Tracking



Admin changes



In Progress



↓



Customer immediately sees



updated timeline.



\---



\# 16. Notification Matrix



| Event                   | Customer     | Admin |

| ----------------------- | ------------ | ----- |

| Order Submitted         | Confirmation | ✅     |

| Order Edited            | —            | ✅     |

| Order Accepted          | ✅            | —     |

| Progress Photo Uploaded | ✅            | —     |

| Status Changed          | ✅            | —     |

| Order Delivered         | ✅            | —     |

| Feedback Submitted      | —            | ✅     |

| New Gallery Upload      | Optional     | —     |



\---



\# 17. Order Lifecycle Specification



```text

Draft

&#x20;  │

&#x20;  ▼

Submitted

&#x20;  │

&#x20;  ▼

Under Review

&#x20;  │

&#x20;┌─┴───────────────┐

&#x20;│                 │

&#x20;▼                 ▼

Accepted        Rejected

&#x20;│

&#x20;▼

Waiting Materials

&#x20;│

&#x20;▼

In Progress

&#x20;│

&#x20;▼

Quality Check

&#x20;│

&#x20;▼

Packing

&#x20;│

&#x20;▼

Shipped

&#x20;│

&#x20;▼

Delivered

&#x20;│

&#x20;▼

Completed

```



\---



\# 18. Error Handling Requirements



The application should provide friendly, actionable messages instead of technical errors.



| Situation            | User Message                                                                        |

| -------------------- | ----------------------------------------------------------------------------------- |

| Upload too large     | "This image exceeds the maximum size of 10 MB. Please choose a smaller file."       |

| Unsupported format   | "Please upload a JPG, PNG, JPEG, or WEBP image."                                    |

| Network interruption | "Connection lost. We'll retry automatically."                                       |

| Session expired      | "Your session has expired. Please sign in again to continue."                       |

| Validation error     | "Some required information is missing. Please review the highlighted fields."       |

| Server unavailable   | "We're having trouble processing your request right now. Please try again shortly." |



\---



\# 19. Open Questions (To Be Resolved)



These decisions can be finalized before development begins:



1\. Will customers be allowed to reorder a previous design with modifications?

\->yes

2\. Should the artist approve estimated pricing before the order becomes active?

\->yes

3\. Will shipping labels be managed inside the application or through an external logistics provider?

\->currently not in application, for now managed by the artist themselves

4\. Should customers be able to communicate inside the web application, or should conversations remain on Instagram/WhatsApp?

\->both mostly through insta and whatsapp

5\. Will gift wrapping and greeting cards be configurable options?

\->no, it will be based on how the artist brands it

6\. Should there be a "Rush Order" option with additional charges?

\->yes

7\. Will the platform initially support only one artist, or should the architecture allow multiple artists in the future?

\->only one artist who is owner of Instagram page





\---



\## PRD Progress



At this point, the PRD defines \*\*what\*\* the product should do and the rules governing its behavior. The next document should shift from requirements to \*\*who the users are and how they experience the product\*\*.



The recommended next document is \*\*Document 2: User Research \& UX Strategy\*\*, where we'll create detailed personas, empathy maps, customer journeys, pain points, UX principles, and accessibility goals. This will ensure every interface and interaction is designed around real user needs before we move into information architecture and visual design.



