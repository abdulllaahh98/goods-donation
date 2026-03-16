1. Introduction
1.1 Purpose
This Software Requirements Specification (SRS) document defines the functional and non-functional requirements for the Goods Donation Platform — a web-based application that facilitates the donation and redistribution of physical goods within communities. This document is intended for use by developers, designers, testers, and stakeholders involved in the design, implementation, and verification of the platform.
This SRS follows the IEEE Std 830-1998 standard for software requirements specifications and is derived from the Product Requirements Document (PRD) for the Goods Donation Platform.

1.2 Scope
The Goods Donation Platform is a full-stack web application with the following core objectives:
•	Enable donors to list and manage physical goods available for donation.
•	Allow recipients to search, request, and track donations.
•	Provide administrators with moderation and reporting tools.
•	Reduce waste by redistributing usable goods to those who need them.
•	Serve individuals, NGOs, shelters, students, and community organizations.

The system is scoped to include: user authentication, item listings, donation request management, inventory tracking, notifications, and an admin dashboard.
Out of scope for the initial release: real-time chat, map-based pickup coordination, AI-based recommendations, and a native mobile application. These are planned for future releases.

1.3 Definitions, Acronyms, and Abbreviations

Term / Acronym	Definition
SRS	Software Requirements Specification
PRD	Product Requirements Document
MVP	Minimum Viable Product — the initial feature-complete release
Donor	A registered user who lists items available for donation
Recipient	A registered user who requests donated items
Admin	Platform administrator with elevated moderation privileges
Guest	An unauthenticated visitor browsing the platform
API	Application Programming Interface
JWT	JSON Web Token — used for stateless authentication
RBAC	Role-Based Access Control
UI	User Interface
CRUD	Create, Read, Update, Delete — basic data operations
DXA	Document eXtended Attributes — unit of measurement in DOCX
NGO	Non-Governmental Organization

1.4 References
•	Goods Donation Platform — Product Requirements Document (PRD) v1.0
•	IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications
•	React Documentation — https://reactjs.org
•	MySQL 8.0 Reference Manual — https://dev.mysql.com/doc/
•	OWASP Top 10 Web Application Security Risks
•	WCAG 2.1 Web Content Accessibility Guidelines

1.5 Overview
This document is organized as follows:
•	Section 1: Introduction — purpose, scope, definitions, and references.
•	Section 2: Overall Description — product perspective, functions, user characteristics, constraints, and assumptions.
•	Section 3: Specific Requirements — detailed functional requirements organized by subsystem.
•	Section 4: Non-Functional Requirements — performance, security, scalability, and accessibility.
•	Section 5: Data Model — entity definitions and relationships.
•	Section 6: External Interface Requirements — UI, API, and system interfaces.
•	Section 7: System Constraints and Assumptions.
•	Section 8: Appendices — use case summary, API endpoint catalogue.


2. Overall Description
2.1 Product Perspective
The Goods Donation Platform is a new, standalone web application. It is not a replacement for any existing system. It will interact with the following external systems and services:
•	Email notification service (SMTP or third-party provider such as SendGrid) for sending user notifications.
•	Cloud hosting infrastructure (Vercel/Netlify for the frontend; a cloud server for the backend API).
•	A MySQL database hosted on a managed cloud database service.
•	(Future) Mapping API (e.g., Google Maps) for pickup location coordination.

The system operates as a three-tier architecture:
•	Presentation Tier: React-based Single Page Application (SPA) served via Vercel or Netlify.
•	Logic Tier: Lightweight RESTful API built in Node.js or PHP, hosted on a cloud server.
•	Data Tier: MySQL relational database for persistent data storage.

2.2 Product Functions — High-Level Summary

Function	Description
User Registration & Authentication	Secure account creation and login with role-based access control.
Item Listing Management	Donors can create, edit, delete, and view their listed donation items.
Item Discovery & Search	All users can browse, search, and filter available items.
Donation Request System	Recipients can request items; donors approve or reject requests.
Donation Fulfillment Workflow	Tracking from request to completion, with status updates.
Inventory Management	Donors manage quantities and availability of listed items.
Notification System	Automated alerts for request approval, rejection, and completion events.
Admin Dashboard	User management, content moderation, category management, and reporting.

