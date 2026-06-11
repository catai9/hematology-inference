const API_URL = "https://catai67-testing-env.hf.space/predict";

const FEATURES = [
  { name: "Age", unit: "years", default: 50 },
  { name: "Heart Rate", unit: "bpm", default: 72 },
  { name: "Systolic BP", unit: "mmHg", default: 120 },
  { name: "Diastolic BP", unit: "mmHg", default: 80 },
  { name: "Glucose", unit: "mg/dL", default: 95 },
  { name: "BMI", unit: "kg/m²", default: 24 }
];

const state = {};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("inputs");

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

    const naRow = document.createElement("div");
    naRow.className = "na-row";

    const label = document.createElement("span");
    label.textContent = "Not available (NA)";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        input.disabled = true;
        input.value = "";
      } else {
        input.disabled = false;
        input.value = f.default;
      }
    });

    naRow.appendChild(label);
    naRow.appendChild(checkbox);

    card.appendChild(title);
    card.appendChild(sub);
    card.appendChild(input);
    card.appendChild(naRow);

    container.appendChild(card);

    state[i] = { input, checkbox };
  });

  document.getElementById("predictBtn")
    .addEventListener("click", predict);
});

async function predict() {
  const loading = document.getElementById("loading");
  const result = document.getElementById("result");
  const btn = document.getElementById("predictBtn");

  loading.classList.remove("hidden");
  result.classList.add("hidden");
  btn.disabled = true;

  try {
    // Build feature vector
    const features = FEATURES.map((f, i) => {
      const el = state[i].input;
      return el.disabled ? null : Number(el.value);
    });

    // basic validation
    if (features.every(v => v === null)) {
      throw new Error("No valid features provided.");
    }

    // 🔐 API CALL
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        features,
        timestamp: new Date().toISOString(),
        model: "clinical-risk-v1"
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // 🧠 Normalize response
    const riskLevel = data.risk_level || "Unknown";
    const score = data.risk_score ?? 0;

    // 📊 Render result
    result.innerHTML = `
      <strong>Clinical Prediction Result</strong><br/><br/>
      Risk Level: ${formatRisk(riskLevel)}<br/>
      Score: ${Number(score).toFixed(3)}<br/>
      Model Version: ${data.model_version || "n/a"}
    `;

    result.classList.remove("hidden");

    // 🧾 Audit log (client-side trace)
    console.log("[AUDIT]", {
      features,
      result: data,
      time: new Date().toISOString()
    });

  } catch (err) {
    result.innerHTML = `
      <strong style="color:#ef4444;">Error</strong><br/>
      ${err.message}
    `;
    result.classList.remove("hidden");

  } finally {
    loading.classList.add("hidden");
    btn.disabled = false;
  }
}

function formatRisk(level) {
  switch (level.toLowerCase()) {
    case "high": return "High Risk 🔴";
    case "moderate": return "Moderate Risk 🟠";
    case "low": return "Low Risk 🟢";
    default: return level;
  }
}