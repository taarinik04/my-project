 QuickDesk – Smart Ticket Management System

A full-stack, multi-role helpdesk ticketing platform built for organizations to manage user issues efficiently. Includes User, Agent, and Admin portals, category management, ticket lifecycle tracking, and secure authentication.

Designed for speed, clarity, and easy workflow management.

 Key Features
 Authentication & Security

Email-based login for Users, Agents, and Admin

JWT-based session authentication

Protected API endpoints for authorized roles

Cookie-based token handling for user sessions

Input validation and error handling

 Ticket Management

Create new tickets with:

Title

Description

Category

File Attachments (Multer)

View personal ticket history

Automatic timestamps (createdAt, updatedAt)

Ticket filters:

Search by title/description

Category filter

Status filter (Open/Closed)

Sort by recent / most replied

 Category Management (Admin Only)

Add new categories

Delete categories

View existing categories

Fully dynamic dropdown on user dashboard

 Agent Dashboard

View all user tickets

Add comments on tickets

Update ticket status (Open → Closed)

View ticket history with user details

Organized interface with sorting & filtering

Admin Dashboard

Full visibility of all tickets

Add/Delete ticket categories

Manage system-level configurations

Admin login with role-based access

 Technology Stack
 Frontend

React 18 (Vite)

React Router DOM

Axios (API calls)

Tailwind CSS (UI styling)

React Toastify (notifications)

 Backend
├── Node.js 18+
├── Express.js
├── MongoDB + Mongoose
├── JWT Authentication
├── Multer (file uploads)
├── CORS + Cookie Parser
└── RESTful API structure

 Database

MongoDB (Local/Atlas)

Mongoose ODM

Schemas:

User

Agent

Admin

Ticket

Category

 Installation & Setup
 Backend Setup
cd backend
npm install

Create .env file
PORT=3000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_secret_key

Start backend server
npm start


Backend will run on
 http://localhost:3000

 Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on
 http://localhost:5173

 Environment Variables
Backend (.env)
Variable	Description	Required
PORT	Server Port	Yes
MONGO_URI	MongoDB Connection String	Yes
JWT_SECRET	Secret Key for JWT Signing	Yes
📡 API Overview
Authentication Routes
Method	Endpoint	Description
POST	/register	Register user
POST	/login	User login
POST	/agentlogin	Agent login
POST	/adminlogin	Admin login
User Ticket Routes
Method	Endpoint	Description
POST	/addticket	Create new ticket
GET	/viewtickets	View user tickets
Agent Routes
Method	Endpoint	Description
GET	/agentdashboard	View all tickets
PUT	/ticket/:id/status	Update ticket status
POST	/ticket/:id/comment	Add comment on ticket
Admin Routes
Method	Endpoint	Description
GET	/admindashboard	View all tickets
POST	/add-category	Add new category
DELETE	/delete-category/:id	Delete category
🗄 Database Schema (Simplified)
User Model
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}

Ticket Model
{
  user: ObjectId,
  title: String,
  description: String,
  category: String,
  status: String, // "Open", "Closed"
  comments: [String],
  attachment: Buffer,
  createdAt: Date,
  updatedAt: Date
}

Category Model
{
  name: String
}

Agent/Admin Models
{
  name: String,
  email: String,
  password: String
}

 User Journey

User logs into QuickDesk

Views dashboard → Creates tickets

Agent logs in → Reviews tickets → Adds comments → Updates status

Admin logs in → Manages categories → Monitors all system tickets

User sees live updates on their dashboards

 Future Enhancements

Real-time ticket updates via WebSocket

Email notifications for ticket replies

User profile module

Analytics dashboard for admin

Multi-file attachments

Role-based UI customization

Dark/light theme toggle

 Contributing

Contributions are welcome!

git clone https://github.com/yourusername/quickdesk.git
git checkout -b feature/new-feature
git commit -m "feat: add new feature"
git push origin feature/new-feature


Submit a PR with proper documentation.

 License

MIT License

 Author

QuickDesk Development Team
Taarini Kumar and Vasu Gomay
