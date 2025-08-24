# 🚀 Backend API Endpoints for Chat System

## 📋 Complete API Endpoints Required

Your FastAPI backend needs these endpoints to work with the cleaned-up frontend:

### **Authentication Endpoints** ✅ (Already implemented)
```python
POST /token                    # Login with username/password
GET  /me                       # Get current user info
POST /register                 # Register new user
```

### **Chat & Messaging Endpoints** 🔄 (Need to implement)

#### **Conversations**
```python
GET    /conversations                    # Get all conversations for current user
GET    /conversations/{id}/messages      # Get messages for specific conversation
PUT    /conversations/{id}/read          # Mark conversation as read
GET    /conversations/search?q={query}   # Search conversations
```

#### **Messages**
```python
POST   /messages                         # Send new message
DELETE /messages/{id}                    # Delete message
POST   /messages/{id}/forward            # Forward message to other users
```

#### **File Upload**
```python
POST   /upload                           # Upload files (images, documents, etc.)
```

#### **User Management**
```python
GET    /users/{id}                       # Get user profile
GET    /users/online                     # Get online users
PUT    /users/{id}/block                 # Block/unblock user
POST   /users/{id}/report                # Report user
```

## 🔧 Request/Response Examples

### **1. Get Conversations**
```python
# GET /conversations
Response:
{
  "conversations": [
    {
      "id": "conv_123",
      "participant_ids": ["user_1", "user_2"],
      "last_message": {
        "id": "msg_456",
        "content": "Hello there!",
        "sender_id": "user_1",
        "timestamp": "2024-01-15T10:30:00Z",
        "is_read": false
      },
      "unread_count": 3,
      "updated_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### **2. Get Messages**
```python
# GET /conversations/{id}/messages?page=1&limit=50
Response:
{
  "messages": [
    {
      "id": "msg_123",
      "content": "Hello!",
      "sender_id": "user_1",
      "receiver_id": "user_2",
      "message_type": "text",
      "timestamp": "2024-01-15T10:30:00Z",
      "is_read": true,
      "reply_to": null
    },
    {
      "id": "msg_124",
      "content": "document.pdf",
      "sender_id": "user_2",
      "receiver_id": "user_1",
      "message_type": "file",
      "timestamp": "2024-01-15T10:31:00Z",
      "is_read": false,
      "file_url": "https://example.com/files/document.pdf",
      "file_name": "document.pdf",
      "file_size": 1024000
    }
  ]
}
```

### **3. Send Message**
```python
# POST /messages
Request (FormData):
{
  "receiver_id": "user_2",
  "content": "Hello there!",
  "message_type": "text",
  "reply_to": "msg_123",  # optional
  "file": <file>          # optional
}

Response:
{
  "id": "msg_125",
  "content": "Hello there!",
  "sender_id": "user_1",
  "receiver_id": "user_2",
  "message_type": "text",
  "timestamp": "2024-01-15T10:32:00Z",
  "is_read": false
}
```

### **4. Upload File**
```python
# POST /upload
Request (FormData):
{
  "file": <file>
}

Response:
{
  "url": "https://example.com/files/uploaded_file.pdf",
  "filename": "uploaded_file.pdf"
}
```

### **5. Get User Profile**
```python
# GET /users/{id}
Response:
{
  "id": "user_123",
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "avatar_url": "https://example.com/avatars/john.jpg",
  "is_online": true,
  "last_seen": "2024-01-15T10:30:00Z"
}
```

## 🗄️ Database Schema Suggestions

### **Users Table**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    avatar_url TEXT,
    is_online BOOLEAN DEFAULT FALSE,
    last_seen TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### **Conversations Table**
```sql
CREATE TABLE conversations (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### **Conversation Participants Table**
```sql
CREATE TABLE conversation_participants (
    conversation_id UUID REFERENCES conversations(id),
    user_id UUID REFERENCES users(id),
    PRIMARY KEY (conversation_id, user_id)
);
```

### **Messages Table**
```sql
CREATE TABLE messages (
    id UUID PRIMARY KEY,
    conversation_id UUID REFERENCES conversations(id),
    sender_id UUID REFERENCES users(id),
    content TEXT NOT NULL,
    message_type VARCHAR(20) DEFAULT 'text',
    reply_to UUID REFERENCES messages(id),
    file_url TEXT,
    file_name VARCHAR(255),
    file_size BIGINT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication & Authorization

### **JWT Token Structure**
```python
# Token payload should include:
{
  "sub": "user_id",
  "username": "john_doe",
  "exp": 1642234567
}
```

### **Protected Routes**
All chat endpoints should require authentication:
```python
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer

security = HTTPBearer()

async def get_current_user(token: str = Depends(security)):
    # Verify JWT token and return user
    pass
```

## 📡 Real-time Features (Optional)

For real-time messaging, consider adding WebSocket support:

```python
# WebSocket endpoint
@app.websocket("/ws/{user_id}")
async def websocket_endpoint(websocket: WebSocket, user_id: str):
    await websocket.accept()
    # Handle real-time message delivery
```

## 🚀 Implementation Priority

### **Phase 1 (Essential)**
1. `GET /conversations` - List conversations
2. `GET /conversations/{id}/messages` - Get messages
3. `POST /messages` - Send message
4. `PUT /conversations/{id}/read` - Mark as read

### **Phase 2 (Important)**
1. `POST /upload` - File upload
2. `DELETE /messages/{id}` - Delete message
3. `GET /users/{id}` - User profiles

### **Phase 3 (Advanced)**
1. `POST /messages/{id}/forward` - Forward messages
2. `GET /conversations/search` - Search conversations
3. `PUT /users/{id}/block` - Block users
4. WebSocket support for real-time messaging

## 🧪 Testing Endpoints

Use these test data examples:

```python
# Test user
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpass123"
}

# Test message
{
  "receiver_id": "user_2",
  "content": "Hello from API!",
  "message_type": "text"
}
```

## 📝 Environment Variables

Add these to your backend `.env`:
```env
DATABASE_URL=postgresql://user:pass@localhost/chatdb
JWT_SECRET_KEY=your-secret-key
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10485760  # 10MB
```

This provides a complete roadmap for implementing the chat backend that will work seamlessly with your cleaned-up frontend! 🎉
