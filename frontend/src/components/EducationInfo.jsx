import React from "react";
import { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

const EducationInfo = () => {
  const { formData, updateFormData } = useResume();

  const handleChange = (index, field, value) => {
    const updated = [...(formData.education)];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateFormData("education", updated);
  };

  const addEducation = () => {
    const updated = [...(formData.education), { degree: "", institute: "", eduStart: "", eduEnd: "", result: ""}];
    updateFormData("education", updated);
  };

  const removeEducation = (index) => {
    const updated = [...formData.education];
    updated.splice(index, 1);
    updateFormData("education", updated);
  };

  useEffect(() => {
    if (formData.education.length === 0) {
      updateFormData("education", [{ degree: "", institute: "", eduStart: "", eduEnd: "", result: ""}]);
    }
  }, []);

  return (
    <div>
      <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
        Education
      </h2>
      <div className="flex flex-col gap-y-7 py-5 text-sm">
        {(formData.education).map((edu, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 relative gap-x-5 gap-y-3 justify-center mx-5 px-2 py-2 border border-gray-300 rounded-md">
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="degree">Degree</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="B.Tech"
                  value={edu.degree}
                  onChange={(e) => handleChange(index, "degree", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="institute">Institute</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Institute Name"
                  value={edu.institute}
                  onChange={(e) => handleChange(index, "institute", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="eduStart">Start Date</label>
                <input
                  type="month"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2 placeholder:text-xs"
                  placeholder=""
                  value={edu.eduStart}
                  onChange={(e) => handleChange(index, "eduStart", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="eduEnd">End Date</label>
                <input
                  type="month"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2 placeholder:text-xs"
                  placeholder=""
                  value={edu.eduEnd}
                  onChange={(e) => handleChange(index, "eduEnd", e.target.value)}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-3">
                <label className="font-semibold" htmlFor="result">CGPA / Percentage</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="9.0"
                  value={edu.result}
                  onChange={(e) => handleChange(index, "result", e.target.value)}
                />
              </div>
              <div className="absolute left-148 top-2">
                {formData.education.length > 1 && (
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeEducation(index)}>
                    <img src="/dustbin.svg" alt="" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
      <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md mt-2 mx-5" onClick={addEducation}>
        <img src="/plus.svg" alt="" />
        Add Education
      </button>
    </div>
  );
};

export default EducationInfo;
