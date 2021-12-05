import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import json from './../../json/static.json'
import HolidayTable from './Holiday.table'
import { openModal } from '../../Redux/actions/modal.action'
import HolidayForm from './Holiday.form'
import { fetchHoliday } from '../../Redux/actions/holiday.action'

const HolidayPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchHoliday())
  }, [fetchHoliday, dispatch])
  const Openform = () => {
    dispatch(openModal(<HolidayForm />))
  }
  return (
    <div className="containers  ">
      <div className="px-4 d-flex justify-content-between">
        <h3 className="mt-4 mb-4">{json['Holiday List']}</h3>
        <div className="add-button ">
          <Button
            type="primary"
            onClick={Openform}
            size="large"
            icon={<AppstoreAddOutlined />}
          >
            {json['Add Holiday']}
          </Button>
        </div>

        {/* <LeaveRequestTable /> */}
      </div>
      <div className="px-4">
        <HolidayTable />
      </div>
    </div>
  )
}

export default HolidayPage
