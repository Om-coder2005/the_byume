```
# Feature Specification Document (FSD-10)
```

```
# Profile, Account Settings & Address Management
```

`**Project:** Thread & Tale (Byume) **Version:** 1.0 **Priority:**` ⭐⭐⭐⭐☆ `High **Status:** Production Ready Specification` 

```
> **Purpose:** The Profile & Settings module is the customer's personal identity
center within Byume. It allows customers to manage their profile, addresses,
security, notification preferences, accessibility settings, and connected
accounts while maintaining the warm, handcrafted experience of the platform.
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

`3. Information Architecture` 

`4. User Journey` 

`5. Profile Management` 

`6. Address Management` 

`7. Security Center` 

`8. Privacy Controls` 

`9. Notification Preferences` 

`10. Accessibility & Personalization` 

`11. Connected Accounts` 

`12. Session Management` 

`13. Data Export & Account Deletion` 

`14. Components` 

`15. Database Mapping` 

`16. API Contract` 

`17. Backend Design` 

`18. Frontend Design` 

`19. Security` 

`20. Performance` 

`21. Accessibility` 

`22. Analytics` 

`23. Acceptance Criteria` 

`24. AI Implementation Instructions` 

```
```
```

```
---
```

# `# 1. Feature Overview` 

```
Unlike social media profiles, the Byume profile exists to make ordering handmade
creations easier.
```

```
The customer should only need to enter information once.
```

```
Future orders should become progressively faster.
```

```
---
```

# `# Business Goals` 

```
Primary Goals
```

- `Reduce checkout friction.` 

- `Improve profile completeness.` 

```
* Encourage repeat orders.
```

```
* Increase account security.
```

```
KPIs
```

|`| Metric                        | Target |`|
|---|
|`| ----------------------------- | ------ |`|
|`| Profile Completion            | >85%   |`|
|`| Saved Address Usage           | >75%   |`|
|`| Avatar Upload                 | >40%   |`|
|`| Notification Preference Setup | >60%   |`|
|`| Password Reset Success        | >95%   |`|



```
---
```

# `# Information Architecture` 

```
```text
Settings
```

```
├── Profile
├── Addresses
├── Security
├── Notifications
├── Accessibility
├── Connected Accounts
├── Sessions
├── Privacy
└── Danger Zone
```
```

```
---
```

```
# User Journey
```

```
```text
Dashboard
```

```
↓
```

```
Settings
```

```
↓
```

```
Edit Profile
```

```
↓
Save
```

```
↓
Profile Updated
```

```
↓
Future Orders Auto-filled
```
```

```
---
```

```
# Settings Home
```

```
Layout
```

```
```text
-----------------------------------
```

```
Sidebar
```

```
↓
```

```
Profile Summary
```

```
↓
```

```
Settings Categories
```

```
-----------------------------------
```
```

```
Desktop
```

```
Left Sidebar
```

```
Right Content
```

```
Mobile
```

```
Top Tabs
```

```
Scrollable Sections
```

```
---
```

```
# Profile Management
```

```
Fields
```

```
```text
Avatar
```

```
Full Name
```

```
Email
```

```
Phone
```

```
Birthday (Optional)
Preferred Name
Bio (Optional)
```
```

```
---
```

```
Avatar Upload
```

```
Supported
```

```
* JPG
* PNG
* WEBP
```

```
Maximum
```

```
5 MB
```

```
Features
```

- `Crop * Rotate` 

```
* Remove
* Replace
```

```
Future
```

```
AI background removal.
```

```
---
```

```
Profile Completion Card
```

```
Displays
```

```
```text
78%
```

```
Complete your profile
```
```

```
Suggestions
```

```
* Add Avatar
```

```
* Add Phone
```

```
* Add Address
```

```
---
```

```
# Address Management
```

```
Purpose
```

```
Reuse addresses during ordering.
```

```
Supports
```

- `Unlimited addresses (configurable)` 

- `Default address` 

```
* Billing address
```

- `Shipping address` 

```
* Nicknames
```

```
Example
```

````text` 🏠 `Home` 

```
🏢 Office
```

```
🏢 Mom's House
```
```

```
Fields
```

```
```text
Recipient
```

```
Phone
```

```
Street
```

```
Apartment
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
Country
```

```
Delivery Instructions
```
```

```
---
```

```
Quick Actions
```

```
* Edit
* Duplicate
* Delete
* Make Default
```

```
---
```

```
Address Validation
```

```
Future
```

```
Google Places API integration.
```

```
---
```

```
# Security Center
```

```
Contains
```

```
```text
Password
```

```
Google Account
```

```
Two-Factor (Future)
```

```
Recovery Email
```

```
Recent Activity
```
```

```
---
```

```
Password
```

```
Requirements
```

