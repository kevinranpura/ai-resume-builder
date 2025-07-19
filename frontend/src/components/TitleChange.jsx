import React, { useState } from 'react'


const TitleChange = ({title, settitle}) => {
    const [showinput, setshowinput] = useState(false)

  return (
    <div className='flex items-center gap-1 md:gap-3 h-[40px]'>
      {showinput ? (
      <>
        <input type="text" className='bg-[#ececec] px-5 py-2 outline-none w-[140px] md:w-[230px] h-[48px] rounded-md font-semibold text-[15px] md:text-[18px]' placeholder='Resume Title' value={title} onChange={({target})=> settitle(target.value)} />
        <button className='cursor-pointer' onClick={()=> setshowinput((prevState)=>!prevState)}>
            <img src="/checkmark.svg" alt="checkmark" />
        </button>
      </>):(
      <> 
      <h2 className='px-2 md:px-5 py-2 font-semibold text-[15px] md:text-[18px]'>{title}</h2>
      <button className='cursor-pointer' onClick={()=> setshowinput((prevState)=>!prevState)}>
        <img src="/pencil.svg" alt="edit" /> 
      </button>
      </>)
      }
    </div> 
  )
}

export default TitleChange
