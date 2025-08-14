import React from "react";
import { useParams } from "react-router-dom";
import "./Graph.css";
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

const Graph = ({ category }) => {
  const barData = [
    { month: "Jun", value: 400 },
    { month: "Jul", value: 300 },
    { month: "Aug", value: 500 },
    // { month: "D", value: 200 },
  ];

  const pieBillboardData = [
    { status: "Approved", value: 400 },
    { status: "Unapproved", value: 400 },
    { status: "Damaged", value: 400 },
  ];

  const piePotholesData = [
    { status: "low", value: 400 },
    { status: "mid", value: 400 },
    { status: "high", value: 400 },
  ];

  const COLORS = ["red", "blue", "green", "navy"];
  const { title } = useParams();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <h1
        style={{ fontSize: "1.4rem", fontWeight: "700", textAlign: "center" }}
      >
        {category} Analytics
      </h1>
      <div className="graph-container">
        <div className="bar-chart">
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              textAlign: "center",
              margin: "10px",
            }}
          >
            {category === "Potholes" ? "Unapproved" : ""} {category} Identified
            Monthwise
          </p>
          <BarChart width={400} height={300} data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="red" />
          </BarChart>
        </div>
        <div className="pie-chart">
          <p
            style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              textAlign: "center",
              margin: "10px",
            }}
          >
            {category} Summary Data
          </p>
          <PieChart width={400} height={300}>
            <Pie
              data={
                category === "Potholes" ? piePotholesData : pieBillboardData
              }
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="status"
              label={false}
            >
              {(category === "Potholes"
                ? piePotholesData
                : pieBillboardData
              ).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Graph;
