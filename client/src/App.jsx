import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from '@clerk/clerk-react';
import Home from "./pages/Home";
import Applications from "./pages/Applications";
import ApplyJob from "./pages/ApplyJob";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from "./context/AppContext";
import Dashboard from "./pages/Dashboard";
import AddJob from "./pages/AddJob";
import ManageJobs from "./pages/ManageJobs";
import ViewApplications from "./pages/ViewApplications";
import Features from "./pages/Features";
import "quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CareerGuidance from './pages/CareerGuidance';
import BiliktiliktiDamytyPage from './pages/BiliktiliktiDamytyPage';
import FAQ from "./pages/FAQ"; 
import QuickStart from "./pages/QuickStart";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Cookies from "./pages/Cookies";
import License from "./pages/License";


const App = () => {
  const { showRecruiterLogin, companyToken } = useContext(AppContext);

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/recruiter-login" element={<RecruiterLogin />} />
        <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
        <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/features" element={<Features />} /> 
        <Route path="/career-guidance" element={<CareerGuidance />} />
        <Route path="/skills" element={<BiliktiliktiDamytyPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/quick-start" element={<QuickStart />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/support" element={<Support />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/license" element={<License />} />

        {companyToken && (
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="add-job" element={<AddJob />} />
            <Route path="manage-job" element={<ManageJobs />} />
            <Route path="view-applications" element={<ViewApplications />} />
          </Route>
        )}
      </Routes>
    </div>
  );
};

export default App;
