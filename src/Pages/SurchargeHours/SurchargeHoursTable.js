import React, { useEffect, useState } from 'react'
import { Typography, Table, DatePicker, Row, Col, Button } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'

const { Title } = Typography
const SurchargeHoursTable = () => {
  const [tabledata, setTableData] = useState([])
  const [selectDate, setSelectDate] = useState(null)
  const columns = [
    {
      title: json.sn,
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: json.Year,
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: json['Max Surcharge Hour'],
      dataIndex: 'surcharge_hour',
      key: 'surcharge_hour',
    },

    {
      title: json.Action,
      dataIndex: 'action',
      holiday: 'action',
      render: (tags) => <Button type="dashed">{json.Edit}</Button>,
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

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>
            {json['Selected Year']}-
            {selectDate ? dayjs(selectDate).format('YYYY') : json.All}
          </Title>
        </Col>
        <Col>
          <DatePicker
            onChange={(date) => {
              setSelectDate(date)
            }}
            picker="year"
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
export default SurchargeHoursTable
