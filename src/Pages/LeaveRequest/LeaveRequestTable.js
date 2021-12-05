import React, { useEffect, useState } from 'react'
import json from './../../json/static.json'
import { useSelector, useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { acceptLeave } from '../../Redux/actions/leave.action'
import { Button, Table, Tag } from 'antd'

const LeaveRequestTable = () => {
  const dispatch = useDispatch()
  const { leaves } = useSelector((state) => state.leaves)
  const [tabeldata, setTableData] = useState([])
  const columns = [
    {
      title: json.sn,
      dataIndex: 'sn',
      key: 'sn',
    },
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
      title: json.GUARD,
      dataIndex: 'guard',
      key: 'guard',
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
      render: (item) =>
        !item.status ? (
          <Button
            type="primary"
            onClick={() => {
              dispatch(
                acceptLeave(item.id, {
                  user_id: item.user.id,
                  start_date: item.start_date,
                  end_date: item.end_date,
                  status: true,
                }),
              )
            }}
          >
            {json.accept}
          </Button>
        ) : (
          <Tag color="success">{json.Accepted}</Tag>
        ),
    },
  ]

  useEffect(() => {
    const outData = leaves?.map((item, i) => ({
      key: item.id,
      sn: i + 1,
      start_date: dayjs(item.start_date).format('MMM/DD/YYYY'),
      end_date: dayjs(item.end_date).format('MMM/DD/YYYY'),
      guard: item.user?.first_name + ' ' + item.user?.last_name,
      category: item.category,
      status: item,
    }))
    setTableData(outData)
  }, [leaves])
  return (
    <>
      <Table columns={columns} dataSource={tabeldata} pagination={false} />
    </>
  )
}

export default LeaveRequestTable
