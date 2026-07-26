```
# Feature Specification Document (FSD-13)
```

```
# Payments, Pricing, Invoicing & Financial Management
```

`**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**` ⭐⭐⭐⭐⭐ `Critical (Production Blocker) **Status:** Production Ready Specification` 

```
> **Purpose:** This module is the financial backbone of Byume. It manages
quotations, deposits, milestone payments, invoices, refunds, taxes, shipping
charges, and financial reporting while preserving the handcrafted ordering
experience. Unlike traditional e-commerce, every payment revolves around
**custom-made creations**, where pricing may evolve during the order lifecycle.
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

`3. Financial Architecture` 

`4. Pricing Engine` 

`5. Quote Management` 

`6. Payment Workflow` 

`7. Payment Methods` 

`8. Deposit & Milestone Payments` 

`9. Razorpay Integration` 

`10. Invoicing` 

`11. Coupons & Discounts` 

`12. Shipping Charges` 

`13. Taxes (GST Ready)` 

`14. Refund Management` 

`15. Financial Dashboard` 

`16. Components` 

`17. Database Mapping` 

`18. API Contract` 

`19. Backend Design` 

`20. Frontend Design` 

`21. Security & Compliance` 

`22. Performance` 

`23. Accessibility` 

`24. Analytics` 

`25. Acceptance Criteria` 

`26. AI Implementation Instructions` 

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
Unlike standard online stores, every order in Byume may have:
```

- `Custom pricing` 

- `Negotiated revisions` 

- `Material cost changes` 

- `Deposit before production` 

- `Remaining payment before shipping` 

- `Refund requests` 

- `GST invoices` 

```
The payment system must support flexible pricing without compromising
transparency.
```

```
---
```

# `# Business Goals` 

```
Primary Goals
```

- `Secure payments` 

- `Transparent pricing` 

- `Reduce abandoned orders` 

- `Simplify accounting` 

- `Automate invoicing` 

# `KPIs` 

```
| Metric                   | Target           |
| ------------------------ | ---------------- |
| Payment Success Rate     | >98%             |
| Quote Acceptance         | >85%             |
| Invoice Generation       | 100%             |
| Refund Processing        | <3 Business Days |
| Payment Failure Recovery | >90%             |
```

```
---
```

# `# Financial Architecture` 

```
```text
Customer
```

```
↓
```

```
Quote
```

```
↓
```

```
Deposit Payment
```

```
↓
```

```
Order Accepted
```

```
↓
```

```
Production
```

```
↓
```

```
Final Payment
```

```
↓
```

```
Shipping
```

```
↓
```

```
Invoice
```

```
↓
```

```
Accounting
```

```
```
```

```
---
```

```
# Pricing Engine
```

```
Final Price =
```

```
```text
Material Cost
+
```

```
Labor
```

```
+
```

```
Packaging
```

```
+
```

```
Shipping
```

```
+
```

```
Taxes
```

```
-
Discount
```

```
=
```

```
Final Amount
```
```

```
---
```

```
Pricing Types
```

```
* Fixed Price
```

- `Custom Price` 

- `Seasonal Price` 

- `Promotional Price` 

```
Future
```

```
Dynamic pricing.
```

```
---
```

```
# Quote Management
```

```
Every custom order receives a quotation.
```

```
Status
```

```
```text
Draft
```

```
↓
```

```
Sent
```

```
↓
```

```
Viewed
```

```
↓
```

```
Accepted
```

```
↓
```

```
Expired
```

```
↓
```

```
Rejected
```
```

```
Quote Includes
```

```
* Materials
```

```
* Labor
```

- `Packaging` 

- `Shipping` 

```
* Tax
```

```
* Total
```

```
* Valid Until
```

```
---
```

```
# Quote Approval Flow
```

```
```text
Admin Creates Quote
```

```
↓
```

```
Customer Reviews
```

```
↓
```

```
Accept
```

```
↓
```

```
Deposit Payment
```

```
↓
```

```
Production Starts
```
```

