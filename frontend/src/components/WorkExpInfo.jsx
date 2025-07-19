import React from "react";
import { useEffect, useState } from "react";
import { useResume } from "../context/ResumeContext";

const WorkExpInfo = () => {
  const { formData, updateFormData } = useResume();
  const [loading, setLoading] = useState(false);


  const handleGenerateAIExp = async (index) => {
    setLoading(true)
    const role = formData.workexperience[index].role || "Software Developer"
    const company = formData.workexperience[index].company || ""
    const prompt = `Write a short 35 words description for a person working as a ${role} at ${company}. The description should highlight key skills, experience, and achievements during his/her work. The description should answer the question:"What did you do in this role?". Do not include any introductory text, headings, explanations or quotation marks. Just return the description content only.`

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });

      const data = await res.json();
      const aiDescription = data.choices[0].message.content;

      const updated = [...(formData.workexperience)];
      updated[index].workexpDescription = aiDescription;
      updateFormData("workexperience", updated);

    } catch (err) {
      console.error("Error generating Description:", err);
    }
    setLoading(false)
  };


  const handleChange = (index, field, value) => {
    const updated = [...(formData.workexperience)];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateFormData("workexperience", updated);
  };

  const addExperience = () => {
    const updated = [...(formData.workexperience), { company: "", role: "", workStart: "", workEnd: "", workexpDescription: "" }];
    updateFormData("workexperience", updated);
  };

  const removeExperience = (index) => {
    const updated = [...formData.workexperience];
    updated.splice(index, 1);
    updateFormData("workexperience", updated);
  };

  useEffect(() => {
    if (formData.workexperience.length === 0) {
      updateFormData("workexperience", [{ company: "", role: "", workStart: "", workEnd: "", workexpDescription: "" }]);
    }
  }, []);

  return (
    <div>
      <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
        Work Experience
      </h2>
      <div className="flex flex-col gap-y-7 py-5 text-sm">
        {(formData.workexperience).map((exp, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 relative gap-x-5 gap-y-3 justify-center mx-5 px-2 py-2 border border-gray-300 rounded-md">
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="company">Company</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="ABC Corp."
                  value={exp.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="role">Role</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Software Developer"
                  value={exp.role}
                  onChange={(e) => handleChange(index, "role", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="workStart">Start Date</label>
                <input
                  type="month"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2 placeholder:text-xs"
                  placeholder=""
                  value={exp.workStart}
                  onChange={(e) => handleChange(index, "workStart", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="workEnd">End Date</label>
                <input
                  type="month"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2 placeholder:text-xs"
                  placeholder=""
                  value={exp.workEnd}
                  onChange={(e) => handleChange(index, "workEnd", e.target.value)}
                />
              </div>
              <div className="relative flex flex-col col-span-2 gap-3">
                <label className="font-semibold" htmlFor="workexpDescription">Description</label>
                <textarea
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2 h-40"
                  placeholder="What did you do in this role?"
                  value={exp.workexpDescription}
                  onChange={(e) => handleChange(index, "workexpDescription", e.target.value)}
                ></textarea>
                <button
                  type="button"
                  onClick={() => handleGenerateAIExp(index)}
                  disabled={loading}
                  className="flex items-center justify-center w-40 gap-2 absolute bottom-2 right-5 bg-blue-300 text-[#00133b] border border-blue-600 font-semibold px-2 py-1 rounded-md mt-2 cursor-pointer">
                  {loading ? "Generating..." : "Generate with AI"}
                  <img src="/stars.svg" alt="" />
                </button>
              </div>
              <div className="absolute left-148 top-2">
                {formData.workexperience.length > 1 && (
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeExperience(index)}>
                    <img src="/dustbin.svg" alt="" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
      <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md mt-2 mx-5" onClick={addExperience}>
        <img src="/plus.svg" alt="" />
        Add Work Experience
      </button>
    </div>
  );
};

export default WorkExpInfo;
