import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [searchFilter, setSearchFilter] = useState({ title: "", location: "" });
  const [isSearched, setIsSearched] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = useState(false);
  const [companyToken, setCompanyToken] = useState(localStorage.getItem("companyToken"));
  const [companyData, setCompanyData] = useState(JSON.parse(localStorage.getItem("companyData")) || null);
  const [userData, setUserData] = useState(null);
  const [userApplications, setUserApplications] = useState(null);

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/jobs`);
      data.success ? setJobs(data.jobs) : toast.error(data.message);
    } catch (error) {
      toast.error("Fetch jobs error: " + error.message);
    }
  };

  const fetchCompanyData = async () => {
    if (!companyToken) return;
    try {
      const { data } = await axios.get(`${backendUrl}/api/company/company`, {
        headers: { token: companyToken },
      });
      data.success ? setCompanyData(data.company) : toast.error(data.message);
    } catch (error) {
      toast.error("Fetch company error: " + error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken({ template: "backend" });
  
      if (!token) {
        toast.error("Clerk token missing");
        return;
      }
  
      const response = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = response.data;
  
      if (!data.success || !data.user) {
        toast.error(data.message || "User fetch failed");
        return;
      }
  
      if (!data.user.email || !data.user._id) {
        console.warn("❗ Missing user fields:", data.user);
      }
  
      setUserData(data.user);
    } catch (error) {
      console.error("🔴 fetchUserData error:", error);
      if (error.response?.status === 401) {
        toast.error("⛔ Session expired. Please log in again.");
      } else if (error.response?.status === 404) {
        toast.error("❌ User not found.");
      } else {
        toast.error("Fetch user error: " + error.message);
      }
    }
  };
  

  const fetchUserApplications = async () => {
    try {
      const token = await getToken({ template: "backend" });
      if (!token) return toast.error("Clerk token missing");

      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.success ? setUserApplications(data.applications) : toast.error(data.message);
    } catch (error) {
      toast.error("Fetch applications error: " + error.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, [companyToken]);

  useEffect(() => {
    if (companyData) {
      localStorage.setItem("companyData", JSON.stringify(companyData));
    }
  }, [companyData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken({ template: "backend" });
        console.log("🔐 Clerk Token:", token);
        if (isSignedIn && token) {
          await fetchUserData();
          await fetchUserApplications();
        }
      } catch (error) {
        console.error("Token fetch error:", error);
      }
    };
    fetchData();
  }, [isSignedIn]);

  return (
    <AppContext.Provider
      value={{
        searchFilter,
        setSearchFilter,
        setIsSearched,
        isSearched,
        jobs,
        setJobs,
        setShowRecruiterLogin,
        showRecruiterLogin,
        companyToken,
        setCompanyToken,
        companyData,
        setCompanyData,
        backendUrl,
        userData,
        setUserData,
        userApplications,
        setUserApplications,
        fetchUserData,
        fetchUserApplications,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};