2.3 User Classes and Characteristics

User Class	Technical Level	Frequency of Use	Primary Interactions
Guest	Any	Occasional	Browse listings, search items, register/login
Donor	Basic computer literacy	Regular	List items, manage inventory, handle requests
Recipient	Basic computer literacy	Regular	Search items, submit requests, track status
Admin	Intermediate-advanced	Daily	Moderate content, manage users, view analytics

2.4 Operating Environment
•	Web browsers: Chrome (latest), Firefox (latest), Safari (latest), Edge (latest).
•	Responsive design supporting screen widths from 320px (mobile) to 1920px (desktop).
•	Backend server: Linux-based cloud server (Ubuntu 22.04+ recommended).
•	Database: MySQL 8.0 or higher.
•	Node.js runtime: v18 LTS or higher (if Node.js backend is chosen).
•	Network: Standard HTTP/HTTPS; minimum 1 Mbps connection for end users.

2.5 Design and Implementation Constraints
•	The frontend must be built using React (JavaScript library).
•	The backend API must be implemented in either Node.js or PHP.
•	The database must use MySQL; no NoSQL alternatives are permitted in this release.
•	Frontend deployment must be on Vercel or Netlify.
•	All passwords must be hashed using bcrypt or equivalent algorithm; plaintext storage is prohibited.
•	All communication between client and server must use HTTPS in production.
•	The system must comply with WCAG 2.1 Level AA accessibility guidelines.
•	The MVP must not depend on third-party AI services.

2.6 Assumptions and Dependencies
•	Users have access to a modern web browser and a stable internet connection.
•	Email infrastructure (SMTP or third-party) is available and configured before deployment.
•	The hosting provider supports environment variable configuration for secrets management.
•	Donors and recipients are assumed to coordinate pickup logistics outside the platform for MVP.
•	The platform assumes good-faith usage; comprehensive anti-fraud mechanisms are planned post-MVP.
•	Categories will be seeded into the database by the Admin prior to go-live.


3. Specific Functional Requirements
Requirements are identified using the format FR-[SUBSYSTEM]-[NUMBER]. Each requirement is classified as:
•	Must Have (M): Required for MVP release.
•	Should Have (S): High priority, included if time permits.
•	Could Have (C): Lower priority, planned for future releases.

3.1 User Authentication and Authorization
3.1.1 User Registration
ID	Requirement	Priority
FR-AUTH-01	The system shall allow any Guest to register by providing a full name, email address, password, and selecting a role (Donor or Recipient).	Must Have
FR-AUTH-02	The system shall validate that the email address provided during registration is in a valid email format.	Must Have
FR-AUTH-03	The system shall enforce a minimum password length of 8 characters, requiring at least one uppercase letter, one number, and one special character.	Must Have
FR-AUTH-04	The system shall reject registration if the provided email address already exists in the database.	Must Have
FR-AUTH-05	The system shall hash all user passwords using bcrypt before storing them in the database.	Must Have
FR-AUTH-06	The system shall send a registration confirmation notification to the user's email address upon successful registration.	Should Have

3.1.2 User Login
ID	Requirement	Priority
FR-AUTH-07	The system shall allow registered users to log in using their email address and password.	Must Have
FR-AUTH-08	The system shall return an authentication token (JWT) upon successful login to maintain session state.	Must Have
FR-AUTH-09	The system shall display a generic error message ('Invalid email or password') for failed login attempts without disclosing which field is incorrect.	Must Have
FR-AUTH-10	The system shall lock a user account for 15 minutes after 5 consecutive failed login attempts.	Should Have
FR-AUTH-11	The system shall support a 'Forgot Password' workflow, allowing users to reset their password via a time-limited email link.	Should Have

