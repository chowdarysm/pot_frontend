import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Graph = () => {
  const barData = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 500 },
    { name: "D", value: 200 },
  ];

  const pieData = [
    { name: " A", value: 400 },
    { name: "B", value: 300 },
    { name: " C", value: 300 },
    { name: " D", value: 200 },
  ];

  const COLORS = ["red", "blue", "green", "navy"];

  return (
    <div
      style={{
        display: "flex",
        gap: "50px",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <BarChart width={300} height={300} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="red" />
      </BarChart>

      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={false}
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default Graph;
