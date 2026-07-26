# Feature Specification Document (FSD-07)

# Admin Dashboard & Order Management

**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**
⭐⭐⭐⭐⭐ Critical **Status:** Production Ready Specification

> **Purpose:** The Admin Dashboard is the artist's digital studio. It is
> where every custom order is reviewed, priced, crafted, tracked, and
> completed. Unlike traditional e-commerce admin panels, this workspace
> is designed around a **creative workflow**, enabling the artist to
> focus on making handmade products rather than managing software.

------------------------------------------------------------------------

# Table of Contents

``` text
1. Feature Overview
2. Business Goals
3. Admin Roles & Permissions
4. Dashboard Architecture
5. Workspace Layout
6. Order Inbox
7. Order Review Workflow
8. Order Detail Workspace
9. Timeline Management
10. Pricing & Quotation
11. Customer Communication
12. Media Management
13. Gallery Management
14. Business Analytics
15. Notification Center
16. Components
17. Database Mapping
18. API Contract
19. Backend Design
20. Frontend Design
21. Security
22. Performance
23. Accessibility
24. Analytics
25. Acceptance Criteria
26. AI Implementation Instructions
```

------------------------------------------------------------------------

# 1. Feature Overview

The Admin Dashboard is **not** a CRUD panel.

It is a **Creative Studio Operating System** where the artist manages
every stage of the handmade business.

The dashboard should answer:

-   What should I work on today?
-   Which orders are urgent?
-   Which customers need replies?
-   What should be shipped?
-   Which gallery items need updating?

------------------------------------------------------------------------

# Business Goals

Primary

-   Reduce manual management.
-   Simplify order handling.
-   Centralize customer communication.
-   Streamline gallery updates.
-   Improve production planning.

KPIs

  Metric                 Target
  ---------------------- ----------
  Order Review Time      \<5 min
  Timeline Update Time   \<30 sec
  Gallery Update Time    \<2 min
  Quote Accuracy         \>95%
  Missed Orders          0

------------------------------------------------------------------------

# Admin Roles

``` text
Super Admin

↓

Artist Admin

↓

Support Staff (Future)
```

------------------------------------------------------------------------

## Permission Matrix

  Feature           Artist   Support     Super Admin
  ----------------- -------- ----------- -------------
  View Orders       ✅       ✅          ✅
  Edit Orders       ✅       ❌          ✅
  Accept Orders     ✅       ❌          ✅
  Upload Progress   ✅       ❌          ✅
  Pricing           ✅       ❌          ✅
  Manage Gallery    ✅       ✅          ✅
  Analytics         ✅       Read Only   ✅

------------------------------------------------------------------------

# Dashboard Architecture

``` text
Dashboard

├── Today
├── Order Inbox
├── Active Orders
├── Timeline Updates
├── Customer Messages
├── Gallery Manager
├── Analytics
├── Notifications
├── Settings
```

------------------------------------------------------------------------

# Home Dashboard

Layout

``` text
--------------------------------------------------------

Sidebar

Today's Overview

--------------------------------------------------------

New Orders

Urgent Orders

Today's Deliveries

Quick Stats

--------------------------------------------------------

Production Queue

Recent Activity

Notifications

--------------------------------------------------------
```

------------------------------------------------------------------------

# Quick Stats

Cards

``` text
Pending Orders

↓

In Progress

↓

Shipping Today

↓

Completed This Month

↓

Revenue

↓

New Customers
```

------------------------------------------------------------------------

# Production Queue

Priority

``` text
Urgent

↓

Delivery Date

↓

Accepted Date

↓

Order Number
```

Supports

-   Drag & Drop priority (future)
-   Filters
-   Search

------------------------------------------------------------------------

# Order Inbox

Purpose

Review newly submitted orders.

Each Card

``` text
Thumbnail

Customer

Order Number

Category

Submitted

Estimated Budget

Quick Actions
```

Quick Actions

-   Open
-   Accept
-   Request Changes
-   Reject

------------------------------------------------------------------------

# Order Review Workspace

Layout

``` text
Customer

↓

Reference Images

↓

Customization

↓

Delivery

↓

Notes

↓

Price Estimation

↓

Timeline Preview

↓

Decision Panel
```

------------------------------------------------------------------------

Decision Panel

Buttons

``` text
Accept

Request Changes

Reject
```

------------------------------------------------------------------------

# Accept Order Flow