3.1.3 Role-Based Access Control
ID	Requirement	Priority
FR-AUTH-12	The system shall enforce role-based access control for all protected API endpoints, permitting only authorized roles to access them.	Must Have
FR-AUTH-13	The system shall redirect unauthenticated users attempting to access protected pages to the login page.	Must Have
FR-AUTH-14	The system shall prevent Donors from accessing Recipient-only features and vice versa.	Must Have
FR-AUTH-15	The system shall maintain Admin accounts separately, with Admin creation handled only via a secure backend process.	Must Have

3.2 Item Listing Management
3.2.1 Create Item Listing
ID	Requirement	Priority
FR-ITEM-01	The system shall allow authenticated Donors to create a new item listing by providing: item name, category, description, quantity, and location.	Must Have
FR-ITEM-02	The system shall make all required fields mandatory; submission shall fail if any required field is empty.	Must Have
FR-ITEM-03	The system shall allow Donors to upload at least one photograph of the item (JPEG or PNG, max 5 MB per image).	Should Have
FR-ITEM-04	The system shall allow Donors to set an urgency level (Normal / Urgent) for each listing.	Should Have
FR-ITEM-05	Upon successful creation, the system shall display the new listing in the public item catalogue immediately.	Must Have

3.2.2 Edit and Delete Item Listing
ID	Requirement	Priority
FR-ITEM-06	The system shall allow a Donor to edit any item listing they own, modifying all fields except the listing creator.	Must Have
FR-ITEM-07	The system shall allow a Donor to delete their own item listing, provided no approved or pending requests are associated with it.	Must Have
FR-ITEM-08	The system shall prevent a Donor from editing or deleting listings owned by other Donors.	Must Have
FR-ITEM-09	The system shall allow the Admin to delete any item listing regardless of ownership.	Must Have

3.2.3 Item Status Management
ID	Requirement	Priority
FR-ITEM-10	Each item shall have one of the following statuses: Available, Reserved, Donated.	Must Have
FR-ITEM-11	The system shall automatically set an item's status to 'Reserved' when a request is approved.	Must Have
FR-ITEM-12	The system shall allow the Donor to mark an item as 'Donated' (Fulfilled) after coordinating with the recipient.	Must Have
FR-ITEM-13	Items with status 'Donated' shall remain visible in the catalogue but shall be marked clearly as no longer available.	Should Have

3.3 Search and Discovery
ID	Requirement	Priority
FR-SRCH-01	The system shall provide a search bar allowing all users (including Guests) to search items by name and keyword.	Must Have
FR-SRCH-02	The system shall support filtering of item listings by: category, location, availability status, and urgency level.	Must Have
FR-SRCH-03	The system shall display search and filter results in a paginated list with a maximum of 20 items per page.	Must Have
FR-SRCH-04	The system shall display each item card with: item name, category, location, status, and thumbnail image.	Must Have
FR-SRCH-05	The system shall allow sorting of results by: newest first, oldest first, and urgency.	Should Have
FR-SRCH-06	The system shall display a 'No results found' message with suggestions when no items match a query.	Must Have

3.4 Donation Request Management
3.4.1 Submitting a Request
ID	Requirement	Priority
FR-REQ-01	The system shall allow authenticated Recipients to submit a request for any item with status 'Available'.	Must Have
FR-REQ-02	The system shall prevent a Recipient from submitting more than one active request for the same item.	Must Have
FR-REQ-03	Upon request submission, the system shall notify the Donor via email/in-app notification.	Must Have
FR-REQ-04	The system shall allow Recipients to optionally include a message to the Donor when submitting a request.	Should Have

3.4.2 Donor Actions on Requests
ID	Requirement	Priority
FR-REQ-05	The system shall allow Donors to view all requests associated with their listings from their dashboard.	Must Have
FR-REQ-06	The system shall allow Donors to approve a pending request, changing its status to 'Approved'.	Must Have
FR-REQ-07	The system shall allow Donors to reject a pending request, changing its status to 'Rejected', with an optional reason.	Must Have
FR-REQ-08	When a Donor approves a request for an item, all other pending requests for that same item shall be automatically rejected.	Must Have
FR-REQ-09	The system shall notify the Recipient by email/in-app notification upon approval or rejection of their request.	Must Have

