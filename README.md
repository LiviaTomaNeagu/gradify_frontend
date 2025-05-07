# gradify_frontend

# Gradify – Academic Support Platform for Final Thesis

**Gradify** is a full-stack web application developed to assist students from the Faculty of Mathematics and Informatics in organizing, collaborating, and progressing through their Bachelor's thesis work. It connects students with mentors, provides real-time communication, and includes a Stack Overflow-style forum for technical help.

## Key Features

### Personal Dashboard
- Manage thesis-related resources and documents.
- Track your academic progress with visual tools (Kanban, Timeline).
- Receive notifications and reminders.

### Real-Time Messaging
- Integrated chat with mentors or peers via SignalR and WebSocket.
- Conversation history persisted in the database.
- Responsive interface using Angular Material.

### Stack Overflow-Style Forum
- Post and answer technical questions, filterable by tags and technology.
- Integrated Question Wizard to guide students in formulating questions clearly.
- Real-time updates for posts, answers, and comments.

### File and Document Handling
- Store documents and profile images using AWS S3.
- Secure and scalable storage with public access for media when needed.

### Multi-Day Calendar Integration
- Manage events with Angular Calendar.
- Support for all-day and multi-day events.
- Interactive modal for event creation and editing.

### Admin Tools
- Manage student groups with cascade deletion.
- Validate group input and enforce relational integrity in the backend.
- Admin dashboards for Students, Professors, and Companies.

## Tech Stack

### Backend
- Language: C# (.NET Core)
- API: RESTful services with WebSocket integration
- Database: PostgreSQL hosted on AWS RDS
- Real-time Messaging: SignalR
- Email Notifications: SendGrid

### Frontend
- Framework: Angular 18
- UI Theme: Paper Dashboard (Creative Tim)
- State Management: Angular Services
- UI Libraries: Angular Material
- WebSocket: SignalR with JWT-based auth
- Deployment Ready: Optimized for production builds
