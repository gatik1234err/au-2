# DestinyAuction — Frontend Product Requirements Document (PRD)

**Version:** 1.0  
**Product:** DestinyAuction  
**Document Type:** Frontend PRD  
**Platform:** Responsive Web Application  
**Primary Users:** Riders / Bike Auction Participants  
**Admin Users:** Auction Administrators

---

## 1. Product Overview

**DestinyAuction** is a motorcycle auction platform where users can register, pay a one-time registration fee, access the auction marketplace for their lifetime account, and place bids on motorcycles during active auctions.

The platform should feel like a **premium digital motorcycle auction house** rather than a generic e-commerce website.

### Core User Journey

```text
Landing Page
    ↓
Register
    ↓
Pay Registration Fee
    ↓
Account Activated
    ↓
Browse Auctions
    ↓
View Bike
    ↓
Auction Opens
    ↓
Place Bid
    ↓
Auction Ends
    ↓
Winner / Lost Result
    ↓
Auction & Bid History
```

### Core Admin Journey

```text
Admin Login
    ↓
Dashboard
    ├── Users
    ├── Bikes
    ├── Auctions
    ├── Bids
    ├── Registration Fees
    └── Winners
```

---

# 2. Product Goals

### Primary Goals

1. Create a trustworthy motorcycle auction experience.
2. Make finding bikes extremely fast and intuitive.
3. Make live bidding feel exciting and responsive.
4. Clearly communicate auction status and remaining time.
5. Restrict bidding to eligible registered users.
6. Give users a permanent/lifetime auction account after successful registration.
7. Give administrators complete CRUD control over auction inventory and users.
8. Build a frontend that can easily connect to a REST API or similar backend later.
9. Provide an excellent mobile experience because riders may primarily access the platform from phones.

### Non-Goals for V1

- Native iOS/Android application.
- Actual payment gateway implementation in the frontend.
- Real-time bidding backend implementation.
- Vehicle inspection/valuation engine.
- Logistics/shipping management.
- Financing/loan system.

The frontend should nevertheless be designed so these can be added later.

---

# 3. Target Users

## 3.1 Auction Participant

A motorcycle enthusiast who wants to:

- Discover bikes.
- View detailed motorcycle information.
- Track upcoming auctions.
- Participate in live auctions.
- Place bids.
- Monitor current highest bids.
- Review previous bids.
- See won/lost auctions.
- Manage their profile.

## 3.2 Administrator

An administrator who manages:

- Users.
- Bikes.
- Auctions.
- Bids.
- Registration payments.
- Auction results.
- Platform content.

---

# 4. Brand & Visual Identity

## Brand Name

**DestinyAuction**

### Suggested Tagline

> **Ride It. Bid It. Own It.**

Alternative:

> **Where Every Ride Finds Its Destiny.**

---

# 5. Design Direction

The website should combine:

- Premium motorcycle culture
- Auction-house seriousness
- Motorsport energy
- Industrial materials
- Modern SaaS dashboard usability

### Visual Inspiration

Think:

```text
Premium Motorcycle Brand
        +
Auction House
        +
Modern Fintech Dashboard
        +
Motorsport UI
```

Avoid making the UI look like:

- A generic shopping website
- A gambling website
- A cheap classifieds platform
- An overly futuristic neon dashboard

---

# 6. Color System

## Primary Theme

### Background

- Asphalt Black: `#0B0D0F`
- Carbon: `#121518`
- Dark Surface: `#181C20`
- Elevated Surface: `#20252A`

### Primary Accent

**Racing Orange**

`#FF5A1F`

Used for:

- CTA buttons
- Active states
- Bid actions
- Auction indicators
- Important highlights

### Secondary Accent

**Metallic Silver**

`#A8ADB3`

Used for:

- Secondary text
- Borders
- Metadata
- Motorcycle specifications

### Status Colors

```text
LIVE      → Red / Orange
UPCOMING  → Blue
ENDED     → Gray
WON       → Green
LOST      → Muted Red
WARNING   → Amber
```

Use status colors sparingly.

---

