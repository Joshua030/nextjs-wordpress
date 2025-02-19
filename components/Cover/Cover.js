import Image from 'next/image'
import React from 'react'

const Cover = ({children, background}) => {
  return (
    <div className='h-screen text-white bg-slate-800 relative min-h-[400px] flex justify-center items-center'>
      <Image alt='Cover' src={background} fill priority style={{objectFit:"cover"}} className='mix-blend-soft-light'/>
      <div className='max-w-5xl z-10'>{children}</div>
      </div>
  )
}

export default Cover