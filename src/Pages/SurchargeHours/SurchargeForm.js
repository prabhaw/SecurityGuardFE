import React, { useEffect } from 'react'
import { Form, Input, Button, InputNumber, DatePicker } from 'antd'
import json from './../../json/static.json'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
// import monent from 'monent'
import { update_sur, add_sur } from './../../Redux/actions/sur_hour.action'

const SurchargeForm = ({ item }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const onFinish = (data) => {
    // console.log({
    //   date: dayjs(data.date).format('YYYY'),
    //   surcharge_hour: data.surcharge_hour,
    // })
    if (item?.action?.id) {
      dispatch(
        update_sur(item?.action?.id, {
          year: dayjs(data.date).format('YYYY'),
          surcharge_hour: data.surcharge_hour,
        }),
      )
    } else {
      dispatch(
        add_sur({
          date: dayjs(data.date).format('YYYY'),
          surcharge_hour: data.surcharge_hour,
        }),
      )
    }
  }
  useEffect(() => {
    if (item?.action?.year) {
      form.setFieldsValue({
        date: dayjs(item?.action.year),
        year: dayjs(item?.action.year).format('YYYY'),
        surcharge_hour: item.action.surcharge_hour,
      })
    }
  }, [item])
  return (
    <>
      <Form form={form} name="add_user" onFinish={onFinish}>
        <label htmlFor="first_name">
          <span style={{ color: 'red' }}>*</span>
          {json.Year}
        </label>
        {item?.action?.year ? (
          <Form.Item
            name="year"
            rules={[
              {
                required: true,
                message: json['invalid input'],
              },
            ]}
          >
            <Input readOnly />
          </Form.Item>
        ) : (
          <Form.Item
            name="date"
            rules={[
              {
                required: true,
                message: json['invalid input'],
              },
            ]}
          >
            <DatePicker
              picker={'year'}
              style={{ width: '100%' }}
              size="large"
            />
          </Form.Item>
        )}
        <label htmlFor="first_name">
          <span style={{ color: 'red' }}>*</span>
          {json['Surcharge Hour By Year']}
        </label>
        <Form.Item
          name="surcharge_hour"
          rules={[
            {
              required: true,
              message: json['invalid input'],
            },
          ]}
        >
          <InputNumber
            style={{ width: '100%' }}
            placeholder={json['Surcharge Hour By Year']}
            size="large"
          />
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
            {item?.id ? json['Update Surcharge'] : json['Add Surcharge']}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default SurchargeForm