# 7. Typography

Recommended typography:

### Primary

**Inter**

For:

- Body
- Dashboard
- Tables
- Forms
- Navigation

### Display

**Space Grotesk** or **Manrope**

For:

- Hero headlines
- Auction prices
- Large numbers
- Section headings

Typography should feel bold and mechanical without becoming difficult to read.

---

# 8. Design Principles

## 8.1 Mobile First

A large percentage of users may access DestinyAuction from mobile devices.

Every major flow must work comfortably on:

- 360px
- 390px
- 430px
- Tablet
- Desktop
- Large desktop

## 8.2 Information First

Users should immediately understand:

- What bike is being auctioned.
- Current bid.
- Auction status.
- Time remaining.
- Bid increment.
- Whether they are eligible to bid.

## 8.3 Strong Visual Hierarchy

Every auction card should make the following hierarchy obvious:

```text
Bike Image
↓
Bike Name
↓
Current Bid
↓
Time Remaining
↓
Auction Status
↓
View / Bid CTA
```

---

# 9. Application Structure

## Public Website

```text
/
├── Home
├── Auctions
├── Auction Details
├── About
├── How It Works
├── FAQ
├── Login
└── Register
```

## Authenticated User

```text
/dashboard
/dashboard/auctions
/dashboard/auctions/:id
/dashboard/bids
/dashboard/wins
/dashboard/history
/dashboard/profile
/dashboard/settings
```

## Admin

```text
/admin
/admin/users
/admin/bikes
/admin/auctions
/admin/bids
/admin/payments
/admin/winners
/admin/settings
```

---

# 10. Navigation

## Desktop Public Navbar

```text
DESTINYAuction Logo

Auctions
How It Works
About
FAQ

[Login] [Register]
```

When logged in:

```text
Logo

Auctions
My Bids
My Wins

Profile Avatar
```

## Mobile Navbar

```text
Logo                     ☰
```

Authenticated mobile bottom navigation:

```text
Home | Auctions | My Bids | Wins | Profile
```

---

# 11. Landing Page

## Hero Section

The hero should immediately establish the motorcycle identity.

### Suggested Layout

Large motorcycle image/video background.

Overlay:

```text
THE NEXT RIDE
COULD BE YOURS.

Premium motorcycles.
Live auctions.
One winning bid.

[Explore Auctions]
[How It Works]
```

Hero should include subtle motion such as:

- Motorcycle image parallax.
- Moving light.
- Grain texture.
- Animated speed line.

Do not overdo animation.

---

# 12. Featured Auctions

Display active and upcoming auctions.

### Auction Card

Each card contains:

- Motorcycle image
- Brand
- Model
- Year
- Engine capacity
- Current bid
- Starting bid
- Number of bids
- Auction status
- Countdown
- CTA

Example:

```text
[BIKE IMAGE]

2024
KAWASAKI

Ninja ZX-6R

636cc • Petrol • 8,400 km

Current Bid
₹8,45,000

🔥 12 Bids

ENDS IN
02 : 14 : 38

[VIEW AUCTION]
```

---

# 13. Auction Listing Page

Route:

```text
/auctions
```

### Header

```text
LIVE MOTORCYCLE AUCTIONS

Find your next machine.
```

### Filters

Desktop:

```text
Search
Brand
Model
Category
Year
Price Range
Engine CC
Location
Auction Status
Sort By
```

Mobile:

Use a filter drawer.

### Sort Options

- Ending Soon
- Newly Added
- Price: Low → High
- Price: High → Low
- Most Bids
- Upcoming

---

# 14. Auction States

Every auction must have one of three primary states.

## UPCOMING

```text
AUCTION STARTS IN

1D 04H 22M

[VIEW DETAILS]
```

User cannot bid.

## LIVE

```text
● LIVE

CURRENT BID

₹8,45,000

ENDS IN

00:12:48

[PLACE BID]
```

Eligible users can bid.

## ENDED

```text
AUCTION ENDED

FINAL BID

₹9,10,000

Winner:
Anonymous / User display name

[VIEW RESULTS]
```

