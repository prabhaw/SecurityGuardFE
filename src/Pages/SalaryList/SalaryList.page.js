import React, { useState } from 'react'
import json from '../../json/static.json'

import { Button, Divider } from 'antd'
import SalaryWeeklyTable from './SalaryWeeklyTable'
import SalaryMonthlyTable from './SalaryMonthlyTable'
import SalaryYearlyTable from './SalaryYearlyTable'
import { Tabs } from 'antd'

const { TabPane } = Tabs
const SalaryListPage = () => {
  const [key, setKey] = useState(1)

  return (
    <div className="containers">
      <div className=" py-4 d-flex  justify-content-between">
        <h1>{json['Salary List']} </h1>
      </div>
      <Tabs defaultActiveKey={key}>
        <TabPane
          tab={json['Weekly Salary List']}
          key="1"
          onClick={() => {
            setKey(1)
          }}
        >
          <div className="my-4">
            <SalaryWeeklyTable />
          </div>
        </TabPane>
        <TabPane
          tab={json['Monthly Salary List']}
          key="2"
          onClick={() => {
            setKey(2)
          }}
        >
          <div className="my-4">
            {' '}
            <SalaryMonthlyTable />
          </div>
        </TabPane>
        <TabPane
          tab={json['Yearly Salary List']}
          key="3"
          onClick={() => {
            setKey(3)
          }}
        >
          <div className="my-4">
            {' '}
            <SalaryYearlyTable />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default SalaryListPage
