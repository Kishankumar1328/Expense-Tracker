@echo off
echo Starting FinSentinel Backend...
cd backend
start cmd /k "npm run dev"

echo.
echo Backend started!
echo Starting React Native Metro Bundler...
cd ..
start cmd /k "npm start"

echo.
echo FinSentinel is starting...
echo Backend: http://localhost:3000
echo Frontend: Follow Expo instructions in the new window
echo.
pause
