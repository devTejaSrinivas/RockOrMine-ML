document.getElementById('prediction-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const inputData = document.getElementById('input-data').value.split(',').map(Number);

    const response = await fetch('http://localhost:3000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input_data: inputData })
    });

    const result = await response.json();
    document.getElementById('result').innerText = 'Prediction: ' + (result.prediction === 'M' ? 'Mine' : 'Rock');
});
