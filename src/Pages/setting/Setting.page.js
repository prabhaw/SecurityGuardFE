import React from 'react'
import { Form, Input, Button, Row, Col, Typography } from 'antd'
import { LockOutlined } from '@ant-design/icons'
import json from './../../json/static.json'
import httpClients from '../../utils/httpClients'
import notifications from '../../utils/notifications'
import { useSelector } from 'react-redux'

const { Title } = Typography

const SettingPage = () => {
  const { user } = useSelector((state) => state.user)
  const [form] = Form.useForm()
  const onFinish = (data) => {
    httpClients
      .PUT(`/user/password/${user.id}`, data, true)
      .then((out) => {
        notifications.showSuccess(out.data.message)
        form.resetFields()
      })
      .catch((err) => {
        notifications.handleError(err.response)
      })
  }
  return (
    <>
      <Row justify="center">
        <Col
          style={{
            background: 'white',
            padding: '24px',
            marginTop: '200px',
            borderRadius: '10px',
          }}
          xs={{ span: 22, offset: 1 }}
          md={{ span: 14, offset: 1 }}
          lg={{ span: 10, offset: 1 }}
        >
          <Title style={{ textAlign: 'center' }} level={3}>
            {json['change password']}
          </Title>

          <Form
            form={form}
            name="normal_login"
            className=""
            onFinish={onFinish}
          >
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
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={json.password}
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                // loading={props.loggingIn}
                block
                size="large"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  )
}

export default SettingPage
