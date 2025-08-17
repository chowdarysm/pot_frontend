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

const Graph = ({
  category,
  billboardPie,
  potholesPie,
  selectedBillboardStatus,
  setSelectedBillboardStatus,
  billboardData,
  potholesData,
  selectedPotholeStatus,
  setSelectedPotholeStatus,
}) => {
  // const barData = [
  //   { month: "Jun", value: 400 },
  //   { month: "Jul", value: 300 },
  //   { month: "Aug", value: 500 },

  // ]; previous data
  //new data
  //   const barData = billboardData
  //     .filter(item => item.status === selectedBillboardStatus)
  //     .map(item => ({ month: item.month, value: item.value }));

  // }
  const filteredBillboardBarData = billboardData.filter(
    (item) => item.status === selectedBillboardStatus
  );
  const filteredPotholeBarData = potholesData.filter(
    (item) => item.status === selectedPotholeStatus
  );

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
  const categoryData = [
    { id: 1, cat: "billboards" },
    { id: 2, cat: "potholes" },
    { id: 3, cat: "construction" },
    { id: 4, cat: "guardrails" },
  ];

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
          <BarChart
            width={400}
            height={300}
            //  data={barData}
            data={filteredBillboardBarData}
          >
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
              // data={
              //   category === "Potholes" ? piePotholesData : pieBillboardData
              // }
              data={billboardPie}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="status"
              label={false}
              onClick={(data) => setSelectedBillboardStatus(data.status)}
            >
              {/* {(category === "Potholes"
                ? piePotholesData
                : pieBillboardData
              ).map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))} */}
              {billboardPie.map((entry, index) => (
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

        {/* Potholes */}
      </div>
    </div>
  );
};

export default Graph;