---

# 15. Auction Details Page

Route:

```text
/auctions/:auctionId
```

This is the most important page in the product.

## Desktop Layout

```text
------------------------------------------------
|                                              |
|            LARGE BIKE GALLERY                |
|                                              |
------------------------------------------------

Bike Information        Live Auction Panel
                       -------------------
2024 Yamaha R1         CURRENT BID
998cc                   ₹15,20,000

8,200 km               27 BIDS

Petrol                  TIME LEFT
                        00:18:42

Location                [ BID NOW ]
Mumbai

Specifications
Description
Documents
Inspection
Auction Rules
Bid History
```

---

# 16. Motorcycle Gallery

Support:

- Main image
- Thumbnail gallery
- Fullscreen image viewer
- Zoom
- Multiple angles
- Engine
- Tyres
- Dashboard
- Exterior
- Documents

Optional future support:

- 360° viewer
- Video walkaround

---

# 17. Motorcycle Information

Display:

```text
Brand
Model
Variant
Year
Engine
Mileage
Fuel Type
Transmission
Color
Registration Year
Ownership
Location
Condition
```

Use specification cards.

---

# 18. Bid Panel

The bid panel should remain visually prominent.

### Example

```text
LIVE AUCTION

Current Bid

₹8,45,000

Minimum Next Bid

₹8,50,000

Bid Increment

₹5,000

[ - ]  ₹8,50,000  [ + ]

[BID ₹8,50,000]
```

Before bidding:

```text
You are about to place a bid of ₹8,50,000.

By placing this bid, you agree to the
auction terms and conditions.

[Cancel] [Confirm Bid]
```

---

# 19. Bid Validation States

Frontend must handle:

### Valid

```text
Bid accepted.
```

### Bid too low

```text
Your bid must be at least ₹8,50,000.
```

### Auction ended

```text
This auction has ended.
```

### Not registered

```text
Registration is required to participate.

[Register Now]
```

### Registration pending

```text
Complete your registration payment
to participate in auctions.
```

### Network failure

```text
Unable to submit your bid.

Please check your connection and try again.
```

---

# 20. Low Connectivity UX

Because DestinyAuction is designed for riders, the application should be optimized for unreliable networks.

## Requirements

- Lightweight pages.
- Lazy-loaded images.
- Responsive image sizes.
- Minimal JavaScript where possible.
- Avoid unnecessary animations.
- Skeleton loaders.
- Retry buttons.
- Cache static assets.
- Preserve form state.
- Avoid repeatedly downloading large images.

### Connection Indicator

Optional:

```text
● GOOD CONNECTION
```

or:

```text
⚠ WEAK CONNECTION
```

When connection is weak:

```text
Weak connection detected.
Some auction updates may be delayed.
```

Important: the UI must never imply a bid was accepted until the server confirms it.

---

# 21. Registration

Route:

```text
/register
```

## Step 1 — Account

Fields:

```text
Full Name
Email
Phone Number
Password
Confirm Password
```

## Step 2 — Verification

Possible:

```text
Email OTP
Phone OTP
```

## Step 3 — Registration Fee

Show:

```text
DESTINYAuction Membership

One-time Registration Fee

₹XXXX

Benefits:

✓ Lifetime auction access
✓ Bid on live auctions
✓ Track your bids
✓ View auction history
✓ Receive winner notifications

[PAY & ACTIVATE]
```

---

# 22. Registration Fee States

### Payment Pending

```text
Payment Pending
```

### Payment Successful

```text
Membership Activated

Welcome to DestinyAuction.

Your lifetime auction access is now active.
```

### Payment Failed

```text
Payment Failed

Your account has not been activated.

[Try Again]
```

### Account Status

User dashboard should display:

```text
MEMBERSHIP

● ACTIVE

Lifetime Access
```

---

# 23. Login

Route:

```text
/login
```

Fields:

```text
Email / Phone
Password
```

Actions:

```text
[Login]

Forgot Password?
Don't have an account? Register
```

Optional future:

- Google login
- OTP login

---

# 24. User Dashboard

Route:

