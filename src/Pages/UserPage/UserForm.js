import React from 'react'
import json from './../../json/static.json'

import { Form, Input, Button, InputNumber, Select } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { addUser } from '../../Redux/actions/user.action'

const { Option } = Select

const UserForm = () => {
  const dispatch = useDispatch()
  const onFinish = (data) => {
    dispatch(addUser(data))
  }
  return (
    <>
      <h5 className="mb-4">{json['user from title']}</h5>
      <Form name="add_user" onFinish={onFinish}>
        <label htmlFor="first_name">
          <span style={{ color: 'red' }}>*</span>
          {json['first name']}
        </label>
        <Form.Item
          name="first_name"
          rules={[
            {
              required: true,
              message: 'Please input First Name!',
            },
          ]}
        >
          <Input placeholder="First Name" size="large" />
        </Form.Item>
        <label htmlFor="last_name">
          <span style={{ color: 'red' }}>*</span>
          {json['last name']}
        </label>
        <Form.Item
          name="last_name"
          rules={[
            {
              required: true,
              message: 'Please input  Last Name!',
            },
          ]}
        >
          <Input placeholder="Last Name" size="large" />
        </Form.Item>

        <label htmlFor="email">
          <span style={{ color: 'red' }}>*</span>
          {json.email}
        </label>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input  Email!',
            },
            { type: 'email' },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            size="large"
          />
        </Form.Item>

        <label htmlFor="password">
          <span style={{ color: 'red' }}>*</span> {json.password}
        </label>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input  Password!',
            },
            {
              pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z@$&!\\d]{8,32}$',

              message: 'Password must be 8 character long and One Number!',
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <label htmlFor="password">
          <span style={{ color: 'red' }}>*</span> {json['phone number']}
        </label>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please input Phone Number!',
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder="Phone Number"
            size="large"
          />
        </Form.Item>
        <label htmlFor="password">
          <span style={{ color: 'red' }}>*</span> {json.role}
        </label>
        <Form.Item
          name="role"
          rules={[{ required: true, message: 'Input User Role.' }]}
        >
          <Select size="large" placeholder="User Type" allowClear>
            <Option value="SUPERVISOR">{json.SUPERVISOR}</Option>
            <Option value="GUARD">{json.GUARD}</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            // loading={props.btn_load}
            className="login-form-button"
            size="large"
          >
            {json['add user']}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default UserForm
