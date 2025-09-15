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
  LabelList,
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
  initbillboardPie,
  initpotholePie,
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
  console.log("FilteredBillboarddata in graph", filteredBillboardBarData);

  const filteredPotholesBarData = potholesData.filter(
    (item) => item.status === selectedPotholeStatus
  );
  console.log("FilteredPotholesdaat in graph", filteredPotholesBarData);
  console.log("BillboardStatSData", billboardStatsData);
  console.log("PotholesStatsData", potholeStatsData);
  console.log("BillboardStatsPie", initbillboardPie);
  console.log("PotholesStatsPie", initpotholePie);
  console.log("FilteredBillboardBarCity", filterBillboardCity);
  console.log("FilteredPotholebarcity", filterPotholeCity);
  // const COLORS = ["red", "blue", "green", "navy"];
  const STATUS_COLORS = {
    // Billboard statuses
    Approved: "#99BB55", // green
    Unapproved: "#BF504E", // red
    Damaged: "#FFA500", // orange

    // Pothole statuses
    Low: "#99BB55", // green
    Mid: "#4F81BD", // blue
    High: "#BF504E", // red
  };
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
  // const barData = isPothole
  //   ? filteredPotholesBarData
  //   : filteredBillboardBarData;
  const barData = isPothole ? potholeStatsData : billboardStatsData;
  console.log("FilterePotholesData", filteredPotholesBarData);
  console.log("FIlteredBillboardData", filteredBillboardBarData);
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
  // const finalBarData = pieClick
  //   ? barData.filter(
  //       (item) =>
  //         item.status?.trim().toLowerCase() ===
  //           activeStatus?.trim().toLowerCase() &&
  //         (!city ||
  //           item.city?.trim().toLowerCase() === city?.trim().toLowerCase())
  //     )
  //   : preClickData;
  // const finalBarData = pieClick
  //   ? barData.filter((item) => {
  //       const statusMatch =
  //         item.status?.trim().toLowerCase() ===
  //         activeStatus?.trim().toLowerCase();

  //       const cityMatch =
  //         city?.trim().toLowerCase() === item.city?.trim().toLowerCase();

  //       console.log("Checking:", {
  //         itemStatus: item.status,
  //         activeStatus,
  //         statusMatch,
  //         itemCity: item.city,
  //         city,
  //         cityMatch,
  //       });

  //       return statusMatch && cityMatch;
  //     })
  //   : preClickData;
  const finalBarData = pieClick
    ? barData
        .filter((item) => {
          const statusMatch =
            item.status?.trim().toLowerCase() ===
            activeStatus?.trim().toLowerCase();

          const cityMatch =
            city && item.city
              ? city.trim().toLowerCase() === item.city.trim().toLowerCase()
              : true; // fallback: ignore city if it's missing

          return statusMatch && cityMatch;
        })
        .map((item) => ({
          ...item,
          month: item.month || "Unknown",
        }))
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
                  {category} Identified Monthwise
                </p>
                <BarChart
                  width={isTablet ? 300 : 400}
                  height={300}
                  // data={isPothole ? initPotholeBarData : initBillboardBarData}
                  // data={isPothole ? potholeStatsData : billboardStatsData}
                  // data={barData}
                  data={isPothole ? initPotholeBarData : initBillboardBarData}
                  // data={bardummyData}
                  // data={filteredBillboardBarData}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  {/* <YAxis /> */}
                  <YAxis domain={[0, "dataMax + 4"]} />
                  <Tooltip />
                  {/* <Legend /> */}
                  <Legend
                    formatter={(value) => (value === "value" ? "Month" : value)}
                  />

                  <Bar dataKey="value" fill="#4F81BD">
                    <LabelList
                      dataKey="value"
                      position="top"
                      fill="#000"
                      fontSize={12}
                      fontWeight="600"
                    />
                  </Bar>
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
                    // fill={STATUS_COLORS[status] || "#8884d8"}
                    dataKey="value"
                    nameKey="status"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                      value,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) / 2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight="600"
                        >
                          {value}
                        </text>
                      );
                    }}
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
                    {/* {billboardPie.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        // fill={COLORS[index % COLORS.length]}
                        fill={STATUS_COLORS[entry.status] || "#8884d8"}
                        onClick={() => {
                          console.log("Billboard slice data", entry);
                        }}
                      />
                    ))} */}
                    {(category === "Potholes"
                      ? initPotholePieData
                      : initBillboardPieData
                    ).map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.status] || "#8884d8"}
                        onClick={() => {
                          console.log("Slice data", entry);
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                  {/* <Legend
                    formatter={(value) => (value === "value" ? "Month" : value)}
                  /> */}
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
                {category} Identified Monthwise
              </p>
              {console.log("Selected Color:", selectedColor)}
              <BarChart
                width={isTablet ? 300 : 400}
                height={300}
                // data={pieClick ? barData : preClickData}
                // data={finalBarData}
                // data={isPothole ? potholeStatsData : billboardStatsData}
                data={isPothole ? filterPotholeCity : filterBillboardCity}
                // data={category === "Potholes" ? barData : finalBarData}

                // data={filteredBillboardBarData}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                {/* <YAxis /> */}
                <YAxis domain={[0, "dataMax + 4"]} />
                <Tooltip />
                {/* <Legend /> */}
                <Legend
                  formatter={(value) => (value === "value" ? "Month" : value)}
                />

                <Bar
                  dataKey="value"
                  fill={selectedColor || "#4F81BD"}
                  onClick={(data, index) => {
                    console.log("Clicked Bar Data:", data);
                    console.log("Month:", data.month);
                    console.log("Value:", data.value);
                    console.log("City:", data.city); // if city is included in barData
                    console.log("Status:", data.status);
                    console.log("");
                    // if status is included in barData
                  }}
                >
                  {/* <LabelList
                    dataKey="value"
                    position="top"
                    fill="#000"
                    fontSize={12}
                    fontWeight="600"
                  /> */}
                  <LabelList
                    dataKey="value"
                    position="top"
                    fill="#000"
                    fontSize={12}
                    fontWeight="600"
                  />
                </Bar>
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
                  // data={
                  //   category === "Potholes" ? initpotholePie : initbillboardPie
                  // }
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="status"
                  label={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    percent,
                    index,
                    value,
                  }) => {
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) / 2;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);

                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#fff"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontSize={12}
                        fontWeight="600"
                      >
                        {value}
                      </text>
                    );
                  }}
                  // label={false}
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
                    // setSelectedColor(COLORS[index % COLORS.length]);
                    setSelectedColor(STATUS_COLORS[data.status] || "#8884d8");
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
                      // fill={COLORS[index % COLORS.length]}
                      fill={STATUS_COLORS[entry.status] || "#8884d8"}
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
