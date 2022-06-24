import React from 'react'

type Props = {
  children: React.ReactNode
}
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='bg-primary h-screen w-screen gap-4 font-primary flex flex-col justify-center items-center'>
      {children}
    </div>
  )
}

export default Layout