``` text
Review

↓

Set Final Price

↓

Set Timeline

↓

Accept

↓

Customer Notification

↓

Timeline Event
```

------------------------------------------------------------------------

# Request Changes Flow

Admin enters

-   Comment
-   Missing Information
-   Optional Images

Customer receives notification.

Order returns to

``` text
Needs Customer Action
```

------------------------------------------------------------------------

# Reject Flow

Requires

Reason

Optional

Explanation

Customer notified politely.

------------------------------------------------------------------------

# Pricing Panel

Fields

``` text
Materials

↓

Labor

↓

Packaging

↓

Shipping

↓

Discount

↓

Final Price
```

System calculates

``` text
Subtotal

↓

Discount

↓

Total
```

Future

GST

Coupons

------------------------------------------------------------------------

# Timeline Management

Admin can create

``` text
Materials Purchased

↓

Crafting Started

↓

Halfway Complete

↓

Quality Check

↓

Packaging

↓

Shipped

↓

Delivered
```

Each event supports

-   Timestamp
-   Note
-   Images
-   Customer visibility

------------------------------------------------------------------------

# Progress Upload

Artist uploads

-   Work-in-progress photos
-   Videos (future)
-   Material photos

Maximum

10 images per event.

------------------------------------------------------------------------

# Customer Communication

Supports

-   Order comments
-   Clarification requests
-   Internal notes
-   Public notes

Internal notes

Visible only to admin.

------------------------------------------------------------------------

# Gallery Management

Functions

``` text
Create Product

↓

Edit Product

↓

Archive Product

↓

Upload Images

↓

Manage Categories

↓

Manage Tags
```

Bulk actions

Supported.

------------------------------------------------------------------------

# Analytics Dashboard

Charts

``` text
Orders Per Month

Revenue

Popular Categories

Average Completion Time

Customer Retention

Repeat Customers
```

Future

Inventory insights.

------------------------------------------------------------------------

# Notification Center

Events

``` text
New Order

↓

Customer Replied

↓

Order Due Soon

↓

Payment Received

↓

Delivery Confirmed
```

------------------------------------------------------------------------

# Components

``` text
AdminSidebar

StatCard

OrderInboxCard

ReviewWorkspace

PricingCard

TimelineEditor

GalleryTable

AnalyticsChart

NotificationDrawer

ActivityFeed
```

------------------------------------------------------------------------

# Design Tokens

Use the same design system as the customer-facing application but with a
more productivity-oriented layout:

-   Cotton background
-   Warm neutral palette
-   Paper cards
-   Minimal distractions
-   Clear hierarchy
-   Large data tables
-   Soft shadows

Avoid dark corporate dashboards.

------------------------------------------------------------------------

# Animations

Dashboard

↓

Cards stagger in.

Timeline

↓

Thread grows.

Order Accepted

↓

Paper stamp animation.

Upload

↓

Progress thread.

Charts

↓

Smooth number transitions.

------------------------------------------------------------------------

# Database Mapping

Tables

``` text
orders

timeline_events

notifications

gallery

gallery_images

customers

payments

audit_logs
```

Additional

``` text
internal_notes

price_quotes
```

------------------------------------------------------------------------

# API Contract

Dashboard

``` http
GET /admin/dashboard
```

------------------------------------------------------------------------

Pending Orders

``` http
GET /admin/orders/pending
```

------------------------------------------------------------------------

Single Order

``` http
GET /admin/orders/{id}
```

------------------------------------------------------------------------

Accept

``` http
POST /admin/orders/{id}/accept
```

------------------------------------------------------------------------

Reject

``` http
POST /admin/orders/{id}/reject
```

------------------------------------------------------------------------

Request Changes

``` http
POST /admin/orders/{id}/revision
```

------------------------------------------------------------------------

Timeline Event

``` http
POST /admin/orders/{id}/timeline
```

------------------------------------------------------------------------

Upload Timeline Images

``` http
POST /admin/orders/{id}/timeline/images
```

------------------------------------------------------------------------

Gallery CRUD

``` http
POST /admin/gallery

PATCH /admin/gallery/{id}

DELETE /admin/gallery/{id}
```

------------------------------------------------------------------------

Analytics

``` http
GET /admin/analytics
```

------------------------------------------------------------------------

# Backend Design

Module

``` text
admin/
```

Contains

