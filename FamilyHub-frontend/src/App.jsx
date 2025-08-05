import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./assets/Slices/authSlice";

import HomePage from "./assets/pages/HomePage";
import Donation from "./assets/pages/Donation";
import Scholarship from "./assets/pages/Scholarship";
import UserDashboard from "./assets/dashboards/UserDashboard";
import OrderStatus from "./assets/pages/ApplyScholarship";
import AdminDashboard from "./assets/dashboards/AdminDashboard";
import Registration from "./assets/components/Registration";
import Login from "./assets/components/Login";
import DonationForm from "./assets/pages/DonationForm";
import ScholarshipForm from "./assets/pages/ScholarshipForm";
import FamilyHistoryPage from "./assets/pages/FamilyHistoryPage";
import Store from "./assets/pages/Store";
import SuccessStoriesPage from "./assets/pages/SuccessStoriesPage";
import Navv from "./assets/components/wepages/NavBar";
import { ToastContainer } from "react-toastify";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div>
      <BrowserRouter>
        <Navv />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/donatepage" element={<Donation />} />
          <Route path="/scholarshippage" element={<Scholarship />} />
          <Route path="/form1" element={<DonationForm />} />
          <Route path="/form2" element={<ScholarshipForm />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/family-history" element={<FamilyHistoryPage />} />
          <Route path="/products" element={<Store />} />
          <Route path="/stories" element={<SuccessStoriesPage />} />
        </Routes>

        <ToastContainer position="top-right" autoClose={2000} />
      </BrowserRouter>
    </div>
  );
};

export default App;
