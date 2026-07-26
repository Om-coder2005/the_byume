\# Document 3 — **Information Architecture \& System Navigation**



\## Project: the\_byume (Working Title)



\*\*Document Version:\*\* 1.0

\*\*Status:\*\* Draft



\---



\# Table of Contents



```text

1\. Information Architecture Philosophy



2\. Application Ecosystem



3\. Sitemap



4\. Navigation Hierarchy



5\. Customer Navigation



6\. Admin Navigation



7\. Complete Screen Inventory



8\. User Flow



9\. Order Flow



10\. Feedback Flow



11\. Notification Flow



12\. Route Structure (Next.js)



13\. URL Strategy



14\. Permission Matrix



15\. Future Scalability



16\. Design Rules



17\. Navigation Guidelines

```



\---



\# 1. Information Architecture Philosophy



The architecture should feel like \*\*a guided creative studio\*\*, not an online marketplace.



Every user should naturally move through these stages:



```text

Discover



↓



Get Inspired



↓



Customize



↓



Track



↓



Celebrate



↓



Return

```



Unlike Amazon, the focus isn't on checkout speed.



It's about helping customers confidently commission something unique.



\---



\# 2. Application Ecosystem



The platform has \*\*three major systems\*\*.



```text

&#x20;              Thread \& Tale



&#x20;                  │



&#x20;    ┌─────────────┼─────────────┐



&#x20;    │             │             │



&#x20;Customer       Artist        System



&#x20;    │             │             │



&#x20;Gallery      Dashboard     Notifications



&#x20;Orders       Management     Authentication



&#x20;Feedback     Analytics      Storage



&#x20;Wishlist     Gallery        Security



&#x20;Tracking      Reviews       API

```



\---



\# 3. Complete Sitemap



\## Public Pages



```text

/



About



Gallery



Categories



Collections



Testimonials



How It Works



FAQ



Contact



Privacy Policy



Terms \& Conditions

```



\---



\## Authentication



```text

/login



/register



/forgot-password



/verify-otp



/reset-password

```



\---



\## Customer Area



```text

/profile



/profile/edit



/orders



/order/{id}



/wishlist



/inspiration-board



/feedback



/settings



/notifications

```



\---



\## Ordering



```text

/create-order



/create-order/details



/create-order/reference



/create-order/customization



/create-order/review



/order-success

```



\---



\## Feedback



```text

/feedback/new



/feedback/history



/feedback/{id}

```



\---



\## Admin



```text

/admin



/admin/orders



/admin/gallery



/admin/customers



/admin/reviews



/admin/story-generator



/admin/settings



/admin/notifications



/admin/profile

```



\---



\## Future



```text

/community



/blog



/tutorials



/events



/workshops



/chat



/live-order



```



\---



\# 4. Navigation Hierarchy



\## Public



```text

Home



Gallery



Collections



How It Works



About



Contact

```



\---



Customer



```text

Home



Gallery



My Orders



Inspiration



Notifications



Profile

```



\---



Admin



```text

Dashboard



Orders



Gallery



Feedback



Customers



Notifications



Settings

```



\---



\# 5. Customer Navigation Flow



```text

Instagram



↓



Homepage



↓



Gallery



↓



Product Details



↓



Save Inspiration



↓



Custom Order



↓



Submit



↓



Track Order



↓



Feedback



↓



Reorder

```



Notice



No unnecessary pages.



Every click should bring the customer closer to placing an order.



\---



\# 6. Homepage Architecture



Instead of random sections.



The homepage should tell a story.



```text

Navbar



↓



Hero



↓



Featured Collections



↓



Why Handmade?



↓



Browse Categories



↓



Latest Creations



↓



How Ordering Works



↓



Customer Love



↓



Instagram Feed



↓



FAQ



↓



Footer

```



\---



\# 7. Gallery Architecture



Gallery



↓



Categories



↓



Subcategories



↓



Products



↓



Product Details



↓



Related Products



↓



Save Inspiration



↓



Order



\---



