const API_URL = "https://catai67-testing-env.hf.space/predict";

const inputsContainer = document.getElementById("inputs");
const resultBox = document.getElementById("result");
const loading = document.getElementById("loading");

// create 20 inputs
for (let i = 0; i < 20; i++) {
  const input = document.createElement("input");
  input.type = "number";
  input.step = "any";
  input.placeholder = `F${i + 1}`;
  input.id = `f${i}`;
  inputsContainer.appendChild(input);
}

async function predict() {

  const btn = document.getElementById("btn");

  const features = [];

  for (let i = 0; i < 20; i++) {
    const val = document.getElementById(`f${i}`).value;
    features.push(parseFloat(val || 0));
  }

  // UI state
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
      <div><b>Prediction:</b> ${data.prediction}</div>
      <div><b>Probability:</b> ${data.probability.toFixed(3)}</div>
      <div><b>Status:</b> ${risk}</div>
    `;

  } catch (err) {
    resultBox.innerHTML = "❌ Error calling model";
    console.error(err);
  }

  loading.classList.add("hidden");
  btn.disabled = false;
}