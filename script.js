const API_URL = "https://catai67-testing-env.hf.space/predict";
// curl -X POST "https://catai67-testing-env.hf.space/predict" \
// -H "Content-Type: application/json" \
// -d '{
//   "features": [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
// }'

// create 20 inputs
const container = document.getElementById("inputs");

for (let i = 0; i < 20; i++) {
    const input = document.createElement("input");
    input.placeholder = "Feature " + (i + 1);
    input.id = "f" + i;
    container.appendChild(input);
    container.appendChild(document.createElement("br"));
}

async function predict() {

    const features = [];

    for (let i = 0; i < 20; i++) {
        features.push(
            parseFloat(document.getElementById("f" + i).value)
        );
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ features })
    });

    const data = await response.json();

    document.getElementById("result").innerText =
        "Prediction: " + data.prediction +
        " | Probability: " + data.probability.toFixed(3);
}