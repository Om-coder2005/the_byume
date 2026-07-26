```
# Feature Specification Document (FSD-05)
```

```
# Custom Order Builder (Core Feature)
```

`**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**` ⭐⭐⭐⭐⭐ `Critical **Status:** Production Ready Specification` 

```
> **Purpose:** The Custom Order Builder is the heart of the Byume platform.
Every major feature (Gallery, Inspiration Boards, Product Details, Customer
Dashboard) ultimately leads here. It transforms inspiration into a structured
order request that gives the artist everything needed to begin creating a
personalized handmade piece.
```

```
---
```

# `# Table of Contents` 

```
```text
```

`1. Feature Overview` 

`2. Business Goals` 

```
3. User Journey
```

`4. Order Lifecycle` 

`5. Wizard Architecture` 

```
6. Step Specifications
```

```
7. Draft Management
```

`8. Validation Rules` 

`9. Pricing Engine` 

`10. File Upload System` 

```
11. Review & Submission
```

```
12. Components
```

`13. Database Mapping` 

`14. API Contract` 

`15. Backend Design` 

`16. Frontend Design` 

`17. Notifications` 

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
The Order Builder should feel like collaborating with an artist—not filling out
a checkout form.
```

```
The user should gradually communicate their vision through a guided
conversation.
```

```
**Design Principles**
```

```
* One decision at a time.
```

- `No overwhelming forms.` 

- `Visual-first.` 

- `Auto-save everything.` 

- `Mobile-first.` 

- `Recoverable at every stage.` 

```
---
```

# `# Business Goals` 

```
Primary Goals
```

- `Replace Instagram DMs.` 

- `Reduce incomplete order information.` 

```
* Minimize artist follow-up questions.
```

- `Increase completed custom orders.` 

# `KPIs` 

|`| Metric                  | Target |`|
|---|
|`| ----------------------- | ------ |`|
|<br>`| Draft Completion        | >80%   |`|
|`| Order Submission        | >65%   |`|
|`| Average Completion Time | <6 min |`|
|`| Draft Recovery          | >90%   |`|
|`| Upload Success          | >99%   |`|



```
---
```

# `# User Journey` 

# `### Standard Flow` 

```
```text
Landing
```

```
↓
```

```
Gallery
```

```
↓
```

```
Product
```

```
↓
```

```
Customize
```

```
↓
```

```
Order Builder
```

```
↓
```

```
Review
```

```
↓
```

```
Submit
↓
Order Timeline
```
```

```
---
### From Inspiration Board
```

```
```text
```

```
Board
```

```
↓
Convert to Order
↓
Order Builder
↓
Review
↓
Submit
```
---
### Returning User
```text
Dashboard
↓
Draft Orders
↓
Continue Editing
↓
Submit
```
```

```
---
# Order Lifecycle
```text
Draft
↓
Submitted
↓
Artist Review
↓
Accepted
↓
Material Procurement
↓
```

```
In Progress
```

```
↓
```

```
Quality Check
```

```
↓
```

```
Packaging
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
Every transition creates:
```

```
* Timeline Event
```

```
* Notification
```

```
* Audit Log
```

```
---
```

```
# Wizard Architecture
```

```
The Order Builder consists of **8 progressive steps**.
```

```
```text
Step 1
```

```
Product Selection
```

```
↓
```

```
Step 2
```

```
Customization
```

```
↓
```

```
Step 3
```

```
Reference Images
```

```
↓
```

```
Step 4
Occasion
```

```
↓
```

```
Step 5
Delivery Details
```

```
↓
```

```
Step 6
```

```
Additional Notes
```

```
↓
```

```
Step 7
```

```
Review
```

```
↓
```

```
Step 8
```

```
Submit
```
```

```
Progress is always visible.
```

```
---
```

```
# Step 1 — Product Selection
```

```
Purpose
```

```
Identify what the customer wants.
```

```
Options
```

- `From Gallery` 

- `From Inspiration Board` 

- `Completely Custom` 

```
Fields
```

```
* Category
```

- `Product` 

- `Quantity` 

```
Validation
```

```
Category required.
```

```
---
```

```
# Step 2 — Customization
```

```
Dynamic based on category.
```

```
Example
```

```
Bouquet
```

```
```text
Flower Type
```

```
↓
```

```
Colors
```

```
↓
```

```
Wrapping
↓
Ribbon
↓
Size
```
```

```
Crochet Plushie
```text
Animal
↓
Colors
↓
Accessories
↓
```

```
Height
```

```
↓
```

