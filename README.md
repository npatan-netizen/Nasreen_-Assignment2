# WCB Forms — Assignment 2

A dynamic browser-based application that loads worker data from a backend JSON file and renders professional reports using compiled Pug templates.

## Application Design: Two Forms, One Sheet

A major feature of this project is its **Single Page Application (SPA)** architecture. 

Rather than creating separate HTML pages for different forms, **both the "Medical & Travel Expense" form and the "Worker Progress Report" are built into a single sheet (`index.html`).** 
- A dynamic toolbar at the top of the page allows the user to instantly toggle between the two forms.
- The JavaScript logic swaps out the pre-compiled Pug templates on the fly without ever needing to reload the page!

## Architecture & Data Flow

This project uses Pug (formerly Jade) to generate HTML templates cleanly and efficiently.

```mermaid
graph LR
    A["data.json"] -->|"fetch()"| B("script.js")
    B -->|"populates"| C{"Worker Dropdown"}
    B -->|"renders via Pug templates"| D["#report-content"]
    C -->|"change selection"| B
