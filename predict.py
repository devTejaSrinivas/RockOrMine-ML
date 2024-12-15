import sys
import numpy as np
import pandas as pd
from sklearn.linear_model import LogisticRegression

# Load the model
model = LogisticRegression()
sonar_data = pd.read_csv('sonar_data.csv', header=None)
X = sonar_data.drop(columns=60, axis=1)
Y = sonar_data[60]
model.fit(X, Y)

# Get input data from command line arguments
input_data = list(map(float, sys.argv[1:]))

# Convert input data to numpy array and reshape
input_data_as_numpy_array = np.asarray(input_data).reshape(1, -1)

# Make prediction
prediction = model.predict(input_data_as_numpy_array)

# Print prediction
print(prediction[0])