3.4.3 Request Status Lifecycle

Status	Description	Triggered By
Pending	Request has been submitted and awaits Donor action.	Recipient submits request
Approved	Donor has approved the request; item is reserved for the Recipient.	Donor approves request
Rejected	Donor has rejected the request; item remains available.	Donor rejects request
Completed	Item has been physically transferred; Donor marks as Fulfilled.	Donor marks item Donated

3.5 Inventory Management
ID	Requirement	Priority
FR-INV-01	The system shall display an inventory dashboard for each Donor, showing all their active listings and their current statuses.	Must Have
FR-INV-02	Donors shall be able to update the quantity of any Available item from their dashboard.	Must Have
FR-INV-03	When quantity reaches zero, the system shall automatically set item status to 'Donated'.	Must Have
FR-INV-04	The system shall display the total count of Available, Reserved, and Donated items in the Donor's dashboard summary.	Should Have

3.6 Notification System
ID	Requirement	Priority
FR-NOTIF-01	The system shall send in-app notifications to Donors when a new request is submitted for their item.	Must Have
FR-NOTIF-02	The system shall send in-app notifications to Recipients when their request is approved or rejected.	Must Have
FR-NOTIF-03	The system shall send in-app notifications to Recipients when a donation is marked Completed.	Must Have
FR-NOTIF-04	All in-app notifications shall be accessible via a Notifications panel in the application header.	Must Have
FR-NOTIF-05	The system shall also send corresponding email notifications for all events in FR-NOTIF-01 through FR-NOTIF-03.	Should Have
FR-NOTIF-06	Users shall be able to mark notifications as read individually or all at once.	Should Have

3.7 Admin Dashboard
ID	Requirement	Priority
FR-ADMIN-01	The system shall provide a dedicated Admin Dashboard accessible only to users with the Admin role.	Must Have
FR-ADMIN-02	Admins shall be able to view a paginated list of all registered users, with the ability to search and filter by role.	Must Have
FR-ADMIN-03	Admins shall be able to block (suspend) or unblock any user account.	Must Have
FR-ADMIN-04	Admins shall be able to delete any item listing without restriction.	Must Have
FR-ADMIN-05	Admins shall be able to create, rename, and delete item categories.	Must Have
FR-ADMIN-06	Admins shall be able to view a summary dashboard displaying: total users, total items, total completed donations, and active requests.	Must Have
FR-ADMIN-07	Admins shall be able to view system activity logs showing key events (registrations, logins, donations).	Should Have
FR-ADMIN-08	Admins shall be able to generate and export donation statistics reports in CSV format.	Could Have


4. Non-Functional Requirements
4.1 Performance
ID	Requirement	Target
NFR-PERF-01	All page load times shall be under 2 seconds on a standard broadband connection (>= 10 Mbps).	< 2 seconds
NFR-PERF-02	API response time for search and filter queries shall be under 500ms for datasets up to 10,000 items.	< 500ms
NFR-PERF-03	Item listing pages shall implement pagination with a maximum of 20 items per page to control payload size.	20 items/page
NFR-PERF-04	Database queries shall use indexing on frequently queried fields (donor_id, category, status, location).	Indexed queries
NFR-PERF-05	The system shall support at least 500 concurrent users without degradation in response time.	>= 500 concurrent

4.2 Security
ID	Requirement	Standard / Method
NFR-SEC-01	All user passwords shall be hashed using bcrypt with a minimum cost factor of 10.	bcrypt
NFR-SEC-02	All API endpoints shall validate and sanitize all input data to prevent SQL injection and XSS attacks.	OWASP Top 10
NFR-SEC-03	All production traffic shall be served over HTTPS using TLS 1.2 or higher.	TLS 1.2+
NFR-SEC-04	Authentication tokens (JWTs) shall expire after 24 hours; refresh tokens may extend sessions.	JWT / RFC 7519
NFR-SEC-05	The system shall implement CORS policies restricting API access to known frontend origins.	CORS
NFR-SEC-06	Role-based access control shall be enforced at the API layer, not just the UI layer.	RBAC
NFR-SEC-07	Admin accounts shall only be creatable through a secure backend provisioning process, never via the public registration form.	Admin provisioning

