function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderHeader(title, claimNumber, badge, workerName, workerRole) {
  return `
<header class="form-header">
  <div class="logo-section">
    <img class="wcb-logo" src="assets/WCB_of_Manitoba_logo.png" alt="WCB Workers Compensation Board of Manitoba">
  </div>
  <div class="address-section">
    <p>333 Broadway</p>
    <p>Winnipeg, MB R3C 4W3</p>
    <p>Phone: (204) 954-4321</p>
    <p>Toll Free: 1-855-954-4321</p>
    <p>wcb.mb.ca</p>
  </div>
  <div class="title-section">
    <h1>${escapeHtml(title)}</h1>
    ${workerName ? `<p class="report-worker">Worker: <span class="blue-data">${escapeHtml(workerName)}</span></p>` : ""}
    ${workerRole ? `<p class="report-role">Role: <span class="blue-data">${escapeHtml(workerRole)}</span></p>` : ""}
    <div class="claim-container">
      <div class="claim-box">Claim No. <span class="blue-data">${escapeHtml(claimNumber)}</span></div>
      ${badge ? `<div class="wp-box">${escapeHtml(badge)}</div>` : ""}
    </div>
  </div>
</header>`;
}

function renderPageFooter(appId, submitted, pageLabel) {
  return `
<footer class="form-footer">
  <div class="footer-left">Worker App ID: <span class="blue-data">${escapeHtml(appId)}</span></div>
  <div class="footer-right">Submitted: <span class="blue-data">${escapeHtml(submitted)}</span><br><span class="page-number">${escapeHtml(pageLabel)}</span></div>
</footer>`;
}

function renderTable(columns, rows) {
  const head = columns.map((col) => `<th>${escapeHtml(col)}</th>`).join("");
  const body =
    rows && rows.length
      ? rows
          .map(
            (row) =>
              `<tr>${row.map((cell) => `<td class="blue-data">${escapeHtml(cell)}</td>`).join("")}</tr>`,
          )
          .join("")
      : `<tr><td class="blue-data" colspan="${columns.length}">�</td></tr>`;
  return `
<table class="expense-table">
  <thead><tr>${head}</tr></thead>
  <tbody>${body}</tbody>
</table>`;
}

function renderExpenseSection(title, columns, rows, note) {
  return `
<section class="expense-section">
  <h2 class="section-heading">${escapeHtml(title)}</h2>
  ${note ? `<p class="section-note">${escapeHtml(note)}</p>` : ""}
  ${renderTable(columns, rows)}
</section>`;
}

function renderMedical(locals) {
  const data = locals.data || {};
  const workerRole = locals.workerRole || "";
  return `
<div class="page-container expense-page">
  ${renderHeader("Medical & Travel Expense Request", data.claimNumber, null, data.workerName, workerRole)}
  <p class="intro-text"><span class="blue-data">${escapeHtml(data.workerName)}</span> requested reimbursement for the following medical and/or travel expenses:</p>
  ${renderExpenseSection("Prescription Drugs", ["Drug Name", "Prescription Date", "Date Purchased", "Healthcare Provider Name", "Paid Amount"], data.prescriptionDrugs)}
  ${renderExpenseSection("Over-the-Counter Drugs", ["Drug Name", "Date Purchased", "Paid Amount", "Seller's Name", "Reason for Purchasing"], data.otcDrugs)}
  ${renderExpenseSection("Bandages, Braces or Other Medical Supplies", ["Item Purchased", "Date Purchased", "Was this Prescribed?", "Healthcare Provider Name", "Paid Amount", "Seller's Name"], data.medicalSupplies)}
  ${renderExpenseSection("Parking for Medical Appointments", ["Address of Healthcare Provider/Medical Facility", "Date", "Paid Amount", "Meter Used?", "Meter Number"], data.parking)}
  ${renderPageFooter(data.appId, data.submitDateTime, "Page 1 of 2")}
</div>
<div class="page-container expense-page">
  ${renderExpenseSection("Mileage to Medical Appointments", ["Appointment Date", "Address of Healthcare Provider/Medical Facility", "Address of Workplace", "Number of km (Round Trip)"], data.mileageAppointments, "The WCB will generally reimburse only those transportation costs which are in excess of costs that would be incurred by the worker while travelling to and from work.")}
  ${renderExpenseSection("Bus or Taxi Fare for Medical Appointments*", ["Appointment Date", "Address of Starting Point", "Address of Healthcare Provider/Medical Facility", "Bus or Taxi (indicate one)", "Total Fare Paid"], data.busTaxiFares, "*Note: Pre-approval is required from your WCB representative to claim taxi fare(s).")}
  <div class="certify-section medical-privacy">
    <div class="certify-item">
      <span class="checkbox-mark checked"></span>
      <div class="certify-text">I understand that the <a class="privacy-link" href="#">Privacy Notice</a> applies to the personal information collected in this document.</div>
    </div>
  </div>
  ${renderPageFooter(data.appId, data.submitDateTime, "Page 2 of 2")}
</div>`;
}
