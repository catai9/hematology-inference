# hematology-inference
Machine Learning Prediction Models of Rare Hematology Diseases: a free and open-source software package built in Python, with a user-friendly interface provided via HTML, that enables clinical hematologists and biologists to diagnose based solely on routine biological parameters. 

### Environment Setup

```bash
conda create --name hematology_inference python fastapi scikit-learn pandas joblib numpy
pip install fastapi uvicorn
conda install xgboost
conda activate hematology_inference
```

### Setup

Frontend (GitHub Pages)
      ↓
Hugging Face Space
      ↓
FastAPI app
      ↓
XGBoost model

### Folder Structure

hematology-inference/
space/
├── app.py
├── xgb_model.pkl
├── train_model.py   (optional, local only)
├── requirements.txt
└── README.md

### Setup

Train dummy model and save as `model.pkl` file:
```bash
cd space
python3 train_model.py
```

Start the app locally to make sure it works:
```
uvicorn app:app --host 0.0.0.0 --port 7860
```
