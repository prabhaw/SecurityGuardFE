import React, { useEffect, useState } from 'react'
import { Select, Form, Button, Input, InputNumber, Checkbox } from 'antd'
import json from './../../json/static.json'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGuard } from '../../Redux/actions/fetchGuard.action'
import {
  addShiftByAdmin,
  shiftUpdate,
  remvoeShift,
} from '../../Redux/actions/shift.action'
import { closeModal } from '../../Redux/actions/modal.action'

const { Option } = Select

const ShiftForm = ({ update }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const { guards } = useSelector((state) => state.guard)
  const { open } = useSelector((state) => state.modal)
  const { data } = useSelector((state) => state.shiftForm)
  const { submitbtn, added } = useSelector((state) => state.shiftadmin)
  const [holiday, setHoliday] = useState(false)
  useEffect(() => {
    dispatch(fetchGuard())
  }, [])
  useEffect(() => {
    if (added) {
      dispatch(closeModal())
    }
  }, [added])
  useEffect(() => {
    if (!open) {
      form.resetFields()
      setHoliday(false)
    }
  }, [open])
  const guardList = guards?.map((item) => {
    if (item.user_id !== data.user_id && update) {
      return (
        <Option value={item.id} key={item.id}>
          {item.first_name} {item.last_name}
        </Option>
      )
    } else if (!update) {
      return (
        <Option value={item.id} key={item.id}>
          {item.first_name} {item.last_name}
        </Option>
      )
    }
    return null
  })
  useEffect(() => {
    form.setFieldsValue({
      user_id: data.user_id,
      shift_number: data.shift_number,
      shift_date: data.shift_date,
      site: data.site,
      name_holiday: data.name_holiday,
    })
    setHoliday(data.is_holiday)
  }, [data, update])
  const onHolidayChange = (e) => {
    setHoliday(e.target.checked)
  }

  const onFinish = (datas) => {
    if (update) {
      dispatch(
        shiftUpdate(data.shift_id, {
          ...data,
          user_id: datas.user_id,
        }),
      )
    } else {
      // alert(data.user_num)

      dispatch(addShiftByAdmin({ ...datas, ...data }))
    }
  }

  return (
    <Form
      name="shift-form"
      style={{ padding: '25px 0' }}
      form={form}
      onFinish={onFinish}
      // initialValues={}
    >
      <label htmlFor="user_id">
        <span style={{ color: 'red' }}>*</span> {json.GUARD}
      </label>
      <Form.Item
        name="user_id"
        rules={[{ required: true, message: json['invalid input'] }]}
      >
        <Select placeholder={json.GUARD} size="large">
          {guardList}
        </Select>
      </Form.Item>
      <label htmlFor="shift_date">
        <span style={{ color: 'red' }}>*</span> {json['shift date']}
      </label>
      <Form.Item
        name="shift_date"
        rules={[{ required: true, message: json['invalid input'] }]}
      >
        <Input
          size="large"
          placeholder={json['shift date']}
          readOnly
          // value={data.name}
          // onChange={onNameChange}
        />
      </Form.Item>
      <label htmlFor="site">
        <span style={{ color: 'red' }}>*</span> {json['storage area']}
      </label>
      <Form.Item
        name="site"
        rules={[{ required: true, message: json['invalid input'] }]}
      >
        <Input
          size="large"
          placeholder={json['storage area']}
          readOnly
          // value={data.name}
          // onChange={onNameChange}
        />
      </Form.Item>
      <label htmlFor="shift_number">
        <span style={{ color: 'red' }}>*</span> {json.shift}
      </label>
      <Form.Item
        name="shift_number"
        rules={[{ required: true, message: json['invalid input'] }]}
      >
        <InputNumber
          size="large"
          placeholder={json.shift}
          style={{ width: '100%' }}
          readOnly
          // value={data.name}
          // onChange={onNameChange}
        />
      </Form.Item>

      <Form.Item valuePropName="checked">
        <Checkbox
          size="large"
          // value={data.name}
          checked={holiday}
        >
          {json['is holiday']}
        </Checkbox>
      </Form.Item>
      {holiday && (
        <>
          <label htmlFor="shift_number">
            <span style={{ color: 'red' }}>*</span> {json['holiday name']}
          </label>
          <Form.Item
            name="name_holiday"
            rules={[{ required: true, message: json['invalid input'] }]}
          >
            <Input readOnly size="large" placeholder={json['holiday name']} />
          </Form.Item>
        </>
      )}

      <Form.Item>
        <Button
          loading={submitbtn}
          type="primary"
          htmlType="submit"
          size="large"
          block
        >
          {update ? json['update shift'] : json['add shift']}
        </Button>
      </Form.Item>
      {update && (
        <Button
          loading={submitbtn}
          onClick={() => {
            dispatch(remvoeShift(data.shift_id))
          }}
          type="primary"
          size="large"
          block
          danger
        >
          {json['remove shift']}
        </Button>
      )}
    </Form>
  )
}

export default ShiftForm
