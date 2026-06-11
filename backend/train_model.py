from sklearn.datasets import make_classification
from sklearn.ensemble import RandomForestClassifier
import joblib

X, y = make_classification(
    n_samples=1000,
    n_features=4,
    n_informative=4,
    n_redundant=0,
    random_state=42
)

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "model.pkl")

print("saved")