- `Minimum 8 characters` 

- `Uppercase` 

- `Lowercase` 

- `Number` 

- `Special Character` 

```
---
```

```
Google Account
```

```
Displays
```text
Connected
Disconnect
```
```

```
---
```

```
Future
```

```
Apple Login
GitHub Login
---
# Session Management
```

```
Shows
```

```
```text
Current Device
↓
Chrome
```

```
Windows
```

```
Mumbai
```

```
Last Active
```
```

```
Previous Sessions
```

```
Supports
```

- `Logout Single` 

- `Logout All` 

- `Device Name` 

- `Browser` 

- `IP (masked)` 

- `Approximate Location` 

```
---
```

```
# Privacy Controls
```

```
Options
```

```
```text
```

- `☑ Public Reviews` 

- `☑ Feature My Story` 

- `☑ Marketing Emails` 

- `☐ Personalized Recommendations ```` 

```
Future
```

```
GDPR export preferences.
```

```
---
```

```
# Notification Preferences
Reuse Notification Module.
Settings
```

```
```text
Order Updates
Email Alerts
Review Reminders
```

```
Announcements
```

```
Marketing
Community
```
```

```
---
```

```
# Accessibility
```

```
Options
```

```
```text
Reduced Motion
```

```
High Contrast
```

```
Large Text
```

```
Keyboard Friendly
```
```

```
Future
```

```
OpenDyslexic font.
```

```
---
```

```
# Theme
Current
```

```
System
```

```
Future
```

```
```text
Light
```

```
Dark
```

```
Craft Studio Theme
```
```

```
---
```

```
# Language
```

```
Current
```

```
English
Future
Hindi
Marathi
Japanese
Spanish
```

```
---
```

```
# Connected Accounts
```

```
Display
```

```
```text
Google
Instagram (Future)
Pinterest (Future)
```
```

```
Future
```

```
Import inspiration from Pinterest.
```

```
---
```

```
# Data Export
```

```
Customer may request
```

```
ZIP
```

```
Contains
```

```
* Profile
```

- `Orders` 

- `Feedback` 

- `Boards` 

- `Uploaded Images` 

- `Addresses` 

```
Processing
```

```
Background Job
```

```
Notification when ready.
```

```
---
```

```
# Account Deletion
```

```
Danger Zone
```

```
Flow
```

```
```text
Delete
```

```
↓
Password
↓
Confirmation
↓
30-Day Grace Period
↓
Permanent Deletion
```
```

```
Soft delete first.
Future
```

```
Undo deletion.
```

```
---
```

```
# Components
```

```
```text
SettingsSidebar
```

```
ProfileCard
```

```
AvatarUploader
```

```
AddressCard
```

```
SecurityCard
SessionCard
```

```
PreferenceToggle
```

```
DangerZone
```

```
CompletionProgress
ConnectedAccountCard
```
```

```
---
```

```
# Animations
Avatar Upload
```

```
↓
```

```
Photo pins onto paper.
```

```
Profile Save
```

```
↓
```

```
Paper stamp
"Saved"
Address Added
↓
Card slides in.
Delete
↓
Paper folds away.
---
# Design Tokens
Typography
Recoleta
Manrope
Colors
```

```
Cotton
```

```
Ivory
```

```
Terracotta
```

```
Sage
```

```
Espresso
```

```
Cards
```

```
Layered Paper
```

```
---
```

```
# Database Mapping
Tables
```

```
```text
users
```

```
addresses
```

```
user_preferences
user_sessions
connected_accounts
```

```
privacy_settings
```

```
notification_preferences
audit_logs
```
```

```
Relationships
```

```
```text
User
```

```
↓
Addresses
↓
Preferences
↓
Sessions
```

```
↓
Connected Accounts
```
```

```
---
```

```
# API Contract
```

```
Profile
```

```
```http
GET /users/me
```

```
PATCH /users/me
```
```

```
Avatar
```

```
```http
POST /users/me/avatar
```

```
DELETE /users/me/avatar
```
```

```
Addresses
```

```
```http
GET /addresses
```

```
POST /addresses
```

```
PATCH /addresses/{id}
```

```
DELETE /addresses/{id}
```
```

```
Preferences
```

```
```http
```

```
GET /preferences
PATCH /preferences
```
```

```
Sessions
```

```
```http
GET /sessions
DELETE /sessions/{id}
DELETE /sessions
```
```

```
Export
```

```
```http
POST /users/me/export
```
```

```
Delete Account
```

```
```http
POST /users/me/delete
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
users/
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
avatar.py
```

```
preferences.py
```

```
sessions.py
```

```
export.py
```

```
tests/
```
```

# `Services` 

- `UserProfileService` 

- `AddressService` 

- `SessionService` 

- `ExportService` 

- `PrivacyService` 

