@echo off
title ETNet Live Stock Dashboard
echo ==================================================
echo   Starting ETNet Live Stock Dashboard...
echo ==================================================
echo.
echo Launching local Node scraper server...
mshta vbscript:CreateObject("Wscript.Shell").Run("node backend/server.js",0,False)(window.close)

echo Waiting for server to initialize...
timeout /t 2 /nobreak >nul

echo Opening dashboard in dedicated borderless window...
start msedge --app=http://localhost:3300/ --window-size=496,330
exit