4.3 Reliability and Availability
ID	Requirement	Target
NFR-REL-01	The system shall target 99.5% uptime (excluding scheduled maintenance windows).	99.5% uptime
NFR-REL-02	The system shall implement graceful error handling; server errors shall return meaningful HTTP status codes and messages.	HTTP standards
NFR-REL-03	Database backups shall be performed daily with a 7-day retention period.	Daily backups

4.4 Scalability
ID	Requirement	Target
NFR-SCAL-01	The system architecture shall support horizontal scaling of the API layer to handle increased traffic.	Horizontal scaling
NFR-SCAL-02	The database schema shall be designed to efficiently support up to 100,000 item listings and 50,000 registered users.	100K items / 50K users
NFR-SCAL-03	Frontend static assets shall be deployed via a CDN to reduce latency for geographically distributed users.	CDN deployment

4.5 Usability and Accessibility
ID	Requirement	Standard
NFR-UX-01	The UI shall be fully responsive, supporting screen widths from 320px to 1920px.	Responsive Design
NFR-UX-02	The platform shall comply with WCAG 2.1 Level AA accessibility guidelines.	WCAG 2.1 AA
NFR-UX-03	All interactive elements shall be keyboard-navigable.	WCAG 2.1
NFR-UX-04	All images shall include descriptive alt text for screen reader compatibility.	WCAG 2.1
NFR-UX-05	Form fields shall display inline validation feedback in real time.	UX Best Practice
NFR-UX-06	The system shall display loading indicators for operations exceeding 300ms.	UX Best Practice

4.6 Maintainability
•	The codebase shall follow consistent naming conventions and be documented with inline comments for all non-trivial logic.
•	The backend API shall use a versioned URL structure (e.g., /api/v1/) to allow future non-breaking changes.
•	Environment configuration (database credentials, API keys, SMTP settings) shall be managed via environment variables, never hardcoded.
•	The system shall include a README with setup, deployment, and configuration instructions.


5. Data Model
5.1 Entity Descriptions
5.1.1 Users Table
Column	Type	Constraints	Description
id	INT	PRIMARY KEY, AUTO_INCREMENT	Unique user identifier
name	VARCHAR(150)	NOT NULL	Full name of the user
email	VARCHAR(255)	NOT NULL, UNIQUE	User's email address (login credential)
password	VARCHAR(255)	NOT NULL	bcrypt-hashed password
role	ENUM	NOT NULL, DEFAULT 'recipient'	Values: 'donor', 'recipient', 'admin'
is_active	TINYINT(1)	NOT NULL, DEFAULT 1	1 = active, 0 = blocked by Admin
created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	Account creation timestamp
updated_at	TIMESTAMP	ON UPDATE CURRENT_TIMESTAMP	Last update timestamp

5.1.2 Categories Table
Column	Type	Constraints	Description
id	INT	PRIMARY KEY, AUTO_INCREMENT	Unique category identifier
name	VARCHAR(100)	NOT NULL, UNIQUE	Category name (e.g., Books, Electronics)
created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	Category creation timestamp

5.1.3 Items Table
Column	Type	Constraints	Description
id	INT	PRIMARY KEY, AUTO_INCREMENT	Unique item identifier
title	VARCHAR(200)	NOT NULL	Item title/name
description	TEXT	NOT NULL	Detailed description of the item
category_id	INT	NOT NULL, FK → Categories(id)	Foreign key to Categories table
quantity	INT	NOT NULL, DEFAULT 1	Number of units available
location	VARCHAR(255)	NOT NULL	Pickup location or general area
urgency	ENUM	DEFAULT 'normal'	Values: 'normal', 'urgent'
status	ENUM	NOT NULL, DEFAULT 'available'	Values: 'available', 'reserved', 'donated'
donor_id	INT	NOT NULL, FK → Users(id)	Foreign key to the listing Donor
image_url	VARCHAR(500)	NULLABLE	URL to uploaded item image
created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	Listing creation timestamp
updated_at	TIMESTAMP	ON UPDATE CURRENT_TIMESTAMP	Last update timestamp