``` text
router.py

service.py

repository.py

analytics.py

pricing.py

timeline.py

gallery.py

tests/
```

Services

-   DashboardService
-   OrderReviewService
-   PricingService
-   TimelineService
-   AnalyticsService
-   GalleryAdminService

------------------------------------------------------------------------

# Frontend Design

Routes

``` text
/admin

/admin/orders

/admin/orders/[id]

/admin/gallery

/admin/analytics
```

Hooks

``` text
useAdminDashboard()

usePendingOrders()

useReviewOrder()

useTimelineEditor()

useAnalytics()
```

State

-   TanStack Query
-   Zustand (filters, workspace UI)
-   React Hook Form (review forms)

------------------------------------------------------------------------

# Security

-   RBAC enforced on every endpoint.
-   Audit logging for every admin action.
-   Immutable timeline history.
-   Signed media uploads.
-   CSRF protection where applicable.
-   Rate limiting for administrative actions.
-   IP and device logging for admin logins.

------------------------------------------------------------------------

# Performance

Requirements

-   Dashboard load \<2 seconds.
-   Timeline updates \<500 ms.
-   Optimistic UI for status changes.
-   Image compression before upload.
-   Redis caching for dashboard metrics.
-   Pagination and server-side filtering for large datasets.

------------------------------------------------------------------------

# Accessibility

-   Keyboard shortcuts for frequent actions.
-   Accessible tables and forms.
-   Focus management in modals.
-   Screen-reader labels for status changes.
-   WCAG AA compliant.

------------------------------------------------------------------------

# Analytics (Internal)

Track

``` text
Orders Accepted

Orders Rejected

Average Review Time

Timeline Updates

Gallery Edits

Price Changes

Customer Messages

Daily Productivity
```

------------------------------------------------------------------------

# Acceptance Criteria

The feature is complete when:

-   Admin can review every submitted order.
-   Quotes can be generated and updated.
-   Timeline events can be created with images.
-   Gallery management is fully functional.
-   Dashboard analytics display correctly.
-   Notifications are delivered.
-   Role-based permissions are enforced.
-   Responsive on tablet and desktop.
-   Performance and accessibility scores ≥95.

------------------------------------------------------------------------

# Definition of Done

-   Admin dashboard implemented.
-   Order review workflow complete.
-   Timeline editor functional.
-   Gallery CRUD complete.
-   Analytics dashboard integrated.
-   Security audit passed.
-   Unit, integration, and E2E tests passing.
-   Matches approved Figma designs.

------------------------------------------------------------------------

# AI Implementation Instructions

## For Antigravity (Frontend)

Implement the Admin Dashboard as a **creative operations workspace**,
not a generic admin panel.

Requirements:

-   Two-column responsive layout with collapsible sidebar.
-   Modular widgets (Today's Work, Production Queue, Notifications,
    Analytics).
-   Dedicated order review workspace with split-panel layout.
-   Inline timeline editor with drag-and-drop image uploads.
-   Reuse business components (`OrderInboxCard`, `TimelineEditor`,
    `PricingCard`, `GalleryTable`, `AnalyticsChart`) to maintain
    consistency.
-   Preserve the handcrafted visual identity while optimizing for
    efficiency and high-volume workflows.

------------------------------------------------------------------------

## For Codex (Backend)

Implement the complete `admin` module following the project's layered
architecture.

Generate:

-   Admin authentication middleware with RBAC.
-   Dashboard aggregation service.
-   Order review, acceptance, rejection, and revision workflows.
-   Pricing and quotation service.
-   Timeline management with media uploads.
-   Gallery management APIs (CRUD, categories, tags).
-   Analytics aggregation service.
-   Audit logging for all administrative actions.
-   Comprehensive unit, integration, and end-to-end tests.

Ensure compatibility with:

-   **Document 7** -- Database Design
-   **Document 8** -- API Specification
-   **Document 9** -- Backend Architecture
-   **FSD-05** -- Custom Order Builder
-   **FSD-06** -- Customer Dashboard & Order Timeline

------------------------------------------------------------------------

## 📌 Next Feature (FSD-08)

The next specification should be **Feedback, Reviews & Community
Showcase**, covering post-delivery reviews, photo uploads, featured
testimonials, public showcase galleries, Instagram-ready review cards,
moderation workflow, and how customer feedback integrates back into the
homepage and product pages. This feature will strengthen trust and
create a continuous loop between completed orders and future customers.
