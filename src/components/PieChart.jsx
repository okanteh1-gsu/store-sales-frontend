import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PieChartComponent = ({ data }) => {
  const dayTypeData = [
    {
      name: "Weekday",
      value: data.filter((item) => item.DayType === "Weekday").length,
    },
    {
      name: "Weekend",
      value: data.filter((item) => item.DayType === "Weekend").length,
    },
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <div className="chart-card small-chart">
      <h4 className="chart-title">Day Type Distribution</h4>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={dayTypeData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {dayTypeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