5.1.4 Requests Table
Column	Type	Constraints	Description
id	INT	PRIMARY KEY, AUTO_INCREMENT	Unique request identifier
item_id	INT	NOT NULL, FK → Items(id)	Foreign key to the requested item
recipient_id	INT	NOT NULL, FK → Users(id)	Foreign key to the requesting Recipient
status	ENUM	NOT NULL, DEFAULT 'pending'	Values: 'pending', 'approved', 'rejected', 'completed'
message	TEXT	NULLABLE	Optional message from Recipient to Donor
rejection_reason	TEXT	NULLABLE	Optional reason provided by Donor on rejection
created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	Request submission timestamp
updated_at	TIMESTAMP	ON UPDATE CURRENT_TIMESTAMP	Last status update timestamp

5.1.5 Notifications Table
Column	Type	Constraints	Description
id	INT	PRIMARY KEY, AUTO_INCREMENT	Unique notification identifier
user_id	INT	NOT NULL, FK → Users(id)	Recipient of the notification
type	VARCHAR(100)	NOT NULL	Notification type (e.g., 'request_approved')
message	TEXT	NOT NULL	Human-readable notification message
is_read	TINYINT(1)	DEFAULT 0	0 = unread, 1 = read
created_at	TIMESTAMP	DEFAULT CURRENT_TIMESTAMP	Notification creation timestamp

5.2 Entity Relationship Summary
•	Users (1) → (Many) Items: One Donor can have many item listings.
•	Users (1) → (Many) Requests: One Recipient can submit many requests.
•	Items (1) → (Many) Requests: One item can receive many requests; only one can be Approved.
•	Categories (1) → (Many) Items: One category can have many items.
•	Users (1) → (Many) Notifications: One user can receive many notifications.


6. External Interface Requirements
6.1 User Interface Requirements

Page / View	Accessible By	Key Components
Home / Landing Page	Guest, All roles	Hero section, search bar, featured items, navigation links
Registration Page	Guest	Registration form: name, email, password, role selection, submit button
Login Page	Guest	Email/password form, forgot password link, submit button
Item Catalogue / Listing Page	All roles	Item cards grid, search bar, filter panel (category, location, urgency, status), pagination
Item Details Page	All roles	Item images, full description, donor info, Request Item button (Recipient only)
Add / Edit Item Page	Donor	Form fields: name, category, description, quantity, location, urgency, image upload
Donor Dashboard	Donor	My Listings tab, Requests Received tab, Inventory summary cards
Recipient Dashboard	Recipient	My Requests tab with status tracking, request history
Admin Dashboard	Admin	Statistics overview, user management table, category management, activity log
Notifications Panel	Donor, Recipient	List of notifications with read/unread state; mark all as read action

6.2 API Interface Requirements

Endpoint	Method	Role Required	Description
POST /api/v1/register	POST	Guest	Register a new user account
POST /api/v1/login	POST	Guest	Authenticate user, return JWT
POST /api/v1/logout	POST	Authenticated	Invalidate current session token
GET /api/v1/items	GET	All	Retrieve paginated, filterable item listings
GET /api/v1/items/{id}	GET	All	Retrieve single item details
POST /api/v1/items	POST	Donor	Create a new item listing
PUT /api/v1/items/{id}	PUT	Donor (owner) / Admin	Update an existing item listing
DELETE /api/v1/items/{id}	DELETE	Donor (owner) / Admin	Delete an item listing
GET /api/v1/requests	GET	Donor / Recipient	Retrieve requests (filtered by role context)
POST /api/v1/requests	POST	Recipient	Submit a new donation request
PUT /api/v1/requests/{id}	PUT	Donor / Recipient	Update request status (approve/reject/complete)
GET /api/v1/notifications	GET	Authenticated	Retrieve notifications for current user
PUT /api/v1/notifications/{id}/read	PUT	Authenticated	Mark a notification as read
GET /api/v1/admin/users	GET	Admin	List all registered users
PUT /api/v1/admin/users/{id}	PUT	Admin	Block or unblock a user
GET /api/v1/categories	GET	All	List all item categories
POST /api/v1/categories	POST	Admin	Create a new category
DELETE /api/v1/categories/{id}	DELETE	Admin	Delete a category