```
Responsibilities
```

- `Profile CRUD.` 

- `Address management.` 

- `Avatar uploads.` 

- `Session handling.` 

- `Data exports.` 

- `Soft deletion.` 

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
/settings
```

```
/settings/profile
/settings/addresses
/settings/security
/settings/preferences
/settings/sessions
/settings/privacy
```
```

```
Hooks
```

```
```text
useProfile()
```

```
useAddresses()
```

```
useAvatar()
```

```
usePreferences()
```

```
useSessions()
```

```
useDeleteAccount()
```
```

```
State
```

```
* TanStack Query
```

- `Zustand (UI state)` 

- `React Hook Form + Zod` 

```
---
```

# `# Security` 

- `Re-authentication required for sensitive actions.` 

- `Signed avatar uploads.` 

- `Soft delete with recovery window.` 

- `Session revocation.` 

- `Audit logs for profile and security changes.` 

- `Email confirmation for account deletion.` 

- `CSRF protection for authenticated forms.` 

```
---
```

# `# Performance` 

# `Requirements` 

- `Settings page load <1 second.` 

- `Optimistic profile updates.` 

- `Avatar image optimization.` 

- `Cached user profile.` 

- `Background export generation.` 

```
---
```

# `# Accessibility` 

- `Keyboard-accessible forms.` 

- `Proper labels and descriptions.` 

- `Screen-reader support.` 

- `Reduced-motion support.` 

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
```

```
Profile Updated
```

```
Avatar Uploaded
```

```
Address Added
```

```
Password Changed
```

```
Notification Preferences Updated
```

```
Session Revoked
```

```
Data Export Requested
```

```
Account Deletion Started
```
```

```
---
```

# `# Acceptance Criteria` 

```
The feature is complete when:
```

- `Users can update their profile.` 

- `Multiple addresses are supported.` 

- `Avatar upload works.` 

- `Sessions can be managed.` 

- `Preferences persist correctly.` 

- `Data export is generated.` 

- `Account deletion follows the recovery workflow.` 

- `Responsive on all supported devices.` 

- `Performance and accessibility scores ≥95.` 

```
---
```

# `# Definition of Done` 

- `Profile management complete.` 

- `Address CRUD complete.` 

- `Security center implemented.` 

- `Session management operational.` 

- `Privacy controls integrated.` 

- `Data export pipeline functional.` 

- `Soft deletion workflow complete.` 

- `Tests passing.` 

- `Security review completed.` 

- `Matches approved Figma designs.` 

```
---
```

# `# AI Implementation Instructions` 

# `## For Antigravity (Frontend)` 

```
Implement the Settings module as a **personal craft notebook**, not a corporate
account page.
```

```
Requirements:
```

- `Left navigation (desktop) and tab navigation (mobile).` 

- `Warm paper-card layouts with subtle handcrafted textures.` 

- `Inline editing with optimistic updates.` 

- `Avatar uploader with crop and preview.` 

- `Reuse business components (`ProfileCard`, `AddressCard`, `SessionCard`,` 

- ``PreferenceToggle`, `DangerZone`) to maintain consistency with the Byume design system.` 

- `Maintain visual continuity with the Customer Dashboard while prioritizing clarity for account management tasks.` 

```
---
```

# `## For Codex (Backend)` 

```
Implement the complete `users` module following the project's layered
architecture.
```

```
Generate:
```

- `User profile CRUD services.` 

- `Address management with default address support.` 

- `Secure avatar upload pipeline.` 

- `Session tracking and revocation.` 

- `Privacy and notification preference management.` 

- `Background data export service.` 

- `Soft-delete account workflow with configurable grace period.` 

- `Comprehensive unit, integration, and end-to-end tests.` 

```
Ensure compatibility with:
```

- `**Document 7** – Database Design` 

- `**Document 8** – API Specification` 

- `**Document 9** – Backend Architecture` 

- `**FSD-00** – Authentication & User Management` 

- `**FSD-06** – Customer Dashboard` 

- `**FSD-09** – Notifications & Communication Center` 

```
---
```

```
# 🏢 Next Feature (FSD-11)
```

```
The next specification should be **Search, Discovery & Recommendation Engine**,
which will unify searching across the platform and provide intelligent
discovery.
```

```
It will cover:
```

```
* Global search
```

```
* Smart autocomplete
```

```
* Category exploration
```

```
* AI-assisted recommendations
```

- `Similar creations engine` 

```
* Trending handmade products
```

```
* Seasonal collections
```

```
* Recently viewed
```

- `Personalized recommendations` 

```
* Search analytics
```

- `PostgreSQL full-text search + Redis caching` 

```
This module will significantly improve product discovery and increase conversion
rates while remaining consistent with Byume's handcrafted experience.
```

