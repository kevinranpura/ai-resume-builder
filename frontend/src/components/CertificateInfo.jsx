import React from "react";
import { useEffect } from "react";
import { useResume } from "../context/ResumeContext";

const CertificateInfo = () => {
  const { formData, updateFormData } = useResume();

  const handleChange = (index, field, value) => {
    const updated = [...(formData.certificates)];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    updateFormData("certificates", updated);
  };

  const addCertificate = () => {
    const updated = [...(formData.certificates), { certiTitle: "", certiIssuer: "", certiLink: ""}];
    updateFormData("certificates", updated);
  };

  const removeCertificate = (index) => {
    const updated = [...formData.certificates];
    updated.splice(index, 1);
    updateFormData("certificates", updated);
  };

  useEffect(() => {
    if (formData.certificates.length === 0) {
      updateFormData("certificates", [{ certiTitle: "", certiIssuer: "", certiLink: ""}]);
    }
  }, []);

  return (
    <div>
      <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
        Certifications
      </h2>
      <div className="flex flex-col gap-y-7 py-5 text-sm">
        {(formData.certificates).map((certi, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 md:grid-cols-2 relative gap-x-5 gap-y-3 justify-center mx-5 px-2 py-2 border border-gray-300 rounded-md">
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="certiTitle">Certificate Title</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Web Development"
                  value={certi.certiTitle}
                  onChange={(e) => handleChange(index, "certiTitle", e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-semibold" htmlFor="certiIssuer">Issuer</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Coursera"
                  value={certi.certiIssuer}
                  onChange={(e) => handleChange(index, "certiIssuer", e.target.value)}
                />
              </div>
              <div className="flex flex-col col-span-2 gap-3">
                <label className="font-semibold" htmlFor="certiLink">Link</label>
                <input
                  type="text"
                  className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                  placeholder="Certificate Link"
                  value={certi.certiLink}
                  onChange={(e) => handleChange(index, "certiLink", e.target.value)}
                />
              </div>
              <div className="absolute left-148 top-2">
                {formData.certificates.length > 1 && (
                  <button
                    className="text-red-500 font-bold cursor-pointer"
                    onClick={() => removeCertificate(index)}>
                    <img src="/dustbin.svg" alt="" />
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
      <button className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md mt-2 mx-5" onClick={addCertificate}>
        <img src="/plus.svg" alt="" />
        Add Certificate
      </button>
    </div>
  );
};

export default CertificateInfo;
