```
# Feature Specification Document (FSD-04)
```

```
# Inspiration Board (Pinterest-style Collections)
```

```
**Project:** Thread & Tale (Byume)
**Version:** 1.0
```

```
**Status:** Production Ready Specification
```

```
> **Purpose:** The Inspiration Board allows customers to collect ideas before
placing a custom order. Instead of sending dozens of Instagram screenshots,
customers can organize products, upload reference images, add notes, and share a
curated vision with the artist.
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

`3. User Personas` 

`4. Functional Requirements` 

`5. User Journey` 

`6. Information Architecture` 

`7. Screen Specifications` 

`8. Board Management` 

`9. Reference Image Management` 

```
10. Components
```

`11. Database Mapping` 

```
12. API Contract
```

`13. Backend Design` 

`14. Frontend Design` 

```
15. Notifications
```

`16. Security` 

`17. Performance` 

`18. Accessibility` 

`19. Analytics` 

`20. Acceptance Criteria` 

`21. AI Implementation Instructions` 

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
The Inspiration Board is a **creative workspace**, not merely a favorites list.
```

```
It enables customers to:
```

- `Save products they like.` 

- `Upload inspiration from Pinterest or Instagram.` 

- `Add handwritten-style notes.` 

- `Organize ideas into themed boards.` 

- `Convert an inspiration board directly into a custom order.` 

```
---
```

# `# Business Goals` 

```
Primary Goals
```

- `Reduce repetitive conversations.` 

- `Improve communication quality.` 

- `Increase order conversion.` 

```
* Understand customer preferences.
```

```
KPIs
```

```
| Metric                           | Target |
| -------------------------------- | ------ |
| Products Saved                   | >30%   |
| Board → Order Conversion         | >40%   |
| Avg. Items per Board             | 8+     |
| Returning Customers Using Boards | >50%   |
```

```
---
```

# `# User Personas` 

```
### Gift Buyer
```

```
"I want to collect ideas before deciding."
```

```
---
```

```
### Bride / Wedding Customer
```

```
"I need one place for bouquet inspiration."
```

```
---
```

```
### Returning Customer
```

```
"I want to reuse previous inspiration."
```

```
---
```

# `### Artist` 

```
"I want organized references instead of scattered screenshots."
```

```
---
```

# `# Functional Requirements` 

```
| ID        | Requirement       | Priority |
| --------- | ----------------- | -------- |
| BOARD-001 | Create Board      | Must     |
| BOARD-002 | Rename Board      | Must     |
| BOARD-003 | Delete Board      | Must     |
| BOARD-004 | Save Product      | Must     |
| BOARD-005 | Upload References | Must     |
| BOARD-006 | Add Notes         | Must     |
| BOARD-007 | Share Board       | Should   |
| BOARD-008 | Duplicate Board   | Should   |
| BOARD-009 | Convert to Order  | Must     |
```

```
---
```

```
# User Journey
```

```
```text
Gallery
```

```
↓
```

```
Save Product
```

```
↓
```

```
Select Board
```

```
↓
```

```
Create New Board
```

```
↓
```

```
Add Notes
```

```
↓
```

```
Upload References
```

```
↓
```

```
Convert Into Order
```
```

```
---
```

```
# Information Architecture
```

```
```text
Dashboard
```

```
↓
```

```
My Inspiration Boards
```

```
↓
```

```
Board Details
```

```
↓
```

```
Products
```

```
↓
```

```
Reference Images
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
Create Custom Order
```
```

```
---
```

```
# Screen 1 — My Boards
Layout
```

```
```text
-----------------------------------
```

```
Navbar
```

```
-----------------------------------
```

```
+ Create Board
```

```
-----------------------------------
```

```
Board Card
```

```
Board Card
```

```
Board Card
```

```
Board Card
```

```
-----------------------------------
```
```

```
Each Board Card
```

```
```text
Cover Image
```

```
Board Name
Number of Items
```

```
Last Updated
```

```
Quick Actions
```
```

```
Quick Actions
```

```
* Open
```

```
* Rename
```

