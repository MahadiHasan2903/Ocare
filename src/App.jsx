import React from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import VerifyPage from "./pages/VerifyPage";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CreatePrescriptionPage from "./pages/CreatePrescriptionPage";
import SettingPage from "./pages/SettingPage";
import SupportPage from "./pages/SupportPage";
import PatienstPage from "./pages/PatientsPage";
import InfinniteSchollingPage from "./pages/InfiniteScrollingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/create-prescription"
            element={<CreatePrescriptionPage />}
          />
          <Route path="/scroll" element={<InfinniteSchollingPage />} />

          <Route path="/settings" element={<SettingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/patients" element={<PatienstPage />} />
        </Routes>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </BrowserRouter>
    </>
  );
}

export default App;
