```
# Feature Specification Document (FSD-12)
```

```
# Admin Content Management System (CMS) & Business Configuration
```

`**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**` ⭐⭐⭐⭐⭐ `Critical **Status:** Production Ready Specification` 

```
> **Purpose:** The Admin CMS enables the Byume team to manage every piece of
dynamic content—from homepage banners and featured products to SEO metadata and
seasonal campaigns—without requiring developers. It is the platform's publishing
and business operations center.
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

`3. CMS Architecture` 

`4. Content Types` 

`5. Homepage Builder` 

`6. Campaign Management` 

`7. Category & Tag Management` 

`8. Static Pages` 

`9. FAQ & Help Center` 

`10. Media Library` 

`11. SEO Management` 

`12. Feature Flags & Configuration` 

`13. Components` 

`14. Database Mapping` 

`15. API Contract` 

`16. Backend Design` 

`17. Frontend Design` 

`18. Security` 

`19. Performance` 

`20. Accessibility` 

`21. Analytics` 

`22. Acceptance Criteria` 

`23. AI Implementation Instructions` 

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
The CMS should allow the business owner to update the website without touching
code.
```

```
Common tasks include:
```

- `Launch a Valentine's collection.` 

- `Replace homepage hero images.` 

- `Update FAQs.` 

- `Add a new category.` 

- `Publish announcements.` 

- `Change shipping policies.` 

- `Feature customer stories.` 

```
---
```

```
# Business Goals
```

# `Primary Goals` 

- `Eliminate developer dependency.` 

- `Enable rapid marketing campaigns.` 

- `Improve SEO.` 

- `Keep content fresh.` 

- `Simplify business operations.` 

# `KPIs` 

|`| Metric               | Target  |`<br>`| -------------------- | ------- |`|
|---|
|`| Homepage Update Time | <5 min  |`|
|`| Campaign Publishing  | <10 min |`|
|`| SEO Coverage         | 100%    |`|
|`| Media Reuse Rate     | >70%    |`|
|`| Publishing Errors    | <1%     |`|



```
---
```

# `# CMS Architecture` 

```
```text
Admin
```

```
↓
```

# `CMS Dashboard` 

```
├── Homepage
├── Campaigns
├── Collections
├── Categories
├── Tags
├── Pages
├── FAQs
├── Testimonials
├── Media Library
├── SEO
├── Feature Flags
└── Settings
```
```

```
---
```

```
# Homepage Builder
```

```
Sections
```

```
```text
Hero Banner
```

```
↓
```

```
Featured Products
```

```
↓
Seasonal Collection
↓
Customer Stories
```

```
↓
```

```
How It Works
```

```
↓
```

```
Instagram Feed
```

```
↓
```

```
Newsletter
```

```
↓
```

```
Footer
```
```

```
Every section can be:
```

- `Enabled` 

- `Disabled` 

- `Reordered` 

- `Previewed` 

```
---
```

```
# Hero Banner Manager
```

```
Fields
```

```
```text
Title
```

```
Subtitle
```

```
CTA Text
```

```
CTA Link
```

```
Background Image
```

```
Mobile Image
```

```
Overlay
```

```
Display Dates
```
```

```
Supports
```

- `Draft` 

- `Scheduled` 

- `Published` 

- `Archived` 

```
---
```

```
# Campaign Management
```

```
Examples
```

- `Valentine's Day` 

- `Mother's Day` 

```
* Christmas
```

- `Diwali` 

- `Wedding Season` 

```
Each campaign includes:
```

```
```text
Campaign Name
```

```
Description
```

```
Banner
```

```
Products
Landing Page
SEO
Start Date
End Date
```
```

```
---
```

```
# Category Management
Fields
```

```
```text
Name
```

```
Slug
```

```
Description
```

```
Icon
```

```
Cover Image
Sort Order
Visibility
```
```

```
Supports
```

- `Nesting (Future) * Bulk Import` 

```
* Bulk Export
```

```
---
```

```
# Tag Management
```

```
Examples
```

```
```text
Crochet
```

```
Bouquet
```

```
Handmade
```

```
Birthday
```

```
Wedding
```

```
Pink
```

```
Minimal
```

```
Premium
```
```

```
Tags are searchable and reusable.
```

```
---
```

# `# Static Pages` 

```
Editable Pages
```

```
* About Us
```

```
* Contact
```

- `Privacy Policy` 

- `Terms & Conditions` 

- `Shipping Policy` 

- `Returns` 

- `Custom Order Guide` 

```
Editor
```

```
Rich Text + Markdown support.
```

```
Future
```

```
Block Editor.
```

```
---
```

```
# FAQ Management
```

```
Structure
```

