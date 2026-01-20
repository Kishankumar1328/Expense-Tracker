# FinSentinel - Quick Start Guide

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install Dependencies

```bash
# Install frontend dependencies
cd E:/Kish/Project/client/FinSentinel
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### Step 2: Start the Application

**Option A: Using the start script (Recommended)**
```bash
# Double-click start.bat or run:
start.bat
```

**Option B: Manual start**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
npm start
```

### Step 3: Run on Device

After Metro Bundler starts:
- Press `a` for Android
- Press `i` for iOS
- Scan QR code with Expo Go app

## 📱 First Time Setup

1. **Create Account**
   - Open the app
   - Tap "Sign Up"
   - Enter your details
   - Create account

2. **Add Your First Expense**
   - Tap the "+" button on Dashboard
   - Or go to Expenses tab
   - Fill in the details
   - Save

3. **Explore Features**
   - View AI Insights
   - Create a Budget
   - Run Financial Simulations
   - Toggle Dark Mode in Profile

## 🔧 Troubleshooting

### Backend won't start
```bash
cd backend
npm install
npm run dev
```

### Frontend issues
```bash
npm install
npx expo start --clear
```

### Database issues
Delete `backend/database/finsentinel.db` and restart backend

## 📊 Test Credentials

You can create your own account or use test data:
- Email: test@finsentinel.com
- Password: test123

## 🎯 Key Features to Try

1. **Dashboard**: See your financial overview
2. **Add Expenses**: Track income and expenses
3. **AI Insights**: Get personalized recommendations
4. **Simulator**: Project your savings growth
5. **Dark Mode**: Toggle in Profile settings

## 📞 Support

For issues or questions:
- Check README.md for detailed documentation
- Review API endpoints in backend/server.js
- Check console logs for errors

---

**Enjoy using FinSentinel!** 🎉
