```
# Feature Specification Document (FSD-06)
```

```
# Order Timeline & Customer Dashboard
```

`**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**` ⭐⭐⭐⭐⭐ `Critical **Status:** Production Ready Specification` 

```
> **Purpose:** The Customer Dashboard is the customer's personal craft studio.
It provides a complete overview of every order, tracks progress in real time,
stores invoices and conversations, and keeps customers informed throughout the
handmade creation process.
```

```
---
```

```
# Table of Contents
```

```
```text
```

`1. Feature Overview` 

`2. Business Goals` 

`3. Dashboard Architecture` 

```
4. Customer Journey
```

```
5. Screen Specifications
```

```
6. Order Timeline
```

```
7. Order Details
```

```
8. Draft Orders
```

`9. Notifications Center` 

```
10. Order History
```

```
11. Invoice & Downloads
```

```
12. Components
```

`13. Database Mapping` 

```
14. API Contract
```

`15. Backend Design` 

`16. Frontend Design` 

`17. Notification System` 

`18. Security` 

`19. Performance` 

`20. Accessibility` 

`21. Analytics` 

`22. Acceptance Criteria` 

```
23. AI Implementation Instructions
```

```
```
```

```
---
```

```
# 1. Feature Overview
```

```
After placing an order, customers should never wonder:
```

```
> "Has the artist seen my order?"
```

```
or
```

```
> "What is happening now?"
```

```
The dashboard should provide complete transparency without requiring Instagram
messages.
```

```
---
```

```
# Business Goals
```

```
Primary Goals
```

- `Reduce status inquiries.` 

- `Build trust.` 

- `Improve customer retention.` 

```
* Provide a premium handcrafted experience.
```

# `KPIs` 

```
| Metric                   | Target |
| ------------------------ | ------ |
| Status Inquiry Reduction | >80%   |
| Dashboard Return Rate    | >60%   |
| Timeline Views           | >90%   |
| Notification Open Rate   | >70%   |
```

```
---
```

# `# Dashboard Architecture` 

```
```text
Dashboard
```

```
├── Active Orders
├── Draft Orders
├── Order Timeline
├── Notifications
├── Saved Inspiration Boards
├── Recent Feedback
├── Addresses
├── Profile
└── Settings
```
```

```
---
```

# `# Customer Journey` 

```
```text
Login
```

```
↓
```

```
Dashboard
```

```
↓
Active Orders
↓
Open Order
↓
Timeline
↓
View Progress
↓
Download Invoice
```

```
↓
```

```
Leave Feedback
↓
Completed
```
```

```
---
```

```
# Dashboard Layout
```

```
Desktop
```

```
```text
```

```
--------------------------------------------------------
```

```
Sidebar
```

```
Dashboard Overview
--------------------------------------------------------
Quick Stats
--------------------------------------------------------
Active Orders
Draft Orders
Notifications
Recent Boards
```

```
--------------------------------------------------------
```
```

```
---
```

```
Mobile
```

```
```text
Header
```

```
↓
Quick Stats
```

```
↓
Orders
```

```
↓
Timeline
```

```
↓
Notifications
```

```
↓
```

```
Bottom Navigation
```
```

```
---
```

```
# Quick Stats
```

```
Cards
```

```
```text
Active Orders
Draft Orders
Completed Orders
Saved Boards
```
```

```
Each card is clickable.
---
# Active Orders Section
Displays
```

```
```text
Order Thumbnail
```

```
↓
Order Number
↓
Status Badge
↓
Progress Bar
↓
Estimated Delivery
↓
View Details
```
```

```
Maximum
5 recent orders.
```

```
Button
```

```
```text
View All Orders
```
```

```
---
```

```
# Draft Orders
```

```
Purpose
```

```
Continue unfinished orders.
```

```
Each Draft
```text
Title
Last Saved
Progress %
Continue Editing
Delete Draft
```
```

```
---
```

```
# Order Details Screen
Contains
```text
Order Summary
↓
Timeline
↓
Reference Images
↓
Customization
↓
Artist Notes
↓
Invoice
↓
Feedback
```
```

```
---
```

```
# Timeline
Core feature.
```

```
Layout
```

```
```text
Order Submitted
```

```
↓
```

```
Artist Reviewing
```

```
↓
```

```
Accepted
```

```
↓
↓
```

```
Materials Purchased
```

```
Crafting
```

```
↓
↓
```

```
Quality Check
```

```
Packed
```

```
↓
```

```
Shipped
```

```
↓
```

```
Delivered
```

```
↓
```

```
Completed
```
```

```
Every event contains
```

```
* Icon
* Timestamp
```

```
* Description
```

- `Optional Photo` 

```
* Artist Note
```

