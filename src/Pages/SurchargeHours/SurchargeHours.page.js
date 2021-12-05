import React from 'react'
import json from './../../json/static.json'
import SurchargeHoursTable from './SurchargeHoursTable'
import { Button } from 'antd'
const SurchargeHours = () => {
  return (
    <div className="containers">
      <div className=" py-4 d-flex justify-content-between">
        <h1>{json['Surcharge Hour']} </h1>

        <Button size="large" type="primary">
          {json['Manage Salary']}
        </Button>
      </div>

      <h3 className="my-4"></h3>
      <div className="my-4">
        <SurchargeHoursTable />
      </div>
    </div>
  )
}

export default SurchargeHours
