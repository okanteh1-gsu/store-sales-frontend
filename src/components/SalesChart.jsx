import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesChart = ({ data }) => {
  return (
    <div className="chart-card large-chart">
      <h3 className="chart-title">Sales & Gas Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#8884d8"
            name="Total Sales ($)"
          />
          <Line
            type="monotone"
            dataKey="GasSold"
            stroke="#82ca9d"
            name="Gas Sold (Gallons)"
          />
          <Line
            type="monotone"
            dataKey="Lotto"
            stroke="#ffc658"
            name="Lotto Sales ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
