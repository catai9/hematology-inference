const API_URL = "https://catai67-testing-env.hf.space/predict";

/*
  20 FEATURE NAMES + DEFAULT VALUES
  (you can rename these to your real dataset later)
*/
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

const inputsContainer = document.getElementById("inputs");
const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

// CREATE FORM DYNAMICALLY
FEATURES.forEach((feature, index) => {

  const wrapper = document.createElement("div");
  wrapper.className = "input-box";

  const label = document.createElement("label");
  label.innerText = feature.name;

  const input = document.createElement("input");
  input.type = "number";
  input.step = "any";
  input.value = feature.default;
  input.id = `f${index}`;

  wrapper.appendChild(label);
  wrapper.appendChild(input);

  inputsContainer.appendChild(wrapper);
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
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ features })
    });

    if (!response.ok) {
      throw new Error("API error: " + response.status);
    }

    const data = await response.json();

    const risk =
      data.probability > 0.7 ? "🔴 High Risk"
      : data.probability > 0.4 ? "🟠 Medium Risk"
      : "🟢 Low Risk";

    resultBox.innerHTML = `
      <h3>Prediction: ${data.prediction}</h3>
      <p>Probability: ${data.probability.toFixed(3)}</p>
      <p>Status: ${risk}</p>
    `;

  } catch (err) {
    resultBox.innerHTML = "❌ Error calling model";
    console.error(err);
  }

  loading.classList.add("hidden");
  btn.disabled = false;
}