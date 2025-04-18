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
      toast.error(error.message);
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
      toast.error(error.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) return toast.error("Clerk token missing");

      const { data } = await axios.get(`${backendUrl}/api/users/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.success ? setUserData(data.user) : toast.error(data.message);
    } catch (error) {
      toast.error("Fetch user failed: " + error.message);
    }
  };

  const fetchUserApplications = async () => {
    try {
      const token = await getToken();
      if (!token) return toast.error("Clerk token missing");

      const { data } = await axios.get(`${backendUrl}/api/users/applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      data.success ? setUserApplications(data.applications) : toast.error(data.message);
    } catch (error) {
      toast.error("Fetch applications failed: " + error.message);
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

  // ✅ Здесь isSignedIn используется вместо user, чтобы токен был доступен точно
  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      console.log("🔐 Clerk Token for fetchData:", token);
      if (isSignedIn && token) {
        await fetchUserData();
        await fetchUserApplications();
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