```
---
```

```
# Payment Workflow
### Full Payment
```

```
```text
```

```
Quote
```

```
↓
```

```
Pay
```

```
↓
```

```
Verified
```

```
↓
Order Confirmed
```
```

```
---
```

```
### Deposit Payment
```

```
```text
Quote
↓
30% Deposit
```

```
↓
Crafting
↓
Remaining Balance
↓
Shipping
```
```

```
Deposit percentage configurable.
```

```
---
```

```
# Payment Methods
```

```
Supported (MVP)
```

```
* UPI
* Credit Card
```

```
* Debit Card
```

```
* Net Banking
```

```
* Wallets
```

```
* EMI (via Razorpay)
```

```
Future
```

```
* PayPal
* Stripe
```

- `Apple Pay` 

- `Google Pay (International)` 

```
---
```

```
# Razorpay Integration
```

```
Flow
```

```
```text
Customer
```

```
↓
Create Order
```

```
↓
```

```
Razorpay Order API
```

```
↓
```

```
Checkout
```

```
↓
```

```
Payment
```

```
↓
```

```
Webhook
```

```
↓
```

```
Verification
```

```
↓
```

```
Database Update
```

```
↓
```

```
Notification
```
```

```
---
```

```
Webhook Events
```

- `payment.authorized` 

- `payment.captured` 

- `payment.failed` 

- `refund.processed` 

- `order.paid` 

```
---
```

# `# Payment States` 

```
```text
Pending
```

```
↓
```

```
Authorized
```

```
↓
```

```
Captured
```

```
↓
```

```
Failed
```

```
↓
```

```
Refunded
```

```
↓
```

```
Cancelled
```
```

```
---
```

```
# Payment Retry
```

```
If payment fails
```

```
```text
Failed
```

```
↓
```

```
Retry
```

```
↓
Resume Checkout
↓
Success
```
```

```
Maximum retries configurable.
```

```
---
```

```
# Invoice Management
```

```
Automatically generated after:
```

```
* Deposit
```

- `Final Payment` 

- `Refund` 

```
Invoice Contains
```

```
```text
Invoice Number
```

```
Customer
```

```
Items
```

```
Tax
```

```
Discount
```

```
Shipping
```

```
Payment Status
```

```
QR Code
```

```
Company Details
```
```

```
Supports
```

- `PDF Download` 

- `Email` 

```
* Print
```

```
Future
```

```
GST-compliant invoice numbering.
```

```
---
```

# `# Coupon System` 

```
Coupon Types
```

```
* Percentage
```

- `Flat Amount` 

- `Free Shipping` 

```
Rules
```

```
* Expiry
```

- `Minimum Order` 

- `Maximum Discount` 

- `Usage Limit` 

- `Customer-specific (future)` 

```
---
```

```
# Shipping Charges
```

```
Calculation Methods
```

- `Flat Rate` 

- `Weight Based (future)` 

- `Location Based` 

- `Free Shipping Threshold` 

```
---
```

```
# Taxes
```

```
Current
```

```
Tax configurable
```

```
Future
```

```
GST Ready
```

```
Fields
```

- `GST Number` 

- `CGST` 

- `SGST` 

- `IGST` 

```
---
```

# `# Refund Workflow` 

```
Reasons
```

- `Order Cancelled * Duplicate Payment` 

- `Product Issue` 

- `Manual Refund` 

```
Flow
```

```
```text
Refund Request
```

```
↓
```

```
Admin Review
```

```
↓
```

```
Approve
```

```
↓
Razorpay Refund
↓
Customer Notified
↓
Invoice Updated
```
```

```
---
```

```
# Financial Dashboard
```

```
Cards
```

```
```text
Today's Revenue
```

```
↓
```

```
Pending Payments
```

```
↓
```

```
Refunds
```

```
↓
```

```
Average Order Value
```

```
↓
```

```
Outstanding Quotes
```

```
↓
```

```
Revenue This Month
```
```

