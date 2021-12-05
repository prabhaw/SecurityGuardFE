import React from 'react'

import { Table, Tag } from 'antd'

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Guard Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Storage',
    dataIndex: 'storage',
    key: 'storage',
  },
  {
    title: 'Shift',
    key: 'shift',
    dataIndex: 'shift',
  },
  {
    title: 'Start Time',
    key: 'start_time',
    dataIndex: 'start_time',
  },
  {
    title: 'End Time',
    key: 'end_time',
    dataIndex: 'end_time',
  },
  {
    title: 'Holiday',
    key: 'holiday',
    dataIndex: 'holiday',
    render: (tags) => tags && <Tag color={'error'}>{tags}</Tag>,
  },
  {
    title: 'Leave',
    key: 'on_leave',
    dataIndex: 'on_leave',
    render: (text) => text && <Tag color="gold">{text}</Tag>,
  },
]

const ShiftTableAll = ({ data }) => {
  return (
    <>
      <Table columns={columns} dataSource={data} pagination={false} />
    </>
  )
}

export default ShiftTableAll
