const FEATURES = [
  { name: "Age", unit: "years", default: 50 },
  { name: "Heart Rate", unit: "bpm", default: 72 },
  { name: "Systolic BP", unit: "mmHg", default: 120 },
  { name: "Diastolic BP", unit: "mmHg", default: 80 },
  { name: "Glucose", unit: "mg/dL", default: 95 },
  { name: "BMI", unit: "kg/m²", default: 24 }
];

const state = {};

function init() {
  const container = document.getElementById("inputs");

  if (!container) {
    console.error("❌ #inputs not found in DOM");
    return;
  }

  FEATURES.forEach((f, i) => {
    const card = document.createElement("div");
    card.className = "feature-card";

    const title = document.createElement("div");
    title.className = "feature-title";
    title.textContent = f.name;

    const sub = document.createElement("div");
    sub.className = "feature-sub";
    sub.textContent = `Unit: ${f.unit}`;

    const input = document.createElement("input");
    input.type = "number";
    input.value = f.default;

    const row = document.createElement("div");
    row.className = "na-row";

    const label = document.createElement("span");
    label.textContent = "NA";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", () => {
      input.disabled = checkbox.checked;
      if (checkbox.checked) input.value = "";
      else input.value = f.default;
    });

    row.appendChild(label);
    row.appendChild(checkbox);

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(input);
    card.appendChild(row);

    container.appendChild(card);

    state[i] = { input };
  });

  console.log("✅ UI rendered successfully");
}

async function predict() {
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");
  const btn = document.getElementById("predictBtn");

  loading.classList.remove("hidden");
  result.classList.add("hidden");
  btn.disabled = true;

  try {
    const features = FEATURES.map((_, i) => {
      const val = state[i].input.value;
      return val === "" ? null : Number(val);
    });

    const response = await fetch("http://localhost:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features })
    });

    const data = await response.json();

    result.innerHTML = `
      <strong>Result</strong><br/><br/>
      Risk: ${data.risk_level}<br/>
      Score: ${data.risk_score}
    `;

    result.classList.remove("hidden");

  } catch (e) {
    result.innerHTML = "❌ Error: " + e.message;
    result.classList.remove("hidden");
  }

  loading.classList.add("hidden");
  btn.disabled = false;
}

document.addEventListener("DOMContentLoaded", init);