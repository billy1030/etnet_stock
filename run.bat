@echo off
cd /d "%~dp0"
title Live Stock Dashboard
echo ==================================================
echo   Starting Live Stock Dashboard...
echo ==================================================
echo.
echo Launching local Node scraper server...
powershell -windowstyle hidden -command "Start-Process node -ArgumentList 'backend/server.js' -WindowStyle Hidden"

echo Waiting for server to initialize...
timeout /t 2 /nobreak >nul

echo Opening dashboard in dedicated borderless window...
start msedge --app=http://localhost:3300/ --window-size=586,330
exit
