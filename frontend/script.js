const API_URL =
"https://YOUR-RENDER-APP.onrender.com/predict";


async function predict() {

    const payload = {

        f1: parseFloat(
            document.getElementById("f1").value
        ),

        f2: parseFloat(
            document.getElementById("f2").value
        ),

        f3: parseFloat(
            document.getElementById("f3").value
        ),

        f4: parseFloat(
            document.getElementById("f4").value
        )
    };

    const response =
        await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(payload)
        });

    const result =
        await response.json();

    document.getElementById("result")
        .innerHTML = `
            Prediction:
            ${result.prediction}
            <br><br>

            Class 0 Probability:
            ${(result.class0_probability*100).toFixed(2)}%
            <br>

            Class 1 Probability:
            ${(result.class1_probability*100).toFixed(2)}%
        `;
}