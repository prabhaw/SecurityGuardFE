import { Row, Col, Divider } from 'antd'
import React from 'react'
import AdminChart from './AdminChart'
import GuardWorkingTable from './GuardWorkingTable'
import GuardWorkingTableMonth from './GuardWorkingTableMonth'

const AdminDashboard = () => {
  return (
    <>
      <AdminChart />
      <Divider />
      <GuardWorkingTable />
      <Divider />
      <GuardWorkingTableMonth />
    </>
  )
}

export default AdminDashboard
