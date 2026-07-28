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

function renderCheckbox(label, checked) {
  return `
<label class="checkbox-item">
  <input type="checkbox" disabled${checked ? " checked" : ""}>
  <span>${escapeHtml(label)}</span>
</label>`;
}

function renderFillLine(value, label, widthClass) {
  return `
<div class="inline-input ${escapeHtml(widthClass)}">
  <span class="line-value blue-data">${escapeHtml(value || "\u00a0")}</span>
  ${label ? `<span class="input-label">${escapeHtml(label)}</span>` : ""}
</div>`;
}

function renderPainScale(selectedLevel) {
  const boxes = Array.from({ length: 10 }, (_, index) => {
    const value = index + 1;
    return `<label class="pain-box"><input type="checkbox" disabled${String(selectedLevel) === String(value) ? " checked" : ""}>${value}</label>`;
  });
  return `
<div class="pain-options">
  ${boxes.join("")}
</div>`;
}

function renderWorker(locals) {
  const data = locals.data || {};
  const workerRole = locals.workerRole || "";
  return `
<div class="page-container">
  ${renderHeader("Worker Progress Report", data.claimNumber, "WP", data.workerName, workerRole)}
  <p class="intro-text"><span class="blue-data">${escapeHtml(data.workerName)}</span> provided the following updates in relation to their claim:</p>
  <h2>Return to Work</h2>
  <div class="form-box">
    <span class="select-one-label">Select one:</span>
    <div class="checkbox-group vertical">
      ${renderCheckbox("I have not missed time from work", data.rtwStatus === "not-missed")}
      ${renderCheckbox("I have not returned to work", data.rtwStatus === "not-returned")}
      ${renderCheckbox("I returned to work on:", data.rtwStatus === "returned")}
      ${renderFillLine(data.rtwDate, "Date", "medium-line")}
    </div>
  </div>
  <div class="form-box">
    <span class="select-one-label">I am working:</span>
    <div class="checkbox-group">
      ${renderCheckbox("Full duties, regular hours", data.workingStatus === "full-reg")}
      ${renderCheckbox("Full duties, reduced hours", data.workingStatus === "full-red")}
      ${renderCheckbox("Modified duties, regular hours", data.workingStatus === "mod-reg")}
      ${renderCheckbox("Modified duties, reduced hours", data.workingStatus === "mod-red")}
      <label class="checkbox-item">
        <input type="checkbox" disabled${data.workingStatus === "other" ? " checked" : ""}>
        <span>Other:</span>
      </label>
      ${renderFillLine(data.workingOther, "", "long-line")}
    </div>
  </div>
  <div class="form-box">
    <span class="select-one-label">My return to work is going:</span>
    <p class="textarea-display blue-data">${escapeHtml(data.rtwGoing)}</p>
  </div>
  <div class="inline-form-row">
    I expect to return to work on:
    ${renderFillLine(data.expectRtwDate, "Date", "medium-line")}
  </div>
  <div class="form-box">
    <span class="select-one-label">I have the following concerns about returning to work:</span>
    <p class="textarea-display blue-data">${escapeHtml(data.rtwConcerns)}</p>
  </div>
  <div class="inline-form-row spaced">
    I was most recently in contact with:
    ${renderFillLine(data.contactName, "(Name of employer contact)", "medium-line")}
    on
    ${renderFillLine(data.contactDate, "Date", "medium-line")}
  </div>
  <h2>Recovery</h2>
  <div class="form-box">
    <span class="select-one-label">Select one:</span>
    <div class="checkbox-group vertical">
      ${renderCheckbox("I have not fully recovered from my workplace injury.", data.recoveryStatus === "not-fully")}
      ${renderCheckbox("I have fully recovered from my workplace injury.", data.recoveryStatus === "fully")}
    </div>
  </div>
  <div class="form-box">
    <span class="select-one-label">I have provided the following comments about my recovery:</span>
    <p class="textarea-display blue-data">${escapeHtml(data.recoveryComments)}</p>
  </div>
  ${renderPageFooter(data.appId, data.submitDateTime, "Page 1 of 3")}
</div>
<div class="page-container">
  <div class="pain-scale-section">
    <p>I rate my current pain/discomfort on a scale of 1-10, where 1 is no pain and 10 is severe pain out of 10.</p>
    ${renderPainScale(data.painLevel)}
  </div>
  <div class="form-box">
    <span class="select-one-label">Medical treatment status</span>
    <p class="textarea-display blue-data">${escapeHtml(data.medTreatment)}</p>
  </div>
  <div class="form-box">
    <span class="select-one-label">Provider type</span>
    <p class="textarea-display blue-data">${escapeHtml(data.medProviderType)}</p>
  </div>
  <div class="inline-form-row">
    Last appointment:
    ${renderFillLine(data.lastMedDate, "", "medium-line")}
    ${renderFillLine(data.lastMedName, "Provider", "long-line")}
  </div>
  <div class="inline-form-row">
    Next appointment:
    ${renderFillLine(data.nextMedDate, "", "medium-line")}
    ${renderFillLine(data.nextMedName, "Provider", "long-line")}
  </div>
  <div class="form-box">
    <span class="select-one-label">Chiropractor / physiotherapist frequency</span>
    <p class="textarea-display blue-data">${escapeHtml(data.chiroFreq)}</p>
  </div>
  <div class="form-box">
    <span class="select-one-label">Medication and exercises</span>
    <p class="textarea-display blue-data">${escapeHtml(data.medicationName)}</p>
    <p class="textarea-display blue-data">${escapeHtml(data.exercisesList)}</p>
  </div>
  <div class="form-box">
    <span class="select-one-label">Additional information</span>
    <p class="textarea-display blue-data">${escapeHtml(data.additionalInfo)}</p>
  </div>
  ${renderPageFooter(data.appId, data.submitDateTime, "Page 2 of 3")}
</div>
<div class="page-container">
  <div class="certify-section">
    <div class="certify-item">
      <span class="checkbox-mark checked"></span>
      <div class="certify-text">I certify that the information provided is true and correct.</div>
    </div>
    <div class="certify-item">
      <span class="checkbox-mark checked"></span>
      <div class="certify-text">I understand that the <a class="privacy-link" href="#">Privacy Notice</a> applies to this information.</div>
    </div>
  </div>
  ${renderPageFooter(data.appId, data.submitDateTime, "Page 3 of 3")}
</div>`;
}
