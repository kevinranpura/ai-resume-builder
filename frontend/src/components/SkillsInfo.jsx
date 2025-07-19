import React from "react";
import { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

const SkillsInfo = () => {
  const { formData, updateFormData } = useResume();

  const handleChange = (index, field, value) => {
    const updated = [...(formData.skills)];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateFormData("skills", updated);
  };

  const addSkill = () => {
    const updated = [...(formData.skills), { skillName: ""}];
    updateFormData("skills", updated);
  };

  const removeSkill = (index) => {
    const updated = [...formData.skills];
    updated.splice(index, 1);
    updateFormData("skills", updated);
  };

  useEffect(() => {
    if (formData.skills.length === 0) {
      updateFormData("skills", [{ skillName: ""}]);
    }
  }, []);

  return (
    <div>
      <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
        Skills
      </h2>
      <div className="flex flex-col gap-y-7 py-5 text-sm">
        {(formData.skills).map((skill, index) => (
          <div key={index}>
            <div className="w-[50%] relative justify-center mx-5 px-2 py-2 border border-gray-300 rounded-md">
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="skillName">Skill Name</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Python"
                  value={skill.skillName}
                  onChange={(e) => handleChange(index, "skillName", e.target.value)}
                />
              </div>
              
              <div className="absolute left-76 top-2">
                {formData.skills.length > 1 && (
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeSkill(index)}>
                    <img src="/dustbin.svg" alt="" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
      <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md mt-2 mx-5" onClick={addSkill}>
        <img src="/plus.svg" alt="" />
        Add Skill
      </button>
    </div>
  );
};

export default SkillsInfo;
