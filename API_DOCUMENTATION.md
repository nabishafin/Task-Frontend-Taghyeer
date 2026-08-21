# API Documentation: Chat Application API

This document details the REST endpoints and Socket.io real-time events for the Chat Application backend hosted at `https://frontend-task-chatapp.onrender.com`.

- **REST Base URL**: `https://frontend-task-chatapp.onrender.com/api`
- **Socket.io Base URL**: `https://frontend-task-chatapp.onrender.com`

---

## Standard Error Response Format

All REST endpoints return standardized JSON errors when requests fail or validation errors occur.

```json
{
  "error": {
    "message": "Validation failed",
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "path": "participantIds",
        "message": "a group needs at least 3 members"
      }
    ]
  }
}
```

---

## 1. Authentication & User Session

### 1.1 Login or Register
- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Purpose**: Authenticate an existing user or register a new user using their phone number and name.
- **Authentication**: None (Public)
- **Request Body**:
  ```json
  {
    "phone": "+15551111111",
    "name": "Ada Lovelace"
  }
  ```
- **Response Body** (`200 OK`):
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5...",
    "user": {
      "_id": "6a8827fde5d6aac97521e494",
      "name": "Ada Lovelace",
      "phone": "+15551111111",
      "createdAt": "2026-08-21T10:27:09.013Z"
    }
  }
  ```
- **Error Responses**: `400 Bad Request` (Missing required fields or invalid format).

### 1.2 Get Current User
- **Endpoint**: `/api/auth/me`
- **Method**: `GET`
- **Purpose**: Restore user session using the stored JWT token.
- **Authentication**: `Authorization: Bearer <token>`
- **Response Body** (`200 OK`):
  ```json
  {
    "_id": "6a8827fde5d6aac97521e494",
    "name": "Ada Lovelace",
    "phone": "+15551111111",
    "createdAt": "2026-08-21T10:27:09.013Z"
  }
  ```
- **Error Responses**: `401 Unauthorized` (Token invalid or expired).

---

## 2. User Search

### 2.1 Search Users
- **Endpoint**: `/api/users/search`
- **Method**: `GET`
- **Purpose**: Search registered users by name or phone number.
- **Authentication**: `Authorization: Bearer <token>`
- **Parameters**: `q` (query string, required) — e.g. `/api/users/search?q=Alan`
- **Response Body** (`200 OK`):
  ```json
  [
    {
      "_id": "6a8827fde5d6aac97521e499",
      "name": "Alan Turing",
      "phone": "+15552222222"
    }
  ]
  ```
- **Error Responses**: `400 Bad Request` (Missing query param), `401 Unauthorized`.

---

## 3. Conversations

### 3.1 List My Conversations
- **Endpoint**: `/api/conversations`
- **Method**: `GET`
- **Purpose**: Retrieve all direct and group conversations for the authenticated user.
- **Authentication**: `Authorization: Bearer <token>`
- **Response Body** (`200 OK`):
  ```json
  {
    "data": [
      {
        "_id": "6a882819e5d6aac97521e4cb",
        "type": "direct",
        "lastMessage": {
          "_id": "6a88281be5d6aac97521e4d6",
          "sender": "6a8827fde5d6aac97521e494",
          "text": "Hello Alan from Ada!",
          "createdAt": "2026-08-21T10:27:39.439Z"
        },
        "updatedAt": "2026-08-21T10:27:37.514Z",
        "participant": {
          "_id": "6a8827fde5d6aac97521e499",
          "name": "Alan Turing",
          "phone": "+15552222222"
        }
      },
      {
        "_id": "6a882831e5d6aac97521e50a",
        "type": "group",
        "name": "Pioneers Team",
        "createdBy": "6a8827fde5d6aac97521e494",
        "admins": ["6a8827fde5d6aac97521e494"],
        "participants": [
          { "_id": "6a8827fde5d6aac97521e494", "name": "Ada Lovelace", "phone": "+15551111111" },
          { "_id": "6a8827fde5d6aac97521e499", "name": "Alan Turing", "phone": "+15552222222" },
          { "_id": "6a882830e5d6aac97521e503", "name": "Grace Hopper", "phone": "+15553333333" }
        ],
        "lastMessage": {},
        "updatedAt": "2026-08-21T10:28:01.771Z"
      }
    ]
  }
  ```

### 3.2 Start Direct Conversation
- **Endpoint**: `/api/conversations`
- **Method**: `POST`
- **Purpose**: Open or start a 1-to-1 conversation with another user.
- **Authentication**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "userId": "6a8827fde5d6aac97521e499"
  }
  ```
- **Response Body** (`200 OK`):
  ```json
  {
    "_id": "6a882819e5d6aac97521e4cb",
    "type": "direct",
    "participants": ["6a8827fde5d6aac97521e494", "6a8827fde5d6aac97521e499"],
    "createdAt": "2026-08-21T10:27:37.514Z"
  }
  ```

---

