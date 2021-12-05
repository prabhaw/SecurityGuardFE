import React from 'react'
import { Menu } from 'antd'
import josn from './../json/static.json'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logout_user } from '../Redux/actions/auth.action'
import Sidemenu from './Sidemenu'

const { SubMenu } = Menu

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <div className="nav-bars">
        <div className="logo">
          <h4>{josn['security logo']}</h4>
        </div>
        <div style={{ width: '100%' }}>
          <Sidemenu />
        </div>
        <div>
          <Menu
            // onClick={this.handleClick}
            // selectedKeys={[current]}
            mode="horizontal"
          >
            <SubMenu
              key="SubMenu"
              icon={<UserOutlined style={{ fontSize: '20px' }} />}
              title={user?.first_name}
            >
              <Menu.Item>
                <Link to="setting">{josn.setting}</Link>
              </Menu.Item>
              <Menu.Item
                onClick={async () => {
                  await navigate('login')
                  dispatch(logout_user(navigate))
                }}
              >
                {josn['sign out']}
              </Menu.Item>
            </SubMenu>
          </Menu>
        </div>
      </div>
    </>
  )
}

export default Navbar
