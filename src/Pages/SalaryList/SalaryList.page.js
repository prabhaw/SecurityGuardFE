import React from 'react'
import json from '../../json/static.json'

import { Button, Divider } from 'antd'
import SalaryWeeklyTable from './SalaryWeeklyTable'
import SalaryMonthlyTable from './SalaryMonthlyTable'
import SalaryYearlyTable from './SalaryYearlyTable'
const SalaryListPage = () => {
  return (
    <div className="containers">
      <div className=" py-4 d-flex justify-content-between">
        <h1>{json['Salary List']} </h1>
      </div>

      <h3 className="my-4"></h3>
      <div className="my-4">
        <SalaryWeeklyTable />
        <Divider />
        <SalaryMonthlyTable />
        <Divider />
        <SalaryYearlyTable />
      </div>
    </div>
  )
}

export default SalaryListPage
