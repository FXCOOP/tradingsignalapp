@echo off
echo ================================
echo FinoGlob Landing Page Deployment
echo ================================
echo.
echo Choose deployment platform:
echo 1) Vercel (Recommended)
echo 2) Netlify
echo 3) GitHub Pages
echo 4) Test Locally
echo 5) Open HTML file directly
echo.
set /p choice="Enter choice [1-5]: "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto github
if "%choice%"=="4" goto local
if "%choice%"=="5" goto open
goto invalid

:vercel
echo.
echo 🚀 Deploying to Vercel...
echo.
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    call npm install -g vercel
)
echo 📦 Starting deployment...
call vercel --prod --name finoglob-landing
echo.
echo ✅ Deployment complete!
echo.
echo 📋 Next Steps:
echo 1. Go to Vercel Dashboard: https://vercel.com/dashboard
echo 2. Navigate to your project settings
echo 3. Click 'Domains' → 'Add Domain'
echo 4. Enter: finoglob.yourdomain.com
echo 5. Update your DNS with the provided records
echo.
goto end

:netlify
echo.
echo 🚀 Deploying to Netlify...
echo.
where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Netlify CLI not found. Installing...
    call npm install -g netlify-cli
)
echo 🔐 Logging in to Netlify...
call netlify login
echo 📦 Starting deployment...
call netlify deploy --prod --dir=. --site-name=finoglob-landing
echo.
echo ✅ Deployment complete!
echo.
goto end

:github
echo.
echo 🚀 Preparing for GitHub Pages...
echo.
copy trdflwfinoglob.html index.html
echo ✅ Created index.html
echo.
echo 📋 Next Steps:
echo 1. Create a new GitHub repository named 'finoglob-landing'
echo 2. Push index.html to the repository
echo 3. Enable GitHub Pages in repository settings
echo 4. Add custom domain in Pages settings
echo.
echo See FINOGLOB-SUBDOMAIN-SETUP.md for detailed instructions
goto end

:local
echo.
echo 🧪 Starting local test server...
echo.
echo Opening http://localhost:8000/trdflwfinoglob.html
echo.
echo Press Ctrl+C to stop the server
echo.
start http://localhost:8000/trdflwfinoglob.html
python -m http.server 8000
goto end

:open
echo.
echo 📂 Opening trdflwfinoglob.html in your default browser...
echo.
start trdflwfinoglob.html
echo.
echo ✅ File opened!
echo.
echo Note: The file is fully functional standalone.
echo All features work without deployment:
echo - Multi-language support
echo - Form submission to Supabase
echo - Analytics tracking
echo.
goto end

:invalid
echo ❌ Invalid choice. Please run the script again and choose 1-5.
exit /b 1

:end
echo.
echo 🎉 Done!
echo.
pause
