# hematology-inference
Machine Learning Prediction Models of Rare Hematology Diseases: a free and open-source software package built in Python, with a user-friendly interface provided via HTML, that enables clinical hematologists and biologists to diagnose based solely on routine biological parameters. 

### Environment Setup

```bash
conda create --name hematology_inference python fastapi scikit-learn pandas joblib numpy
pip install fastapi uvicorn
conda activate hematology_inference
```

### Setup

GitHub Pages (Frontend)
        ↓
Fetch API
        ↓
Render (Python FastAPI Backend)
        ↓
Machine Learning Model


### Folder Structure

hematology-inference/

├── backend/
│   ├── app.py
│   ├── train_model.py
│   ├── model.pkl
│   ├── requirements.txt
│   └── render.yaml
│
└── frontend/
    ├── index.html
    ├── script.js
    └── style.css

### Setup

Train dummy model and save as `model.pkl` file:
```bash
cd backend
python3 train_model.py
```

Start the app locally to make sure it works:
```
python -m uvicorn app:app --reload
```
