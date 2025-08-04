import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import Dashboard from "./Dashboard/Dashboard";
import Detailed from "./DetailedDash/Detailed";
import Report from "./Report/Report";
import ReportForm from "./ReportForm/ReportForm";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";
import Billboards from "./Billboards/Billboards";
import PotholeReport from "./PotholeReport/PotholeReport";
import BillboardReport from "./BillboardReport/BillboardReport";
import Potholes from "./Potholes/Potholes";
import Events from "./Events/Events";
import Videos from "./Videos/Videos";
import Home from "./Home/Home";
import VideoReport from "./VideoReport/VideoReport";
import VideoDetail from "./VideoDetail/VideoDetail";
import ImageDetail from "./ImageDetail/ImageDetail";
import Images from "./Images/Images";
import ReportDetails from "./ReportDetails/ReportDetails";
import DetailedReport from "./DetailedReport/DetailedReport";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route element={<Navbar />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/detailed" element={<Detailed />} />
          <Route path="/report" element={<Report />} />
          <Route path="/form" element={<ReportForm />} />
          <Route path="/billboards" element={<Billboards />} />
          <Route path="/potholereport" element={<PotholeReport />} />
          <Route path="/billboardreport" element={<BillboardReport />} />
          <Route path="/potholes" element={<Potholes />} />
          <Route path="/events" element={<Events />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/home" element={<Home />} />
          <Route path="/videoreport" element={<VideoReport />} />
          <Route path="/video/:guid" element={<VideoDetail />} />
          <Route path="/report/:guid" element={<PotholeReport />} />
          <Route path="/imagedetails" element={<ImageDetail />} />
          <Route path="/images" element={<Images />} />
          <Route path="/reportdetails" element={<ReportDetails />} />
          <Route path="/detailedreport" element={<DetailedReport />} />
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;