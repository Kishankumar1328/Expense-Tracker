# FinSentinel - AI-Powered Personal Finance Mobile Application

## 🎯 Overview

FinSentinel is a production-ready, AI-powered personal finance mobile application that provides intelligent insights, foresight, and decision support for managing your finances. Built with React Native and Node.js, it offers a complete fintech-grade experience.

## ✨ Features

### Core Functionality
- **Smart Dashboard**: Real-time financial overview with income vs expenses tracking
- **Expense Management**: Full CRUD operations with category-based organization
- **AI Insights**: Personalized financial recommendations and spending analysis
- **Budget Planner**: Monthly budgets with progress tracking and overspending alerts
- **Financial Simulator**: What-if scenarios for savings and investment projections
- **User Profile**: Theme toggle, data export, and account management

### Technical Features
- JWT-based authentication
- Dark/Light mode support
- Offline-first architecture with AsyncStorage
- Real-time data synchronization
- Interactive charts and visualizations
- Professional fintech-grade UI/UX

## 🏗️ Architecture

### Frontend (React Native)
```
FinSentinel/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── Button.js
│   │   ├── Card.js
│   │   ├── Input.js
│   │   ├── LoadingState.js
│   │   └── EmptyState.js
│   ├── context/          # Global state management
│   │   ├── AuthContext.js
│   │   ├── FinanceContext.js
│   │   └── ThemeContext.js
│   ├── navigation/       # Navigation configuration
│   │   ├── AppNavigator.js
│   │   └── MainTabs.js
│   └── screens/          # Application screens
│       ├── SplashScreen.js
│       ├── LoginScreen.js
│       ├── SignupScreen.js
│       ├── DashboardScreen.js
│       ├── ExpensesScreen.js
│       ├── InsightsScreen.js
│       ├── SimulatorScreen.js
│       └── ProfileScreen.js
├── App.js
├── package.json
└── tailwind.config.js
```

### Backend (Node.js + Express)
```
backend/
├── config/
│   └── database.js       # SQLite configuration
├── controllers/          # Business logic
│   ├── authController.js
│   ├── expenseController.js
│   ├── budgetController.js
│   ├── insightController.js
│   └── simulationController.js
├── middleware/
│   └── auth.js          # JWT authentication
├── routes/              # API routes
│   ├── auth.js
│   ├── expenses.js
│   ├── budgets.js
│   ├── insights.js
│   └── simulations.js
├── server.js
├── package.json
└── .env
```

## 📊 Database Schema

### Users
- id (PRIMARY KEY)
- name
- email (UNIQUE)
- password (hashed)
- created_at
- updated_at

### Expenses
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- description
- amount
- category
- type (income/expense)
- date
- created_at

### Budgets
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- category
- amount
- period
- start_date
- end_date
- created_at

### AI Insights
- id (PRIMARY KEY)
- user_id (FOREIGN KEY)
- title
- description
- type (info/warning/success)
- recommendation
- created_at

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Android Studio or Xcode (for mobile development)

### Installation

1. **Clone the repository**
```bash
cd E:/Kish/Project/client/FinSentinel
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
```

4. **Configure environment variables**
```bash
# backend/.env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

### Running the Application

1. **Start the backend server**
```bash
cd backend
npm run dev
```

2. **Start the React Native app**
```bash
# In the root directory
npm start
```

3. **Run on device/emulator**
```bash
# For Android
npm run android

# For iOS
npm run ios
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login to account

### Expenses
- `GET /api/expenses` - Get all expenses
- `POST /api/expenses` - Add new expense
- `PUT /api/expenses/:id` - Update expense
- `DELETE /api/expenses/:id` - Delete expense
- `GET /api/expenses/summary` - Get financial summary

### Budgets
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/:id` - Update budget

### Insights
- `GET /api/insights` - Get AI-generated insights

### Simulations
- `POST /api/simulations` - Run financial simulation

## 🎨 Design System

### Colors
- **Primary**: #2196F3 (Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Dark Mode**: Adaptive color scheme

### Typography
- **Display**: Outfit
- **Body**: Inter
- **Weights**: 400, 600, 700, 900

### Components
- Cards with glassmorphism effects
- Gradient backgrounds
- Smooth animations
- Professional shadows

## 🤖 AI Features

The app includes mock AI functionality designed for future LLM integration:

1. **Spending Analysis**: Identifies high-spending categories
2. **Savings Recommendations**: Suggests potential savings opportunities
3. **Pattern Recognition**: Analyzes spending trends
4. **Budget Alerts**: Warns about overspending
5. **Financial Projections**: Simulates future scenarios

## 📱 Screens

1. **Splash Screen**: App branding with auto-navigation
2. **Login/Signup**: Secure authentication with validation
3. **Dashboard**: Financial overview with charts and insights
4. **Expenses**: Full expense management with filtering
5. **AI Insights**: Personalized recommendations
6. **Simulator**: Financial projection calculator
7. **Profile**: Settings and account management

## 🔒 Security

- Password hashing with bcrypt
- JWT token-based authentication
- Secure API endpoints
- Input validation
- SQL injection prevention

## 📦 Dependencies

### Frontend
- React Native
- Expo
- React Navigation
- NativeWind (Tailwind CSS)
- Victory Native (Charts)
- Axios
- AsyncStorage

### Backend
- Express.js
- SQLite3
- JWT
- Bcrypt
- Morgan
- CORS

## 🎯 Future Enhancements

- Real AI integration with LLM
- Bank account synchronization
- Receipt scanning with OCR
- Multi-currency support
- Investment tracking
- Bill reminders
- Cloud backup
- Social features

## 📄 License

This project is built as a production-ready fintech application.

## 👨‍💻 Development

Built with ❤️ using React Native and Node.js

---

**FinSentinel** - Your AI-Powered Financial Assistant
