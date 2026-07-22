@echo off
title ETNet Live Stock Dashboard
echo ==================================================
echo   Starting ETNet Live Stock Dashboard...
echo ==================================================
echo.
echo Launching local Node scraper server...
start /b "NodeServer" node backend/server.js

echo Waiting for server to initialize...
timeout /t 2 /nobreak >nul

echo Opening dashboard in dedicated borderless window...
start msedge --app=http://localhost:3300/
exit
