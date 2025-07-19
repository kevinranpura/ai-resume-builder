import { useResume } from "../context/ResumeContext";
import { useEffect, useState } from "react";

const PersonalInfo = ({ setIsStepValid }) => {
	const { formData, updateFormData } = useResume();
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);

	const validate = () => {
		const newErrors = {};
		// if (!formData.username?.trim()) newErrors.username = "Name is required";
		// if (!formData.summary?.trim()) newErrors.summary = "Summary is required";

		setErrors(newErrors);
		const isValid = Object.keys(newErrors).length === 0;
		setIsStepValid(isValid);
	};


	const handleGenerateAISummary = async () => {
		setLoading(true)
		const skillsText = formData.skills?.map(s => s.skillName).join(', ') || "";
		const prompt = formData.designation
			? `Write a short and impressive 40 words resume summary for a ${formData.designation}. The summary should highlight key skills, experience, and achievements. Do not include any introductory text, headings, explanations or quotation marks. Just return the summary content only. Do not start with "Award-winning"`
			: `Write a short and impressive 40 words resume summary for someone skilled in ${skillsText}. The summary should highlight key skills, experience, and achievements. Do not include any introductory text, headings, explanations or quotation marks. Just return the summary content only. Do not start with "Award-winning"`;

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
			const aiSummary = data.choices[0].message.content;

			updateFormData("summary", aiSummary);
		} catch (err) {
			console.error("Error generating summary:", err);
		}
		setLoading(false)
	};



	useEffect(() => {
		validate();
	}, [formData]);


	return (
		<div>
			<h2 className="flex items-center py-5 pl-5 font-bold text-xl border-b-1 border-gray-400">
				Personal Details
			</h2>

			<div className="py-10 grid grid-cols-1 md:grid-cols-2 gap-y-15 gap-x-5 mx-5">
				<div className="flex flex-col gap-3">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
						placeholder="John"
						value={formData.username || ""}
						onChange={(e) => updateFormData("username", e.target.value)}
					/>
					{errors.username && <p className="text-red-500">{errors.username}</p>}
				</div>
				<div className="flex flex-col gap-3">
					<label htmlFor="designation">Designation</label>
					<input
						type="text"
						className="border border-gray-200 bg-gray-50 rounded-md outline-none p-2"
						placeholder="Full Stack Developer"
						value={formData.designation || ""}
						onChange={(e) => updateFormData("designation", e.target.value)}
					/>
				</div>
				<div className="relative flex flex-col col-span-2 gap-3">
					<label htmlFor="summary">Summary</label>
					<textarea
						type="text"
						className=" border border-gray-200 bg-gray-50 rounded-md outline-none p-2 h-40"
						placeholder="Short Introduction"
						value={formData.summary || ""}
						onChange={(e) => updateFormData("summary", e.target.value)}
					></textarea>
					<button
						type="button"
						onClick={handleGenerateAISummary}
						disabled={loading}
						className="flex items-center justify-center w-40 text-[14px] gap-2 absolute bottom-2 right-5 bg-blue-300 text-[#00133b] border border-blue-600 font-semibold px-2 py-1 rounded-md mt-2 cursor-pointer">
						{loading? "Generating..." : "Generate with AI" }
						<img src="/stars.svg" alt="" />
					</button>
					{errors.summary && <p className="text-red-500">{errors.summary}</p>}

				</div>
			</div>
		</div>
	);
};

export default PersonalInfo;