```
Expression
```
```

```
Every option is configurable by the admin in future versions.
---
# Step 3 — Reference Images
```

```
Purpose
```

```
Allow customers to communicate visually.
```

```
Sources
```

```
* Gallery
* Inspiration Board
```

```
* Device Upload
```

- `Camera` 

```
* Drag & Drop
```

```
Limits
```

```
| Item    | Value             |
| ------- | ----------------- |
| Images  | 20                |
| Size    | 10 MB             |
| Formats | JPG PNG WEBP HEIC |
```

```
Features
```

```
* Preview
* Remove
* Reorder
```

```
* Zoom
```

```
---
```

```
# Upload Flow
```

```
```text
Device
↓
```

```
Compression
↓
Validation
↓
Signed Upload
↓
Cloudinary
↓
Media Table
↓
Order Draft
```
```

```
---
```

```
# Step 4 — Occasion
```

```
Examples
```

```
* Birthday
```

- `Anniversary` 

- `Wedding` 

- `Graduation` 

- `Baby Shower` 

- `Valentine's Day` 

- `Mother's Day` 

- `Other` 

```
Additional Fields
```

```
Recipient Name
```

```
Gift Message
```

```
Gift Wrap
```

```
Urgency
```

```
---
```

```
# Step 5 — Delivery
```

```
Fields
```

```
Recipient Name
```

```
Phone
```

```
Address
```

```
City
```

```
State
```

```
Pincode
```

```
Preferred Delivery Date
```

```
Special Instructions
```

```
Address can be selected from saved addresses.
```

```
---
```

```
# Step 6 — Additional Notes
```

```
Rich Text
```

```
Supports
```

```
* Lists
```

```
* Emojis
```

```
* Formatting
```

```
Character Limit
```

```
3000
```

```
Prompt
```

```
> Tell the artist anything that will help create your perfect handmade piece.
```

```
---
```

```
# Step 7 — Review
```

```
Display
```

```
```text
Selected Product
```

```
↓
```

```
Customization
```

```
↓
```

```
Images
```

```
↓
```

```
Delivery
```

```
↓
```

```
Notes
```

```
↓
```

```
Estimated Price
↓
Estimated Timeline
```
```

```
Editable sections.
```

```
---
```

```
# Step 8 — Submit
```

```
Confirmation
```

```
```text
Your order request has been sent!
The artist will review it shortly.
```
```

```
Buttons
```

```
```text
View Timeline
```

```
Go to Dashboard
```
```

```
---
```

```
# Draft Management
```

```
Every change auto-saves.
```

```
States
```

```
```text
New
```

```
↓
```

```
Draft
```

```
↓
```

```
Synced
```

```
↓
Submitted
```
Auto-save
```

```
Every
5 seconds
```

```
OR
After field changes.
```

```
Draft expires
```

```
Never
```

```
(unless manually deleted)
```

```
---
```

```
# Components
```

```
```text
OrderStepper
```

```
ProgressBar
```

```
CategorySelector
CustomizationPanel
ReferenceUploader
OccasionSelector
AddressSelector
RichTextEditor
OrderSummary
PriceEstimateCard
StickyFooter
ConfirmationModal
```
```

```
---
```

```
# Pricing Engine
Display
Estimated only.
```

```
Calculation
```

```
```text
Base Category
```

```
+
```

```
Customization Complexity
```

```
+
```

```
Quantity
```

```
+
```

```
Accessories
```

```
=
```

```
Estimated Price Range
```
```

```
Example
```

```
```text
₹900 – 1200₹
```
```

```
Final price
```

```
Determined by artist after review.
```

```
---
```

# `# Validation Rules` 

```
Required
```

- `Category` 

- `At least one reference` 

- `Delivery details` 

- `Contact information` 

```
Optional
```

- `Gift Message` 

- `Notes` 

```
Prevent
```

- `Empty submissions` 

- `Unsupported file types` 

- `Oversized images` 

```
---
```

# `# Database Mapping` 

```
Tables
```

```
```text
orders
```

```
order_items
```

```
order_customizations
```

```
order_images
```

```
order_notes
```

```
addresses
```

```
media_files
```

```
timeline_events
```

```
```
```

```
Relationships
```

```
```text
```

```
User
```

```
↓
```

```
Orders
↓
Many Images
↓
Many Customizations
↓
Timeline
```
```

```
---
```

```
# API Contract
Create Draft
```

```
```http
POST /orders/draft
```
```

```
Update Draft
```

```
```http
PATCH /orders/{id}
```
```

```
Upload Image
```

```
```http
POST /orders/{id}/images
```
```

```
Submit Order
```

```
```http
POST /orders/{id}/submit
```
```

```
Delete Draft
```

```
```http
DELETE /orders/{id}
```
```

```
Estimate Price
```

