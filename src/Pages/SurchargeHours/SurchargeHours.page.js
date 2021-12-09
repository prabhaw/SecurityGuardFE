import React from 'react'
import json from './../../json/static.json'
import SurchargeHoursTable from './SurchargeHoursTable'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../../Redux/actions/modal.action'
import SurchargeForm from './SurchargeForm'

const SurchargeHours = () => {
  const dispatch = useDispatch()

  const openModalToAdd = () => {
    dispatch(openModal(<SurchargeForm />))
  }

  return (
    <div className="containers">
      <div className=" py-4 d-flex justify-content-between">
        <h1>{json['Surcharge Hour']} </h1>

        <Button onClick={openModalToAdd} size="large" type="primary">
          {json['Manage Surcharge Hours']}
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