```
---
```

```
Example Timeline Card
```

```
```text
```

```
🧶 Crafting Started
```

```
15 July • 3:20 PM
```

```
Your bouquet petals are now being handcrafted.
```

```
Photo Available
```

```
Artist Note:
"The sunflower petals are coming together beautifully!"
```
```

```
---
```

# `# Timeline Status Colors` 

```
| Status        | Color      |
| ------------- | ---------- |
| Draft         | Gray       |
| Submitted     | Blue       |
| Accepted      | Sage       |
| Crafting      | Terracotta |
| Quality Check | Gold       |
| Packed        | Brown      |
| Shipped       | Indigo     |
| Delivered     | Green      |
| Completed     | Emerald    |
```

```
---
```

# `# Progress Indicator` 

```
Visual
```

```
```text
```

```
━━━━━━━━━━━━━━
```

```
72%
```

```
Crafting
```

```
━━━━━━━━━━━━━━
```
```

```
Animated thread fills the progress line.
```

```
---
```

# `# Order Photos` 

```
Artist can upload
```

```
* Work in progress
* Materials
* Packaging
* Final product
```

```
Customers can zoom.
```

```
---
```

```
# Artist Notes
```

```
Displayed chronologically.
```

```
Example
```

```
> "Waiting for premium yarn delivery. Your order will resume tomorrow."
```

```
---
```

```
# Invoice Section
```

```
Contains
```

```
```text
Invoice Number
```

```
↓
```

```
Estimated Cost
```

```
↓
```

```
Final Cost
```

```
↓
```

```
Payment Status
```

```
↓
```

```
Download PDF
```
```

```
Future
```

```
GST invoice support.
```

```
---
```

# `# Notifications Center` 

```
Types
```

- `Order Accepted` 

- `Timeline Updated` 

- `New Artist Note` 

- `Invoice Available` 

- `Order Shipped` 

- `Delivered` 

- `Feedback Request` 

```
Each notification links directly to the relevant order.
```

```
---
```

```
# Completed Orders
```

```
Displays
```

```
```text
Photo
```

```
↓
```

```
Order Number
```

```
↓
```

```
Completion Date
```

```
↓
```

```
Reorder Similar
```

```
↓
```

```
Leave Feedback
```
```

```
---
```

```
# Components Used
```

```
```text
DashboardCard
```

```
OrderCard
```

```
TimelineStepper
TimelineEventCard
ProgressTracker
ArtistNote
InvoiceCard
NotificationCard
QuickStats
Sidebar
BottomNavigation
```
```

```
---
```

```
# Animations
Dashboard
↓
```

```
Cards fade in.
---
```

```
Timeline
↓
Thread draws vertically.
---
New Event
↓
Paper unfolds.
```

```
---
```

```
Progress
```

```
↓
Yarn fills bar.
---
```

```
Notification
```

```
↓
```

```
Paper postcard slides in.
```

```
---
```

# `# Empty States` 

```
No Active Orders
```

```
```text
No active handmade creations yet.
```

```
Start your first custom order.
```
```

```
Button
```

```
```text
Browse Gallery
```
```

```
---
```

```
No Notifications
```

```
Illustration
```

```
Bell with yarn.
```

```
---
```

```
No Drafts
```

```
```text
No saved drafts.
Start creating today.
```
```

```
---
```

```
# Database Mapping
```

```
Tables
```

```
```text
orders
```

```
timeline_events
```

```
notifications
order_notes
```

```
invoices
payments
media_files
```
```

```
Relationships
```

```
```text
Order
↓
Timeline Events
↓
Notifications
↓
Invoice
↓
Payment
```
```

```
---
# API Contract
Dashboard Summary
```

```
```http
GET /dashboard
```
```

```
Orders
```

```
```http
GET /orders
```
```

```
Single Order
```

```
```http
GET /orders/{id}
```
```

```
Timeline
```

```
```http
GET /orders/{id}/timeline
```
```

```
Notifications
```

```
```http
GET /notifications
```
```

```
Mark Read
```

```
```http
PATCH /notifications/{id}
```
```

```
Invoice
```

```
```http
```

```
GET /orders/{id}/invoice
```
```

```
Download Invoice
```

```
```http
GET /orders/{id}/invoice/download
```
```

```
---
```

# `# Backend Design` 

```
Module
```

```
```text
dashboard/
```
```

```
Contains
```

```
```text
router.py
```

```
service.py
repository.py
```

```
schemas.py
```

```
tests/
```

```
```
```

```
Services
```

- `DashboardService` 

- `TimelineService` 

- `NotificationService` 

- `InvoiceService` 

# `Responsibilities` 

- `Aggregate dashboard data.` 

