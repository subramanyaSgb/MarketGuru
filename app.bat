@echo off
setlocal enabledelayedexpansion

:: ============================================================================
:: MarketGuru - Application Launcher
:: Next.js 16 | React 19 | TypeScript | Tailwind CSS 4
:: ============================================================================

:: --- Configuration ---
set "PROJECT_ROOT=%~dp0"
set "PROJECT_ROOT=%PROJECT_ROOT:~0,-1%"
set "APP_NAME=MarketGuru"
set "APP_PORT=3000"
set "APP_URL=http://localhost:%APP_PORT%"
set "WINDOW_TITLE=MarketGuru Dev Server"
set "WINDOW_TITLE_PROD=MarketGuru Prod Server"

:: --- ANSI Color Codes ---
for /f %%a in ('echo prompt $E ^| cmd') do set "ESC=%%a"
set "RED=%ESC%[91m"
set "GREEN=%ESC%[92m"
set "YELLOW=%ESC%[93m"
set "CYAN=%ESC%[96m"
set "MAGENTA=%ESC%[95m"
set "WHITE=%ESC%[97m"
set "DIM=%ESC%[90m"
set "BOLD=%ESC%[1m"
set "RESET=%ESC%[0m"

:: --- Entry Point ---
:MAIN_MENU
cls
echo.
echo %CYAN%  =======================================================================%RESET%
echo %CYAN%  ^|^|                                                                   ^|^|%RESET%
echo %CYAN%  ^|^|%BOLD%%WHITE%    __  __            _        _    ____                        %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|%BOLD%%WHITE%   ^|  \/  ^| __ _ _ __^| ^| _____^| ^|_ / ___^|_   _ _ __ _   _      %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|%BOLD%%WHITE%   ^| ^|\/^| ^|/ _` ^| '__^| ^|/ / _ \ __^| ^|  _^| ^| ^| ^| '__^| ^| ^| ^|     %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|%BOLD%%WHITE%   ^| ^|  ^| ^| (_^| ^| ^|  ^|   ^<  __/ ^|_^| ^|_^| ^| ^|_^| ^| ^|  ^| ^|_^| ^|     %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|%BOLD%%WHITE%   ^|_^|  ^|_^|\__,_^|_^|  ^|_^|\_\___^|\__^|\____^|\__,_^|_^|   \__,_^|     %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|                                                                   ^|^|%RESET%
echo %CYAN%  ^|^|%DIM%          Next.js 16  -  React 19  -  Tailwind CSS 4             %RESET%%CYAN%^|^|%RESET%
echo %CYAN%  ^|^|                                                                   ^|^|%RESET%
echo %CYAN%  =======================================================================%RESET%
echo.
echo %WHITE%  %BOLD%APPLICATION MENU%RESET%
echo %DIM%  -----------------------------------------------------------------------%RESET%
echo.
echo     %GREEN%[1]%RESET%  Start Dev Server          %DIM%(npm run dev)%RESET%
echo     %GREEN%[2]%RESET%  Build Production           %DIM%(npm run build)%RESET%
echo     %GREEN%[3]%RESET%  Start Production Server    %DIM%(npm run start)%RESET%
echo     %GREEN%[4]%RESET%  Install Dependencies       %DIM%(npm install)%RESET%
echo     %GREEN%[5]%RESET%  Open in Browser            %DIM%(%APP_URL%)%RESET%
echo     %GREEN%[6]%RESET%  Stop Server                %DIM%(kill port %APP_PORT%)%RESET%
echo     %GREEN%[7]%RESET%  Check Status               %DIM%(health check)%RESET%
echo     %RED%[8]%RESET%  Exit
echo.
echo %DIM%  -----------------------------------------------------------------------%RESET%

set "CHOICE="
set /p "CHOICE=  %CYAN%Select an option [1-8]:%RESET% "

if "%CHOICE%"=="1" goto START_DEV
if "%CHOICE%"=="2" goto BUILD_PROD
if "%CHOICE%"=="3" goto START_PROD
if "%CHOICE%"=="4" goto INSTALL_DEPS
if "%CHOICE%"=="5" goto OPEN_BROWSER
if "%CHOICE%"=="6" goto STOP_SERVER
if "%CHOICE%"=="7" goto HEALTH_CHECK
if "%CHOICE%"=="8" goto EXIT_APP

echo.
echo   %RED%[ERROR]%RESET% Invalid option. Please select 1-8.
timeout /t 2 >nul
goto MAIN_MENU

:: ============================================================================
:: OPTION 1: Start Development Server
:: ============================================================================
:START_DEV
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% Starting Development Server...
echo.

:: Check if Node.js is available
where node >nul 2>&1
if errorlevel 1 (
    echo   %RED%[ERROR]%RESET% Node.js is not installed or not in PATH.
    echo   %YELLOW%[INFO]%RESET%  Download from: https://nodejs.org/
    echo.
    pause
    goto MAIN_MENU
)

:: Check if node_modules exists
if not exist "%PROJECT_ROOT%\node_modules\" (
    echo   %YELLOW%[WARN]%RESET%  node_modules not found. Running npm install first...
    echo.
    cd /d "%PROJECT_ROOT%"
    call npm install
    if errorlevel 1 (
        echo.
        echo   %RED%[ERROR]%RESET% npm install failed. Please check the output above.
        echo.
        pause
        goto MAIN_MENU
    )
    echo.
    echo   %GREEN%[OK]%RESET%    Dependencies installed successfully.
    echo.
)

:: Check if port is already in use
call :CHECK_PORT_SILENT
if "!PORT_IN_USE!"=="true" (
    echo   %YELLOW%[WARN]%RESET%  Port %APP_PORT% is already in use.
    echo.
    set "CONFIRM="
    set /p "CONFIRM=  Stop existing server and restart? [y/N]: "
    if /i "!CONFIRM!"=="y" (
        call :KILL_PORT_PROCESSES
        timeout /t 2 >nul
    ) else (
        echo.
        echo   %YELLOW%[INFO]%RESET%  Returning to menu.
        timeout /t 2 >nul
        goto MAIN_MENU
    )
)

echo   %GREEN%[OK]%RESET%    Launching dev server in new window...
echo   %DIM%         URL: %APP_URL%%RESET%
echo.

start "%WINDOW_TITLE%" cmd /k "cd /d "%PROJECT_ROOT%" && title %WINDOW_TITLE% && echo. && echo   %GREEN%[MarketGuru]%RESET% Dev server starting on %APP_URL% && echo. && npm run dev"

:: Wait for server to be ready, then open browser
echo   %YELLOW%[INFO]%RESET%  Waiting for server to be ready...
set "ATTEMPTS=0"
:WAIT_DEV_LOOP
if !ATTEMPTS! geq 30 (
    echo   %YELLOW%[WARN]%RESET%  Server may still be starting. Check the dev server window.
    echo.
    pause
    goto MAIN_MENU
)
timeout /t 1 >nul
curl -s -o nul -w "" "%APP_URL%" >nul 2>&1
if errorlevel 1 (
    set /a ATTEMPTS+=1
    <nul set /p "=."
    goto WAIT_DEV_LOOP
)
echo.
echo   %GREEN%[OK]%RESET%    Server is running!
echo.

set "OPEN_NOW="
set /p "OPEN_NOW=  Open in browser? [Y/n]: "
if /i not "!OPEN_NOW!"=="n" (
    start "" "%APP_URL%"
    echo   %GREEN%[OK]%RESET%    Browser opened.
)

echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 2: Build Production
:: ============================================================================
:BUILD_PROD
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% Building for Production...
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo   %RED%[ERROR]%RESET% Node.js is not installed or not in PATH.
    echo.
    pause
    goto MAIN_MENU
)

if not exist "%PROJECT_ROOT%\node_modules\" (
    echo   %YELLOW%[WARN]%RESET%  node_modules not found. Running npm install first...
    echo.
    cd /d "%PROJECT_ROOT%"
    call npm install
    if errorlevel 1 (
        echo   %RED%[ERROR]%RESET% npm install failed.
        echo.
        pause
        goto MAIN_MENU
    )
    echo.
)

cd /d "%PROJECT_ROOT%"
echo   %YELLOW%[INFO]%RESET%  Running: npm run build
echo   %DIM%         This may take a moment...%RESET%
echo.

call npm run build
if errorlevel 1 (
    echo.
    echo   %RED%[ERROR]%RESET% Build failed. Check the output above for errors.
) else (
    echo.
    echo   %GREEN%[OK]%RESET%    Production build completed successfully!
    echo   %DIM%         Output: %PROJECT_ROOT%\.next%RESET%
    echo.
    echo   %YELLOW%[TIP]%RESET%   Run option [3] to start the production server.
)

echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 3: Start Production Server
:: ============================================================================
:START_PROD
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% Starting Production Server...
echo.

if not exist "%PROJECT_ROOT%\.next\" (
    echo   %RED%[ERROR]%RESET% No production build found.
    echo   %YELLOW%[INFO]%RESET%  Run option [2] to build first.
    echo.
    pause
    goto MAIN_MENU
)

call :CHECK_PORT_SILENT
if "!PORT_IN_USE!"=="true" (
    echo   %YELLOW%[WARN]%RESET%  Port %APP_PORT% is already in use.
    echo.
    set "CONFIRM="
    set /p "CONFIRM=  Stop existing server and restart? [y/N]: "
    if /i "!CONFIRM!"=="y" (
        call :KILL_PORT_PROCESSES
        timeout /t 2 >nul
    ) else (
        goto MAIN_MENU
    )
)

echo   %GREEN%[OK]%RESET%    Launching production server in new window...
echo   %DIM%         URL: %APP_URL%%RESET%
echo.

start "%WINDOW_TITLE_PROD%" cmd /k "cd /d "%PROJECT_ROOT%" && title %WINDOW_TITLE_PROD% && echo. && echo   %GREEN%[MarketGuru]%RESET% Production server starting on %APP_URL% && echo. && npm run start"

echo   %YELLOW%[INFO]%RESET%  Waiting for server to be ready...
set "ATTEMPTS=0"
:WAIT_PROD_LOOP
if !ATTEMPTS! geq 15 (
    echo   %YELLOW%[WARN]%RESET%  Server may still be starting. Check the server window.
    echo.
    pause
    goto MAIN_MENU
)
timeout /t 1 >nul
curl -s -o nul -w "" "%APP_URL%" >nul 2>&1
if errorlevel 1 (
    set /a ATTEMPTS+=1
    <nul set /p "=."
    goto WAIT_PROD_LOOP
)
echo.
echo   %GREEN%[OK]%RESET%    Production server is running!
echo.

set "OPEN_NOW="
set /p "OPEN_NOW=  Open in browser? [Y/n]: "
if /i not "!OPEN_NOW!"=="n" (
    start "" "%APP_URL%"
)

echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 4: Install Dependencies
:: ============================================================================
:INSTALL_DEPS
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% Installing Dependencies...
echo.

where npm >nul 2>&1
if errorlevel 1 (
    echo   %RED%[ERROR]%RESET% npm is not installed or not in PATH.
    echo.
    pause
    goto MAIN_MENU
)

cd /d "%PROJECT_ROOT%"

echo   %YELLOW%[INFO]%RESET%  Running: npm install
echo.

call npm install
if errorlevel 1 (
    echo.
    echo   %RED%[ERROR]%RESET% npm install failed. Check the output above.
) else (
    echo.
    echo   %GREEN%[OK]%RESET%    All dependencies installed successfully!
)

echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 5: Open in Browser
:: ============================================================================
:OPEN_BROWSER
echo.

call :CHECK_PORT_SILENT
if "!PORT_IN_USE!"=="true" (
    echo   %GREEN%[OK]%RESET%    Opening %APP_URL% in default browser...
    start "" "%APP_URL%"
) else (
    echo   %YELLOW%[WARN]%RESET%  No server detected on port %APP_PORT%.
    echo   %YELLOW%[INFO]%RESET%  Start the server first (option 1 or 3).
    echo.
    set "FORCE_OPEN="
    set /p "FORCE_OPEN=  Open anyway? [y/N]: "
    if /i "!FORCE_OPEN!"=="y" (
        start "" "%APP_URL%"
    )
)

echo.
timeout /t 2 >nul
goto MAIN_MENU

:: ============================================================================
:: OPTION 6: Stop Server
:: ============================================================================
:STOP_SERVER
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% Stopping Server...
echo.

call :CHECK_PORT_SILENT
if "!PORT_IN_USE!"=="false" (
    echo   %YELLOW%[INFO]%RESET%  No server running on port %APP_PORT%.
    echo.
    pause
    goto MAIN_MENU
)

call :KILL_PORT_PROCESSES

echo.
echo   %GREEN%[OK]%RESET%    Server stopped.
echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 7: Health Check / Status
:: ============================================================================
:HEALTH_CHECK
cls
echo.
echo   %CYAN%[MarketGuru]%RESET% System Status
echo   %DIM%-----------------------------------------------------------------------%RESET%
echo.

:: Node.js
echo   %WHITE%%BOLD%Runtime%RESET%
where node >nul 2>&1
if errorlevel 1 (
    echo     Node.js:       %RED%[NOT FOUND]%RESET%
) else (
    for /f "tokens=*" %%v in ('node --version 2^>nul') do (
        echo     Node.js:       %GREEN%[INSTALLED]%RESET%  %%v
    )
)

where npm >nul 2>&1
if errorlevel 1 (
    echo     npm:           %RED%[NOT FOUND]%RESET%
) else (
    for /f "tokens=*" %%v in ('npm --version 2^>nul') do (
        echo     npm:           %GREEN%[INSTALLED]%RESET%  v%%v
    )
)
echo.

:: Dependencies
echo   %WHITE%%BOLD%Dependencies%RESET%
if exist "%PROJECT_ROOT%\node_modules\" (
    echo     node_modules:  %GREEN%[INSTALLED]%RESET%
) else (
    echo     node_modules:  %RED%[MISSING]%RESET%    %DIM%Run option [4] to install%RESET%
)

if exist "%PROJECT_ROOT%\.next\" (
    echo     .next build:   %GREEN%[EXISTS]%RESET%
) else (
    echo     .next build:   %YELLOW%[NOT BUILT]%RESET%  %DIM%Run option [2] to build%RESET%
)
echo.

:: Server Status
echo   %WHITE%%BOLD%Server (port %APP_PORT%)%RESET%
call :CHECK_PORT_SILENT
if "!PORT_IN_USE!"=="true" (
    echo     Status:        %GREEN%[RUNNING]%RESET%
    echo     URL:           %APP_URL%

    :: Try to get HTTP status
    curl -s -o nul -w "%%{http_code}" "%APP_URL%" 2>nul > "%TEMP%\mg_status.tmp"
    set /p HTTP_STATUS=<"%TEMP%\mg_status.tmp"
    del "%TEMP%\mg_status.tmp" 2>nul

    if "!HTTP_STATUS!"=="200" (
        echo     HTTP Response: %GREEN%[200 OK]%RESET%
    ) else if "!HTTP_STATUS!"=="000" (
        echo     HTTP Response: %YELLOW%[CONNECTING...]%RESET%
    ) else (
        echo     HTTP Response: %YELLOW%[!HTTP_STATUS!]%RESET%
    )
) else (
    echo     Status:        %RED%[STOPPED]%RESET%
)
echo.

:: Window Detection
echo   %WHITE%%BOLD%Server Windows%RESET%
tasklist /FI "WINDOWTITLE eq %WINDOW_TITLE%*" /FO CSV 2>nul | findstr /i "cmd" >nul 2>&1
if not errorlevel 1 (
    echo     Dev Server:    %GREEN%[WINDOW OPEN]%RESET%
) else (
    echo     Dev Server:    %DIM%[no window]%RESET%
)
tasklist /FI "WINDOWTITLE eq %WINDOW_TITLE_PROD%*" /FO CSV 2>nul | findstr /i "cmd" >nul 2>&1
if not errorlevel 1 (
    echo     Prod Server:   %GREEN%[WINDOW OPEN]%RESET%
) else (
    echo     Prod Server:   %DIM%[no window]%RESET%
)

echo.
echo   %DIM%-----------------------------------------------------------------------%RESET%
echo.
pause
goto MAIN_MENU

:: ============================================================================
:: OPTION 8: Exit
:: ============================================================================
:EXIT_APP
echo.
echo   %DIM%Goodbye!%RESET%
echo.
exit /b 0

:: ============================================================================
:: UTILITY SUBROUTINES
:: ============================================================================

:: --- Check if port is in use (sets PORT_IN_USE variable) ---
:CHECK_PORT_SILENT
set "PORT_IN_USE=false"
netstat -ano 2>nul | findstr "LISTENING" | findstr ":%APP_PORT% " >nul 2>&1
if not errorlevel 1 (
    set "PORT_IN_USE=true"
)
exit /b 0

:: --- Kill processes on the configured port ---
:KILL_PORT_PROCESSES
echo   %YELLOW%[INFO]%RESET%  Stopping processes on port %APP_PORT%...

:: Close named server windows first
taskkill /FI "WINDOWTITLE eq %WINDOW_TITLE%*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq %WINDOW_TITLE_PROD%*" /F >nul 2>&1

:: Find and kill any process on the port
for /f "tokens=5" %%p in ('netstat -ano 2^>nul ^| findstr "LISTENING" ^| findstr ":%APP_PORT% "') do (
    if not "%%p"=="0" (
        taskkill /PID %%p /F >nul 2>&1
    )
)

echo   %GREEN%[OK]%RESET%    Port %APP_PORT% freed.
exit /b 0

endlocal
