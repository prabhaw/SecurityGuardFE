import React, { useEffect } from 'react'
import { Form, Input, Button, Row, Col, Alert } from 'antd'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import json from '../../json/static.json'
import { Typography } from 'antd'
import { login_user } from '../../Redux/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const { Title } = Typography

const LogINPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { message, loggedIn } = useSelector((state) => state.user)
  const onFinish = (data) => {
    dispatch(login_user(data))
  }
  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  }, [loggedIn, navigate])
  return (
    <div className="logiInBackground">
      <Row justify="center">
        <Col
          style={{
            background: 'white',
            padding: '24px',

            borderRadius: '10px',
          }}
          xs={{ span: 24, offset: 1 }}
          lg={{ span: 24, offset: 1 }}
        >
          <Title style={{ textAlign: 'center' }} level={3}>
            {json.login}
          </Title>
          {message && (
            <div className="login-message">
              <Alert message={message} type="error" showIcon />
            </div>
          )}
          <Form name="normal_login" className="" onFinish={onFinish}>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: json['invalid input'],
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder={json.email}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: json['invalid input'],
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
                Log In
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default LogINPage