```
* Duplicate
```

```
* Delete
```

```
---
```

```
# Screen 2 — Board Details
```

```
Layout
```

```
```text
Board Header
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
Saved Products
```

```
↓
```

```
Uploaded References
```

```
↓
Create Order CTA
```
```

```
---
```

# `# Notes Section` 

```
Supports
```

```
* Rich Text
```

```
* Bullet Lists
```

```
* Emojis
```

```
* Character Counter
```

```
Maximum
```

```
2000 characters
```

```
Example
```

```
> "I'd like the bouquet to resemble the sunflower arrangement, but with pastel
wrapping and a smaller size."
```

```
---
```

```
# Saved Products
```

```
Pinterest-style masonry grid.
```

```
Each Card
```

```
```text
Product Image
```

```
↓
```

```
Title
```

```
↓
```

```
Remove
```

```
↓
```

```
View Product
```

```
```
```

```
---
```

```
# Reference Images
```

```
Purpose
```

```
Upload external inspiration.
```

```
Sources
```

- `Device Upload` 

- `Camera (mobile)` 

- `Drag & Drop (desktop)` 

```
Supported Formats
```

```
* JPG
* PNG
* WEBP
```

```
Maximum
10 MB
Maximum Images
50 per board
---
```

```
# Image Viewer
```

```
Supports
```

```
* Zoom
* Pan
* Fullscreen
* Delete
* Download (customer only)
---
```

```
# Create Order CTA
```

```
Primary
```

```
```text
Create Custom Order from Board
```
```

```
Clicking this pre-fills the Order Builder with:
```

```
* Saved products
```

- `Uploaded references` 

- `Notes` 

```
* Preferred category
```

```
---
```

```
# Components Used
```

```
```text
BoardCard
```

```
MasonryGrid
```

```
ReferenceUploader
```

```
ImageViewer
```

```
RichTextEditor
```

```
StickyCTA
```

```
PaperModal
```

```
ConfirmationDialog
```

```
Toast
```

```
```
```

```
---
```

```
# Design Tokens
```

```
Typography
```

```
* Recoleta
* Manrope
```

```
Colors
```

```
* Cotton
```

- `Ivory` 

```
* Sage
```

- `Terracotta` 

```
* Espresso
```

```
Elevation
```

```
Paper Layer 2
```

```
---
```

```
# Animations
Create Board
↓
Paper unfolds.
```

```
---
```

```
Save Product
↓
```

```
Pinned animation.
```

```
---
```

```
Upload
↓
```

```
Thread stitches image onto board.
```

```
---
```

```
Delete
```

```
↓
```

```
Paper folds away.
```

```
---
```

```
Convert to Order
```

```
↓
```

```
Board transforms into order draft.
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
boards
board_items
board_notes
board_images
media_files
```
```

```
Relationships
```

```
```text
User
↓
Many Boards
↓
Many Products
↓
Many Images
↓
One Note
```
```

```
---
# API Contract
```

```
Create Board
```

```
```http
POST /boards
```
```

```
Get Boards
```

```
```http
GET /boards
```
```

```
Board Details
```

```
```http
GET /boards/{id}
```
```

```
Rename
```http
PATCH /boards/{id}
```
```

```
Delete
```http
DELETE /boards/{id}
```
```

```
Save Product
```

```
```http
POST /boards/{id}/items
```
```

```
Remove Product
```

```
```http
DELETE /boards/{id}/items/{itemId}
```
```

```
Upload Reference
```

```
```http
POST /boards/{id}/images
```
```

```
Convert to Order
```

```
```http
POST /boards/{id}/convert
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
boards/
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
```

```
repository.py
```

```
models.py
schemas.py
```

```
validators.py
```

