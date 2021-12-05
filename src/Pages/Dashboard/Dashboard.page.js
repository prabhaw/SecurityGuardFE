import React from 'react'
import json from './../../json/static.json'
import GuardDash from './GuardDash'
import { useSelector } from 'react-redux'
import AdminDashboard from './AdminDashboard'

const Dashboard = () => {
  const { user, loggedIn } = useSelector((state) => state.user)
  return (
    <div className="containers">
      <div className="px-4">
        <h1 className="my-4">{json.Dashboard}</h1>
        <div className="my-4">
          {loggedIn && user?.role === 'GUARD' && <GuardDash />}
          {loggedIn &&
          (user?.role === 'SUPERVISOR' || user?.role === 'ADMIN') ? (
            <AdminDashboard />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
