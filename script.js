const API_URL = "https://catai67-testing-env.hf.space/predict";

const FEATURES = [
  { name: "Age", default: 50 },
  { name: "WBC Count", default: 7.5 },
  { name: "Hemoglobin", default: 13.5 },
  { name: "Platelets", default: 250 },
  { name: "Neutrophils", default: 60 },
  { name: "Lymphocytes", default: 30 },
  { name: "Monocytes", default: 5 },
  { name: "Eosinophils", default: 2 },
  { name: "Basophils", default: 1 },
  { name: "LDH", default: 180 },
  { name: "CRP", default: 3 },
  { name: "Creatinine", default: 1 },
  { name: "ALT", default: 25 },
  { name: "AST", default: 22 },
  { name: "Bilirubin", default: 0.8 },
  { name: "Glucose", default: 90 },
  { name: "Sodium", default: 140 },
  { name: "Potassium", default: 4.2 },
  { name: "Calcium", default: 9.5 },
  { name: "Albumin", default: 4.0 }
];

const container = document.getElementById("inputs");
const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

FEATURES.forEach((f, i) => {

  const row = document.createElement("div");
  row.className = "row";

  const label = document.createElement("label");
  label.innerText = f.name;

  const input = document.createElement("input");
  input.type = "number";
  input.value = f.default;
  input.id = `f${i}`;

  row.appendChild(label);
  row.appendChild(input);
  container.appendChild(row);
});

async function predict() {

  const btn = document.getElementById("btn");

  const features = FEATURES.map((_, i) =>
    parseFloat(document.getElementById(`f${i}`).value || 0)
  );

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

  } catch (e) {
    resultBox.innerHTML = "Error contacting model";
  }

  loading.classList.add("hidden");
  btn.disabled = false;
}