\# **Feature Specification Document (FSD-14)**



\# Extended Platform Features \& Future Growth



\*\*Project:\*\* Byume – The Art of Handmade

\*\*Version:\*\* 1.0

\*\*Priority:\*\* ⭐⭐⭐⭐ (Supporting Product Features)

\*\*Status:\*\* Production Ready Specification



> \*\*Purpose:\*\* This document consolidates all supporting platform capabilities that extend the core Byume experience beyond ordering and administration. These features improve customer engagement, business operations, inspiration management, logistics, inventory control, and future platform expansion while remaining modular and independently deployable.



\---



\# Table of Contents



```text

1\. Overview



PART A — Wishlist \& Saved Collections

2\. Feature Overview

3\. Business Goals

4\. User Stories

5\. Wishlist

6\. Collections

7\. Sharing

8\. Order Integration

9\. Components

10\. Database

11\. APIs



PART B — Admin Analytics \& Business Intelligence

12\. Dashboard Overview

13\. Revenue Analytics

14\. Customer Analytics

15\. Product Analytics

16\. Seasonal Analytics

17\. Operational KPIs

18\. Reports \& Export

19\. Components

20\. Database

21\. APIs



PART C — Shipping \& Delivery Management

22\. Shipping Workflow

23\. Courier Management

24\. Tracking

25\. Delivery Timeline

26\. Delivery Confirmation

27\. Failed Delivery Workflow

28\. Shipping Dashboard

29\. Components

30\. Database

31\. APIs



PART D — Inventory \& Materials Management

32\. Material Library

33\. Inventory Tracking

34\. Material Consumption

35\. Supplier Management

36\. Cost Tracking

37\. Low Stock Alerts

38\. Purchase History

39\. Components

40\. Database

41\. APIs



PART E — Pinterest Inspiration Import

42\. Feature Overview

43\. Import Workflow

44\. Inspiration Board Integration

45\. Attribution

46\. Components

47\. Database

48\. APIs



PART F — WhatsApp Business Integration

49\. Customer Communication

50\. Admin Communication

51\. Automated Templates

52\. Click-to-Chat

53\. Order Updates

54\. Future Cloud API

55\. Components

56\. Database

57\. APIs



PART G — Product Roadmap

58\. Version 1

59\. Version 1.5

60\. Phase 2

61\. Phase 3

62\. Long-Term Vision



63\. Responsive Design Standards

64\. Security

65\. Performance

66\. Accessibility

67\. Analytics

68\. Acceptance Criteria

69\. AI Implementation Instructions

```



\---



\# 1. Overview



These features are \*\*supporting modules\*\* that complement the primary customer journey without replacing the handcrafted experience.



They are designed to:



\* Increase customer retention.

\* Improve artist productivity.

\* Simplify logistics.

\* Strengthen business insights.

\* Reduce manual work.

\* Prepare the platform for future expansion.



\---



\# PART A — Wishlist \& Saved Collections



\## Feature Overview



Customers can save products they love, organize them into themed collections, and use them later when placing custom orders.



\---



\## Business Goals



\* Increase return visits.

\* Encourage order planning.

\* Improve inspiration management.

\* Reduce abandoned decisions.



\---



\## User Stories



Customers should be able to:



\* Save favorite creations.

\* Create unlimited collections.

\* Rename collections.

\* Upload cover image.

\* Reorder saved items.

\* Delete collections.

\* Archive collections.

\* Make collections Public or Private.

\* Share collections with friends.



\---



\## Collection Types



Examples



```text

Birthday Ideas



Wedding Gifts



Christmas



Anniversary



Crochet Flowers



Pipe Cleaner Art



Custom Plushies



Dream Gifts

```



\---



\## Wishlist Workflow



```text

Browse Gallery



↓



Tap ❤️



↓



Added to Wishlist



↓



Organize into Collection



↓



Share



↓



Convert to Custom Order

```



\---



\## Order Integration



Every saved product should provide:



\* Start Custom Order

\* Add to Inspiration Board

\* Request Similar Design



\---



\## Components



```text

WishlistButton



CollectionCard



CreateCollectionModal



CollectionGrid



ShareCollectionDialog



WishlistSidebar

```



\---



\## Database



```text

wishlists



collections



collection\_items

```



\---



\## APIs



```http

GET /wishlist



POST /wishlist



DELETE /wishlist/{id}



POST /collections



PATCH /collections/{id}



DELETE /collections/{id}

```



\---



\# PART B — Admin Analytics \& Business Intelligence



\## Overview



A centralized dashboard giving the artist actionable insights into business performance.



\---



\## Revenue Analytics



Display:



\* Daily Revenue

\* Weekly Revenue

\* Monthly Revenue

\* Annual Revenue

\* Average Order Value