```text
/dashboard
```

## Dashboard Header

```text
Good evening, Siddharth.

Ready to find your next ride?
```

### Summary Cards

```text
Active Bids       ₹XX
Winning Bids      02
Auctions Joined   14
Watchlist         06
```

### Active Bids

Show:

```text
Bike
Current Bid
Your Bid
Position
Time Remaining
Status
```

Example:

```text
Yamaha R15 V4

Current: ₹1,52,000
Your Bid: ₹1,50,000

OUTBID

01:22:14

[VIEW AUCTION]
```

---

# 25. My Bids

Route:

```text
/dashboard/bids
```

Tabs:

```text
Active
Won
Lost
All
```

Table/Card:

```text
Bike
Your Highest Bid
Current Bid
Auction Status
Date
Action
```

---

# 26. My Wins

Route:

```text
/dashboard/wins
```

Show winning auctions.

Each item:

```text
🏍 Yamaha MT-15

Winning Bid
₹1,65,000

Auction Date
12 Sep 2026

Status
WINNER

[VIEW DETAILS]
```

---

# 27. Auction History

Show all auctions the user participated in.

Fields:

```text
Bike
Date
Highest Bid
Final Bid
Result
```

---

# 28. Watchlist

Users can save motorcycles.

Heart/bookmark button:

```text
♡
```

When saved:

```text
♥
```

Watchlisted bikes can appear on:

```text
/dashboard/watchlist
```

---

# 29. Notifications

Notification center:

```text
Notifications

🔥 You have been outbid on Yamaha R1.

⏰ Kawasaki Ninja auction ends in 15 minutes.

🏆 Congratulations! You won the BMW S1000RR auction.

💳 Registration payment successful.
```

Notifications should support:

- Unread/read state.
- Timestamp.
- Deep link to relevant page.

---

# 30. Profile

Route:

```text
/dashboard/profile
```

Sections:

```text
Personal Information
Contact Information
Membership
Security
Notification Preferences
```

---

# 31. Admin Panel

The admin panel should use a clean, information-dense dashboard.

Route:

```text
/admin
```

## Admin Sidebar

```text
Dashboard

Auctions
  ├── All Auctions
  ├── Create Auction
  └── Auction Results

Bikes
  ├── All Bikes
  └── Add Bike

Users

Bids

Payments

Winners

Notifications

Settings
```

---

# 32. Admin Dashboard

Display:

```text
TOTAL USERS
12,420

ACTIVE AUCTIONS
24

LIVE AUCTIONS
07

TOTAL BIDS
48,920

REGISTRATION REVENUE
₹XX,XX,XXX
```

### Charts

Recommended:

- Registrations over time.
- Auction activity.
- Bids per day.
- Revenue.
- Active users.

---

# 33. Admin — User Management

Route:

```text
/admin/users
```

Table:

```text
User
Email
Phone
Registration Status
Payment Status
Joined
Bids
Actions
```

Actions:

```text
View
Edit
Suspend
Activate
Delete
```

### User Detail

Display:

- Profile.
- Membership status.
- Registration payment.
- Bidding history.
- Winning history.
- Account activity.

---

# 34. Admin — Bike Management

Route:

```text
/admin/bikes
```

CRUD operations:

```text
Create
Read
Update
Delete
```

Bike fields:

```text
Brand
Model
Variant
Year
Engine CC
Fuel
Transmission
Mileage
Color
Condition
Location
Description
Starting Price
Images
Documents
```

---

# 35. Admin — Create Bike

Form:

```text
Bike Details
----------------
Brand
Model
Variant
Year

Specifications
----------------
Engine
Fuel
Transmission
Mileage
Color

Auction Information
----------------
Starting Price
Minimum Increment

Media
----------------
Upload Images
Upload Documents

[Save Bike]
```

Support image previews before upload.

---

# 36. Admin — Auction Management

Route:

```text
/admin/auctions
```

Table:

```text
Bike
Starting Price
Current Bid
Bids
Start Date
End Date
Status
Actions
```

Actions:

```text
View
Edit
Pause
Cancel
End
Delete
```