## 4. Group Conversations

### 4.1 Create Group Conversation
- **Endpoint**: `/api/conversations/group`
- **Method**: `POST`
- **Purpose**: Create a group conversation. Total group size (creator + participants) must be at least 3 members (so at least 2 target user IDs in `participantIds`).
- **Authentication**: `Authorization: Bearer <token>`
- **Request Body**:
  ```json
  {
    "name": "Pioneers Team",
    "participantIds": ["6a8827fde5d6aac97521e499", "6a882830e5d6aac97521e503"]
  }
  ```
- **Response Body** (`201 Created`):
  ```json
  {
    "_id": "6a882831e5d6aac97521e50a",
    "type": "group",
    "name": "Pioneers Team",
    "createdBy": "6a8827fde5d6aac97521e494",
    "admins": ["6a8827fde5d6aac97521e494"],
    "participants": [
      { "_id": "6a8827fde5d6aac97521e494", "name": "Ada Lovelace", "phone": "+15551111111" },
      { "_id": "6a8827fde5d6aac97521e499", "name": "Alan Turing", "phone": "+15552222222" },
      { "_id": "6a882830e5d6aac97521e503", "name": "Grace Hopper", "phone": "+15553333333" }
    ],
    "createdAt": "2026-08-21T10:28:01.771Z",
    "updatedAt": "2026-08-21T10:28:01.771Z"
  }
  ```

### 4.2 Rename Group
- **Endpoint**: `/api/conversations/{id}`
- **Method**: `PATCH`
- **Purpose**: Change group name (Admins only).
- **Request Body**: `{ "name": "Updated Pioneers" }`
- **Response Body** (`200 OK`): Updated group object.

### 4.3 Add Group Members
- **Endpoint**: `/api/conversations/{id}/participants`
- **Method**: `POST`
- **Purpose**: Add members to group (Admins only).
- **Request Body**: `{ "userIds": ["6a882833e5d6aac97521e516"] }`
- **Response Body** (`200 OK`): Updated group object.

### 4.4 Remove Member / Leave Group
- **Endpoint**: `/api/conversations/{id}/participants/{userId}`
- **Method**: `DELETE`
- **Purpose**: Remove member (Admin only) or pass own userId to leave group.
- **Response Body** (`200 OK`): Updated group object.

### 4.5 Promote Member to Admin
- **Endpoint**: `/api/conversations/{id}/admins`
- **Method**: `POST`
- **Purpose**: Promote an existing member to admin (Admins only).
- **Request Body**: `{ "userId": "6a8827fde5d6aac97521e499" }`
- **Response Body** (`200 OK`): Updated group object.

---

## 5. Messages

### 5.1 Get Conversation Messages
- **Endpoint**: `/api/conversations/{id}/messages`
- **Method**: `GET`
- **Purpose**: Load paginated message history.
- **Parameters**: `limit` (optional integer, default 20), `before` (optional cursor string messageId).
- **Response Body** (`200 OK`):
  ```json
  {
    "messages": [
      {
        "_id": "6a88281be5d6aac97521e4d6",
        "conversation": "6a882819e5d6aac97521e4cb",
        "sender": {
          "_id": "6a8827fde5d6aac97521e494",
          "name": "Ada Lovelace",
          "phone": "+15551111111"
        },
        "text": "Hello Alan from Ada!",
        "createdAt": "2026-08-21T10:27:39.439Z"
      }
    ],
    "hasMore": false
  }
  ```

### 5.2 Send Message
- **Endpoint**: `/api/messages`
- **Method**: `POST`
- **Purpose**: Send a text message to a direct or group conversation.
- **Request Body**:
  ```json
  {
    "conversationId": "6a882819e5d6aac97521e4cb",
    "text": "Hello Alan from Ada!"
  }
  ```
- **Response Body** (`200 OK`):
  ```json
  {
    "_id": "6a88281be5d6aac97521e4d6",
    "conversation": "6a882819e5d6aac97521e4cb",
    "sender": "6a8827fde5d6aac97521e494",
    "text": "Hello Alan from Ada!",
    "createdAt": "2026-08-21T10:27:39.439Z"
  }
  ```

---

## 6. Real-Time Communication (Socket.io)

- **Connection Endpoint**: `https://frontend-task-chatapp.onrender.com`
- **Handshake Authentication**: Pass token in socket handshake auth object:
  ```js
  const socket = io('https://frontend-task-chatapp.onrender.com', {
    auth: { token: JWT_TOKEN }
  });
  ```

### Events:
1. **Client -> Server (`message:send`)**:
   - Payload: `{ conversationId: string, text: string }`
2. **Server -> Client (`message:new`)**:
   - Triggered when a new message arrives in any conversation the user belongs to.
   - Payload: Message Object (`{ _id, conversation, sender, text, createdAt }`)
3. **Server -> Client (`conversation:updated`)**:
   - Triggered when group metadata or members change.
   - Payload: Conversation Object
