# Quiz Builder - Full-Stack JavaScript Application

A modern full-stack quiz creation platform built with **NestJS** (Backend) and **Next.js** (Frontend) that allows users to create, view, and manage custom quizzes with various question types.

## 🚀 Features

- **Quiz Creation**: Create quizzes with multiple question types
- **Question Types**: Boolean (True/False), Input (Text), and Checkbox (Multiple Choice)
- **Quiz Management**: View all quizzes, delete quizzes, and view detailed quiz information
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation for both frontend and backend
- **Database**: PostgreSQL with TypeORM for data persistence
- **Code Quality**: ESLint and Prettier configured for consistent code formatting

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with TypeORM
- **Validation**: class-validator and class-transformer
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Form Management**: React Hook Form

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd QuizBuilder
```

### 2. Database Setup

1. **Install PostgreSQL** if you haven't already
2. **Create a new database**:
   ```sql
   CREATE DATABASE quiz_builder;
   ```

### 3. Environment Configuration

#### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=quiz_builder

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

#### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 5. Database Migration and Seeding

```bash
# Navigate to backend directory
cd backend

# Run database migrations
npm run migration:run

# Seed the database with sample data
npm run seed
```

### 6. Start the Application

#### Start Backend Server

```bash
# In the backend directory
npm run start:dev
```

The backend server will start on `http://localhost:5000`

#### Start Frontend Development Server

```bash
# In the frontend directory (open a new terminal)
npm run dev
```

The frontend application will start on `http://localhost:3000`

## 📁 Project Structure

```
QuizBuilder/
├── backend/                 # NestJS Backend Application
│   ├── src/
│   │   ├── common/         # Shared utilities, filters, pipes
│   │   ├── config/         # Database and app configuration
│   │   ├── modules/        # Feature modules
│   │   │   └── quizz/      # Quiz module with entities, DTOs, services
│   │   ├── migrations/     # Database migrations
│   │   └── seed/           # Database seeding
│   ├── ormconfig.ts        # TypeORM configuration
│   └── package.json
├── frontend/               # Next.js Frontend Application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── common/        # Shared interfaces, utilities, axios config
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom React hooks
│   │   └── services/      # API service functions
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Quiz Management

- `POST /quizzes` - Create a new quiz
- `GET /quizzes` - Get all quizzes with titles and question counts
- `GET /quizzes/:id` - Get detailed quiz information
- `DELETE /quizzes/:id` - Delete a quiz

### Request/Response Examples

#### Create Quiz
```json
POST /quizzes
{
  "title": "JavaScript Fundamentals",
  "questions": [
    {
      "question": "Is JavaScript a compiled language?",
      "type": "BOOLEAN",
      "answers": [
        {"answer": "True", "isCorrect": false},
        {"answer": "False", "isCorrect": true}
      ]
    }
  ]
}
```

#### Get All Quizzes
```json
GET /quizzes
[
  {
    "id": 1,
    "title": "JavaScript Fundamentals",
    "questionCount": 3
  }
]
```

## 🎨 Frontend Pages

### 1. Home Page (`/`)
- Landing page with navigation to create quizzes and view existing ones

### 2. Quiz Creation (`/create`)
- Form to create new quizzes with dynamic question addition using React Hook Form
- Supports all question types (Boolean, Input, Checkbox)
- Real-time form validation with error handling
- Dynamic field arrays for questions and answers

### 3. Quiz List (`/quizzes`)
- Displays all available quizzes
- Shows quiz title and question count
- Delete functionality for each quiz
- Links to individual quiz details

### 4. Quiz Details (`/quizzes/[id]`)
- Detailed view of a specific quiz
- Shows all questions and answers in read-only format
- Responsive design for mobile devices

## 🗄️ Database Schema

### Tables

#### Quizz
- `id` (Primary Key)
- `title` (String)

#### Question
- `id` (Primary Key)
- `question` (String)
- `type` (Enum: BOOLEAN, INPUT, CHECKBOX)
- `quizzId` (Foreign Key)

#### Answer
- `id` (Primary Key)
- `answer` (String)
- `isCorrect` (Boolean)
- `questionId` (Foreign Key)

## 🧪 Sample Data

The application comes with pre-seeded sample quizzes:

1. **JavaScript Fundamentals** - 3 questions covering JS basics
2. **Basic Mathematics** - 3 questions on math fundamentals
3. **World History** - 3 questions on historical events
4. **General Science** - 3 questions on scientific concepts

Each quiz demonstrates all three question types (Boolean, Input, Checkbox).

## 🛠️ Development Commands

### Backend Commands

```bash
# Development
npm run start:dev          # Start development server with hot reload
npm run build              # Build the application
npm run start:prod         # Start production server

# Database
npm run migration:generate # Generate new migration
npm run migration:run      # Run pending migrations
npm run migration:revert   # Revert last migration
npm run seed               # Seed database with sample data
npm run db:setup           # Run migrations and seed data

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier

# Testing
npm run test               # Run unit tests
npm run test:e2e           # Run end-to-end tests
```

### Frontend Commands

```bash
# Development
npm run dev                # Start development server
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint
```

## 🔧 Configuration

### Database Configuration

The database configuration is located in `backend/src/config/database.config.ts`. You can modify:

- Database connection parameters
- Entity synchronization
- Logging settings
- Migration settings

### Frontend Configuration

The frontend configuration is in `frontend/next.config.ts`. You can modify:

- Next.js configuration
- Build settings
- Environment variables

## 🚀 Deployment

### Backend Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set production environment variables
3. Run database migrations
4. Start the production server:
   ```bash
   npm run start:prod
   ```

### Frontend Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm run start
   ```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify PostgreSQL is running
   - Check database credentials in `.env`
   - Ensure database exists

2. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check that frontend is running on the correct port

3. **Migration Errors**
   - Drop and recreate the database
   - Run `npm run migration:run` again

4. **Port Already in Use**
   - Change the port in the `.env` file
   - Kill processes using the port

### Getting Help

If you encounter any issues:

1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that the database is properly configured

## 📞 Support

For support and questions, please open an issue in the repository or contact the development team.
