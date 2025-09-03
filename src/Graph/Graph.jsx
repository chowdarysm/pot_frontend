import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
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
  dummy,
  setDummy,
  initBillboardBarData,
  initBillboardPieData,
  initPotholeBarData,
  initPotholePieData,
  city,
  filterBillboardCity,
  filterPotholeCity,
  billboardStatsData,
  potholeStatsData,
}) => {
  // ]; previous data
  //new data
  //   const barData = billboardData
  //     .filter(item => item.status === selectedBillboardStatus)
  //     .map(item => ({ month: item.month, value: item.value }));

  // }
  const filteredBillboardBarData = billboardData.filter(
    (item) => item.status === selectedBillboardStatus
  );
  const filteredPotholesBarData = potholesData.filter(
    (item) => item.status === selectedPotholeStatus
  );
  console.log("BillboardStatSData", billboardStatsData);
  console.log("PotholesStatsData", potholeStatsData);
  const COLORS = ["red", "blue", "green", "navy"];
  // Approved - green unapproved - red damaged - orange
  const [selectedColor, setSelectedColor] = useState(null);
  const { title } = useParams();
  const categoryData = [
    { id: 1, cat: "billboards" },
    { id: 2, cat: "potholes" },
    { id: 3, cat: "construction" },
    { id: 4, cat: "guardrails" },
  ];
  const isPothole = category === "Potholes";
  const pieData = isPothole ? potholesPie : billboardPie;
  const barData = isPothole
    ? filteredPotholesBarData
    : filteredBillboardBarData;
  console.log("Bardata", barData);
  console.log("piedata", pieData);
  // const finalBarData = barData.filter(
  //   (item) => !city || item.city.toLowerCase() === city.toLowerCase()
  // );

  // console.log("FInalDtaa", finalBarData);
  const setStatus = isPothole
    ? setSelectedPotholeStatus
    : setSelectedBillboardStatus;
  console.log("category is", category);
  console.log("Billboarstatus", selectedBillboardStatus);
  console.log("PotholeStatus", selectedPotholeStatus);
  // console.log("Initial Pothole", initPotholeBarData);
  const [pieClick, setPieClick] = useState(false);
  const preClickData = isPothole ? filterPotholeCity : filterBillboardCity;
  console.log("pothole status", selectedPotholeStatus);
  // const finalBarData = pieClick
  //   ? barData.filter(
  //       (item) =>
  //         (item.status === selectedBillboardStatus ||
  //           item.status === selectedPotholeStatus) &&
  //         (!city || item.city?.toLowerCase() === city.toLowerCase())
  //     )
  //   : preClickData;
  const activeStatus = isPothole
    ? selectedPotholeStatus
    : selectedBillboardStatus;

  // const finalBarData = pieClick
  //   ? barData.filter(
  //       (item) =>
  //         item.status === activeStatus &&
  //         (!city || item.city?.toLowerCase() === city.toLowerCase())
  //     )
  //   : preClickData;
  barData.forEach((item) => {
    console.log(
      "barData.status:",
      `"${item.status}"`,
      "length:",
      item.status?.length
    );
  });
  console.log(
    "activeStatus:",
    `"${activeStatus}"`,
    "length:",
    activeStatus?.length
  );
  const finalBarData = pieClick
    ? barData.filter(
        (item) =>
          item.status?.trim().toLowerCase() ===
            activeStatus?.trim().toLowerCase() &&
          (!city ||
            item.city?.trim().toLowerCase() === city?.trim().toLowerCase())
      )
    : preClickData;
  console.log("bardata", barData);
  console.log("Active statys", activeStatus);
  console.log(
    "All statuses in barData:",
    barData.map((d) => d.status)
  );
  console.log("FInalDtaa", finalBarData);
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1080 });
  return (
    <>
      {dummy ? (
        <>
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
              style={{
                fontSize: "1.4rem",
                fontWeight: "700",
                textAlign: "center",
              }}
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
                  {/* {category === "Potholes" ? "Unapproved" : ""} {category} Identified
            Monthwise */}
                  {isPothole ? "Unapproved" : ""} {category} Identified
                  Monthwise
                </p>
                <BarChart
                  width={isTablet ? 300 : 400}
                  height={300}
                  // data={isPothole ? initPotholeBarData : initBillboardBarData}
                  data={isPothole ? potholeStatsData : billboardStatsData}
                  // data={bardummyData}
                  // data={filteredBillboardBarData}
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
                <PieChart width={isTablet ? 300 : 400} height={300}>
                  <Pie
                    // data={
                    //   category === "Potholes"
                    //     ? initPotholePieData
                    //     : initBillboardPieData
                    // }
                    data={
                      category === "Potholes"
                        ? initPotholePieData
                        : initBillboardPieData
                    }
                    // data={billboardPie}
                    // data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="status"
                    label={false}
                    // onClick={(data) => setSelectedBillboardStatus(data.status)}
                    // onClick={(data) => setStatus(data.status)}
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
            </div>
          </div>
        </>
      ) : (
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
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              textAlign: "center",
            }}
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
                {/* {category === "Potholes" ? "Unapproved" : ""} {category} Identified
            Monthwise */}
                {isPothole ? "Unapproved" : ""} {category} Identified Monthwise
              </p>
              <BarChart
                width={isTablet ? 300 : 400}
                height={300}
                // data={pieClick ? barData : preClickData}
                data={finalBarData}

                // data={filteredBillboardBarData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={selectedColor}
                  onClick={(data, index) => {
                    console.log("Clicked Bar Data:", data);
                    console.log("Month:", data.month);
                    console.log("Value:", data.value);
                    console.log("City:", data.city); // if city is included in barData
                    console.log("Status:", data.status); // if status is included in barData
                  }}
                />
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
              <PieChart width={isTablet ? 300 : 400} height={300}>
                <Pie
                  // data={
                  //   category === "Potholes" ? piePotholesData : pieBillboardData
                  // }
                  // data={billboardPie}
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="status"
                  label={false}
                  // onClick={(data) => setSelectedBillboardStatus(data.status)}
                  onClick={(data, index) => {
                    console.log("data status", data.status);
                    setPieClick(true);
                    // setStatus(data.status);
                    if (category === "Potholes") {
                      setSelectedPotholeStatus(data.status); // set pothole status
                    } else {
                      setSelectedBillboardStatus(data.status); // set billboard status
                    }
                    setSelectedColor(COLORS[index % COLORS.length]);
                  }}
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
                  {/* {billboardPie.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))} */}
                  {pieData.map((entry, index) => (
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
      )}
    </>
  );
};

export default Graph;
