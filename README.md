# 💐 Wedding Website & RSVP System

A beautiful, secure wedding website built with Next.js featuring password protection, guest management, and an elegant RSVP system.

## ✨ Features

### 🔐 **Secure Authentication**

- JWT-based password protection for main site and admin dashboard
- Server-side authentication checks to prevent flicker
- HTTP-only cookies for enhanced security
- Cannot be bypassed by cookie manipulation

### 👥 **Guest Management**

- Unique RSVP links for each guest/family
- Support for multiple guests per invitation
- Meal preference selection (Beef, Fish, Vegetarian, Kids)
- Special dietary requirements and requests
- Real-time RSVP updates (guests can modify their responses)

### 📊 **Admin Dashboard**

- Comprehensive RSVP tracking and statistics
- Guest attendance overview
- Meal count summaries for catering
- Submission timestamps
- Responsive design for mobile management

### 🎨 **Beautiful Design**

- Elegant stone and rose color palette
- Animated confetti effects
- Responsive design for all devices
- Floral accent decorations
- Professional typography

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd wedding
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Password for accessing the wedding site
   WEDDING_PASSWORD=your_secure_password_here

   # JWT Secret for signing tokens (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
   JWT_SECRET=your_very_long_random_jwt_secret_key_here
   ```

4. **Configure wedding details and guest list**

   Add your wedding information and guests to the `.env.local` file:

   ```env
   # Wedding Details
   GROOM_NAME=Your Name
   BRIDE_NAME=Partner Name
   BRIDE_PARENTS=Bride's Parents Names
   GROOM_PARENTS=Groom's Parents Names
   DATE=Your Wedding Date
   TIME=Reception Time
   CEREMONY_TIME=Ceremony Time
   VENUE_NAME=Your Venue Name
   VENUE_ADDRESS=Venue Address
   VENUE_CITY=City, State

   # Guest List (JSON format)
   GUESTS=[
     {
       "id": "john-smith-abc123",
       "name": "John Smith",
       "phoneNumber": "1234567890",
       "uniqueUrl": "john-smith-abc123",
       "maxGuests": 2
     },
     {
       "id": "sarah-johnson-def456",
       "name": "Sarah Johnson",
       "phoneNumber": "0987654321",
       "uniqueUrl": "sarah-johnson-def456",
       "maxGuests": 1
     }
   ]
   ```

5. **Run the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000)

## 📱 Pages & Functionality

### **Main Page (`/`)**

- Password-protected wedding information
- Beautiful photo display
- Wedding details (date, time, venue)
- Guest list overview (for development)

### **RSVP Pages (`/rsvp/[guestUrl]`)**

- Unique URLs for each guest invitation
- Guest attendance confirmation
- Meal preference selection
- Special requests form
- Elegant thank you confirmation

### **Admin Dashboard (`/admin`)**

- Password-protected management interface
- Real-time RSVP statistics
- Detailed guest responses
- Meal count summaries
- Export-ready data views

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: JWT tokens with HTTP-only cookies
- **Deployment**: Vercel-ready

## 🔒 Security Features

- **JWT Authentication**: Cryptographically signed tokens prevent forgery
- **Server-Side Validation**: All auth checks happen server-side
- **HTTP-Only Cookies**: Tokens cannot be accessed by client-side JavaScript
- **Automatic Expiration**: 24-hour token lifetime
- **Production Security**: Secure cookies in production environment

## 📂 Project Structure

```
src/
├── app/
│   ├── admin/              # Admin dashboard
│   ├── api/                # API routes (auth, RSVP, logout)
│   ├── rsvp/[guestUrl]/    # Individual guest RSVP pages
│   └── page.tsx            # Main wedding page
├── components/
│   ├── ElegantConfetti.tsx # Animated confetti effects
│   ├── PasswordProtection.tsx # Auth wrapper component
│   └── RSVPForm.tsx        # RSVP form component
├── types/
│   └── index.ts            # TypeScript type definitions
└── utils/
    ├── auth.ts             # Authentication utilities
    └── guests.ts           # Guest data and wedding details
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Set environment variables** in Vercel dashboard:
   - `WEDDING_PASSWORD`
   - `JWT_SECRET`
4. **Deploy**

### Other Platforms

Works with any Node.js hosting platform. Make sure to:

- Set environment variables
- Use `NODE_ENV=production`
- Configure secure cookie settings

## 🎯 Customization

### **Wedding Details**

Update your `.env.local` file to customize:

- Couple names (`GROOM_NAME`, `BRIDE_NAME`)
- Parent names (`BRIDE_PARENTS`, `GROOM_PARENTS`)
- Wedding date and times (`DATE`, `TIME`, `CEREMONY_TIME`)
- Venue information (`VENUE_NAME`, `VENUE_ADDRESS`, `VENUE_CITY`)
- Guest list (`GUESTS` JSON array)

### **Styling**

The design uses Tailwind CSS with a stone/rose color palette:

- `stone-*` for neutral tones
- `rose-*` for accent colors
- Easily customizable in component files

### **Features**

- Add new meal options in `RSVPForm.tsx`
- Modify admin dashboard in `AdminClient.tsx`
- Customize email notifications (future enhancement)

## 📝 License

This project is private and intended for personal wedding use.

---

Built with ❤️ for your special day
