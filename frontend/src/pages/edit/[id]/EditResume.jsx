import React, { useState, useRef } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import TitleChange from '../../../components/TitleChange'
import PersonalInfo from "../../../components/PersonalInfo"
import ContactInfo from "../../../components/ContactInfo";
import EducationInfo from "../../../components/EducationInfo";
import WorkExpInfo from "../../../components/WorkExpInfo";
import SkillsInfo from '../../../components/SkillsInfo'
import ProjectInfo from "../../../components/ProjectInfo";
import CertificateInfo from "../../../components/CertificateInfo";
import ResumePreview from '../../../components/ResumePreview'
import { useResume } from '../../../context/ResumeContext'
import { useReactToPrint } from 'react-to-print'
import { ToastContainer, toast } from 'react-toastify'




const steps = [
  PersonalInfo,
  ContactInfo,
  EducationInfo,
  WorkExpInfo,
  SkillsInfo,
  ProjectInfo,
  CertificateInfo,
]

const EditResume = () => {

  const resumeRef = useRef();


  const handledownload = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "My-Resume",
  });


  const navigate = useNavigate()
  const { id } = useParams()

  const [resumedata, setresumedata] = useState({ title: "", })
  const { formData, updateFormData } = useResume();

  const [step, setStep] = useState(0);
  const [showoptions, setshowoptions] = useState(false)
  const [showdelete, setshowdelete] = useState(false)
  const [activetab, setactivetab] = useState("templates");
  const [selectedindex, setselectedindex] = useState(null);
  const [selectedtemplate, setselectedtemplate] = useState("template3")
  const [selectedtheme, setselectedtheme] = useState({ primary: "#dbeafe", secondary: "#93c5fd" })
  const [isStepValid, setIsStepValid] = useState(false);


  const templates = [
    { id: "classic", thumbnail: "/templates/classic.png" },
    { id: "modern", thumbnail: "/templates/modern.png" },
    { id: "template3", thumbnail: "/templates/template3.png" },
  ];

  const themes = [
    { primary: "#dbeafe", secondary: "#93c5fd" },
    { primary: "#d1fae5", secondary: "#6ee7b7" },
    { primary: "#fce7f3", secondary: "#f9a8d4" },
    { primary: "#ede9fe", secondary: "#c4b5fd" },
    { primary: "#ffedd5", secondary: "#fdba74" },
    { primary: "#f3f4f6", secondary: "#d1d5db" },
    { primary: "#fee2e2", secondary: "#fca5a5" },
    { primary: "#fef9c3", secondary: "#fde047" },
    { primary: "#ccfbf1", secondary: "#5eead4" },
  ];

  const handleselect = (index) => {
    setselectedindex(index);
    onSelect(themes[index]);
  };




  const getbyid = async () => {
    try {
      console.log("id is: ", id);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/getById`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const resdata = await res.json()
      const data = resdata.data

      const formatDate = (dateStr) => dateStr?.split("T")[0].split("-")[0] || "";

      const formattedEducation = data.education.map((edu) => ({
        ...edu,
        eduStart: formatDate(edu.eduStart),
        eduEnd: formatDate(edu.eduEnd),
      }));

      const formattedWorkExp = data.workexperience.map((exp) => ({
        ...exp,
        workStart: formatDate(exp.workStart),
        workEnd: formatDate(exp.workEnd),
      }));

      updateFormData("username", data.username);
      updateFormData("designation", data.designation);
      updateFormData("summary", data.summary);
      updateFormData("email", data.email);
      updateFormData("phone", data.phone);
      updateFormData("linkedin", data.linkedin);
      updateFormData("github", data.github);
      updateFormData("education", formattedEducation);
      updateFormData("workexperience", formattedWorkExp);
      updateFormData("skills", data.skills);
      updateFormData("projects", data.projects);
      updateFormData("certificates", data.certificates);

      setresumedata((prevState) => ({
        ...prevState,
        title: data.title,
      }))

    } catch (error) {
      console.log("error fetching resume by id:", error);
      return [];
    }
  }

  const updateresume = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          title: resumedata.title
        }),
      });

      const dataa = await response.json();
      if (response.ok) {
        toast('Resume Saved Successfully!', {
          theme: "dark",
          autoClose: 2000,
          position: "top-center",
        });
        console.log(dataa);
      } else {
        console.error('Save failed:', dataa.message);
      }
    } catch (err) {
      console.error('Error saving resume:', err);
    }
  }


  {
    showoptions && (
      <div className='w-full mt-2 bg-red-500 border-6 rounded shadow-lg p-4'>
        hello
      </div>
    )
  }




  const deleteresume = async () => {

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/resumes/delete/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      if (response.ok) {
        toast('Resume Deleted Successfully!', {
          theme: "light",
          autoClose: 2000,
          position: "top-center"
        });
        navigate("/dashboard")
      } else {
        console.error('Delete failed:', data.message);
      }
    } catch (err) {
      console.error('Error deleting resume:', err);
    }
  }



  const validateStep = (step) => {
    switch (step) {
      case 0:
        if (!formData.username?.trim()) errors.pu && formData.designation?.trim() && formData.summary?.trim();
      case 1:
        return formData.email?.trim() && formData.phone?.trim();
      case 2:
        return formData.education.length > 0 && formData.education.every(
          (edu) => edu.degree?.trim() && edu.institute?.trim()
        );

      default:
        return true;
    }
  };


  useEffect(() => {
    if (id) {
      getbyid();
    }
  }, []);

  return (
    <>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between border border-gray-300 rounded-md mx-3 md:mx-8 lg:mx-15 my-1 py-1 '>
          <TitleChange
            title={resumedata.title}
            settitle={(value) =>
              setresumedata((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />
          <div className='flex gap-3 md:gap-8 pr-3 md:pr-7 font-semibold'>
            <button onClick={() => setshowoptions(!showoptions)} className='flex flex-col md:flex-row md:gap-3 items-center justify-center bg-blue-300 text-[#00133b] px-1 md:px-3 md:py-2 rounded-md cursor-pointer text-[10px] md:text-[15px]'>
              <img src="/theme.svg" alt="" />
              Change Theme
            </button>

            <div id="default-modal" tabIndex="-1" aria-hidden="true" className={` ${showoptions ? "" : "hidden"} fixed inset-0 z-50 flex justify-center bg-black/77`}>
              <div className="w-[95%] md:w-[80%] bg-white my-auto h-[90%] overflow-auto rounded-lg pb-5 ">
                <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-500">
                  <h3 className="text-xl font-semibold text-black ">
                    Change Theme
                  </h3>
                  <button onClick={() => setshowoptions(!showoptions)} data-modal-hide="default-modal" type="button" className="py-2.5 px-5 text-sm font-medium text-gray-900  bg-gray-200 rounded-lg border border-gray-200 hover:bg-gray-100 cursor-pointer">
                    Done
                  </button>
                </div>

                <div className="flex justify-between items-center p-4 md:p-5">
                  <div>
                    <button
                      className={`font-semibold ${activetab === "templates" ? "text-blue-500 border-b-3 border-blue-500" : ""} px-2 pt-1 pb-2 cursor-pointer`}
                      onClick={() => setactivetab("templates")}
                    >
                      Templates
                    </button>
                    <button
                      className={`font-semibold ${activetab === "themes" ? "text-blue-500 border-b-3 border-blue-500" : ""} ml-5 px-4 pt-1 pb-2 cursor-pointer`}
                      onClick={() => setactivetab("themes")}
                    >
                      Themes
                    </button>
                  </div>

                </div>

                <div className="mt-5 mx-3 md:mx-15 overflow-auto">
                  {activetab === "templates" ? (
                    <div className='w-[100%] flex flex-wrap md:flex-nowrap gap-x-5 gap-y-10 md:gap-x-15 overflow-auto mx-auto'>
                      {templates.map((template, index) => (
                        <div
                          key={index}
                          onClick={() => { setselectedtemplate(template.id), handleselect(index) }}
                          className={`${selectedindex === index ? "border-3 border-purple-400" : "border-gray-200"} w-39 md:w-90 border-2 border-gray-300 rounded-lg hover:shadow-lg cursor-pointer`}
                        >
                          <img className='rounded-lg' src={template.thumbnail} alt="" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 justify-center items-center w-80 md:w-180 lg:w-250 md:h-110 gap-x-10 md:gap-x-20 gap-y-15 mx-auto overflow-y-auto">
                      {themes.map((theme, index) => (
                        <div
                          key={index}
                          className={`${selectedindex === index ? "border-3 border-purple-400" : "border-transparent"} rounded-md flex cursor-pointer hover:shadow h-20 md:h-30`}
                          onClick={() => { setselectedtheme(theme), handleselect(index) }}
                        >
                          <div style={{ backgroundColor: theme.primary }} className={`w-1/2 rounded-l-md`} />
                          <div style={{ backgroundColor: theme.secondary }} className={`w-1/2 rounded-r-md`} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button onClick={() => setshowdelete(!showdelete)} className='flex flex-col md:flex-row md:gap-3 items-center justify-center bg-blue-300 text-[#00133b] px-1 md:px-3 md:py-2 rounded-md text-[10px] md:text-[15px] cursor-pointer'>
              <img src="/blackdustbin.svg" alt="" />
              Delete
            </button>

            <div id="popup-modal" tabIndex="-1" className={`${showdelete ? "" : "hidden"} flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 mx-[30px] md:mx-0 z-50 justify-center w-80 md:w-full md:inset-0 h-[calc(100%-1rem)]`}>
              <div className="items-center p-4 w-full max-w-md max-h-full">
                <div className="relative bg-gray-500 rounded-lg shadow-sm">
                  <button onClick={() => setshowdelete(!showdelete)} type="button" className="absolute top-3 end-2.5 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-4 md:p-5 text-center">
                    <svg className="mx-auto mb-4 text-white w-12 h-12 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-white">Are you sure you want to delete this resume?</h3>
                    <button onClick={deleteresume} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center cursor-pointer">
                      Yes, I'm sure
                    </button>
                    <button onClick={() => setshowdelete(!showdelete)} data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg hover:bg-gray-300 focus:z-10 focus:ring-4 focus:ring-gray-100 ">No, cancel</button>
                  </div>
                </div>
              </div>
            </div>


            <button onClick={handledownload} className='flex flex-col md:flex-row md:gap-3 items-center justify-center bg-blue-300 text-[#00133b] px-1 md:px-3 md:py-2 rounded-md text-[10px] md:text-[15px] cursor-pointer'>
              <img src="/download.svg" alt="" />
              Download
            </button>

          </div>


        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mx-3 md:mx-8 lg:mx-15 my-5'>
        <div className='border border-gray-300 rounded-md max-h-[100vh] overflow-y-auto'>
          <div>
            {step === 0 && <PersonalInfo setIsStepValid={setIsStepValid} />}
            {step === 1 && <ContactInfo />}
            {step === 2 && <EducationInfo />}
            {step === 3 && <WorkExpInfo />}
            {step === 4 && <SkillsInfo />}
            {step === 5 && <ProjectInfo />}
            {step === 6 && <CertificateInfo />}
          </div>
          <div className='mt-10'>
            <div className='flex gap-4 items-center justify-center mx-5 mb-3'>
              <button onClick={() => setStep((prev) => Math.max(prev - 1, 0))} className='flex items-center justify-center rounded-md px-2 py-1 bg-blue-300 text-[#00133b] gap-2 text-sm cursor-pointer border border-blue-600 font-semibold'>
                <img src="/leftarrow.svg" alt="" />
                Back
              </button>
              <button onClick={() => updateresume()} className='flex items-center justify-center rounded-md px-2 py-1.5 bg-blue-300 text-[#00133b] gap-2 text-sm cursor-pointer border border-blue-600 font-semibold'>
                <img src="/save.svg" alt="" />
                Save & Exit
              </button>
              <button
                onClick={() => {
                  if (isStepValid) {
                    setStep((prev) => Math.min(prev + 1, steps.length - 1));
                  } else {
                    alert("Please fix the errors before continuing.");
                  }
                }}
                className='flex items-center justify-center rounded-md px-2 py-1 bg-blue-300 text-[#00133b] gap-2 text-sm cursor-pointer border border-blue-600 font-semibold'>
                <img src="/rightarrow.svg" alt="" />
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="block md:hidden flex items-center py-3 px-3 text-sm text-yellow-600 border-3 border-dashed border-yellow-300 rounded-lg bg-yellow-100" role="alert">
          <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">This site is optimized for laptop/desktop screens. Preview may appear slightly misaligned on mobile devices, but don't worry — your downloaded resume will look perfectly formatted.</span>
          </div>
        </div>

        <div className='border border-gray-300 rounded-md max-h-[100vh] overflow-y-auto'>
          <ResumePreview
            ref={resumeRef}
            formData={formData}
            template={selectedtemplate}
            theme={selectedtheme}
          />
        </div>

      </div>
    </>
  )
}

export default EditResume
