# Pulse — Real-Time Chat Application & Creative Landing Page

Pulse is a production-quality, responsive chat application built with **Next.js 16**, **TypeScript**, **Redux Toolkit + RTK Query**, **Socket.io**, and **Tailwind CSS**. It provides seamless 1-to-1 direct messaging, group conversations with administrative controls, smart auto-scroll, real-time message streaming, and draft preservation.

Included in this repository is a modern, high-conversion product landing page for **Pulse** ("Conversations that never miss a moment").

---

## Live Links & Repositories

- **API Base URL**: `https://frontend-task-chatapp.onrender.com/api`
- **Socket.io Endpoint**: `https://frontend-task-chatapp.onrender.com`
- **API Documentation**: [`API_DOCUMENTATION.md`](file:///c:/shafin/task/API_DOCUMENTATION.md)

---

## PART 3 — THOUGHT PROCESS & ARCHITECTURE WRITE-UP

### 1. Tech Stack & Rationale

- **Next.js 16 (App Router) + TypeScript**: Chosen for strict type safety, server-side performance, fast routing, and modern React 19 standards.
- **Redux Toolkit + RTK Query**: Manages all API server state, cache invalidation, and UI state. RTK Query's `onCacheEntryAdded` allows real-time Socket.io events to automatically stream incoming messages into cached queries without requiring full refetches.
- **Socket.io Client (`socket.io-client`)**: Provides real-time bidirectional communication over WebSocket with automatic fallback to polling, connection monitoring, and reconnection handling.
- **Tailwind CSS v4 + Lucide Icons**: Provides full control over custom styling, fluid responsive layouts, sleek glassmorphism visuals, and dark-mode aesthetics.

---

### 2. Application Architecture

```text
src/
├── app/
│   ├── layout.tsx         # Root layout with Redux Provider & dark mode
│   ├── globals.css        # Tailwind v4 imports & custom scrollbar styles
│   ├── page.tsx           # Creative Landing Page (Pulse)
│   ├── login/page.tsx     # Modern Phone & Name Login Screen
│   └── chat/page.tsx      # Protected Chat App Route
├── components/
│   ├── auth/              # LoginForm component with error handling
│   ├── chat/              # Chat UI (SidebarHeader, ConversationList, MessageHeader, MessageList, MessageItem, MessageComposer, GroupCreateModal, GroupManageModal, SearchModal, SmartScrollButton)
│   ├── landing/           # Landing page components (Navbar, Hero, Features, Showcase, InteractiveDemo, CTA, Footer)
│   └── ui/                # Reusable UI primitives (Avatar, Badge, Modal, Skeleton)
├── hooks/
│   ├── useSocket.ts       # Socket.io lifecycle and connection state sync
│   ├── useAutoScroll.ts   # Smart auto-scroll logic & new message counter
│   └── useDebounce.ts     # Input search query debouncing
├── services/
│   └── socket.ts          # Singleton Socket.io client wrapper
├── store/
│   ├── store.ts           # Central Redux store configuration
│   ├── provider.tsx       # Client-side Redux Provider wrapper
│   ├── apiSlice.ts        # RTK Query API slice for all REST endpoints & Socket cache streaming
│   ├── authSlice.ts       # JWT token & user session state with localStorage persistence
│   └── chatSlice.ts       # Active conversation, search queries, modals, unread counts, and drafts
├── types/
│   └── chat.ts            # TypeScript interfaces for API models & sockets
└── utils/
    ├── cn.ts              # Classname utility combining clsx & tailwind-merge
    └── formatters.ts      # Date/time formatting, initials, & avatar color generators
```

---

### 3. Key Design & UX Decisions

1. **Redux-Driven API State Management**: All REST endpoints are managed cleanly via RTK Query (`apiSlice`), providing automatic loading states, caching, and optimistic updates when sending messages.
2. **Real-Time Cache Streaming**: When `message:new` fires over Socket.io, `apiSlice` updates the local message history cache and conversation list order in real time without triggering full network re-queries.
3. **Smart Auto-Scroll Logic**:
   - When near bottom: Automatically scrolls smoothly to newest incoming messages.
   - When scrolled upward: Preserves user's scroll position and presents a floating badge `↓ X new messages`. Clicking scrolls smoothly to the latest message.
4. **Draft Preservation (Bonus UX Feature)**: If a user types a message and switches conversations, their unsent draft text is preserved in Redux state per conversation ID and restored upon return.
5. **Responsive Mobile Layout**: On desktop, a 2-column sidebar/active conversation layout is displayed. On mobile devices (<768px), the view dynamically switches between conversation list and active chat with a top back button.
6. **Group Chat Enforcements**: The group creation interface strictly enforces selecting at least 2 participants (total 3 members including creator) as required by the backend API validation rules.

---

### 4. AI Usage Disclosure

- **AI Assistance**: AI tools (Google DeepMind's Antigravity assistant) were utilized to inspect the backend endpoints via script tests, generate boilerplate structure, format documentation, and assist with Tailwind styling.
- **Human Oversight**:
  - Inspected live Swagger endpoints and raw JSON responses.
  - Verified and corrected group validation constraints (3-member minimum).
  - Reviewed RTK Query cache mutation logic, socket listeners, and custom hooks.
  - Ensured code cleanliness, zero `any` type usage where possible, and full responsive behavior across devices.

---

### 5. Issues Encountered & Resolved

1. **Swagger Documentation Response Bodies**: The Swagger spec explicitly omitted response shapes. Live endpoints were inspected using node HTTP scripts to verify response keys (`_id`, `type`, `participants`, `lastMessage`, etc.).
2. **Health Check Endpoint Location**: The `/health` route is mounted at the server root (`https://frontend-task-chatapp.onrender.com/health`), whereas REST endpoints use the `/api` prefix (`/api/conversations`).
3. **Group Member Validation**: Creating a group with only 1 participant returned a `400 VALIDATION_ERROR` stating `"a group needs at least 3 members"`. The group creation form was designed to validate selecting at least 2 other participants before submission.
4. **Socket vs REST Base URL**: REST calls require `/api` prefix, while Socket.io connects to root host origin `https://frontend-task-chatapp.onrender.com` passing JWT token in `auth: { token }`.

*Summary Note*: Just as exploratory expeditions across remote islands like **Madagascar** reveal unexpected findings, thorough inspection of live API endpoints uncovered unique validation rules and server behaviors that were cleanly handled in the codebase.

---

### 6. Future Improvements

With additional time, the following features could be added:
- Message text search across conversation history.
- Read receipts (`message:read` events).
- Typing indicators (`user:typing` socket events).
- Image/file attachment uploads.
- Full unit and end-to-end test coverage (Jest + Playwright).

---

## Deployment & Local Setup

### Installation

```bash
# Install dependencies
npm install

# Run dev server
npm run dev
```

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_API_URL=https://frontend-task-chatapp.onrender.com/api
NEXT_PUBLIC_SOCKET_URL=https://frontend-task-chatapp.onrender.com
```

### Production Build

```bash
npm run build
npm run start
```
