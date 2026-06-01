@echo off
echo ===================================================
echo   UniMatch Setup Script
echo ===================================================
echo.
echo 1. Installing dependencies...
call npm install
echo.
echo 2. Checking environment configuration (.env.local)...
if not exist .env.local (
    echo [WARNING] .env.local does not exist!
    echo Please create .env.local and add your Supabase credentials.
) else (
    echo [OK] .env.local found.
)
echo.
echo 3. Seeding database...
call node scripts/seed-supabase.js
echo.
echo ===================================================
echo   Setup completed! You can now run "npm run dev".
echo ===================================================
pause