```
```text
Category
```

```
↓
```

```
Question
```

```
↓
```

```
Answer
```

```
↓
```

```
Sort Order
```
```

```
Supports
```

```
* Search
```

- `Collapse` 

```
* Category grouping
```

```
---
```

# `# Testimonials` 

```
Sources
```

- `Customer Reviews` 

- `Featured Stories` 

- `Manual Entries` 

```
Admin can:
```

- `Feature` 

- `Archive` 

- `Edit display text` 

- `Assign homepage placement` 

```
---
```

# `# Media Library` 

```
Purpose
```

```
Central repository for all assets.
```

```
Folders
```

```
```text
Homepage
```

```
Products
```

```
Reviews
```

```
Campaigns
```

```
Icons
```

```
Illustrations
```

```
Logos
```
```

```
---
```

```
Media Metadata
```

```
```text
Filename
```

```
Alt Text
```

```
Size
```

```
Dimensions
Uploaded By
Usage Count
```
```

```
---
```

```
Supported Formats
```

```
Images
```

```
* JPG
* PNG
* WEBP
* SVG
```

```
Future
```

```
* Video
* Lottie
* PDF
```

```
---
```

```
Image Processing
```

```
Automatically generate:
```

```
* Thumbnail
* Mobile
```

```
* Tablet
* Desktop
* Retina
```

```
---
```

```
# SEO Management
Each page supports
```text
SEO Title
Meta Description
Canonical URL
Keywords
Open Graph Image
Twitter Card
Structured Data
```
```

```
Preview
```

```
Google Search Result
Social Preview
```

```
---
```

```
# Sitemap Management
```

```
Automatically updates when:
```

- `Product published` 

- `Collection added` 

- `Static page updated` 

```
---
```

```
# Robots.txt
```

```
Configurable
```

```
Examples
```

```
```text
Disallow:
```

```
Allow:
Sitemap:
```
```

```
---
```

```
# Feature Flags
```

```
Enable/Disable
```

```
```text
Wishlist
```

```
Reviews
```

```
Community
```

```
AI Recommendations
```

```
Dark Mode
```

```
Holiday Theme
```

```
Beta Features
```

```
```
```

# `Supports` 

```
* Percentage rollout (Future)
```

```
* User group rollout (Future)
```

```
---
```

```
# Global Business Configuration
```

```
Settings
```

```
```text
Business Name
```

```
Support Email
```

```
Support Phone
```

```
Instagram URL
Shipping Time
Business Hours
Currency
```

```
Timezone
```
```

```
---
```

```
# Components
```

```
```text
CMSSidebar
```

```
SectionEditor
```

```
RichTextEditor
```

```
MediaPicker
```

```
CampaignCard
CategoryTable
FAQEditor
SEOCard
```

```
FeatureToggle
PublishBar
PreviewPanel
```
```

```
---
```

```
# Publishing Workflow
```

```
```text
Draft
```

```
↓
```

```
Preview
```

```
↓
```

```
Schedule
```

```
↓
```

```
Publish
```

```
↓
```

```
Archive
```
```

```
Supports
```

- `Autosave` 

- `Version history` 

- `Rollback` 

```
---
```

```
# Database Mapping
```

```
Tables
```text
cms_pages
```

```
cms_sections
campaigns
categories
tags
media_assets
seo_metadata
feature_flags
faq
```

```
business_settings
```
```

```
Relationships
```

```
```text
Page
```

```
↓
```

```
Sections
```

```
↓
```

```
Media
```

```
↓
```

```
SEO
```
```

```
---
```

```
# API Contract
```

```
Homepage
```

```
```http
GET /cms/homepage
```

```
PATCH /admin/cms/homepage
```
```

```
Campaigns
```

```
```http
GET /campaigns
POST /admin/campaigns
```

```
PATCH /admin/campaigns/{id}
```
```

```
Pages
```

```
```http
GET /pages/{slug}
PATCH /admin/pages/{id}
```
```

```
Categories
```http
GET /categories
POST /admin/categories
```
```

```
Media
```

```
```http
POST /admin/media
GET /admin/media
```
```

```
SEO
```http
PATCH /admin/seo/{id}
```
```

```
Feature Flags
```

```
```http
GET /admin/feature-flags
PATCH /admin/feature-flags
```
```

```
---
```

```
# Backend Design
```

```
Module
```

```
```text
cms/
```
```

```
Contains
```

```
```text
router.py
service.py
repository.py
media.py
seo.py
campaigns.py
```

# `pages.py` 

# `tests/` 

```
```
```

# `Services` 

```
* CMSService
```

- `CampaignService` 

- `MediaService` 

- `SEOService` 

- `FeatureFlagService` 

# `Responsibilities` 

- `Content CRUD.` 

- `Publishing workflow.` 

