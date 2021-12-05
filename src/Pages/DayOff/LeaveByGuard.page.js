import React, { useEffect } from 'react'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import json from './../../json/static.json'
import LeaveTable from './LeaveTable'
import { fetchLeaveByGuard } from './../../Redux/actions/leave.action'
import { openModal } from '../../Redux/actions/modal.action'
import LeaveForm from './LeaveForm'

const LeaveByGuard = () => {
  const dispatch = useDispatch()
  const Openform = () => {
    dispatch(openModal(<LeaveForm />))
  }
  useEffect(() => {
    dispatch(fetchLeaveByGuard())
  }, [])
  return (
    <div className="containers  ">
      <div className="px-4">
        <div className="add-button ">
          <Button
            type="primary"
            onClick={Openform}
            size="large"
            icon={<AppstoreAddOutlined />}
          >
            {json['Request Leaves']}
          </Button>
        </div>
        <div className="my-4">
          <LeaveTable />
        </div>
      </div>
    </div>
  )
}

export default LeaveByGuard