All API endpoints shall return responses in JSON format. Standard HTTP status codes shall be used: 200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 500 Internal Server Error.

6.3 Software Interfaces
•	Email Provider: SMTP or third-party service (e.g., SendGrid, Mailgun) for sending transactional email notifications.
•	File Storage: Local file system (development) or cloud object storage (e.g., AWS S3, Cloudflare R2) for uploaded item images in production.
•	Database Driver: MySQL2 (Node.js) or MySQLi/PDO (PHP) for database connectivity.
•	Authentication: JWT library for token generation and validation.


7. System Constraints and Assumptions
7.1 Regulatory Constraints
•	The platform shall not collect or store sensitive personal data beyond what is necessary for operation (name, email, role).
•	The platform shall include a Privacy Policy and Terms of Service, accessible to all users, prior to go-live.
•	All user data shall be stored on servers compliant with applicable data protection regulations (e.g., GDPR if operating in Europe).

7.2 Hardware Constraints
•	The system has no specific hardware requirements for end users beyond a device with a modern browser and internet access.
•	Server-side, a minimum of 2 vCPUs and 4 GB RAM is recommended for the API server in production.
•	The database server requires a minimum of 2 vCPUs and 8 GB RAM for datasets up to 100,000 items.

7.3 Key Assumptions
1.	The platform will launch in English only for the MVP; multi-language support is a post-MVP consideration.
2.	Physical delivery/pickup of donated items is entirely managed between Donor and Recipient outside of the platform for the MVP.
3.	Email deliverability is the responsibility of the configured SMTP/email service provider.
4.	Admin accounts will be created manually by the development team prior to launch.
5.	The system will not process payments; all donations are free of charge.
6.	Image storage costs for production are accounted for in the hosting budget.


8. Appendices
8.1 Use Case Summary

Use Case ID	Use Case Name	Actor	Precondition	Outcome
UC-01	Register Account	Guest	User has not registered	New user account created
UC-02	Login	Registered User	Valid credentials	JWT issued; user redirected to dashboard
UC-03	Create Item Listing	Donor	Donor is logged in	New item visible in catalogue
UC-04	Search and Filter Items	All Users	None	Filtered item list displayed
UC-05	Request Item	Recipient	Item is Available; Recipient is logged in	Request submitted; Donor notified
UC-06	Approve Request	Donor	Request is Pending	Request Approved; item Reserved; other requests Rejected
UC-07	Reject Request	Donor	Request is Pending	Request Rejected; Recipient notified
UC-08	Mark Item as Donated	Donor	Request is Approved	Item status set to Donated; request Completed
UC-09	Block User	Admin	Admin is logged in	User account blocked; user cannot login
UC-10	Manage Categories	Admin	Admin is logged in	Category created, renamed, or deleted

8.2 Glossary of Statuses

Entity	Status	Meaning
Item	Available	Item is listed and available for requests
Item	Reserved	An approved request exists; item is held for recipient
Item	Donated	Item has been physically transferred to recipient
Request	Pending	Awaiting Donor review
Request	Approved	Donor has accepted the request
Request	Rejected	Donor has declined the request
Request	Completed	Donation fulfilled; item transferred
User Account	Active	User can log in and use the platform
User Account	Blocked	User is suspended by Admin; cannot log in

8.3 Revision History

Version	Date	Author	Description
1.0	March 2026	Platform Team	Initial SRS document created from PRD v1.0
