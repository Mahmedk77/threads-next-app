import React from 'react'

const RightSidebar = () => {
  return (
    <div className='pl-6 text-white pr-16 py-6 flex flex-col justify-start items-start gap-96 max-md:hidden bg-[#111111]'>
      <h3 className='font-semibold text-lg'>
        Suggested Communities
      </h3>
      <h3 className='font-semibold text-lg'>
        Suggested Users
      </h3>
    </div>
  )
}

export default RightSidebar