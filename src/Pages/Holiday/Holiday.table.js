import React, { useState, useEffect } from 'react'
import json from './../../json/static.json'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Table } from 'antd'
import dayjs from 'dayjs'
import { removeHoliday } from '../../Redux/actions/holiday.action'

const HolidayTable = () => {
  const dispatch = useDispatch()
  const { holidays } = useSelector((state) => state.holiday)
  const [tabeldata, setTableData] = useState([])

  useEffect(() => {
    const outData = holidays?.map((item, i) => ({
      sn: i + 1,
      key: item.id,
      holiday_date: dayjs(item.calendar_date).format('MMM/DD/YYYY'),
      holiday_name: item.name_holiday,
      action: item,
    }))
    setTableData(outData)
  }, [holidays])
  const columns = [
    {
      title: json.sn,
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: json['Holiday Date'],
      dataIndex: 'holiday_date',
      key: 'holiday_date',
    },
    {
      title: json['Holiday Name'],
      dataIndex: 'holiday_name',
      key: 'holiday_name',
    },

    {
      title: json.Action,
      dataIndex: 'action',
      key: 'action',
      render: (item) =>
        !item.status && (
          <Button
            type="error"
            onClick={() => {
              dispatch(removeHoliday(item.id))
            }}
          >
            {json.Remove}
          </Button>
        ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={tabeldata} pagination={false} />
    </>
  )
}

export default HolidayTable
