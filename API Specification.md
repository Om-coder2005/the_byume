\# Document 8 — **API Specification** (OpenAPI)



\# Project: the\_byume (Working Title)



\*\*Version:\*\* 1.0

\*\*Status:\*\* API Contract (Backend ↔ Frontend)



> \*\*Purpose:\*\* This document defines the complete REST API contract between the frontend and backend. It specifies endpoints, request/response schemas, authentication, validation, pagination, error handling, versioning, and future extensibility. This contract enables frontend and backend development to proceed independently.



\---



\# Table of Contents



```text

PART I

1\. API Philosophy

2\. API Standards

3\. Versioning Strategy

4\. Authentication

5\. Response Standards

6\. Error Standards



PART II

7\. Authentication APIs

8\. User APIs

9\. Gallery APIs

10\. Order APIs

11\. Feedback APIs

12\. Inspiration Board APIs

13\. Notification APIs

14\. Media APIs

15\. Admin APIs



PART III

16\. Pagination

17\. Filtering

18\. Validation Rules

19\. Rate Limiting

20\. API Security

21\. Future APIs

```



\---



\# PART I



\# 1. API Philosophy



The API should be:



\* RESTful

\* Predictable

\* Versioned

\* Self-documenting

\* Consistent

\* Secure



Every endpoint should follow the same design language.



\---



\# Base URL



Development



```text

http://localhost:8000/api/v1

```



Production



```text

https://api.threadandtale.com/api/v1

```



\---



\# Versioning



```

/api/v1

```



Future



```

/api/v2

```



No breaking changes inside the same version.



\---



\# Content Type



Every request



```

Content-Type:

application/json

```



Uploads



```

multipart/form-data

```



\---



\# Authentication



Protected APIs



```

Authorization:



Bearer <JWT\_TOKEN>

```



Public APIs



\* Gallery

\* Categories

\* Featured Feedback

\* Homepage



\---



\# Standard Success Response



```json

{

&#x20; "success": true,

&#x20; "message": "Order created successfully.",

&#x20; "data": {},

&#x20; "meta": {}

}

```



\---



\# Standard Error Response



```json

{

&#x20; "success": false,

&#x20; "message": "Validation failed.",

&#x20; "errors": \[

&#x20;   {

&#x20;     "field": "deadline",

&#x20;     "message": "Deadline must be in the future."

&#x20;   }

&#x20; ]

}

```



\---



\# HTTP Status Codes



| Code | Meaning           |

| ---- | ----------------- |

| 200  | Success           |

| 201  | Created           |

| 204  | Deleted           |

| 400  | Bad Request       |

| 401  | Unauthorized      |

| 403  | Forbidden         |

| 404  | Not Found         |

| 409  | Conflict          |

| 422  | Validation Error  |

| 429  | Too Many Requests |

| 500  | Server Error      |



\---



\# PART II



\# Authentication APIs



\---



\## Register



```

POST /auth/register

```



Request



```json

{

&#x20; "name": "Om",

&#x20; "email": "om@example.com",

&#x20; "password": "\*\*\*\*\*\*\*\*"

}

```



Response



```json

{

&#x20; "user": {},

&#x20; "accessToken": "",

&#x20; "refreshToken": ""

}

```



\---



\## Login



```

POST /auth/login

```



\---



\## Google Login



```

POST /auth/google

```



\---



\## Refresh Token



```

POST /auth/refresh

```



\---



\## Logout



```

POST /auth/logout

```



\---



\## Forgot Password



```

POST /auth/forgot-password

```



\---



\## Reset Password



```

POST /auth/reset-password

```



\---



\# User APIs



\---



\## Get Profile



```

GET /users/me

```



\---



\## Update Profile



```

PATCH /users/me

```



\---



\## Addresses



```

GET /users/me/addresses



POST /users/me/addresses



PATCH /users/me/addresses/{id}



DELETE /users/me/addresses/{id}

```



\---



\# Gallery APIs



\---



\## Get Gallery



```

GET /gallery

```



Query



```

?page=1



\&limit=12



\&category=flowers



\&featured=true



\&search=sunflower



\&sort=newest

```



Response



```json

{

&#x20; "items": \[],

&#x20; "pagination": {}

}

```



\---



\## Product Details



```

GET /gallery/{slug}

```



\---



\## Categories



```

GET /categories

```



\---



\## Tags



```

GET /tags

```



\---



\## Featured Products



```

GET /gallery/featured

```



\---



\# Inspiration Board APIs



\---



\## Create Board



```

POST /boards

```



\---



\## Get Boards



```

GET /boards

```



\---



\## Add Inspiration



```

POST /boards/{id}/items

```



\---



\## Delete Inspiration



```

DELETE /boards/{id}/items/{itemId}

```



\---



\# Order APIs



\---



\## Create Order



```

POST /orders

```



Request



```json

{

&#x20; "galleryId": "...",

&#x20; "budget": 2500,

&#x20; "deadline": "2026-08-15",

&#x20; "giftMessage": "...",

&#x20; "notes": "...",

&#x20; "references": \[]

}

```



\---



Response



```json

{

&#x20; "orderNumber": "TT-2026-0014",

&#x20; "status": "Submitted"

}

```



\---



\## My Orders



```

GET /orders

```



Filters



```

status



date



priority

```



\---



\## Order Details



```

GET /orders/{orderId}

```



\---



\## Update Draft



```

PATCH /orders/{orderId}

```



Only while



Status



```

Draft

```



\---



\## Cancel Order



```

POST /orders/{id}/cancel

```



\---



\## Timeline



```

GET /orders/{id}/timeline

```



\---



\## Upload References



```

POST /orders/{id}/references

```



Uses



```

multipart/form-data

```



\---



\# Feedback APIs



\---



