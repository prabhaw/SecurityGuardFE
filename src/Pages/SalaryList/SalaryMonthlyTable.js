import React, { useEffect, useState } from 'react'
import { Typography, Table, DatePicker, Row, Col, Button } from 'antd'
import json from '../../json/static.json'
import dayjs from 'dayjs'
import httpClients from '../../utils/httpClients'
const { Column, ColumnGroup } = Table
const { Title } = Typography
const SalaryMonthlyTable = () => {
  const [tabledata, setTableData] = useState([])
  const [selectDate, setSelectDate] = useState(new Date())
  const columns = [
    {
      title: json.sn,
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: json['Guard Name'],
      dataIndex: 'guard_name',
      key: 'guard_name',
    },

    {
      title: json['Shift One'],
      dataIndex: 'shift_one',
      key: 'shift_one',
    },
    {
      title: json['Shift Two'],
      dataIndex: 'shift_two',
      key: 'shift_two',
    },
    {
      title: json['Shift Three'],
      dataIndex: 'shift_three',
      key: 'shift_three',
    },
    {
      title: json['Total'],
      dataIndex: 'total',
      key: 'total',
    },
  ]

  //   useEffect(() => {
  //     httpClients
  //       .GET('/shift/shift-guard-dash', true, {
  //         date: dayjs(selectDate).format('YYYY-MM-DD'),
  //       })
  //       .then(({ data }) => {
  //         const outData = data?.map((item, i) => ({
  //           key: item.id,
  //           sn: i + 1,
  //           shift_date: dayjs(item.shift_date).format('MMM/DD/YYYY'),

  //           shift_one: item.shift_one * 8,
  //           shift_two: item.shift_two * 8,
  //           shift_three: item.shift_three * 8,

  //           holiday: item.holiday * 8,
  //         }))
  //         setTableData(outData)
  //       })
  //       .catch((error) => {})
  //   }, [selectDate])
  useEffect(() => {
    httpClients
      .GET('/shift/salary-month', true, {
        date: dayjs(selectDate).format('YYYY'),
      })
      .then(({ data }) => {
        const outData = data?.map((item, i) => ({
          key: item.id,
          sn: i + 1,
          guard_name:
            item.dataValues?.first_name + ' ' + item.dataValues?.last_name,

          shift_one: item.shift_one,

          shift_two: item.shift_two,

          shift_three: item.shift_three,

          total: parseInt(item.total) * 50 + 'EUR',
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
            {json['Selected Month']} -
            {selectDate ? dayjs(selectDate).format('YYYY/MMMM') : json.All}
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

      <Table
        columns={columns}
        dataSource={tabledata}
        pagination={false}
        bordered
      />
    </>
  )
}
export default SalaryMonthlyTable
