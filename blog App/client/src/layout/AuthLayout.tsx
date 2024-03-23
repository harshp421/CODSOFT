import React from 'react'

const AuthLayout = ({children}:any) => {
  return (
    <div className='w-full h-screen'>
      <div className='flex h-full justify-center items-center'> {children}</div>
    </div>
  )
}

export default AuthLayout