\## Submit Feedback



```

POST /feedback

```



Request



```json

{

&#x20; "orderId":"...",

&#x20; "rating":5,

&#x20; "letter":"Amazing work!"

}

```



\---



\## My Feedback



```

GET /feedback/me

```



\---



\## Featured Feedback



```

GET /feedback/featured

```



Public



\---



\# Notification APIs



\---



\## My Notifications



```

GET /notifications

```



\---



\## Mark Read



```

PATCH /notifications/{id}

```



\---



\## Mark All



```

PATCH /notifications/read-all

```



\---



\# Media APIs



\---



\## Upload



```

POST /media/upload

```



Returns



```json

{

"url":"",

"publicId":""

}

```



\---



\## Delete



```

DELETE /media/{id}

```



\---



\# Admin APIs



Protected



Admin Only



\---



\## Dashboard



```

GET /admin/dashboard

```



Returns



Orders



Revenue



Pending



Reviews



\---



\## Gallery CRUD



```

POST /admin/gallery



PATCH /admin/gallery/{id}



DELETE /admin/gallery/{id}

```



\---



\## Order Management



```

GET /admin/orders



PATCH /admin/orders/{id}

```



\---



\## Timeline Update



```

POST /admin/orders/{id}/timeline

```



Example



```json

{

"status":"Packing",

"message":"Packaging completed."

}

```



\---



\## Feedback



```

GET /admin/feedback

```



\---



\## Pin Feedback



```

PATCH /admin/feedback/{id}/pin

```



\---



\## Notifications



```

POST /admin/notifications

```



\---



\# PART III



\# Pagination



Standard



```

?page=1



\&limit=20

```



Response



```json

{

"items":\[],

"pagination":

{

"page":1,

"limit":20,

"total":150,

"pages":8

}

}

```



\---



\# Filtering



Gallery



```

category



price



difficulty



featured



tag



search

```



Orders



```

status



date



priority

```



Feedback



```

rating



featured

```



\---



\# Sorting



```

?sort=newest



?sort=oldest



?sort=popular



?sort=price\_low



?sort=price\_high

```



\---



\# Validation Rules



\## User



Email



Valid format



Password



Minimum



8 characters



\---



\## Gallery



Title



Maximum



120 characters



\---



\## Order



Budget



Positive number



Deadline



Future date



Maximum



10 reference images



Maximum



10MB per image



\---



\## Feedback



Rating



1–5



Letter



Maximum



1000 characters



\---



\# Rate Limiting



Public APIs



```

100 requests/hour/IP

```



Authenticated APIs



```

1000 requests/hour/user

```



Authentication endpoints



```

5 login attempts/15 minutes/IP

```



Upload endpoints



```

20 uploads/hour/user

```



\---



\# API Security



Every protected endpoint requires:



\* JWT Access Token

\* Role verification (when applicable)

\* Input validation

\* Ownership verification (users can only access their own resources)

\* Audit logging for sensitive actions



Sensitive operations (admin changes, order status updates) should be recorded in the audit log.



\---



\# API Conventions



\## Resource Naming



Use plural nouns.



✅



```

/orders



/users



/gallery

```



❌



```

/getOrder



/createUser



/galleryItem

```



\---



\## HTTP Methods



| Method | Usage                   |

| ------ | ----------------------- |

| GET    | Retrieve data           |

| POST   | Create                  |

| PATCH  | Partial update          |

| PUT    | Replace (rarely needed) |

| DELETE | Delete resource         |



\---



\## Idempotency



Operations like payment (future) or order submission retries should support an \*\*Idempotency-Key\*\* header to prevent accidental duplicate requests.



\---



\# File Upload Contract



Accepted formats:



\* JPG

\* JPEG

\* PNG

\* WEBP



Limits:



\* Maximum 10 images per order

\* Maximum 10 MB per image



Response:



```json

{

&#x20; "mediaId": "uuid",

&#x20; "url": "https://...",

&#x20; "width": 1200,

&#x20; "height": 900

}

```



\---



\# Webhooks (Future)



These endpoints are reserved for future integrations.



```

POST /webhooks/payment



POST /webhooks/shipping



POST /webhooks/instagram



POST /webhooks/whatsapp

```



Each webhook should verify signatures before processing requests.



\---



\# OpenAPI Documentation



The backend should automatically expose:



```

/docs

```



Swagger UI



and



```

/redoc

```



ReDoc documentation.



These should remain synchronized with the implementation using FastAPI's automatic OpenAPI generation.



\---



\# API Lifecycle



```text

Client Request

&#x20;       │

Authentication

&#x20;       │

Authorization

&#x20;       │

Validation

&#x20;       │

Business Service

&#x20;       │

Repository

&#x20;       │

Database

&#x20;       │

Response Formatter

&#x20;       │

Client Response

```



Every endpoint should pass through the same pipeline to ensure consistency.



\---



\# API Summary



This specification establishes:



\* RESTful endpoint structure.

\* Standard request and response formats.

\* Authentication strategy.

\* Validation and error handling.

\* Pagination and filtering conventions.

\* Upload contracts.

\* Admin APIs.

\* Future webhook support.



By implementing this contract, frontend and backend teams can work independently while maintaining a stable integration surface.



\---



\# Recommended Next Document



The next logical step is \*\*Document 9 — Backend Architecture \& Implementation Guide\*\*, which will cover:



\* Feature-based project structure

\* FastAPI folder organization

\* Dependency injection

\* Service layer pattern

\* Repository pattern

\* SQLAlchemy models

\* Pydantic schemas

\* Authentication implementation

\* Background jobs (Celery/RQ)

\* Redis integration

\* Logging

\* Testing strategy

\* CI/CD pipeline

\* Coding standards



This document will translate the API contract into a production-ready backend architecture.



