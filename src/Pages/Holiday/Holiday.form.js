import React from 'react'
import { DatePicker, Form, Button, Input } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { addHoliday } from '../../Redux/actions/holiday.action'

const HolidayForm = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.holiday)
  const [form] = Form.useForm()
  const onFinish = (data) => {
    dispatch(addHoliday(data))
  }
  return (
    <>
      <h3>{json['Add Holiday']}</h3>
      <Form
        name="holiday-form"
        style={{ padding: '25px 0' }}
        form={form}
        onFinish={onFinish}
        // initialValues={}
      >
        <label htmlFor="calendar_date">
          <span style={{ color: 'red' }}>*</span>
          {json['Holiday Date']}
        </label>
        <Form.Item
          name="calendar_date"
          rules={[{ required: true, message: json['invalid input'] }]}
        >
          <DatePicker size="large" style={{ width: '100%' }} />
        </Form.Item>
        {/* <label htmlFor="date">
          <span style={{ color: 'red' }}>*</span> {json['End Date']}
        </label> */}
        {/* <Form.Item
          name="end_date"
          rules={[{ required: true, message: json['invalid input'] }]}
        >
          <DatePicker size="large" style={{ width: '100%' }} />
        </Form.Item> */}
        <label htmlFor="name_holiday">
          <span style={{ color: 'red' }}>*</span> {json['Holiday Name']}
        </label>
        <Form.Item
          name="name_holiday"
          rules={[{ required: true, message: json['invalid input'] }]}
        >
          <Input size="large" placeholder={json['Holiday Name']} />
        </Form.Item>
        <Form.Item>
          <Button
            loading={loading}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            {json['Add Holiday']}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default HolidayForm
