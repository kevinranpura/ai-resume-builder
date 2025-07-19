import { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    username: "",
    designation: "",
    summary: "",
    email: "", 
    phone: "",
    linkedin: "",
    github: "",
    education: [],
    workexperience: [],
    projects: [],
    skills: [],
    certificates: [],
  });

  const updateFormData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <ResumeContext.Provider value={{ formData, updateFormData }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);