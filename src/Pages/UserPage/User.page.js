import React, { useEffect } from 'react'
import { Button } from 'antd'
import { UsergroupAddOutlined } from '@ant-design/icons'
import UserTable from './UserTable'
import UserForm from './UserForm'
import { useDispatch } from 'react-redux'
import { openModal } from '../../Redux/actions/modal.action'
import { fetchUsers } from '../../Redux/actions/user.action'

const UserPage = () => {
  const dispatch = useDispatch()
  const modalOpen = () => {
    dispatch(openModal(<UserForm />))
  }
  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="containers  ">
      <div className="px-4">
        <div className="add-button ">
          <Button
            type="primary"
            onClick={modalOpen}
            size="large"
            icon={<UsergroupAddOutlined />}
          >
            Add User
          </Button>
        </div>
        <div className="my-4">
          <UserTable />
        </div>
      </div>
    </div>
  )
}

export default UserPage