---

# 37. Create Auction

Fields:

```text
Select Bike

Starting Price
Minimum Bid Increment

Auction Start Date
Auction Start Time

Auction End Date
Auction End Time

Auction Rules

Status
```

Status automatically derives from start/end timestamps where appropriate.

---

# 38. Admin — Bid Management

Route:

```text
/admin/bids
```

Display:

```text
Bid ID
User
Bike
Auction
Bid Amount
Timestamp
Status
```

Admin should be able to inspect bid history.

Bid deletion/editing should be restricted and require appropriate confirmation because bids are transaction-like records.

---

# 39. Admin — Payments

Route:

```text
/admin/payments
```

Display:

```text
Payment ID
User
Amount
Payment Type
Date
Status
Transaction Reference
```

Statuses:

```text
SUCCESS
PENDING
FAILED
REFUNDED
```

---

# 40. Admin — Winners

Route:

```text
/admin/winners
```

Display:

```text
Auction
Bike
Winner
Winning Bid
Auction End
Settlement Status
```

---

# 41. Admin CRUD Rules

Every CRUD interface must provide:

### Create

```text
Create New
```

### Read

```text
View Details
```

### Update

```text
Edit
```

### Delete

```text
Delete
```

Before destructive actions:

```text
Are you sure?

This action cannot be undone.

[Cancel] [Delete]
```

---

# 42. Search

Global search should support:

```text
Bike name
Brand
Model
User
Auction ID
Bid ID
```

Admin search should include filters.

---

# 43. Tables

Desktop admin tables should support:

- Sorting.
- Filtering.
- Pagination.
- Search.
- Column alignment.
- Status badges.
- Row actions.

Mobile should transform tables into stacked cards.

---

# 44. Components

Recommended reusable components:

```text
Navbar
MobileNavbar
Sidebar
Button
Input
Select
Modal
Drawer
Toast
Badge
Card
AuctionCard
BikeCard
BikeGallery
CountdownTimer
BidPanel
BidHistory
FilterBar
SearchBar
Pagination
DataTable
StatCard
Chart
EmptyState
ErrorState
LoadingSkeleton
ConfirmationModal
UserAvatar
NotificationPanel
```

---

# 45. Countdown Component

Countdown must support:

```text
Days
Hours
Minutes
Seconds
```

Examples:

```text
02D 14H 32M
```

```text
14:32:08
```

When the countdown reaches zero:

```text
AUCTION ENDED
```

The frontend should synchronize with server time rather than relying solely on the user's device clock.

---

# 46. Real-Time Auction UI

The frontend should be architected to support real-time updates later using:

- WebSockets
- Server-Sent Events
- Firebase Realtime Database
- Another real-time backend mechanism

When another user bids:

```text
CURRENT BID

₹8,55,000

↑ New bid received
```

The user's own bid panel should update immediately after confirmed server response.

---

# 47. Data Models Expected by Frontend

## User

```ts
User {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  membershipStatus: "pending" | "active" | "suspended"
  registrationPaymentStatus: "pending" | "paid" | "failed"
  createdAt: string
}
```

## Bike

```ts
Bike {
  id: string
  brand: string
  model: string
  variant?: string
  year: number
  engineCC: number
  fuelType: string
  transmission: string
  mileage: number
  color: string
  condition: string
  location: string
  description: string
  images: string[]
}
```

## Auction

```ts
Auction {
  id: string
  bikeId: string
  startingPrice: number
  currentBid: number
  minimumIncrement: number
  startTime: string
  endTime: string
  status: "upcoming" | "live" | "ended"
  totalBids: number
  winnerId?: string
}
```

## Bid

```ts
Bid {
  id: string
  auctionId: string
  userId: string
  amount: number
  createdAt: string
  status: "accepted" | "rejected"
}
```

## Payment

```ts
Payment {
  id: string
  userId: string
  amount: number
  type: "registration"
  status: "pending" | "success" | "failed" | "refunded"
  transactionReference?: string
  createdAt: string
}
```

---

# 48. API Contract Expectations

