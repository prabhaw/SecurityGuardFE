import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import json from './../../json/static.json'
import LeaveRequestTable from './LeaveRequestTable'
import { fetchLeaveByAdmin } from '../../Redux/actions/leave.action'

const LeaveByAdmin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchLeaveByAdmin())
  }, [])
  return (
    <div className="containers  ">
      <div className="px-4">
        <h3 className="mt-4 mb-4">{json['Leaves Requests']}</h3>
        <LeaveRequestTable />
      </div>
    </div>
  )
}

export default LeaveByAdmin
