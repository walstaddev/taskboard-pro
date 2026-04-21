# TaskBoard Pro

TaskBoard Pro is a modern full stack task and project management application built to simulate a small SaaS-style productivity tool for internal teams, freelancers, or solo professionals.

The application allows authenticated users to create projects, manage tasks, update status and priority, track deadlines, and view a real dashboard with key metrics and recent activity.

This project was developed as a portfolio piece focused on demonstrating practical employability in a modern React / Next.js stack, including authentication, database design, CRUD operations, server actions, and user account management.

---

## Features

### Authentication & Account
- User registration
- Login with credentials
- Protected private routes
- Logout
- Edit profile information
- Change password
- Delete account with confirmation

### Dashboard
- Total projects
- Total tasks
- Tasks by status
- Overdue tasks
- Recent tasks
- Recent projects
- Quick access to key sections

### Projects
- Create project
- View project list
- View project detail
- Edit project
- Delete project with confirmation

### Tasks
- Create tasks inside a project
- View tasks by project
- Edit task
- Delete task with confirmation
- Quick update of task status and priority
- Deadline support

### UX / Interface
- Private app shell with navigation
- Active sidebar state
- Empty states
- Confirmation dialogs for destructive actions
- Responsive layout improvements
- Consistent dark UI

---

## Tech Stack

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend / Data
- PostgreSQL
- Prisma ORM

### Authentication / Validation
- Auth.js / NextAuth
- Zod
- bcryptjs

---

## Project Goals

The goal of TaskBoard Pro was not just to build a CRUD demo, but to create a more complete and realistic internal productivity application with:

- modern React / Next.js architecture
- authentication and protected routes
- relational database modeling
- full CRUD for core business entities
- practical user account flows
- dashboard with real metrics
- cleaner product-style UX

This project complements other portfolio work by demonstrating a modern frontend-oriented full stack workflow beyond WordPress or traditional Laravel Blade applications.

---

## Core Entities

### User
Represents an authenticated account in the system.

### Project
Represents a workspace/project owned by a user.

### Task
Represents a task belonging to a specific project, including:
- title
- description
- status
- priority
- due date

---

## Main Functional Flows

### User flow
1. Register a new account
2. Log in
3. Access the private dashboard
4. Create projects
5. Create tasks inside projects
6. Update task progress and priority
7. Edit account information
8. Change password or delete account

### Project flow
1. Create project
2. View project list
3. Access project detail
4. Edit project
5. Delete project

### Task flow
1. Create task from project detail
2. View tasks in the same project
3. Edit task
4. Delete task
5. Quickly update status and priority

---

## Screenshots

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Projects
![Projects](./screenshots/projects.png)

### Project Detail
![Project Detail](./screenshots/project-detail.png)

### Edit Task
![Edit Task](./screenshots/edit-task.png)

### Profile
![Profile](./screenshots/profile.png)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/walstaddev/taskboard-pro.git
cd taskboard-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file with your values:

```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/taskboard_pro"
AUTH_SECRET="your_auth_secret"
```

### 4. Run database migrations

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

### 6. Open the app

Visit:

```txt
http://localhost:3000
```

---

## Database Schema Overview

The application uses a relational structure with three main models:

- `User`
- `Project`
- `Task`

Relationships:
- one user can have many projects
- one project can have many tasks

The schema supports cascade deletion so that removing a user also removes related projects and tasks.

---

## Key Technical Highlights

- Prisma + PostgreSQL integration with relational data modeling
- Server Actions for forms and mutations
- Auth.js credentials-based authentication
- Password hashing with bcrypt
- Zod validation on critical forms
- Protected routes using server-side session checks
- Revalidation with `revalidatePath()` after mutations
- Reusable layout and dashboard components
- Modular structure for scalability

---

## Folder Structure

```txt
src/
  app/
    dashboard/
    login/
    profile/
    projects/
    register/
    api/auth/[...nextauth]/
  actions/
    auth/
    profile/
    projects/
    tasks/
  components/
    auth/
    dashboard/
    layout/
    profile/
    projects/
    tasks/
  lib/
    prisma.ts
    validations/
  types/
```

---

## What This Project Demonstrates

This project was built to demonstrate practical full stack development skills in a modern JavaScript / TypeScript ecosystem.

It shows ability in:
- building authenticated applications
- designing relational database structures
- implementing complete CRUD flows
- structuring a modern Next.js application
- handling validation and server-side logic
- building a coherent product-oriented UI
- delivering a complete portfolio-ready application

---

## Challenges & Learnings

Some of the main implementation areas included:
- configuring Prisma and PostgreSQL correctly in local development
- setting up credentials-based authentication with Auth.js
- handling route protection in the App Router
- organizing server actions for forms and mutations
- keeping task and project ownership secure at query level
- improving UX with responsive layout, confirmations, and empty states
- refreshing profile session data after account updates

This project reinforced practical skills in modern full stack architecture and helped consolidate confidence working with React / Next.js beyond traditional server-rendered stacks.

---

## Possible Future Improvements

Potential future enhancements could include:
- task filters by status and priority
- search
- project archiving
- activity history
- improved dashboard analytics
- password reset flow
- team collaboration / multi-user workspaces
- drag and drop task organization

---

## Status

MVP completed.

TaskBoard Pro currently includes the full core workflow for:
- authentication
- project management
- task management
- dashboard metrics
- account settings

---

## Author

**Younes Mohamed Walstad**  
GitHub: [walstaddev](https://github.com/walstaddev)

---

## License

This project was created as a portfolio and learning project.
