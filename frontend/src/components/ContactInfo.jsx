import { useResume } from "../context/ResumeContext";

const ContactInfo = () => {
  const { formData, updateFormData } = useResume();

  return (
    <div>
        <h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
            Contact Details
        </h2>
    
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-y-15 gap-x-5 mx-5">
            <div className="flex flex-col gap-3">
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                    placeholder="john@example.com"
                    value={formData.email || ""}
                    onChange={(e) => updateFormData("email", e.target.value)}       
                />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="phone">Phone Number</label>
                <input
                    type="text"
                    className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                    placeholder="+91"
                    value={formData.phone || ""}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="linkedin">LinkedIn</label>
                <input
                    type="text"
                    className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin || ""}
                    onChange={(e) => updateFormData("linkedin", e.target.value)}
                />   
            </div>
            <div className="flex flex-col gap-3">
                <label htmlFor="github">GitHub</label>
                <input
                    type="text"
                    className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
                    placeholder="https://github.com/username"
                    value={formData.github || ""}
                    onChange={(e) => updateFormData("github", e.target.value)}
                />   
            </div>
        </div>
    </div>
  );
};

export default ContactInfo;
