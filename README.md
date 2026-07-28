# WCB Forms — Assignment 2

This project dynamically loads worker data from a backend JSON file and renders reports using compiled Pug templates directly in the browser.

## Video Demo

[Add your video link here]

## Form Previews

### Medical Expense Form
![Medical Expense Page 1](docs/samples/medical-expense-page1.png)
![Medical Expense Page 2](docs/samples/medical-expense-page2.png)

### Worker Progress Report
![Worker Progress Page 1](docs/samples/worker-progress-page1.png)
![Worker Progress Page 2](docs/samples/worker-progress-page2.png)
![Worker Progress Page 3](docs/samples/worker-progress-page3.png)


## Architecture & Data Flow

This project uses Pug (formerly Jade) to generate HTML templates.

```mermaid
graph LR
    A["data.json"] -->|"fetch()"| B("script.js")
    B -->|"populates"| C{"Worker Dropdown"}
    B -->|"renders via Pug templates"| D["#report-content"]
    C -->|"change selection"| B
