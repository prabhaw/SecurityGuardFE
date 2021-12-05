import React, { useEffect, useState } from 'react'
import { Typography, Table, DatePicker, Row, Col } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import httpClients from '../../utils/httpClients'

const { Title } = Typography
const GuardWorkingTableMonth = () => {
  const [tabledata, setTableData] = useState([])
  const [selectDate, setSelectDate] = useState(new Date())
  const columns = [
    {
      title: json['shift date'],
      dataIndex: 'shift_date',
      key: 'shift_date',
    },
    {
      title: json['Guard Name'],
      dataIndex: 'guard_name',
      key: 'guard_name',
    },
    {
      title: json['Shift One'] + '(Hr)',
      dataIndex: 'shift_one',
      key: 'shift_one',
    },
    {
      title: json['Shift Two'] + '(Hr)',
      dataIndex: 'shift_two',
      key: 'shift_two',
    },
    {
      title: json['Shift Three'] + '(Hr)',
      dataIndex: 'shift_three',
      key: 'shift_three',
    },
    {
      title: json.Holiday + '(Hr)',
      dataIndex: 'holiday',
      holiday: 'holiday',
      render: (tags) => tags && <p style={{ color: 'red' }}>{tags}</p>,
    },

    {
      title: json.Total + '(Hr)',
      dataIndex: 'total_working_hour',
      key: 'total_working_hour',
    },
  ]

  useEffect(() => {
    httpClients
      .GET('/shift/dash-shift-month', true, {
        date: dayjs(selectDate).format('YYYY-MM-DD'),
      })
      .then(({ data }) => {
        const outData = data?.map((item, i) => ({
          key: item.dataValues?.id,
          sn: i + 1,
          shift_date:
            dayjs(selectDate).startOf('week').format('MMM/DD/YYYY') +
            '-' +
            dayjs(selectDate).endOf('week').format('MMM/DD/YYYY'),
          guard_name:
            item.dataValues?.first_name + ' ' + item.dataValues?.last_name,
          shift_one: item.shift_one * 8,
          shift_two: item.shift_two * 8,
          shift_three: item.shift_three * 8,
          total_working_hour: item.total * 8,
          holiday: item.holiday * 8,
        }))
        setTableData(outData)
      })
      .catch((error) => {})
  }, [selectDate])

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>
            {json['Working Month']}-{dayjs(selectDate).format('MMMM')}
          </Title>
        </Col>
        <Col>
          <DatePicker
            onChange={(date) => {
              setSelectDate(date)
            }}
            picker="month"
          />
        </Col>
      </Row>

      <Table columns={columns} dataSource={tabledata} pagination={false} />
    </>
  )
}
export default GuardWorkingTableMonth
