# 🏪 Store Sales Intelligence Dashboard

**AI-Powered Sales Predictor for Gas Stations**
Predict daily store sales using gas sales, lotto sales, and day type (weekday/weekend). Visualize historical trends, run scenario analyses, and gain business insights.

---

## 🔗 Live Demo

* **Backend API:** [https://store-sales-api-1.onrender.com](https://store-sales-api-1.onrender.com)
* **Frontend App:** [https://store-sales-frontend.onrender.com](https://store-sales-frontend.onrender.com)

---

## 📦 Features

### Backend

* FastAPI REST API for predictions
* Train a **linear regression model** on historical sales data
* Single and batch predictions
* Historical data endpoints
* Model info endpoints
* Sample ranges for frontend input sliders

### Frontend

* React dashboard with interactive inputs
* Sales charts (line, bar, pie)
* Prediction history table
* Scenario analysis for best, worst, and average days
* Business insights and recommendations

---

## 🛠 Technologies

* **Backend:** Python, FastAPI, NumPy, Pandas
* **Frontend:** React.js, Axios, Chart.js
* **Deployment:** Render
* **Version Control:** Git & GitHub

---

## ⚙️ Installation

### Backend

```bash
git clone https://github.com/okanteh1-gsu/store_sales_api.git
cd store_sales_api
python -m venv venv
source venv/bin/activate  # macOS/Linux
# .\venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend

```bash
git clone https://github.com/okanteh1-gsu/store-sales-frontend.git
cd store-sales-frontend
npm install
npm start
```

---

## 🔧 API Endpoints (Backend)

| Endpoint             | Method | Description                     |
| -------------------- | ------ | ------------------------------- |
| `/`                  | GET    | API root                        |
| `/predict`           | POST   | Predict sales for a single day  |
| `/predict_batch`     | POST   | Predict sales for multiple days |
| `/history`           | GET    | Retrieve historical sales data  |
| `/model_info`        | GET    | Get model weights & info        |
| `/sample_ranges`     | GET    | Min, max, mean for inputs       |
| `/weekly_sales_json` | GET    | JSON data for charts            |

**Sample Request (Single Prediction):**

```json
POST /predict
{
  "TotalGasGallons": 500,
  "LottoSales": 200,
  "DayType": 0
}
```

---

## 📊 Screenshots

<img width="1452" height="836" alt="Screenshot 2025-10-21 at 2 59 43 AM" src="https://github.com/user-attachments/assets/b1b764fa-5d79-400f-8d11-350e42bfacc7" />
<img width="1439" height="819" alt="Screenshot 2025-10-21 at 3 00 07 AM" src="https://github.com/user-attachments/assets/b3e3aeec-7c1d-4afb-9ef1-27be1b211b65" />



---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License © Omar Kanteh

---