The frontend should be structured around services rather than directly calling APIs from UI components.

Suggested structure:

```text
services/
├── auth.service.ts
├── user.service.ts
├── bike.service.ts
├── auction.service.ts
├── bid.service.ts
├── payment.service.ts
├── notification.service.ts
└── admin.service.ts
```

Example:

```ts
auctionService.getAuctions()
auctionService.getAuctionById(id)
auctionService.createAuction(data)
auctionService.updateAuction(id, data)
auctionService.deleteAuction(id)
```

Bid:

```ts
bidService.getBids(auctionId)
bidService.placeBid(auctionId, amount)
```

---

# 49. Authentication & Authorization

Frontend must support:

```text
Unauthenticated
Registered but payment pending
Registered + payment completed
Suspended
Admin
```

### Route Protection

```text
Public Routes
    ↓
Anyone can access

Protected Routes
    ↓
Authenticated users

Bid Routes
    ↓
Authenticated + Active Membership

Admin Routes
    ↓
Admin Role
```

Never rely on frontend-only authorization for security. Backend must enforce all permissions.

---

# 50. Loading States

Every data-heavy page needs loading states.

Examples:

```text
████████████
████████
████████████████
```

Use skeleton loaders rather than blank screens.

---

# 51. Empty States

Example:

```text
NO ACTIVE BIDS

You haven't placed any bids yet.

[Explore Auctions]
```

Admin:

```text
NO AUCTIONS FOUND

Create your first auction to get started.

[Create Auction]
```

---

# 52. Error States

Example:

```text
Something went wrong.

We couldn't load this auction.

[Try Again]
```

Avoid technical stack traces in the UI.

---

# 53. Toast Notifications

Examples:

```text
✓ Bid placed successfully

✓ Bike created successfully

✓ Auction updated

✓ Profile updated

✕ Bid could not be placed

✕ Payment failed
```

---

# 54. Accessibility

Requirements:

- WCAG-aware color contrast.
- Keyboard navigation.
- Visible focus states.
- Semantic HTML.
- Accessible labels.
- Accessible modals.
- Alt text for motorcycle images.
- Do not communicate important information using color alone.

---

# 55. Performance Requirements

Target:

```text
LCP: < 2.5s
INP: < 200ms
CLS: < 0.1
```

Priorities:

1. Fast first load.
2. Optimized motorcycle images.
3. Lazy loading.
4. Code splitting.
5. Minimal third-party scripts.
6. CDN-friendly assets.
7. Caching.
8. Avoid huge JavaScript bundles.

---

# 56. SEO

Public pages should be SEO-friendly.

Important pages:

```text
/
 /auctions
 /auctions/[id]
 /about
 /how-it-works
 /faq
```

Each auction page should have:

```text
Title
Description
Open Graph Image
Canonical URL
Structured metadata where appropriate
```

---

# 57. Responsive Breakpoints

Suggested:

```text
Mobile:
320–767px

Tablet:
768–1023px

Desktop:
1024–1439px

Large Desktop:
1440px+
```

---

# 58. Animation Guidelines

Use subtle motion.

Good:

- Card hover.
- Button feedback.
- Countdown transitions.
- Page transitions.
- Image zoom.
- Bid confirmation animation.
- Toast entrance.

Avoid:

- Constant spinning elements.
- Excessive parallax.
- Large distracting transitions.
- Animation during critical bidding interactions.

---

# 59. Security UX

The frontend should visually communicate security without making unsupported claims.

Include:

```text
Secure Account
Verified Auction
Official Documents
```

Where these statuses are actually supplied by the backend/admin.

Never show a "verified" badge merely because a field exists in the frontend.

---

# 60. Auction Rules UI

Every auction should provide an easily accessible rules section.

Example:

```text
AUCTION RULES

• Minimum bid increment: ₹5,000
• Bids are binding according to platform terms.
• Auction closes at the displayed end time.
• Registration is required to participate.
• Final sale and settlement are subject to platform terms.
```

Actual legal terms should be supplied and approved separately.

---

# 61. Recommended Frontend Architecture

