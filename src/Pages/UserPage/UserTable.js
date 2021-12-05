import React, { useEffect, useState } from 'react'
import json from './../../json/static.json'
import { useSelector } from 'react-redux'
import { Typography, Table, DatePicker, Row, Col, Tag } from 'antd'

const UserTable = () => {
  const [tabledata, setTableData] = useState([])
  const { users } = useSelector((state) => state.users)
  const columns = [
    {
      title: json.sn,
      dataIndex: 'sn',
      key: 'sn',
    },
    {
      title: json['first name'],
      dataIndex: 'first_name',
      key: 'first_name',
    },

    {
      title: json['last name'],
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: json.email,
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: json['phone number'],
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: json.role,
      dataIndex: 'role',
      holiday: 'role',
      render: (tags) =>
        tags && (
          <Tag color={tags === 'SUPERVISOR' ? 'success' : 'orange'}>{tags}</Tag>
        ),
    },
  ]

  useEffect(() => {
    const outData = users?.map((item, i) => ({
      key: item.id,
      sn: i + 1,
      first_name: item.first_name,
      last_name: item.last_name,
      email: item.email,
      phone_number: item.phone,
      role: item.role,
    }))
    setTableData(outData)
  }, [users])

  return (
    <>
      <Table
        columns={columns}
        dataSource={tabledata}
        pagination={false}
        bordered
      />
    </>
  )
}

export default UserTable