```
tests/
```
```

```
Responsibilities
```

- `CRUD operations.` 

- `Image management.` 

- `Product management.` 

- `Order conversion.` 

```
* Sharing (future).
```

```
---
```

```
# Frontend Design
```

```
Pages
```

```
```text
/boards
/boards/[id]
```
```

```
Hooks
```

```
```text
useBoards()
useBoard()
useCreateBoard()
useUploadReference()
useConvertBoard()
```
```

```
Components
```

```
```text
BoardGrid
BoardCard
ReferenceUploader
NotesEditor
ProductGrid
BoardHeader
```
```

```
State
```

- `TanStack Query for server data.` 

- `Zustand for UI state (selection, modals, drag-and-drop).` 

```
---
```

# `# Notifications` 

```
Notify customer when:
```

- `Board successfully created.` 

- `Image uploaded.` 

- `Product saved.` 

- `Board converted into order.` 

# `Future` 

- `Shared board viewed.` 

- `Artist commented.` 

```
---
```

# `# Security` 

- `Only owner can modify a board.` 

- `Shared boards are read-only.` 

- `Signed Cloudinary uploads.` 

- `MIME type validation.` 

- `Image size validation.` 

- `Virus scanning (future).` 

```
---
```

# `# Performance` 

- `Infinite scrolling for large boards.` 

- `Lazy-load images.` 

- `Optimistic updates.` 

- `Background uploads.` 

- `Cache boards for 10 minutes.` 

```
---
```

# `# Accessibility` 

- `Keyboard navigation.` 

- `Screen-reader labels.` 

- `Drag-and-drop alternative controls.` 

- `Focus management.` 

- `WCAG AA compliance.` 

```
---
```

# `# Analytics` 

```
Track
```

```
```text
Board Created
```

```
Board Deleted
```

```
Product Saved
```

```
Reference Uploaded
```

```
Board Opened
```

```
Board Shared
```

```
Board Converted
```

```
Time Spent
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

- `Users can create unlimited boards (within configured limits).` 

- `Products can be saved and removed.` 

- `Reference images upload successfully.` 

- `Notes persist correctly.` 

- `Boards convert into order drafts.` 

- `Responsive on all devices.` 

- `Accessibility ≥95.` 

- `Performance ≥95.` 

```
---
```

# `# Definition of Done` 

- `Backend CRUD complete.` 

- `Cloudinary upload integrated.` 

- `Frontend implemented.` 

- `Responsive layouts complete.` 

- `Unit, integration, and E2E tests passing.` 

- `Matches approved Figma design.` 

- `Security review completed.` 

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
Implement the Inspiration Board as a **creative scrapbook**, not a standard
wishlist.
```

```
Requirements:
```

- `Pinterest-inspired masonry layout.` 

- `Paper cards with layered shadows.` 

- `Smooth drag-and-drop interactions.` 

- `Thread-inspired upload animations.` 

- `Rich-text notes panel.` 

- `Responsive experience from mobile to desktop.` 

- `Reuse existing business components (`BoardCard`, `ReferenceUploader`,` 

- ``StickyCTA`, `PaperModal`) to maintain design consistency.` 

- `Preserve the handcrafted Byume aesthetic and avoid generic dashboard styling.` 

```
---
```

```
## For Codex (Backend)
```

```
Implement the complete `boards` feature module following the project's layered
architecture.
```

```
Generate:
```

- `SQLAlchemy models for boards, items, notes, and uploaded references.` 

- `CRUD endpoints.` 

- `Secure Cloudinary upload flow.` 

- `Board-to-order conversion service.` 

- `Ownership and permission checks.` 

- `Redis caching for frequently accessed boards.` 

- `Comprehensive unit, integration, and E2E tests.` 

```
Ensure compatibility with:
```

- `**Document 7** (Database Design)` 

- `**Document 8** (API Specification)` 

- `**Document 9** (Backend Architecture)` 

```
Maintain strict separation between routers, services, repositories, models, and
```

```
schemas.
```

```
---
```

```
## 📌 Next Feature (FSD-05)
```

```
The next document should be **Custom Order Builder**, which is the core feature
of the entire application. This will be the most detailed specification so far
(approximately **30–40 pages**) because it covers the multi-step order wizard,
file uploads, pricing, validation, draft saving, order review, and submission
workflow. It is the central feature around which the rest of the platform is
built.
```