```
Charts
```

```
* Revenue
```

- `Payments` 

- `Refunds` 

- `Payment Methods` 

- `Daily Sales` 

```
---
```

```
# Components
```

```
```text
QuoteCard
```

```
PricingBreakdown
PaymentCard
CheckoutModal
InvoiceCard
CouponInput
RevenueChart
FinancialStatCard
RefundPanel
TransactionTable
```
```

```
---
# Design Tokens
Typography
Recoleta
Manrope
Colors
Success Green
Warning Amber
Error Red
Neutral Cotton
Primary Terracotta
Cards
Layered Paper
Payment badges use subtle colored accents.
```

```
---
```

```
# Animations
Payment Success
↓
Paper receipt prints.
```

```
Invoice Download
```

```
↓
```

```
Document slides out.
```

```
Refund
```

```
↓
Stamp animation.
Quote Accepted
```

```
↓
```

```
Thread connects quote → order.
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
quotes
```

```
payments
```

```
payment_transactions
```

```
refunds
```

```
invoices
```

```
invoice_items
```

```
coupons
```

```
coupon_redemptions
shipping_rules
tax_configuration
```
```

```
Relationships
```

```
```text
Order
↓
```

```
Quote
```

```
↓
Payment
```

```
↓
```

```
Invoice
```

```
↓
```

```
Refund
```
```

```
---
```

```
# API Contract
```

```
Create Quote
```http
POST /admin/quotes
```
```

```
Get Quote
```http
GET /quotes/{id}
```
```

```
Accept Quote
```

```
```http
POST /quotes/{id}/accept
```
```

```
Create Payment
```

```
```http
POST /payments/create
```
```

```
Verify Payment
```

```
```http
POST /payments/verify
```
```

```
Razorpay Webhook
```

```
```http
POST /payments/webhook
```
```

```
Invoices
```

```
```http
GET /invoices
GET /invoices/{id}
```

```
GET /invoices/{id}/download
```
```

```
Refund
```

```
```http
POST /refunds
```
```

```
Coupons
```

```
```http
```

```
POST /coupons/apply
```
```

```
Revenue
```

```
```http
GET /admin/finance/dashboard
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
finance/
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
pricing.py
```

```
payments.py
```

```
razorpay.py
```

```
invoice.py
```

```
refund.py
```

```
coupon.py
```

```
analytics.py
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

- `PricingService` 

- `QuoteService` 

- `PaymentService` 

- `RazorpayWebhookService` 

- `InvoiceService` 

- `RefundService` 

- `CouponService` 

- `FinanceAnalyticsService` 

```
---
```

# `# Frontend Design` 

```
Routes
```

```
```text
/orders/[id]/quote
```

```
/orders/[id]/payment
```

```
/invoices
```

```
/invoices/[id]
```

```
/admin/finance
```

```
```
```

```
Hooks
```

```
```text
useQuote()
usePayment()
useInvoice()
useCoupon()
```

```
useFinanceDashboard()
```
```

```
State
```

- `TanStack Query` 

- `React Hook Form + Zod` 

- `Zustand (checkout UI state)` 

```
---
```

# `# Security & Compliance` 

- `Razorpay signature verification (HMAC SHA-256).` 

- `PCI-DSS compliance by using hosted checkout.` 

- `Never store card details.` 

- `Idempotency keys for payment creation.` 

- `Audit logs for all financial actions.` 

- `Role-based access for finance operations.` 

- `Secure invoice download via signed URLs.` 

```
---
```

# `# Performance` 

# `Requirements` 

- `Checkout page <2 seconds.` 

- `Payment verification <5 seconds.` 

- `Webhook processing <1 second average.` 

- `Invoice PDF generation <3 seconds.` 

- `Redis caching for financial dashboards.` 

```
---
```

# `# Accessibility` 

- `Keyboard-accessible checkout.` 

- `Screen-reader labels for payment methods.` 