\* Refund Totals



Charts



\* Line

\* Bar

\* Pie



\---



\## Customer Analytics



Track



\* New Customers

\* Returning Customers

\* Repeat Purchase Rate

\* Customer Lifetime Value

\* Geographic Distribution

\* Top Customers



\---



\## Product Analytics



Display



\* Most Viewed

\* Most Ordered

\* Most Saved

\* Highest Revenue

\* Fastest Selling



\---



\## Seasonal Insights



Compare



\* Festivals

\* Holidays

\* Monthly demand

\* Trending categories



\---



\## Operational KPIs



Track



\* Quote Acceptance Rate

\* Production Time

\* Delivery Time

\* Review Score

\* Refund Rate

\* Order Completion Rate



\---



\## Reports



Export



\* CSV

\* Excel

\* PDF (future)



Filters



\* Date Range

\* Category

\* Product

\* Customer



\---



\## Components



```text

RevenueChart



AnalyticsCard



CustomerHeatMap



SalesTable



KPICard



ExportDialog

```



\---



\## Database



Analytics tables



```text

daily\_metrics



sales\_reports



customer\_statistics

```



\---



\## APIs



```http

GET /admin/analytics



GET /admin/revenue



GET /admin/customers



GET /admin/reports/export

```



\---



\# PART C — Shipping \& Delivery Management



\## Shipping Workflow



```text

Payment Completed



↓



Packed



↓



Courier Assigned



↓



Tracking Number Generated



↓



Shipped



↓



Out for Delivery



↓



Delivered

```



\---



\## Courier Information



Store



\* Courier Name

\* Tracking Number

\* Shipping Cost

\* Dispatch Date

\* Estimated Delivery



\---



\## Delivery Timeline



Customer Timeline



```text

Packed



↓



Picked Up



↓



Transit



↓



Out for Delivery



↓



Delivered

```



\---



\## Failed Delivery



Workflow



```text

Delivery Failed



↓



Notify Customer



↓



Reschedule



↓



Retry



↓



Delivered

```



\---



\## Shipping Dashboard



Displays



\* Pending Shipments

\* Delivered Orders

\* Delayed Orders

\* Failed Deliveries



\---



\## Components



```text

TrackingCard



ShippingTimeline



CourierSelector



DeliveryBadge



ShipmentDashboard

```



\---



\## Database



```text

shipments



tracking\_events



couriers

```



\---



\## APIs



```http

POST /shipments



PATCH /shipments/{id}



GET /tracking/{trackingNo}

```



\---



\# PART D — Inventory \& Materials Management



\## Material Library



Categories



\* Yarn

\* Pipe Cleaners

\* Cotton Filling

\* Safety Eyes

\* Packaging

\* Ribbon

\* Decorative Items



\---



\## Inventory Tracking



Each material stores



\* Quantity

\* Unit

\* Cost

\* Supplier

\* Last Purchased

\* Threshold



\---



\## Material Consumption



Every completed order deducts materials automatically.



\---



\## Supplier Management



Store



\* Supplier Name

\* Contact

\* Products

\* Purchase History



\---



\## Low Stock Alerts



Trigger when



```text

Current Quantity



<



Minimum Threshold

```



\---



\## Cost Tracking



Calculate



\* Material Cost

\* Packaging Cost

\* Total Production Cost

\* Profit Margin



\---



\## Components



```text

InventoryTable



MaterialCard



SupplierDialog



LowStockBanner



CostBreakdown

```



\---



\## Database



```text

materials



inventory\_logs



suppliers



purchase\_orders

```



\---



\## APIs



```http

GET /materials



POST /materials



PATCH /materials/{id}



GET /inventory/alerts

```



\---



\# PART E — Pinterest Inspiration Import



\## Feature Overview



Allow users to import inspiration from Pinterest directly into their Inspiration Board.



\---



\## Import Workflow



```text

Paste Pinterest URL



↓



Validate URL



↓



Fetch Preview



↓



Choose Board



↓



Import



↓



Available Inside Inspiration Board

```



\---



\## Store



\* Image

\* Pinterest URL

\* Source

\* Imported Date



\---



\## Attribution



Always retain



\* Original Pin URL

\* Attribution label



\---



\## Components



```text

PinterestImportModal



PreviewCard



ImportProgress



SourceBadge

```



\---



\## Database



```text

pinterest\_imports

```



\---



\## APIs



```http

POST /pinterest/import



GET /pinterest/imports

```



\---



\# PART F — WhatsApp Business Integration



\## Customer Features



Customers can



\* Chat with Artist

\* Share Product

\* Share Order

\* Share Quote

\* Receive Updates

\* Ask Questions



\---



\## Admin Features



Admin can



\* Open Chat

\* Send Quote

