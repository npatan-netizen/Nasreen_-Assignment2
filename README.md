# 🌟 WCB Forms — Assignment 2

> [!NOTE]
> This browser project dynamically loads worker data from a backend JSON file and renders beautifully styled reports using compiled Pug templates directly in the browser!

## ✨ How It Works (The Magic)

```mermaid
graph LR
    A[data.json] -->|fetch()| B(script.js)
    B -->|populates| C{Worker Dropdown}
    B -->|renders via Pug| D[#report-content]
    C -->|change selection| B
```

1. **Data Fetching:** The browser fetches `data.json` on load.
2. **Dynamic UI:** `script.js` builds the dropdown options based on the available workers (Nasreen & Jyothi).
3. **Template Rendering:** When a worker or form type is selected, pre-compiled Pug functions (`renderMedical` / `renderWorker`) generate the HTML.
4. **Instant Updates:** The DOM (`#report-content`) is updated instantly without reloading the page!

## 🚀 Quick Start

1. **Clone & Open:** Open your terminal in the project folder.
2. **Start Server:** Run a local web server.
   ```bash
   python -m http.server 8000
   ```
3. **View:** Navigate to [http://127.0.0.1:8000/](http://127.0.0.1:8000/) in your browser.
4. **Interact:**
   - Use the **Worker** dropdown to switch between workers.
   - Toggle between **Medical & Travel Expense** and **Worker Progress Report**.
   - Click **Print as PDF** to generate a clean A4 PDF of the current view.

## 📁 Project Structure

| Component | Purpose |
| :--- | :--- |
| `index.html` | The main shell and toolbar UI |
| `styles.css` | Premium styling and A4 print layout rules |
| `script.js` | Core logic for data binding and template rendering |
| `data.json` | Mock database containing worker records |
| `templates/*.pug` | Source templates for the forms |
| `templates/*.js` | Pre-compiled render functions |

> [!TIP]
> **Print Optimization:** The application is highly optimized for A4 printing. The toolbar and UI elements automatically hide when you print!
