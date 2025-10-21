import React, { useState, useEffect } from "react";
import axios from "axios";
import SalesChart from "./components/SalesChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import DataTable from "./components/DataTable";
import "./App.css";

const API_BASE = "https://store-sales-api-1.onrender.com";

function App() {
  const [prediction, setPrediction] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState("checking");
  const [activeTab, setActiveTab] = useState("predictor");
  const [scenarios, setScenarios] = useState([]);
  const [insights, setInsights] = useState([]);

  const [inputs, setInputs] = useState({
    TotalGasGallons: 500,
    LottoSales: 200,
    DayType: 0,
  });

  useEffect(() => {
    checkApiHealth();
    fetchChartData();
    generateInsights();
  }, []);

  const checkApiHealth = async () => {
    try {
      const response = await axios.get(`${API_BASE}/health`);
      setApiStatus("healthy");
    } catch (error) {
      setApiStatus("unhealthy");
      loadFallbackData();
    }
  };

  const fetchChartData = async () => {
    try {
      const response = await axios.get(`${API_BASE}/chart_data`);
      setChartData(response.data);
    } catch (error) {
      loadFallbackData();
    }
  };

  const loadFallbackData = () => {
    const fallbackData = [
      {
        name: "Day 1",
        TotalSales: 1200,
        GasSold: 500,
        Lotto: 200,
        DayType: "Weekday",
      },
      {
        name: "Day 2",
        TotalSales: 1100,
        GasSold: 450,
        Lotto: 180,
        DayType: "Weekday",
      },
      {
        name: "Day 3",
        TotalSales: 1500,
        GasSold: 600,
        Lotto: 220,
        DayType: "Weekend",
      },
      {
        name: "Day 4",
        TotalSales: 1300,
        GasSold: 550,
        Lotto: 210,
        DayType: "Weekday",
      },
      {
        name: "Day 5",
        TotalSales: 1000,
        GasSold: 400,
        Lotto: 150,
        DayType: "Weekday",
      },
    ];
    setChartData(fallbackData);
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/predict`, inputs);
      setPrediction(response.data);
      addToScenarioHistory(response.data);
    } catch (error) {
      const fallbackPrediction =
        144.25678737 +
        inputs.TotalGasGallons * 1.26595992 +
        inputs.LottoSales * 2.15510668 +
        inputs.DayType * 116.73350928;
      const fallbackData = {
        predicted_sales: Math.round(fallbackPrediction * 100) / 100,
        input_features: inputs,
      };
      setPrediction(fallbackData);
      addToScenarioHistory(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const addToScenarioHistory = (predictionData) => {
    const newScenario = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString(),
      inputs: { ...inputs },
      prediction: predictionData.predicted_sales,
      actual: null,
    };

    setScenarios((prev) => [newScenario, ...prev.slice(0, 9)]);
  };

  const generateInsights = () => {
    const generatedInsights = [
      {
        id: 1,
        title: "Weekend Boost",
        description:
          "Weekends typically generate $116 more in sales compared to weekdays",
        impact: "high",
        type: "revenue",
      },
      {
        id: 2,
        title: "Gas Sales Impact",
        description:
          "Each additional gallon of gas sold increases total sales by $1.27",
        impact: "medium",
        type: "efficiency",
      },
      {
        id: 3,
        title: "Lotto Performance",
        description:
          "Lotto sales have a 2.15x multiplier effect on total revenue",
        impact: "high",
        type: "revenue",
      },
      {
        id: 4,
        title: "Peak Hours",
        description:
          "Focus on high-traffic periods to maximize gas and lotto sales",
        impact: "medium",
        type: "strategy",
      },
    ];
    setInsights(generatedInsights);
  };

  const runScenarioAnalysis = () => {
    const scenarios = [
      {
        name: "Best Case",
        gas: 600,
        lotto: 250,
        dayType: 1,
        description: "High traffic weekend",
      },
      {
        name: "Worst Case",
        gas: 400,
        lotto: 150,
        dayType: 0,
        description: "Low traffic weekday",
      },
      {
        name: "Average Day",
        gas: 500,
        lotto: 200,
        dayType: 0,
        description: "Typical weekday",
      },
    ];

    const scenarioResults = scenarios.map((scenario) => {
      const prediction =
        144.25678737 +
        scenario.gas * 1.26595992 +
        scenario.lotto * 2.15510668 +
        scenario.dayType * 116.73350928;

      return {
        ...scenario,
        predictedSales: Math.round(prediction * 100) / 100,
      };
    });

    return scenarioResults;
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: field === "DayType" ? parseInt(value) : parseFloat(value),
    }));
  };

  const scenarioAnalysis = runScenarioAnalysis();

  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">🏪 Store Sales Intelligence Dashboard</h1>
        <p className="subtitle">
          AI-Powered Sales Predictions & Business Insights
        </p>
        <div className={`api-status ${apiStatus}`}>
          API Status:{" "}
          {apiStatus === "healthy" ? "✅ Connected" : "❌ Using Fallback Data"}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "predictor" ? "active" : ""}`}
            onClick={() => setActiveTab("predictor")}
          >
            🎯 Sales Predictor
          </button>
          <button
            className={`tab ${activeTab === "insights" ? "active" : ""}`}
            onClick={() => setActiveTab("insights")}
          >
            📊 Business Insights
          </button>
          <button
            className={`tab ${activeTab === "scenarios" ? "active" : ""}`}
            onClick={() => setActiveTab("scenarios")}
          >
            🔄 Scenarios
          </button>
          <button
            className={`tab ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            📈 Prediction History
          </button>
        </div>
      </div>

      <div className="content">
        <div className="left-column">
          {/* Sales Predictor Card */}
          <div className="card">
            <h2 className="card-title">Enter Today's Data</h2>

            {/* Gas Sold Input */}
            <div className="input-group">
              <label className="label">Gas Sold (Gallons)</label>
              <div className="input-with-slider">
                <input
                  type="range"
                  className="slider"
                  value={inputs.TotalGasGallons}
                  onChange={(e) =>
                    handleInputChange("TotalGasGallons", e.target.value)
                  }
                  min="0"
                  max="1000"
                  step="10"
                />
                <div className="input-with-buttons">
                  <input
                    type="number"
                    className="number-input"
                    value={inputs.TotalGasGallons}
                    onChange={(e) =>
                      handleInputChange("TotalGasGallons", e.target.value)
                    }
                    min="0"
                    max="1000"
                    step="10"
                  />
                  <div className="input-buttons">
                    <button
                      type="button"
                      className="input-btn"
                      onClick={() =>
                        handleInputChange(
                          "TotalGasGallons",
                          Math.max(0, inputs.TotalGasGallons - 10)
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="input-btn"
                      onClick={() =>
                        handleInputChange(
                          "TotalGasGallons",
                          Math.min(1000, inputs.TotalGasGallons + 10)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="input-value-display">
                  Current: {inputs.TotalGasGallons} gallons
                </div>
              </div>
            </div>

            {/* Lotto Sales Input */}
            <div className="input-group">
              <label className="label">Lotto Sales ($)</label>
              <div className="input-with-slider">
                <input
                  type="range"
                  className="slider"
                  value={inputs.LottoSales}
                  onChange={(e) =>
                    handleInputChange("LottoSales", e.target.value)
                  }
                  min="0"
                  max="500"
                  step="10"
                />
                <div className="input-with-buttons">
                  <input
                    type="number"
                    className="number-input"
                    value={inputs.LottoSales}
                    onChange={(e) =>
                      handleInputChange("LottoSales", e.target.value)
                    }
                    min="0"
                    max="500"
                    step="10"
                  />
                  <div className="input-buttons">
                    <button
                      type="button"
                      className="input-btn"
                      onClick={() =>
                        handleInputChange(
                          "LottoSales",
                          Math.max(0, inputs.LottoSales - 10)
                        )
                      }
                    >
                      -
                    </button>
                    <button
                      type="button"
                      className="input-btn"
                      onClick={() =>
                        handleInputChange(
                          "LottoSales",
                          Math.min(500, inputs.LottoSales + 10)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="input-value-display">
                  Current: ${inputs.LottoSales}
                </div>
              </div>
            </div>

            {/* Day Type Select */}
            <div className="input-group">
              <label className="label">Day Type</label>
              <select
                className="select"
                value={inputs.DayType}
                onChange={(e) => handleInputChange("DayType", e.target.value)}
              >
                <option value={0}>📅 Weekday</option>
                <option value={1}>🎉 Weekend</option>
              </select>
            </div>

            <button
              className="predict-button"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? "🔮 Predicting..." : "🚀 Predict Sales"}
            </button>
          </div>

          {prediction && (
            <div className="prediction-card">
              <h3 className="prediction-title">Predicted Total Sales</h3>
              <div className="prediction-amount">
                ${prediction.predicted_sales}
              </div>
              <div className="prediction-details">
                <p>⛽ Gas: {inputs.TotalGasGallons} gallons</p>
                <p>🎫 Lotto: ${inputs.LottoSales}</p>
                <p>📅 Day: {inputs.DayType === 1 ? "Weekend" : "Weekday"}</p>
                <p>🕒 Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
          )}

          {/* Quick Insights Card */}
          {activeTab === "predictor" && (
            <div className="card">
              <h2 className="card-title">💡 Quick Insights</h2>
              <div className="insights-list">
                {insights.slice(0, 2).map((insight) => (
                  <div
                    key={insight.id}
                    className={`insight-item ${insight.impact}`}
                  >
                    <div className="insight-title">{insight.title}</div>
                    <div className="insight-description">
                      {insight.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="right-column">
          {/* Tab Content */}
          {activeTab === "predictor" && (
            <>
              <SalesChart data={chartData} />
              <div className="charts-row">
                <BarChart data={chartData.slice(0, 6)} />
                <PieChart data={chartData} />
              </div>
              <DataTable data={chartData.slice(0, 10)} />
            </>
          )}

          {activeTab === "insights" && (
            <div className="card">
              <h2 className="card-title">📈 Business Intelligence</h2>
              <div className="insights-grid">
                {insights.map((insight) => (
                  <div
                    key={insight.id}
                    className={`insight-card ${insight.impact}`}
                  >
                    <div className="insight-icon">
                      {insight.type === "revenue" && "💰"}
                      {insight.type === "efficiency" && "⚡"}
                      {insight.type === "strategy" && "🎯"}
                    </div>
                    <div className="insight-content">
                      <h3>{insight.title}</h3>
                      <p>{insight.description}</p>
                      <div className={`impact-badge ${insight.impact}`}>
                        {insight.impact.toUpperCase()} IMPACT
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "scenarios" && (
            <div className="card">
              <h2 className="card-title">🔄 Scenario Analysis</h2>
              <div className="scenarios-grid">
                {scenarioAnalysis.map((scenario, index) => (
                  <div key={index} className="scenario-card">
                    <div className="scenario-header">
                      <h3>{scenario.name}</h3>
                      <div className="scenario-sales">
                        ${scenario.predictedSales}
                      </div>
                    </div>
                    <div className="scenario-details">
                      <p>⛽ Gas: {scenario.gas} gallons</p>
                      <p>🎫 Lotto: ${scenario.lotto}</p>
                      <p>📅 {scenario.dayType === 1 ? "Weekend" : "Weekday"}</p>
                      <p className="scenario-desc">{scenario.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className="card">
              <h2 className="card-title">📊 Prediction History</h2>
              <div className="history-table">
                <div className="table-header">
                  <span>Time</span>
                  <span>Gas</span>
                  <span>Lotto</span>
                  <span>Day</span>
                  <span>Predicted</span>
                </div>
                {scenarios.map((scenario) => (
                  <div key={scenario.id} className="table-row">
                    <span>{scenario.timestamp}</span>
                    <span>{scenario.inputs.TotalGasGallons} gal</span>
                    <span>${scenario.inputs.LottoSales}</span>
                    <span>
                      {scenario.inputs.DayType === 1 ? "Weekend" : "Weekday"}
                    </span>
                    <span className="predicted-value">
                      ${scenario.prediction}
                    </span>
                  </div>
                ))}
                {scenarios.length === 0 && (
                  <div className="no-data">
                    No predictions yet. Make your first prediction!
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
