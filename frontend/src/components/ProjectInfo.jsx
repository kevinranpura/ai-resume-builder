import React from "react";
import { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

const ProjectInfo = () => {
  const { formData, updateFormData } = useResume();

  const handleChange = (index, field, value) => {
    const updated = [...(formData.projects)];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateFormData("projects", updated);
  };

  const addProject = () => {
    const updated = [...(formData.projects), { projectTitle: "", projectLink: "", projectDescription: ""}];
    updateFormData("projects", updated);
  };

  const removeProject = (index) => {
    const updated = [...formData.projects];
    updated.splice(index, 1);
    updateFormData("projects", updated);
  };

  useEffect(() => {
    if (formData.projects.length === 0) {
      updateFormData("projects", [{ projectTitle: "", projectLink: "", projectDescription: ""}]);
    }
  }, []);

  return (
    <div>
      <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
        Projects
      </h2>
      <div className="flex flex-col gap-y-7 py-5 text-sm">
        {(formData.projects).map((project, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 relative gap-x-5 gap-y-3 justify-center mx-5 px-2 py-2 border border-gray-300 rounded-md">
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="projectTitle">Title</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Portfolio Website"
                  value={project.projectTitle}
                  onChange={(e) => handleChange(index, "projectTitle", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="projectLink">Link</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="https://portfolio.live"
                  value={project.projectLink}
                  onChange={(e) => handleChange(index, "projectLink", e.target.value)}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-3">
                <label className="font-semibold" htmlFor="projectDescription">Description</label>
                <textarea
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Short description of your project"
                  value={project.projectDescription}
                  onChange={(e) => handleChange(index, "projectDescription", e.target.value)}
                ></textarea>
              </div>
              <div className="absolute left-148 top-2">
                {formData.projects.length > 1 && (
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeProject(index)}>
                    <img src="/dustbin.svg" alt="" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
      <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md mt-2 mx-5" onClick={addProject}>
        <img src="/plus.svg" alt="" />
        Add Project
      </button>
    </div>
  );
};

export default ProjectInfo;