- `Generate timelines.` 

- `Manage notifications.` 

- `Retrieve invoices.` 

```
---
```

```
# Frontend Design
```

```
Routes
```

```
```text
/dashboard
```

```
/orders
```

```
/orders/[id]
```

```
/notifications
```

```
```
```

```
Hooks
```

```
```text
useDashboard()
useOrders()
useTimeline()
useNotifications()
useInvoice()
```
```

```
State
```

```
* TanStack Query
```

```
* Zustand (filters, sidebar, UI)
```

```
---
```

```
# Notification System
```

```
Trigger Events
```text
Order Submitted
↓
Order Accepted
```

```
↓
Timeline Updated
```

```
↓
```

```
Artist Uploaded Image
```

```
↓
```

```
Invoice Generated
```

```
↓
```

```
Order Shipped
```

```
↓
```

```
Delivered
```

```
↓
```

```
Feedback Reminder
```
```

```
Delivery Channels
```

```
* In-app
```

- `Email` 

- `Push (future)` 

- `WhatsApp (future)` 

```
---
```

# `# Security` 

- `Customer can access only their own orders.` 

- `Signed invoice downloads.` 

- `Timeline images require authentication.` 

- `Audit every timeline update.` 

```
---
```

# `# Performance` 

```
Requirements
```

- `Dashboard load <2 seconds.` 

- `Timeline virtualization for long histories.` 

- `Image lazy loading.` 

- `Cache dashboard for 5 minutes.` 

- `Real-time updates via WebSockets (future).` 

```
---
```

# `# Accessibility` 

- `Timeline keyboard navigation.` 

- `Screen-reader announcements for new notifications.` 

- `Semantic timeline markup.` 

- `High-contrast status indicators.` 

- `WCAG AA compliant.` 

```
---
```

# `# Analytics` 

```
Track
```

```
```text
Dashboard Opened
```

```
Order Viewed
```

```
Timeline Viewed
```

```
Invoice Downloaded
```

```
Notification Opened
```

```
Draft Continued
```

```
Feedback Started
```

```
```
```

```
---
```

# `# Acceptance Criteria` 

```
The feature is complete when:
```

- `Dashboard displays active and completed orders.` 

- `Timeline updates correctly.` 

- `Artist notes are visible.` 

- `Notifications link to the correct order.` 

- `Invoices can be viewed and downloaded.` 

- `Drafts can be resumed.` 

- `Responsive across all devices.` 

- `Performance and accessibility scores ≥95.` 

```
---
```

# `# Definition of Done` 

- `Dashboard implemented.` 

- `Timeline integrated with order lifecycle.` 

- `Notification center complete.` 

- `Invoice support implemented.` 

- `Responsive layouts complete.` 

- `Tests passing.` 

- `Security review completed.` 

- `Matches approved Figma designs.` 

```
---
```

# `# AI Implementation Instructions` 

# `## For Antigravity (Frontend)` 

```
Implement the Customer Dashboard as a **personal creative workspace**, not a
generic account page.
```

```
Requirements:
```

- `Warm, handcrafted dashboard using the Byume design system.` 

- `Responsive sidebar (desktop) and bottom navigation (mobile).` 

- `Animated vertical timeline with thread-drawing effect.` 

- `Dashboard cards with layered paper styling.` 

- `Sticky status summary for active orders.` 

- `Reuse business components (`DashboardCard`, `OrderCard`, `TimelineEventCard`, `NotificationCard`, `InvoiceCard`) to maintain consistency.` 

- `Prioritize readability and emotional reassurance over dense data presentation.` 

```
---
```

# `## For Codex (Backend)` 

```
Implement the complete `dashboard` feature module following the project's
architecture.
```

# `Generate:` 

- `Dashboard aggregation service.` 

- `Order timeline service with event history.` 

- `Notification service with read/unread state.` 

- `Invoice retrieval and secure download endpoints.` 

- `Timeline event model integrated with the order lifecycle.` 

- `Efficient dashboard queries with Redis caching.` 

- `Unit, integration, and end-to-end tests.` 

```
Ensure compatibility with:
```

- `**Document 7** – Database Design` 

- `**Document 8** – API Specification` 

- `**Document 9** – Backend Architecture` 

- `**FSD-05** – Custom Order Builder (for draft continuation and submitted orders)` 

```
---
```

```
## 🧶 Next Feature (FSD-07)
```

```
The next specification should be **Admin Dashboard & Order Management**, which
will serve as the operational control center for the artist. It will cover order
review, acceptance/rejection, timeline updates, image uploads, pricing, customer
communication, gallery management, analytics, and business operations. This is
the most complex admin-side module and will likely be the largest FSD in the
project.
```

