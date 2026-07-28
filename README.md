# WCB Forms — Assignment 2

A dynamic browser-based application that loads worker data from a backend JSON file and renders professional WCB reports using **compiled Pug templates**.



---

# Video Demo

**Google Drive Link**

https://drive.google.com/file/d/160pSTGK1U2DUY6UEUylchUuHxqzouVqE/view?usp=drive_link

---

# Application Design: Two Forms, One Sheet

A major feature of this project is its **Single Page Application (SPA)** architecture.

Rather than creating separate HTML pages for different forms, **both the Medical & Travel Expense Request form and the Worker Progress Report are built into a single `index.html` page.**

### Features

- Dynamic toolbar for switching between forms
- Two different datasets for dynamic rendering
- Browser-based rendering using compiled Pug templates
- No page refresh required
- Single HTML page architecture
- Dynamic JavaScript rendering

---

# Form Previews

## Medical & Travel Expense Request

![Medical Expense Page 1]


<img width="608" height="967" alt="image" src="https://github.com/user-attachments/assets/1221ea18-f6b1-4d84-bb42-fb5935da4253" />


![Medical Expense Page 2]


<img width="667" height="750" alt="image" src="https://github.com/user-attachments/assets/2d6bcfad-2fbb-4fd3-a74a-58f4bef0c654" />

---

## Worker Progress Report

![Worker Progress Page 1]

<img width="565" height="905" alt="image" src="https://github.com/user-attachments/assets/b9070024-df39-48a7-9cb4-b572319adfb4" />


![Worker Progress Page 2]

<img width="577" height="747" alt="image" src="https://github.com/user-attachments/assets/1d20f53e-a6c8-48dc-a533-33e5fd2fd1b0" />


![Worker Progress Page 3]

<img width="595" height="740" alt="image" src="https://github.com/user-attachments/assets/b7d87ab5-eb56-4693-855f-e78155256122" />


---

# Architecture & Data Flow

This project uses **Pug (formerly Jade)** to generate HTML templates cleanly and efficiently.

```mermaid
graph LR
    A["data.json"] -->|"fetch()"| B("script.js")
    B -->|"populates"| C{"Worker Dropdown"}
    B -->|"renders via Pug templates"| D["#report-content"]
    C -->|"change selection"| B
```

### Workflow

1. Worker data is loaded from `data.json`.
2. JavaScript fetches and processes the selected dataset.
3. The worker dropdown is populated dynamically.
4. Compiled Pug templates render the selected form.
5. Switching forms or datasets updates the page instantly without reloading.

---

# Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Pug Template Engine
- JSON

---

# Features

- Single Page Application (SPA)
- Compiled Pug Templates
- Dynamic Dataset Switching
- Reusable Pug Mixins
- Dynamic Form Rendering
- Responsive Layout
- PDF-like Design
- Automatic Page Numbering
- Dynamic Header & Footer
- Browser-based Rendering
- Clean Project Structure

---

# Project Structure

```
Assignment-2/
│
├── assets/
│   └── WCB_of_Manitoba_logo.png
│
├── docs/
│   └── samples/
│       ├── medical-expense-page1.png
│       ├── medical-expense-page2.png
│       ├── worker-progress-page1.png
│       ├── worker-progress-page2.png
│       └── worker-progress-page3.png
│
├── index.html
├── styles.css
├── script.js
├── pug-templates.js
├── worker.pug
├── medical.pug
├── renderWorker.js
├── renderMedical.js
├── data.json
└── README.md
```

---

# How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. Choose a form from the toolbar.
4. Select Dataset 1 or Dataset 2.
5. The selected report is rendered instantly using compiled Pug templates.

No installation or additional packages are required.

---

# Candidate Details

**Name:** Patan Nasreen

**GitHub:** https://github.com/npatan-netizen

---

# Thank You