- `Accessible invoice download controls.` 

- `WCAG AA compliant.` 

- `High-contrast status badges.` 

```
---
```

```
# Analytics
```

```
Track
```

```
```text
Quote Viewed
Quote Accepted
Payment Started
Payment Successful
Payment Failed
Coupon Applied
Invoice Downloaded
Refund Requested
Refund Completed
Average Order Value
```
```

```
---
```

# `# Acceptance Criteria` 

```
The feature is complete when:
```

- `Admin can generate custom quotes.` 

- `Customers can review and accept quotes.` 

- `Razorpay payments are processed successfully.` 

- `Deposit and full-payment workflows are supported.` 

- `Webhooks update payment status correctly.` 

- `Invoices are generated automatically.` 

- `Coupons and discounts function correctly.` 

- `Refunds are processed and tracked.` 

- `Financial dashboard displays accurate metrics.` 

- `Performance and accessibility scores ≥95.` 

```
---
```

# `# Definition of Done` 

- `Pricing engine implemented.` 

- `Quote workflow complete.` 

- `Razorpay integration verified.` 

- `Webhook processing operational.` 

- `Invoice generation functional.` 

- `Refund management complete.` 

- `Finance dashboard operational.` 

- `Unit, integration, webhook, and E2E tests passing.` 

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
Implement the Payments & Finance experience as a **transparent financial
journey**, not a typical checkout.
```

```
Requirements:
```

- `Quote review page with expandable pricing breakdown.` 

- `Hosted Razorpay checkout integration.` 

- `Animated payment success/failure states.` 

- `Elegant invoice viewer with PDF download.` 

- `Finance dashboard using paper-card analytics and handcrafted visual language.` 

- `Reuse business components (`QuoteCard`, `PricingBreakdown`, `PaymentCard`,` 

- ``InvoiceCard`, `TransactionTable`) to maintain consistency with the Byume design system.` 

- `Ensure responsive behavior and optimistic UI for payment status updates.` 

```
---
```

# `## For Codex (Backend)` 

```
Implement the complete `finance` module following the project's layered
architecture.
```

# `Generate:` 

- `Quote generation and approval workflow.` 

- `Pricing engine with configurable taxes, shipping, and discounts.` 

- `Razorpay integration (orders, payments, webhooks, refunds).` 

- `Invoice generation (PDF-ready, GST extensible).` 

- `Coupon validation and redemption service.` 

- `Refund management and audit logging.` 

- `Financial analytics aggregation.` 

- `Comprehensive unit, integration, webhook, load, and end-to-end tests.` 

```
Ensure compatibility with:
```

- `**Document 7** – Database Design` 

- `**Document 8** – API Specification` 

- `**Document 9** – Backend Architecture` 

- `**FSD-05** – Custom Order Builder` 

- `**FSD-06** – Customer Dashboard` 

- `**FSD-07** – Admin Dashboard` 

- `**FSD-09** – Notifications & Communication Center` 

- `**FSD-12** – CMS & Business Configuration` 

```
---
```

```
# 📌 Next Feature (FSD-14)
```

```
The next specification should be **Deployment, DevOps, Monitoring &
Operations**, which will finalize the production infrastructure for the Byume
platform.
```

```
It will cover:
```

- `Multi-environment deployment (Development, Staging, Production)` 

- `Docker & Docker Compose` 

- `CI/CD with GitHub Actions` 

- `Vercel (Frontend) + Railway/Render (Backend)` 

- `PostgreSQL & Redis provisioning` 

- `Cloudinary media pipeline` 

- `Environment variable management` 

- `Monitoring (Sentry, OpenTelemetry, health checks)` 

- `Structured logging & audit logs` 

- `Automated backups & disaster recovery` 

- `Rate limiting & WAF` 

- `SSL, CDN & security hardening` 

- `Release strategy (blue-green/canary ready)` 

- `Incident response & operational runbooks` 

```
This document will complete the platform's production-readiness and operational
architecture.
```

