const API_URL = "https://catai67-testing-env.hf.space/predict";

const FEATURES = [
  { name: "Age", unit: "years", default: 50 },
  { name: "WBC Count", unit: "10⁹/L", default: 7.5 },
  { name: "Hemoglobin", unit: "g/dL", default: 13.5 },
  { name: "Platelets", unit: "10⁹/L", default: 250 },
  { name: "Neutrophils", unit: "%", default: 60 },
  { name: "Lymphocytes", unit: "%", default: 30 },
  { name: "Monocytes", unit: "%", default: 5 },
  { name: "Eosinophils", unit: "%", default: 2 },
  { name: "Basophils", unit: "%", default: 1 },
  { name: "LDH", unit: "U/L", default: 180 },
  { name: "CRP", unit: "mg/L", default: 3 },
  { name: "Creatinine", unit: "mg/dL", default: 1 },
  { name: "ALT", unit: "U/L", default: 25 },
  { name: "AST", unit: "U/L", default: 22 },
  { name: "Bilirubin", unit: "mg/dL", default: 0.8 },
  { name: "Glucose", unit: "mg/dL", default: 90 },
  { name: "Sodium", unit: "mmol/L", default: 140 },
  { name: "Potassium", unit: "mmol/L", default: 4.2 },
  { name: "Calcium", unit: "mg/dL", default: 9.5 },
  { name: "Albumin", unit: "g/dL", default: 4.0 }
];

const container = document.getElementById("inputs");
const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

// STORE INPUT REFERENCES
const inputs = [];
const naChecks = [];

// BUILD FORM
FEATURES.forEach((f, i) => {

  const block = document.createElement("div");
  block.className = "feature-block";

  const label = document.createElement("div");
  label.className = "feature-label";
  label.innerText = `${f.name} (${f.unit})`;

  const input = document.createElement("input");
  input.type = "number";
  input.value = f.default;
  input.id = `f${i}`;

  const naWrapper = document.createElement("label");
  naWrapper.className = "na-wrapper";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `na${i}`;

  const text = document.createElement("span");
  text.innerText = "NA";

  // HANDLE NA TOGGLE
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      input.value = "NA";
      input.disabled = true;
    } else {
      input.disabled = false;
      input.value = f.default;
    }
  });

  naWrapper.appendChild(checkbox);
  naWrapper.appendChild(text);

  block.appendChild(label);
  block.appendChild(input);
  block.appendChild(naWrapper);

  container.appendChild(block);

  inputs.push(input);
  naChecks.push(checkbox);
});

async function predict() {

  const btn = document.getElementById("btn");

  const features = FEATURES.map((_, i) => {

    if (naChecks[i].checked) {
      return null; // proper ML missing value representation
    }

    const val = parseFloat(inputs[i].value);
    return isNaN(val) ? 0 : val;
  });

  loading.classList.remove("hidden");
  resultBox.innerHTML = "";
  btn.disabled = true;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features })
    });

    const data = await res.json();

    const risk =
      data.probability > 0.7 ? "🔴 High Risk"
      : data.probability > 0.4 ? "🟠 Moderate Risk"
      : "🟢 Low Risk";

    resultBox.innerHTML = `
      <div><b>Prediction:</b> ${data.prediction}</div>
      <div><b>Probability:</b> ${data.probability.toFixed(3)}</div>
      <div><b>Status:</b> ${risk}</div>
    `;

  } catch (err) {
    resultBox.innerHTML = "Error contacting model";
  }

  loading.classList.add("hidden");
  btn.disabled = false;
}