```
```http
POST /orders/estimate
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
```

```
orders/
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
validators.py
pricing.py
upload.py
schemas.py
tests/
```
```

```
Services
```

- `DraftService` 

- `PricingService` 

- `UploadService` 

- `SubmissionService` 

```
---
```

```
# Frontend Design
```

# `Routes` 

```
```text
/orders/new
```

```
/orders/[id]
```

```
/orders/[id]/review
```
```

```
Hooks
```

```
```text
useDraftOrder()
```

```
useOrderAutosave()
```

```
useUploadImages()
```

```
useEstimate()
useSubmitOrder()
```
```

```
State
```

- `TanStack Query (server)` 

- `Zustand (wizard state)` 

- `React Hook Form + Zod (validation)` 

```
---
```

# `# Notifications` 

```
Customer
```

- `Draft Saved` 

- `Upload Complete` 

- `Order Submitted` 

- `Artist Accepted` 

- `Artist Requested Changes` 

# `Admin` 

- `New Order Received` 

- `High Priority Order` 

- `Failed Upload` 

```
---
```

# `# Security` 

- `JWT authentication required.` 

- `Signed uploads only.` 

- `Virus scanning (future).` 

- `Rate limiting.` 

- `Ownership validation.` 

- `Audit every submission.` 

```
---
```

# `# Performance` 

# `Requirements` 

- `Auto-save <500 ms.` 

- `Image upload with progress.` 

- `Resume interrupted uploads.` 

- `Lazy-load previous steps.` 

- `Optimistic UI updates.` 

```
---
```

# `# Accessibility` 

- `Keyboard navigation.` 

- `Stepper announcements.` 

- `Progress for screen readers.` 

- `Image upload alternatives.` 

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
Order Started
```

```
Draft Saved
```

```
Step Completed
```

```
Upload Success
Upload Failure
Estimate Viewed
Order Submitted
Abandoned Draft
Completion Time
```
```

```
---
```

# `# Acceptance Criteria` 

```
The feature is complete when:
```

- `Users can create and resume drafts.` 

- `Every step validates correctly.` 

- `Images upload successfully.` 

- `Drafts auto-save.` 

- `Orders submit successfully.` 

- `Price estimate displays.` 

- `Mobile experience is seamless.` 

- `Performance and accessibility scores exceed 95.` 

```
---
```

# `# Definition of Done` 

- `Multi-step wizard implemented.` 

- `Auto-save operational.` 

- `Cloudinary integration complete.` 

- `Draft recovery functional.` 

- `Price estimation implemented.` 

- `Notifications integrated.` 

- `Unit, integration, and E2E tests passing.` 

- `Security review completed.` 

- `Matches approved Figma designs.` 

```
---
```

# `# AI Implementation Instructions` 

# `## For Antigravity (Frontend)` 

```
Implement the Order Builder as a **guided creative experience**, not a checkout
form.
```

```
Requirements:
```

- `Multi-step wizard with animated progress.` 

- `Auto-save drafts every 5 seconds and on meaningful field changes.` 

- `Sticky footer with **Previous**, **Next**, and **Save Draft** actions.` 

- `Smooth transitions between steps (paper-slide animations).` 

- `Reuse business components (`OrderStepper`, `CustomizationPanel`,` 

- ``ReferenceUploader`, `AddressSelector`, `OrderSummary`).` 

- `Use **React Hook Form + Zod** for validation, **TanStack Query** for server state, and **Zustand** for wizard state.` 

- `Ensure uninterrupted mobile usage with resumable sessions.` 

```
---
```

```
## For Codex (Backend)
```

```
Implement the complete `orders` module using the project's layered architecture.
```

# `Generate:` 

- `SQLAlchemy models for orders, items, customizations, images, notes, and timeline events.` 

- `Draft creation and update APIs.` 

- `Autosave support with optimistic concurrency.` 

- `Secure media upload pipeline using signed Cloudinary uploads.` 

- `Configurable pricing estimation service.` 

- `Order submission workflow with timeline event generation.` 

- `Notification triggers and audit logging.` 

- `Comprehensive unit, integration, and end-to-end tests.` 

```
Follow the contracts defined in:
```

- `**Document 7** – Database Design` 

- `**Document 8** – API Specification` 

- `**Document 9** – Backend Architecture` 

- `**FSD-02** (Gallery), **FSD-03** (Product Details), and **FSD-04** (Inspiration Board) for seamless integration.` 

```
---
```

```
## 📌 Next Feature (FSD-06)
```

```
The next document should be **Order Timeline & Customer Dashboard**, covering
post-submission order tracking, milestone updates, notifications, timeline
events, invoices, and customer order management—the complete experience after an
order is placed.
```

