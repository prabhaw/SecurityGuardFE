import React from 'react'
import { DatePicker, Form, Button, Input } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { requestLeave } from './../../Redux/actions/leave.action'
const { RangePicker } = DatePicker
const LeaveForm = () => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onFinish = (data) => {
    const value = {
      start_date: dayjs(data.date[0]).format('YYYY-MM-DD'),
      end_date: dayjs(data.date[1]).format('YYYY-MM-DD'),
      category: data.category,
    }
    dispatch(requestLeave(value))
  }
  return (
    <>
      <h3>{json['Request For Leave']}</h3>
      <Form
        name="shift-form"
        style={{ padding: '25px 0' }}
        form={form}
        onFinish={onFinish}
        // initialValues={}
      >
        <label htmlFor="start_date">
          <span style={{ color: 'red' }}>*</span>
          {json['Start Date']}-{json['End Date']}
        </label>
        <Form.Item
          name="date"
          rules={[{ required: true, message: json['invalid input'] }]}
        >
          <RangePicker size="large" style={{ width: '100%' }} />
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
        <label htmlFor="category">
          <span style={{ color: 'red' }}>*</span> {json['Category']}
        </label>
        <Form.Item
          name="category"
          rules={[{ required: true, message: json['invalid input'] }]}
        >
          <Input size="large" placeholder={json['Leave Category']} />
        </Form.Item>
        <Form.Item>
          <Button
            // loading={submitbtn}
            type="primary"
            htmlType="submit"
            size="large"
            block
          >
            {json['Request Leaves']}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LeaveForm
