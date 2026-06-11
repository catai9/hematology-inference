const API_URL = "https://catai67-testing-env.hf.space/predict";

// create 20 inputs dynamically
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
            parseFloat(document.getElementById("f" + i).value || 0)
        );
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ features })
        });

        const data = await res.json();

        document.getElementById("result").innerText =
            "Prediction: " + data.prediction +
            " | Probability: " + data.probability.toFixed(3);

    } catch (err) {
        document.getElementById("result").innerText =
            "Error connecting to model";
        console.error(err);
    }
}