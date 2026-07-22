# ETNet Live Stock & Chart Dashboard

> [!NOTE]
> **Disclaimer & Context**
> This project is created as a testing experience for AI-assisted "vibe coding". It is intended for experimental evaluation and exploration purposes only.

A unified single-port web application that captures real-time stock details from ETNet HK, visualizes price and volume histories in a custom split SVG chart, and offers a highly-optimized Mini Mode Watchlist widget.

## 🚀 Features

*   **Split Stock Chart**: Professional SVG chart displaying price trends (top pane) and dynamic volume bars (bottom pane) with full time stamps on the X-axis and Y-axis scale values.
*   **Live HSI Ticker**: Real-time Hang Seng Index (恒指) values and changes loaded automatically in the background and displayed in the main header and Mini Mode widget.
*   **Mini Mode Watchlist**:
    *   Saves up to 10 stocks in local browser storage (`localStorage`).
    *   Lists stocks vertically in a clean CSS grid layout that fits narrow browser sidebars (down to 240px wide).
    *   Shows live high/low columns with single-character Chinese labels (`高` / `低`) and current prices that update automatically in the background every 30 seconds.
    *   Includes a **Clean All** button to clear the cached watchlist and active monitors at once.
    *   **Position Lock**: Selecting a stock by clicking its row highlights it without shifting its order in the watchlist.
*   **Smart Code Input**: Keystroke-decoupled input box in Full Mode that waits for you to press **Enter** to confirm before querying, preventing unnecessary background requests.
*   **Dual Color Themes**: Day Mode (light slate-blue style with a soft light-blue selected item background) and Night Mode.
*   **State Persistence**: Automatically remembers and loads your last active stock when you reopen the page.

---

## ☕ Support / Donation

If you find this experimental dashboard useful and would like to support the work, you can buy me a coffee:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/billy1030)

---

## 🛠️ How to Run

Running the entire project requires only a single command from the root folder:

1.  **Install dependencies** (if not already done):
    ```bash
    npm install
    ```
2.  **Start the server**:
    ```bash
    npm start
    ```
3.  **Open in Browser**:
    Visit [http://localhost:3300/](http://localhost:3300/) to access the dashboard.

---

## 📁 Project Structure

*   `/backend`: Node/Express web server proxying requests to ETNet and serving built React files.
*   `/frontend`: React client UI built using Vite.
*   `package.json` (root): Launches the single-port Express server serving port `3300`.
*   `.gitignore`: Keeps the repository clean by ignoring `node_modules`, builds, and temp logs.