- `Asset management.` 

- `SEO generation.` 

- `Configuration management.` 

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
/admin/cms
```

```
/admin/pages
```

```
/admin/campaigns
```

```
/admin/media
```

```
/admin/seo
```

```
/admin/settings
```
```

```
Hooks
```

```
```text
useCMS()
```

```
useCampaigns()
```

```
useMediaLibrary()
```

```
useSEO()
```

```
useFeatureFlags()
```

```
useBusinessSettings()
```
```

```
State
```

- `TanStack Query` 

- `Zustand (editor state)` 

- `React Hook Form + Zod` 

```
---
```

# `# Security` 

- `RBAC for publishing actions.` 

- `Version history for all edits.` 

- `Audit logs.` 

- `Signed media uploads.` 

- `Input sanitization.` 

- `Preview mode protected by authentication.` 

```
---
```

# `# Performance` 

# `Requirements` 

- `Editor load <2 seconds.` 

- `Autosave every 30 seconds.` 

- `CDN-backed media delivery.` 

- `Incremental static regeneration for published content.` 

- `Optimized image variants.` 

```
---
```

# `# Accessibility` 

- `Keyboard-friendly editor.` 

- `Accessible media picker.` 

- `Proper heading hierarchy.` 

- `ARIA support for drag-and-drop.` 

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
Page Published
```

```
Campaign Created
```

```
Media Uploaded
```

```
SEO Updated
```

```
Feature Flag Changed
```

```
Homepage Edited
```

```
FAQ Updated
```

```
Preview Viewed
```
```

```
---
```

```
# Acceptance Criteria
```

```
The feature is complete when:
```

- `Homepage sections are editable.` 

- `Campaigns can be scheduled.` 

- `Categories and tags are manageable.` 

- `Static pages are editable.` 

- `Media library supports search and reuse.` 

- `SEO metadata is configurable.` 

- `Feature flags work correctly.` 

- `Publishing workflow includes draft, preview, publish, and archive.` 

- `Performance and accessibility scores ≥95.` 

```
---
```

```
# Definition of Done
```

```
* CMS module implemented.
```

- `Homepage builder operational.` 

- `Campaign manager complete.` 

- `Media library integrated.` 

- `SEO tools functional.` 

- `Feature flags operational.` 

- `Version history implemented.` 

- `Unit, integration, and E2E tests passing.` 

- `Security review completed.` 

- `Matches approved Figma designs.` 

```
---
```

```
# AI Implementation Instructions
```

```
## For Antigravity (Frontend)
```

```
Implement the CMS as a **visual publishing studio**, not a traditional admin
form interface.
```

```
Requirements:
```

- `Modular page builder with draggable content sections.` 

- `Split-screen editing (editor + live preview).` 

- `Rich media picker with search and folders.` 

- `Publishing workflow with draft, preview, schedule, and publish states.` 

- `Reuse components (`SectionEditor`, `MediaPicker`, `SEOCard`, `PublishBar`, `PreviewPanel`) to maintain consistency with the Byume design system.` 

- `Preserve the handcrafted aesthetic while ensuring editors can efficiently manage content.` 

```
---
```

```
## For Codex (Backend)
```

```
Implement the complete `cms` module using the project's layered architecture.
Generate:
```

- `Content CRUD services with version history.` 

- `Campaign scheduling and publishing.` 

- `Media asset management with image processing.` 

- `SEO metadata management.` 

- `Feature flag service.` 

- `Business configuration service.` 

- `Autosave and rollback support.` 

- `Comprehensive unit, integration, and end-to-end tests.` 

```
Ensure compatibility with:
```

- `**Document 7** – Database Design` 

- `**Document 8** – API Specification` 

```
* **Document 9** – Backend Architecture
```

```
* **FSD-07** – Admin Dashboard
```

```
* **FSD-08** – Feedback & Community Showcase
```

```
* **FSD-11** – Search & Discovery (categories, tags, collections)
```

```
---
```

```
# 📌 Next Feature (FSD-13)
```

```
The next specification should be **Payments, Pricing, Invoicing & Financial
Management**.
```

```
This will cover:
```

```
* Razorpay integration (primary)
```

```
* UPI, Cards, Net Banking, Wallets
```

- `Partial payments and deposits for custom orders` 

```
* Payment verification and webhooks
```

```
* Refund management
```

```
* Quotes and invoices (GST-ready)
```

```
* Coupons and promotional discounts
```

```
* Shipping charges
```

```
* Tax calculation
```

```
* Financial dashboard
```

```
* Revenue analytics
```

```
* Export to Excel/CSV
```

```
* Ledger and transaction history
```

```
This module will complete the business transaction layer and make the Byume
platform production-ready for real customer payments.
```

