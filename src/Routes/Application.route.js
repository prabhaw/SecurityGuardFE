import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ProtectedLayouts from '../Layouts/Protected.layouts'
import LogINPage from '../Pages/LogInPage/LogIn.page'
import SettingPage from '../Pages/setting/Setting.page'
import UserPage from '../Pages/UserPage/User.page'
import { useSelector } from 'react-redux'
import PageNotFound from '../Pages/NotFound/NotFound.page'
import ManageShift from '../Pages/Shift/MangaeShift.page'
import GuardShiftPage from '../Pages/GuardShift/GuardShift.page'
import LeaveByGuard from '../Pages/DayOff/LeaveByGuard.page'
import LeaveByAdmin from '../Pages/LeaveRequest/LeaveRequest.page'
import HolidayPage from '../Pages/Holiday/Holiday.page'
import Dashboard from '../Pages/Dashboard/Dashboard.page'
import AddShiftList from '../Pages/Shift/Shift.page'
import SurchargeHours from '../Pages/SurchargeHours/SurchargeHours.page'
import SalaryListPage from '../Pages/SalaryList/SalaryList.page'

const ApplicationRoute = () => {
  const { user, loggedIn } = useSelector((state) => state.user)
  return (
    <Routes>
      <Route path="/login" element={<LogINPage />} />
      <Route path="/" element={<ProtectedLayouts />}>
        <Route index element={<Dashboard />} />
        {loggedIn && user?.role === 'ADMIN' && (
          <>
            <Route path="/user" element={<UserPage />} />
            <Route path="/surcharge-hour" element={<SurchargeHours />} />
          </>
        )}
        {loggedIn && user?.role === 'SUPERVISOR' && (
          <>
            <Route path="/manage-shift" element={<ManageShift />} />
            <Route path="/leave-admin" element={<LeaveByAdmin />} />
            <Route path="/holiday" element={<HolidayPage />} />
            <Route path="/add-shift" element={<AddShiftList />} />
            <Route path="/salary-list" element={<SalaryListPage />} />
          </>
        )}
        {loggedIn && user?.role === 'GUARD' && (
          <>
            <Route path="/guard-shift" element={<GuardShiftPage />} />
            <Route path="/leave-guard" element={<LeaveByGuard />} />
          </>
        )}

        <Route path="/setting" element={<SettingPage />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default ApplicationRoute
