import React, { useEffect, useState } from 'react'
import { Typography, Table, DatePicker, Row, Col, Button } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import { useSelector, useDispatch } from 'react-redux'
import { fetch_sur } from './../../Redux/actions/sur_hour.action'
import { openModal } from '../../Redux/actions/modal.action'
import SurchargeForm from './SurchargeForm'

const { Title } = Typography
const SurchargeHoursTable = () => {
  const [tabledata, setTableData] = useState([])

  const [date, setDate] = useState()
  const timeData = useSelector((state) => state.sur.sur_hour)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetch_sur(date))
  }, [date])

  const onChangeDate = (dates) => {
    if (dates) {
      setDate(dayjs(dates).format('YYYY'))
    } else {
      setDate(null)
    }
  }
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
      key: 'action',
      render: (item) => (
        <Button
          onClick={() => {
            console.log(item)
            dispatch(openModal(<SurchargeForm item={item} />))
          }}
          type="dashed"
        >
          {json.Edit}
        </Button>
      ),
    },
  ]

  useEffect(() => {
    const outData = timeData?.map((item, i) => ({
      key: item.id,
      sn: i + 1,
      date: dayjs(item.year).format('YYYY'),
      surcharge_hour: item.surcharge_hour,
      action: item,
    }))
    setTableData(outData)
  }, [timeData])

  return (
    <>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={5}>
            {json['Selected Year']}-
            {date ? dayjs(date).format('YYYY') : json.All}
          </Title>
        </Col>
        <Col>
          <DatePicker
            onChange={(date) => {
              onChangeDate(date)
            }}
            picker="year"
          />
        </Col>
      </Row>

      <Table
        columns={columns}
        dataSource={[...tabledata]}
        pagination={false}
        bordered
      />
    </>
  )
}
export default SurchargeHoursTable