Categories



```text

Flowers



Bouquets



Anime



Pets



Mini Dolls



Bookmarks



Pipe Cleaner



Wedding



Birthday



Home Decor



Seasonal



Others

```



Each category



contains



Subcategories.



Example



Flowers



↓



```text

Rose



Sunflower



Tulip



Lily



Lavender



Mixed Bouquet

```



\---



\# 8. Product Detail Architecture



Every product page should answer all customer questions.



```text

Images



↓



Description



↓



Estimated Price



↓



Customization



↓



Materials



↓



Production Time



↓



Related Products



↓



Customer Reviews



↓



Create Similar Order

```



\---



\# 9. Order Builder Navigation



Instead of



one long form.



Wizard.



```text

Step 1



Product



↓



Step 2



Reference Images



↓



Step 3



Customization



↓



Step 4



Budget



↓



Step 5



Delivery



↓



Step 6



Review



↓



Submit

```



Customer always knows



where they are.



\---



\# 10. Order Dashboard



Customer



```text

Upcoming



↓



In Progress



↓



Delivered



↓



Completed

```



Each order card



shows



```text

Thumbnail



Status



Expected Date



Progress



Quick Actions

```



\---



\# 11. Artist Dashboard



Landing



↓



Widgets



```text

Today's Orders



Pending



Recent Customers



Feedback



Revenue



Notifications

```



↓



Quick Actions



```text

Upload Product



Accept Order



Pin Feedback



Create Story



```



\---



\# 12. Gallery Manager



Gallery



↓



Category



↓



Subcategory



↓



Products



↓



Upload



↓



Edit



↓



Archive



\---



Every upload



contains



```text

Images



Category



Tags



Difficulty



Price Range



Time



Description

```



\---



\# 13. Feedback Architecture



Delivered



↓



Request Feedback



↓



Customer writes postcard



↓



Rating



↓



Submit



↓



Admin Review



↓



Pin



↓



Story Generator



↓



Instagram



\---



\# 14. Notification Flow



Customer



```text

Order Accepted



↓



Push



↓



Email



↓



Website

```



\---



Admin



```text

New Order



↓



Dashboard



↓



Email



↓



WhatsApp



(Future)

```



\---



\# 15. User Flow



\## New Customer



```text

Instagram



↓



Website



↓



Browse



↓



Save Inspiration



↓



Order



↓



Timeline



↓



Delivery



↓



Feedback



↓



Return

```



\---



Returning Customer



```text

Login



↓



Order History



↓



Duplicate Previous



↓



Modify



↓



Submit

```



\---



Artist



```text

Login



↓



Dashboard



↓



Accept Order



↓



Upload Progress



↓



Ship



↓



Receive Feedback



↓



Pin Review

```



\---



\# 16. Order Lifecycle Navigation



```text

Draft



↓



Submitted



↓



Review



↓



Accepted



↓



Materials



↓



Crocheting



↓



Quality Check



↓



Packing



↓



Shipping



↓



Delivered



↓



Completed

```



Every state



has



Dedicated UI.



Dedicated Notifications.



Dedicated Permissions.



\---



\# 17. Route Structure (Next.js)



```

app/



layout.tsx



page.tsx



(auth)



login



register



(customer)



gallery



categories



product



orders



feedback



notifications



profile



(admin)



dashboard



orders



gallery



feedback



customers



settings



(api)



upload



auth



orders



feedback



notifications



(shared)



components



hooks



animations



utils



services

```



\---



\# 18. URL Strategy



Good URLs



```text

/gallery



/gallery/flowers



/gallery/flowers/sunflower



/product/sunflower-bouquet



/orders



/order/ORD-105



/profile



/admin/orders

```



Avoid



```text

?id=234



?page=3



?cat=12

```



Use descriptive, SEO-friendly slugs wherever appropriate.



\---



\# 19. Deep Linking Strategy



Every important entity should have a shareable URL.



Examples:



\* Product page → Share with friends.

\* Public feedback postcard → Share on social media (if customer consented).

