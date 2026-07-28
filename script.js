const dataUrl = "data.json";
// browser data source file
let workers = {};
let currentForm = "worker";
let currentWorker = "nasreen";

// load JSON and initialize the worker dropdown
function fetchWorkerData() {
  const report = document.getElementById("report-content");
  report.innerHTML = '<p class="loading-msg">Loading data...</p>';

  fetch(dataUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Unable to load data.json");
      }
      return response.json();
    })
    .then((json) => {
      if (!json.workers || typeof json.workers !== "object") {
        throw new Error("Malformed data.json — missing workers object.");
      }

      workers = json.workers;
      if (!workers[currentWorker]) {
        currentWorker = Object.keys(workers)[0];
      }

      populateWorkerSelect();
      renderForm();
    })
    .catch((error) => {
      report.innerHTML = `<p class="error-msg">Failed to load data: ${error.message}</p>`;
      console.error(error);
    });
}

function populateWorkerSelect() {
  const select = document.getElementById("worker-select");
  if (!select) return;

  select.innerHTML = Object.entries(workers)
    .map(
      ([workerKey, worker]) =>
        `<option value="${workerKey}">${worker.workerName}</option>`,
    )
    .join("");

  select.value = currentWorker;
  select.addEventListener("change", (event) => {
    currentWorker = event.target.value;
    renderForm();
  });
}

function getSelectedWorker() {
  return workers[currentWorker] || workers[Object.keys(workers)[0]];
}

function renderForm() {
  const report = document.getElementById("report-content");
  const selectedData = getSelectedWorker();

  if (!selectedData) {
    report.innerHTML = '<p class="error-msg">No worker data available.</p>';
    return;
  }

  const locals = {
    data: selectedData,
    selectedWorker: selectedData.workerName,
    workerRole: selectedData.role,
    workers: Object.keys(workers),
  };

  const html =
    currentForm === "medical" ? renderMedical(locals) : renderWorker(locals);

  report.innerHTML = html;
  updateToolbarState();
}

function updateToolbarState() {
  document
    .getElementById("btn-form-medical")
    .classList.toggle("active", currentForm === "medical");
  document
    .getElementById("btn-form-worker")
    .classList.toggle("active", currentForm === "worker");
}

// print button triggers browser print dialog, use Save as PDF in browser
// print button opens browser print dialog, then choose Save as PDF
function printReport() {
  window.print();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn-form-medical").addEventListener("click", () => {
    currentForm = "medical";
    renderForm();
  });

  document.getElementById("btn-form-worker").addEventListener("click", () => {
    currentForm = "worker";
    renderForm();
  });

  document.getElementById("print-btn").addEventListener("click", printReport);
  fetchWorkerData();
});
