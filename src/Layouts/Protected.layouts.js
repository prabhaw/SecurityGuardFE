import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const ProtectedLayouts = ({ children }) => {
  const loggedIn = useSelector((state) => state.user.loggedIn)
  const navigate = useNavigate()
  useEffect(() => {
    if (!loggedIn) {
      navigate('login')
    }
  }, [loggedIn, navigate])
  return (
    <>
      <Navbar />

      <div className="content-layoute">
        {/* <aside>
          <Sidebar />
        </aside> */}
        <div className="container-layout px-5">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default ProtectedLayouts