If using Next.js:

```text
src/
├── app/
│   ├── page.tsx
│   ├── auctions/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   └── admin/
│
├── components/
│   ├── ui/
│   ├── auction/
│   ├── bike/
│   ├── dashboard/
│   └── admin/
│
├── services/
├── hooks/
├── lib/
├── types/
├── utils/
├── constants/
└── styles/
```

---

# 62. Recommended Tech Stack

## Frontend

```text
Next.js
React
TypeScript
Tailwind CSS
```

## UI

Recommended:

```text
shadcn/ui
Lucide Icons
Framer Motion
```

Use custom styling heavily so the product does not look like a default component-library website.

## Forms

```text
React Hook Form
Zod
```

## State

Start with:

```text
React state
Context where appropriate
TanStack Query for server state
```

Add a global state library only if the application actually needs it.

## Charts

```text
Recharts
```

for the admin dashboard.

---

# 63. Frontend Folder Structure

```text
src/
│
├── app/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── auction/
│   ├── bike/
│   ├── bidding/
│   ├── dashboard/
│   └── admin/
│
├── features/
│   ├── auth/
│   ├── auctions/
│   ├── bidding/
│   ├── users/
│   ├── payments/
│   └── notifications/
│
├── services/
│
├── hooks/
│
├── lib/
│
├── types/
│
├── utils/
│
└── styles/
```

---

# 64. MVP Page Checklist

## Public

- [ ] Home
- [ ] Auctions
- [ ] Auction Details
- [ ] How It Works
- [ ] About
- [ ] FAQ
- [ ] Login
- [ ] Registration

## User

- [ ] Dashboard
- [ ] My Bids
- [ ] My Wins
- [ ] Auction History
- [ ] Watchlist
- [ ] Notifications
- [ ] Profile
- [ ] Settings

## Admin

- [ ] Admin Login
- [ ] Dashboard
- [ ] Users
- [ ] Bikes
- [ ] Auctions
- [ ] Bids
- [ ] Payments
- [ ] Winners
- [ ] Settings

---

# 65. MVP Priority

## P0 — Required

```text
Authentication
Registration
Registration Fee UI
Auction Listing
Auction Details
Auction Status
Countdown
Bid UI
User Dashboard
Admin Dashboard
Bike CRUD
Auction CRUD
User Management
Bid History
Responsive Design
```

## P1 — Important

```text
Watchlist
Notifications
Advanced Filters
Search
Admin Analytics
Payment History
Auction History
```

## P2 — Future

```text
Push Notifications
PWA
Offline browsing
360° motorcycle viewer
Video inspection
AI motorcycle valuation
Personalized recommendations
Mobile application
```

---

# 66. Key UX Principle

DestinyAuction should always answer these five questions within seconds:

```text
1. WHAT BIKE IS THIS?
2. HOW MUCH IS IT CURRENTLY?
3. IS THE AUCTION LIVE?
4. HOW MUCH TIME IS LEFT?
5. CAN I BID RIGHT NOW?
```

If the user has to search through the interface to answer any of these, the design should be reconsidered.

---

# 67. Final Experience

The final product should feel like:

> **A premium digital auction house built specifically for motorcycle riders.**

The user should enter DestinyAuction and immediately feel:

```text
MOTORCYCLES
       +
COMPETITION
       +
TRUST
       +
SPEED
```

The design should be bold, dark, premium and mechanical, while the actual auction experience remains extremely clear and usable.

---

# 68. Definition of Done

The frontend MVP is considered complete when:

- All P0 screens exist.
- Responsive layouts work across mobile, tablet and desktop.
- Users can navigate the complete registration → auction → bidding journey using mocked/API-ready data.
- Auction states are visually distinct.
- Countdown works correctly.
- Bid states and validation states are implemented.
- Admin can perform CRUD operations through the UI.
- Loading, empty, success and error states exist.
- Components are reusable.
- API integration points are separated from UI components.
- Accessibility basics are implemented.
- Performance is optimized for mobile and slower connections.
- No critical user action depends solely on color or animation.
