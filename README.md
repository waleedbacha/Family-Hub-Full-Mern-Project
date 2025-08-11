FamilyHub
A Centralized MERN-based Platform for Families to Connect, Support, and Grow Together

Overview
FamilyHub is a full-stack MERN (MongoDB, Express, React, Node.js) application styled with Bootstrap 5, designed specifically for families to stay connected, support one another, and preserve their legacy.

The platform serves as a private and secure digital hub where family members can share their history, contribute to causes, apply for scholarships, trade in a private marketplace, and celebrate success stories — all managed through an intuitive Admin Dashboard.

The main aim of this project is to foster unity, mutual assistance, and love within a family while safeguarding its history and achievements for future generations.

Key Features
1. Family History Module
Preserves and showcases detailed information about family members.

Displays family lineage in a well-structured format.

Accessible to all visitors (no login required).

2. Donations Module
Members can donate for family events or support individuals in need.

Donations are secure and visible to the admin for transparency.

Only registered users can make donations.

3. Scholarship Portal
Members can apply for funds to support education, business, or personal needs.

Applications are reviewed and managed by the admin.

Ensures family resources are used meaningfully to uplift members.

4. Family Marketplace
Exclusive marketplace where members can list and purchase goods from other family members.

Encourages economic support within the family.

Products are added and approved by the admin before going live.

5. Success Stories Module
A dedicated space to share and celebrate family achievements.

Stories may include scholarships awarded, business successes, or life milestones.

Accessible without login, inspiring pride in the family’s collective accomplishments.

Authentication & Access Control
Registration & Login are required for certain features:

Making donations.

Applying for scholarships.

Participating in the marketplace.

Guest Access allows viewing:

Family History.

Success Stories.

Marketplace listings (without purchasing).

Admin Dashboard
Full control over platform content and member activities.

Manage:

Registered users.

Products in the marketplace.

Donations and scholarship applications.

Family history entries.

Success stories.

Add or update products, family history, and stories directly from the dashboard.

Technology Stack
Frontend
React.js – Component-based UI development.

Bootstrap 5 – Responsive and modern styling.

Backend
Node.js & Express.js – RESTful API development.

MongoDB – NoSQL database for storing family data.

Additional Tools & Libraries
JWT – Authentication and authorization.

Multer – File upload handling.

Redux – State management for consistent UI/UX.

Installation & Setup
Prerequisites
Node.js & npm installed.

MongoDB running locally or on a cloud service (e.g., MongoDB Atlas).

Steps
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/familyhub.git
cd familyhub
Install dependencies

For the backend:

bash
Copy
Edit
cd backend
npm install
For the frontend:

bash
Copy
Edit
cd frontend
npm install
Set up environment variables
Create a .env file in both frontend and backend directories with required variables:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the project

Start backend:

bash
Copy
Edit
cd backend
npm run dev
Start frontend:

bash
Copy
Edit
cd frontend
npm start
Vision & Mission
FamilyHub is not just a platform — it’s a digital family home. Its mission is to:

Preserve and share the rich history of families.

Encourage unity, love, and mutual aid.

Provide an exclusive space for economic and educational support.
