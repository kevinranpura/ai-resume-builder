import { forwardRef } from "react";
import React from "react";

const ResumePreview = forwardRef(({ formData, template = "classic", theme }, ref) => {
  const {
    username,
    designation,
    summary,
    email,
    phone,
    linkedin,
    github,
    education = [],
    workexperience = [],
    projects = [],
    skills = [],
    certificates = [],
  } = formData;

  if (template === "modern") {
    return (
      <div ref={ref} style={{ backgroundColor: "#ffffff", color: "#000000", maxHeight: "900px", minWidth: "790px"}} className="flex px-2 py-3 mt-3 rounded-lg justify-between">
        <div style={{ backgroundColor: theme.primary }} className={`w-[34%] h-full px-2 rounded-md`}>

          <div className="pt-1 text-center mb-7">
            <p className={`${(username.length <= 14) ? "text-nowrap text-[32px] font-bold" : "text-[32px] font-bold"}`}>
              {username}
            </p>
            <p style={{ color: "#364153" }} className="text-[25px] font-semibold">{designation}</p>
          </div>

          <div className="flex flex-col justify-center mb-15 gap-5">
            <p className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1.5`} src="/mail.svg" alt="" />
              {email}
            </p>
            <p className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1.5`} src="/phone.svg" alt="" />
              +91 {phone}
            </p>
            <p className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1.5`} src="/linkedin.svg" alt="" />
              <a className="underline" href={`${linkedin}`} target="_blank">{linkedin}</a>
            </p>
            <p className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1.5`} src="/github.svg" alt="" />
              <a className="underline" href={`${github}`} target="_blank">{github}</a>
            </p>
          </div>

          {education.length > 0 && (
            <div className="mb-10 px-1">
              <p style={{ backgroundColor: theme.secondary }} className={`"inline-block rounded-lg text-[25px] font-bold mb-3 px-2`}>Education</p>
              {education.map((item, index) => (
                <div className="pl-1 mb-2" key={index}>
                  <div>
                    <p className="text-[18px] font-bold">{item.degree}</p>
                    <p style={{ color: "#364153" }} className="text-[16px] font-semibold">{item.institute}</p>
                    <p style={{ color: "#364153" }} className="text-[16px] font-semibold">CGPA : {item.result}</p>
                    <p style={{ color: "#364153" }} className="text-[16px] font-semibold">{item.eduStart.split("-")[0]} - {item.eduEnd.split("-")[0]}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {skills.length > 0 && (
            <div className="mb-10 px-1">
              <p style={{ backgroundColor: theme.secondary }} className={`inline-block rounded-lg text-[25px] font-bold mb-3 px-2`}>Skills</p>
              {skills.map((skill, index) => (
                <div key={index} className="mb-2 pl-1">
                  <p className="text-[20px] font-semibold">• {skill.skillName}</p>
                </div>
              ))}
            </div>
          )}

        </div>

        <div className="w-[65%] h-full px-1">

          {summary && (
            <div className="mb-7">
              <p style={{ backgroundColor: theme.primary }} className={`text-[25px] inline-block mb-3 font-bold rounded-lg px-2`}>Summary</p>
              <p className="text-[18px] flex pl-1">{summary}</p>
            </div>
          )}

          {workexperience.length > 0 && (
            <div className="mb-7">
              <p style={{ backgroundColor: theme.primary }} className={`text-[25px] inline-block mb-3 font-bold rounded-lg px-2`}>Work Experience</p>
              <div className="">
                {workexperience.map((item, index) => (
                  <div className="mb-3 pl-1" key={index}>
                    <div className="flex justify-between">
                      <p className="text-[20px] font-semibold">{item.company} - {item.role}</p>
                      <p className="text-[13px] ">{item.workStart.split("-")[0]} - {item.workEnd.split("-")[0]}</p>
                    </div>
                    <p className="text-[18px] ">{item.workexpDescription}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {projects.length > 0 && (
            <div className="mb-7">
              <p style={{ backgroundColor: theme.primary }} className={`text-[25px] inline-block mb-3 font-bold rounded-lg px-2`}>Projects</p>
              <div className="">
                {projects.map((project, index) => (
                  <div key={index} className="mb-3 pl-1">
                    <p className="text-[20px] font-semibold" key={index}>{project.projectTitle}</p>
                    <p className="text-[18px] " > {project.projectDescription}</p>
                    <p className="flex gap-3 mt-1 px-2 ">
                      <img style={{ backgroundColor: theme.secondary }} className={`rounded-xl p-1`} src="/link.svg" alt="" />
                      <a className="underline text-[16px]" href={`${project.projectLink}`} target="_blank">{project.projectLink}</a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {certificates.length > 0 && (
            <div className="my-7">
              <span style={{ backgroundColor: theme.primary }} className={`text-[25px] inline-block mb-3 font-bold rounded-lg px-2`}>Certificates</span>
              {certificates.map((cert, index) => (
                <div key={index} className="mb-3">
                  <p className="text-[20px] font-semibold">• {cert.certiTitle} from {cert.certiIssuer}</p>
                  <p className="flex gap-3 mt-1 px-2 ">
                    <img style={{ backgroundColor: theme.secondary }} className={`rounded-xl p-1`} src="/link.svg" alt="" />
                    <a className="underline text-[16px] " href={`${cert.certiLink}`} target="_blank">{cert.certiLink}</a>
                  </p>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    );
  }



  if (template === "template3") {
    return (
      <div ref={ref} style={{ backgroundColor: "#ffffff", color: "#000000", maxHeight: "900px", maxWidth: "800px" }} className="px-5 py-5 rounded-lg">
        <div className="flex justify-between gap-2 mb-3">
          <div className="pl-2 w-[33%]">
            <p className="text-[30px] text-wrap font-extrabold">
              {username.split(" ")[0]}<br />
              {username.split(" ").slice(1).join(" ")}
            </p>
            <p style={{ color: "#4a5565" }} className="text-[22px] font-semibold">{designation}</p>
          </div>
          <div className="w-[65%] grid grid-cols-2 gap-x-18 font-semibold">
            <div className="text-[17px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1`} src="/mail.svg" alt="" />
              {email}
            </div>
            <div className="w-[150px] text-[17px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1`} src="/phone.svg" alt="" />
              +91 {phone}
            </div>
            <div className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1`} src="/linkedin.svg" alt="" />
              <a className="underline" href={`${linkedin}`} target="_blank">{linkedin}</a>
            </div>
            <div className="text-[16px] flex gap-2 font-semibold items-center">
              <img style={{ backgroundColor: theme.secondary }} className={`rounded-lg p-1`} src="/github.svg" alt="" />
              <a className="underline" href={`${github}`} target="_blank">{github}</a>
            </div>
          </div>
        </div>


        <div style={{ color: "#000000" }} className="flex py-5 gap-2">

          <div style={{ backgroundColor: theme.primary }} className={`w-[33%] px-2 rounded-md`}>

            {education.length > 0 && (
              <div className="mb-7 px-1 pt-2">
                <p style={{ borderColor: theme.secondary }} className={`inline-block text-[25px] font-bold mb-3 border-b-6`}>Education</p>
                {education.map((item, index) => (
                  <div className="mb-3 pl-1" key={index}>
                    <div>
                      <p className="text-[18px] font-bold">{item.degree}</p>
                      <p style={{ color: "#364153" }} className="text-[15px] font-semibold">{item.institute}</p>
                      <p style={{ color: "#364153" }} className="text-[15px] font-semibold">CGPA : {item.result}</p>
                      <p style={{ color: "#364153" }} className="text-[14px] font-semibold">{item.eduStart.split("-")[0]} - {item.eduEnd.split("-")[0]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div className="mb-7 px-1">
                <p style={{ borderColor: theme.secondary }} className={`inline-block text-[25px] font-bold mb-3 border-b-6`}>Skills</p>
                {skills.map((skill, index) => (
                  <div key={index} className="mb-2 pl-1">
                    <p className="text-[18px] font-semibold">• {skill.skillName}</p>
                  </div>
                ))}
              </div>
            )}

            {certificates.length > 0 && (
              <div className="mb-3 ">
                <p style={{ borderColor: theme.secondary }} className={`inline-block text-[25px] mb-3 font-bold border-b-6`}>Certificates</p>
                {certificates.map((cert, index) => (
                  <div key={index} className="mb-2 pl-1">
                    <div className="flex gap-2">
                      <p className="font-bold">•</p>
                      <p className="text-[16px]"> {cert.certiTitle} from {cert.certiIssuer}</p>
                    </div>
                    <p className="flex gap-3 mt-1 px-2 ">
                      <img style={{ backgroundColor: theme.secondary }} className={`rounded-xl p-1`} src="/link.svg" alt="" />
                      <a className="underline text-[14px] " href={`${cert.certiLink}`} target="_blank">{cert.certiLink}</a>
                    </p>
                  </div>
                ))}
              </div>
            )}


          </div>

          <div className="w-[65%] px-1">

            {summary && (
              <div className="mb-7">
                <h2 style={{ backgroundColor: theme.primary, borderColor: theme.secondary }} className={`text-[25px] border-l-6 mb-4 font-bold px-2`}>Summary</h2>
                <p className="text-[17px]">{summary}</p>
              </div>
            )}

            {workexperience && (
              <div className="mb-7">
                <p style={{ backgroundColor: theme.primary, borderColor: theme.secondary }} className={`text-[25px] border-l-6 mb-4 font-bold px-2`}>Work Experience</p>
                <div className="">
                  {workexperience.map((item, index) => (
                    <div className="mb-3" key={index}>
                      <div className="flex justify-between">
                        <p className="text-[18px] font-semibold">{item.company} - {item.role}</p>
                        <p className="text-[15px] ">{item.workStart.split("-")[0]} - {item.workEnd.split("-")[0]}</p>
                      </div>
                      <p className="text-[17px] ">{item.workexpDescription}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {projects.length > 0 && (
              <div className="mb-7">
                <p style={{ backgroundColor: theme.primary, borderColor: theme.secondary }} className={`text-[25px] border-l-6 mb-4 font-bold px-2`}>Projects</p>
                <div className="">
                  {projects.map((project, index) => (
                    <div key={index} className="mb-3">
                      <p className="text-[18px] font-semibold" key={index}>{project.projectTitle}</p>
                      <p className="text-[17px] "> {project.projectDescription}</p>
                      <p className="flex gap-3 mt-1 px-2 ">
                        <img style={{ backgroundColor: theme.secondary }} className={`rounded-xl p-1`} src="/link.svg" alt="" />
                        <a className="underline text-[15px]" href={`${project.projectLink}`} target="_blank">{project.projectLink}</a>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}



          </div>
        </div>
      </div>
    );
  }




  // Classic template (default)
  return (
    <div ref={ref} style={{ backgroundColor: "#ffffff", color: "#000000", maxHeight: "900px", maxWidth: "800px"}} className="px-10 mt-7 pt-2 pb-5 rounded-lg">
      <div className="text-center mb-7">
        <p className="text-[25px] font-extrabold">{username}</p>
        <p style={{ color: "#4a5565" }} className="text-[20px] font-semibold">{designation}</p>
        <p className="text-[16px] py-2 font-semibold">
          {email}  —  +91 {phone}  —  <a className="underline" href={`${linkedin}`} target="_blank">LinkedIn</a>  —  <a className="underline" href={`${github}`} target="_blank">GitHub</a>
        </p>
      </div>

      {summary && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Summary</p>
          <p className="text-[17px] flex">{summary}</p>
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Education</p>
          <div className="flex flex-col gap-2">
            {education.map((item, index) => (
              <div className="flex justify-between" key={index}>
                <div>
                  <p className="text-[16px] font-semibold">{item.degree}</p>
                  <p className="text-[14px]">• {item.institute}</p>
                  <p className="text-[14px]">• CGPA : {item.result}</p>
                </div>
                <p className="text-[13px] ">{item.eduStart.split("-")[0]} - {item.eduEnd.split("-")[0]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {workexperience.length > 0 && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Work Experience</p>
          <div className="flex flex-col gap-2">
            {workexperience.map((item, index) => (
              <div className="" key={index}>
                <div className="flex justify-between">
                  <p className="text-[16px] font-semibold">{item.company} - {item.role}</p>
                  <p className="text-[13px] ">{item.workStart.split("-")[0]} - {item.workEnd.split("-")[0]}</p>
                </div>
                <p className="text-[14px] ">{item.workexpDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Skills</p>
          <div className="">
            {skills.map((skill, index) => (
              <div key={index} className="">
                <p className="text-[16px] font-semibold">• {skill.skillName}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Projects</p>
          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={index}>
                <span className="text-[16px] font-semibold" key={index}>{project.projectTitle} — </span>
                <span><a className="underline text-[14px]" href={`${project.projectLink}`} target="_blank">Link</a></span>
                <p className="text-[14px] " > {project.projectDescription}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {certificates.length > 0 && (
        <div className="mb-5">
          <p className="text-[21px] border-b-1 mb-1 font-bold">Certificates</p>
          {certificates.map((cert, index) => (
            <div key={index}>
              <span className="text-[15px] font-semibold" >• {cert.certiTitle} from {cert.certiIssuer} — </span>
              <span>
                <a className="underline text-[14px] " href={`${cert.certiLink}`} target="_blank">Link</a>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default ResumePreview;