\* Payment Reminder

\* Shipping Update

\* Review Reminder



\---



\## Automated Templates



```text

Order Received



↓



Quote Ready



↓



Payment Reminder



↓



Crafting Started



↓



Shipped



↓



Delivered



↓



Review Request

```



\---



\## Click-to-Chat



Every product page includes



\*\*Need something similar? Chat with us on WhatsApp.\*\*



\---



\## Future



Support



\* WhatsApp Cloud API

\* Interactive Messages

\* Media Templates

\* Order Status Buttons



\---



\## Components



```text

WhatsAppButton



ChatCard



TemplateManager



ReminderPanel

```



\---



\## Database



```text

whatsapp\_logs



message\_templates

```



\---



\## APIs



```http

POST /whatsapp/send



GET /whatsapp/templates

```



\---



\# PART G — Product Roadmap



\## Version 1 (Launch)



\* Core Ordering

\* Payments

\* Customer Dashboard

\* Admin Dashboard

\* Wishlist

\* Shipping

\* Inventory

\* Pinterest Import

\* WhatsApp Integration



\---



\## Version 1.5



\* Progressive Web App (PWA)

\* Dark Mode

\* Enhanced Analytics

\* Bulk Product Import

\* Gift Cards

\* Seasonal Themes



\---



\## Phase 2



\* Android App

\* iOS App

\* International Shipping

\* Multi-language Support

\* Pinterest OAuth Sync

\* WhatsApp Cloud API



\---



\## Phase 3



\* Loyalty Program

\* Subscription Gift Plans

\* Multi-currency

\* Regional Storefronts

\* Advanced Automation



\---



\## Long-Term Vision



\* Multi-Vendor Marketplace

\* Franchise Support

\* Wholesale Orders

\* Enterprise Analytics

\* Inventory Forecasting



\---



\# Responsive Design Standards



These standards apply to \*\*every feature in the platform\*\*.



Supported breakpoints:



\* Mobile (360px+)

\* Tablet (768px+)

\* Laptop (1024px+)

\* Desktop (1440px+)

\* Large Desktop (1920px+)



Requirements:



\* Mobile-first layouts.

\* Drawer navigation on smaller screens.

\* Minimum 44×44px touch targets.

\* Responsive typography and spacing.

\* Swipe-enabled carousels where appropriate.

\* No horizontal scrolling.

\* Lazy-loaded and optimized images.

\* Consistent behavior across portrait and landscape orientations.



\---



\# Security



\* Authenticated access where required.

\* Secure share links for public collections.

\* Input validation for imported URLs.

\* Rate limiting on messaging endpoints.

\* Inventory and analytics restricted to administrators.



\---



\# Performance



\* Dashboard load <2 seconds.

\* Analytics cached where appropriate.

\* Lazy loading for collections and reports.

\* Responsive interactions at 60 FPS.

\* Background processing for imports and notifications.



\---



\# Accessibility



\* WCAG 2.2 AA compliance.

\* Keyboard navigation.

\* Screen reader support.

\* High-contrast states.

\* Accessible charts with tabular alternatives.



\---



\# Analytics



Track:



\* Wishlist additions/removals.

\* Collection creation and sharing.

\* Pinterest imports.

\* WhatsApp clicks.

\* Shipping status progression.

\* Inventory alerts.

\* Dashboard usage.



\---



\# Acceptance Criteria



This document is complete when:



\* Wishlist and collections are functional.

\* Analytics dashboard provides actionable insights.

\* Shipping workflow supports end-to-end tracking.

\* Inventory updates accurately reflect material usage.

\* Pinterest inspiration can be imported into Inspiration Boards.

\* WhatsApp integration supports customer communication.

\* All features are fully responsive.

\* Performance, accessibility, and security standards are met.



\---



\# AI Implementation Instructions



\## For Antigravity (Frontend)



Implement all modules using the established \*\*Byume design system\*\*. Ensure:



\* Consistent handcrafted visual language.

\* Fully responsive layouts across all supported breakpoints.

\* Shared components reused wherever possible.

\* Smooth animations and loading states.

\* Deep integration with existing modules (Inspiration Board, Order Builder, Customer Dashboard, and Admin Dashboard).



\## For Codex (Backend)



Implement the supporting platform modules with a modular architecture:



\* Wishlist and collection management.

\* Analytics aggregation services.

\* Shipping and tracking services.

\* Inventory and supplier management.

\* Pinterest import pipeline (URL validation, preview retrieval, attribution storage).

\* WhatsApp messaging abstraction supporting both click-to-chat and future Cloud API integration.

\* REST APIs, database migrations, background jobs where required, and comprehensive testing.



\---



\## ✅ Product Documentation Complete



With this document, the \*\*core product specification for Byume is complete

