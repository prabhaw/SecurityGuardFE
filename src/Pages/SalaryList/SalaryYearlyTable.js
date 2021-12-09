import React, { useEffect, useState } from 'react'
import { Typography, Table, DatePicker, Row, Col, Button } from 'antd'
import json from '../../json/static.json'
import dayjs from 'dayjs'
import httpClients from '../../utils/httpClients'
const { Column, ColumnGroup } = Table
const { Title } = Typography
const SalaryYearlyTable = () => {
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
      title: json['Surcharge Hour'],
      dataIndex: 'surcharge_hour',
      key: 'surcharge_hour',
    },
    {
      title: json['Total'],
      dataIndex: 'total',
      key: 'total',
    },
  ]

  useEffect(() => {
    httpClients
      .GET('/shift/salary-year', true, {
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

          surcharge_hour: item.surcharge_hour,
          total:
            parseInt(item.total) * 8 > 1000
              ? (parseInt(item.total) - parseInt(item.surcharge_hour)) * 50 +
                parseInt(item.surcharge_hour) * 75
              : parseInt(item.total) * 50 + '  ' + 'EUR',
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
        dataSource={tabledata}
        columns={columns}
        pagination={false}
        bordered
      />
    </>
  )
}
export default SalaryYearlyTable
