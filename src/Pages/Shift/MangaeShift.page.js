import React, { useState, useEffect, useRef } from 'react'
import { Button, Checkbox } from 'antd'
import { DatePicker, Space, Select } from 'antd'
import { PrinterOutlined, CloseOutlined } from '@ant-design/icons'
import json from './../../json/static.json'
import ShiftTableAll from './ShiftTable'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGuard } from '../../Redux/actions/fetchGuard.action'
import ReactToPrint, { useReactToPrint } from 'react-to-print'
import httpClients from '../../utils/httpClients'
import dayjs from 'dayjs'
const { Option } = Select
const { RangePicker } = DatePicker
const ManageShift = () => {
  const [date, setDate] = useState()
  const [data, setData] = useState([])
  const [leave, setLeave] = useState(null)
  const [tabledata, setTableData] = useState()
  const [guard_id, setGuard] = useState()
  const dispatch = useDispatch()
  const componentRef = useRef(null)
  const { guards } = useSelector((state) => state.guard)

  useEffect(() => {
    httpClients
      .GET('/shift/all-shift', true, {
        start_date: date ? dayjs(date[0]).format('YYYY-MM-DD') : null,
        end_date: date ? dayjs(date[1]).format('YYYY-MM-DD') : null,
        guard_id,
        leave: leave,
      })
      .then((out) => {
        setData(out.data)
      })
      .catch((err) => {})
  }, [date, guard_id, leave])

  useEffect(() => {
    dispatch(fetchGuard())
  }, [])
  useEffect(() => {
    const outData = data?.map((item) => ({
      key: item.id,
      date: item.shift_date,
      name: item.user?.first_name + ' ' + item.user?.last_name,
      storage: item.site,
      shift: item.shift_number,
      start_time: dayjs(item.start_time).format('DD-MMM-HH:mm'),
      end_time: dayjs(item.end_time).format('D-MMM-HH:mm'),
      holiday: item.is_holiday ? item.holiday?.name_holiday : '',
      on_leave: item.on_leave ? item.dayoff?.category : '',
    }))
    setTableData(outData)
  }, [data])
  const guardList = guards?.map((item) => (
    <Option value={item.id} key={item.id}>
      {item.first_name} {item.last_name}
    </Option>
  ))

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current
  }, [componentRef.current])
  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: 'Shift',
    removeAfterPrint: true,
    copyStyles: true,
    bodyClass: 'px-4 py-2',
  })

  return (
    <>
      <div className="containers mx-auto">
        <div className="px-4 py-4 d-flex justify-content-between">
          <h1>{json['Manage Shift']} </h1>
          <Link to="/add-shift">
            <Button size="large" type="primary">
              Add Shift
            </Button>
          </Link>
        </div>
        <div className="px-4 ">
          <div className=" d-flex flex-row-reverse py-2">
            <Space direction="horizontal" size={12}>
              <RangePicker
                onChange={(value) => {
                  setDate(value)
                }}
              />
              <Select
                allowClear
                onChange={(value) => {
                  setGuard(value)
                }}
                style={{ width: '300px' }}
                placeholder={json.GUARD}
                clearIcon={true}
              >
                {guardList}
                <Option value={null}>All</Option>
              </Select>
              <Select
                allowClear
                onChange={(value) => {
                  setLeave(value)
                }}
                style={{ width: '150px' }}
                placeholder={json['On Leave']}
                clearIcon={true}
              >
                <Option value={true}>On Leave</Option>
                <Option value={false}>Not On Leave</Option>
                <Option value={null}>All</Option>
              </Select>

              <Button onClick={handlePrint} type="ghost">
                <PrinterOutlined /> {json.Print}
              </Button>
            </Space>
          </div>
          <div ref={componentRef}>
            <ShiftTableAll data={tabledata} />
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageShift
