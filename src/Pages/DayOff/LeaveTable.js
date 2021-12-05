import React, { useState, useEffect } from 'react'
import json from './../../json/static.json'
import { useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { Table, Tag } from 'antd'

const columns = [
  {
    title: json['Start Date'],
    dataIndex: 'start_date',
    key: 'start_date',
  },
  {
    title: json['End Date'],
    dataIndex: 'end_date',
    key: 'end_date',
  },
  {
    title: json.Category,
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: json.Status,
    dataIndex: 'status',
    key: 'status',
    render: (tags) =>
      tags ? (
        <Tag color="success">{json.Accepted}</Tag>
      ) : (
        <Tag color="orange">{json['Not Accepted']}</Tag>
      ),
  },
]

const LeaveTable = () => {
  const { leaves } = useSelector((state) => state.leaves)
  const [tabeldata, setTableData] = useState([])

  useEffect(() => {
    const outData = leaves?.map((item) => ({
      key: item.id,
      start_date: dayjs(item.start_date).format('MMM/DD/YYYY'),
      end_date: dayjs(item.end_date).format('MMM/DD/YYYY'),
      category: item.category,
      status: item.status,
    }))
    setTableData(outData)
  }, [leaves])
  return (
    <>
      <Table columns={columns} dataSource={tabeldata} pagination={false} />
    </>
  )
}

export default LeaveTable
