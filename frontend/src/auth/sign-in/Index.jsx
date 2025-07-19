import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { useUser } from '@clerk/clerk-react'

const Index = () => {
  return (
    <div className='flex h-[90vh] justify-center items-center '>
      <SignIn/>
    </div>
  )
}

export default Index