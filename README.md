# ETNet Live Stock & Chart Dashboard

> [!NOTE]
> **Disclaimer & Context**
> This project is created as a testing experience for AI-assisted "vibe coding". It is intended for experimental evaluation and exploration purposes only.

A unified single-port web application that captures real-time stock details from ETNet HK, visualizes price and volume histories in a custom split SVG chart, and offers a highly-optimized Mini Mode Watchlist widget.

## 📸 Screenshots

| Full Mode | Mini Mode |
| :---: | :---: |
| ![Full Mode](image/Screenshot%202026-07-22%20142022.png) | ![Mini Mode](image/Screenshot%202026-07-22%20120928.png) |

## 🚀 Features

*   **Split Stock & ETF Chart**: Professional SVG chart displaying price trends (top pane) and dynamic volume bars (bottom pane) with full time stamps on the X-axis and Y-axis scale values.
*   **ETF Redirect Support**: Seamlessly scrapes and parses ETF quotes (e.g., `7709`, `3033`) by dynamically detecting and following ETNet's JavaScript redirect pattern (pointing to dedicated `/www/tc/etf/quote/` pages).
*   **Mini Mode Watchlist**:
    *   Saves up to 10 stocks/ETFs in local browser storage (`localStorage`).
    *   Lists items vertically in a clean CSS grid layout.
    *   Aligned to match the standard dashboard width (`480px` and centered) for a consistent viewing experience.
    *   Shows live high/low columns with single-character Chinese labels (`高` / `低`) and current prices that update automatically in the background every 30 seconds.
    *   Includes a **Clean All** button to clear the cached watchlist and active monitors at once.
    *   **Position Lock**: Selecting a stock by clicking its row highlights it without shifting its order in the watchlist.
*   **Clean Input Box**: Removed default browser autocomplete popups (datalists) to prevent interface clutter, while keeping keystroke decoupling (press **Enter** to submit).
*   **Dual Color Themes**: Day Mode (light slate-blue style with a soft light-blue selected item background) and Night Mode.
*   **State Persistence**: Automatically remembers and loads your last active stock or ETF when you reopen the page.

---

## Support / Donations

If this project saved you a few minutes of typing every day, consider buying me a coffee ☕ — it keeps the project alive and pays for the test devices.

[![Buy Me a Coffee](https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png)](https://www.buymeacoffee.com/billy1030)

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