\* Collection page → Share from Instagram bio.

\* Story-generated gallery → Link back to website.



Deep links should always resolve gracefully, even if the user is not logged in, redirecting to authentication only when necessary.



\---



\# 20. Permission Matrix



| Feature                  | Guest | Customer | Admin |

| ------------------------ | :---: | :------: | :---: |

| View homepage            |   ✅   |     ✅    |   ✅   |

| Browse gallery           |   ✅   |     ✅    |   ✅   |

| Search products          |   ✅   |     ✅    |   ✅   |

| Save inspiration         |   ❌   |     ✅    |   ✅   |

| Place order              |   ❌   |     ✅    |   ❌   |

| Edit own draft order     |   ❌   |     ✅    |   ❌   |

| View own orders          |   ❌   |     ✅    |   ❌   |

| Submit feedback          |   ❌   |     ✅    |   ❌   |

| View admin dashboard     |   ❌   |     ❌    |   ✅   |

| Manage gallery           |   ❌   |     ❌    |   ✅   |

| Manage orders            |   ❌   |     ❌    |   ✅   |

| Pin feedback             |   ❌   |     ❌    |   ✅   |

| Generate Instagram story |   ❌   |     ❌    |   ✅   |

| Manage users             |   ❌   |     ❌    |   ✅   |



\---



\# 21. Scalability Plan



The architecture should anticipate future growth without requiring structural changes.



\### Phase 1 (Current)



\* Single artist

\* Single admin

\* Custom order management

\* Gallery

\* Feedback system



\### Phase 2



\* Multiple admin roles

\* Shipping integrations

\* Payment gateway

\* AI-assisted order categorization

\* Basic analytics



\### Phase 3



\* Multi-artist support

\* Customer messaging

\* Community showcase

\* Workshops and events

\* Digital pattern sales



\### Phase 4



\* Mobile applications

\* AI inspiration recommendations

\* Customer sentiment dashboard

\* Internationalization

\* Multi-currency support



\---



\# 22. Navigation Design Rules



To keep the application intuitive, these rules should apply across all screens:



\* A customer should reach any primary feature in \*\*three clicks or fewer\*\*.

\* Every page should have one clearly identifiable primary action.

\* Multi-step flows (like order creation) should always show progress.

\* Navigation labels should use plain language ("My Orders" instead of "Order Management").

\* The back button should never cause data loss.

\* Drafts should be preserved automatically.



\---



\# 23. Information Architecture Summary



The final structure consists of:



\* \*\*Public experience\*\* for discovery and inspiration.

\* \*\*Customer workspace\*\* for orders, tracking, and feedback.

\* \*\*Artist workspace\*\* for operational management.

\* \*\*Shared infrastructure\*\* for authentication, notifications, storage, and future expansion.



This separation keeps responsibilities clear while making it easy to add new capabilities later.



\---



\# End of Document 3



With the information architecture complete, we now know:



\* Every page in the application.

\* How users navigate between them.

\* How orders move through the system.

\* Which roles can access which features.

\* How the application is organized for future scalability.



\---



\## Before Document 4



I recommend a small adjustment to the roadmap.



Instead of jumping directly into the visual \*\*Design System\*\*, we should insert a \*\*System Architecture \& Technical Design Document\*\*. This will define the engineering foundation—technology choices, backend architecture, database boundaries, APIs, storage, authentication, deployment, and scalability. Once that is finalized, the Design System and wireframes can be created with a clear understanding of the underlying capabilities.



The revised sequence would be:



1\. ✅ Product Requirement Document

2\. ✅ User Research \& UX Strategy

3\. ✅ Information Architecture \& Navigation

4\. \*\*System Architecture \& Technical Design\*\*

5\. Design System

6\. Wireframes

7\. Database Design

8\. API Specification

9\. Frontend Architecture

10\. Backend Architecture

11\. Security

12\. Deployment \& DevOps



This order more closely reflects how production software is planned in professional engineering teams and will reduce redesign work later.



