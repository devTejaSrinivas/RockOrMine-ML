const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/predict', (req, res) => {
    const inputData = req.body.input_data;

    // Convert input data array to string of space-separated values
    const inputString = inputData.join(' ');

    // Call Python script for prediction
    exec(`python predict.py ${inputString}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send(error.message);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
            return res.status(500).send(stderr);
        }
        
        // Send prediction result back to client
        res.json({ prediction: stdout.trim() });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
