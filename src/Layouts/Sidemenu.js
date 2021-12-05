import { Menu } from 'antd'
import json from './../json/static.json'
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const { SubMenu } = Menu

const Sidemenu = () => {
  const location = useLocation()
  const { user, loggedIn } = useSelector((state) => state.user)
  return (
    <Menu
      //   onClick={this.handleClick}
      style={{ width: '100%' }}
      //   defaultSelectedKeys={['1']}
      //   defaultOpenKeys={['sub1']}
      selectedKeys={[location.pathname]}
      mode="horizontal"
    >
      <Menu.Item key="/">
        <Link to="/">{json.Dashboard}</Link>
      </Menu.Item>

      {loggedIn && user.role === 'ADMIN' && (
        <>
          <Menu.Item key="/user">
            <Link to="user">{json.user}</Link>
          </Menu.Item>
          <Menu.Item key="/surcharge-hour">
            <Link to="surcharge-hour">{json['Manage Surcharge']}</Link>
          </Menu.Item>
        </>
      )}
      {loggedIn && user.role === 'SUPERVISOR' && (
        <>
          <Menu.Item key="/manage-shift">
            <Link to="manage-shift">{json['Manage Shift']}</Link>
          </Menu.Item>
          <Menu.Item key="/leave-admin">
            <Link to="leave-admin">{json['Manage Leave']}</Link>
          </Menu.Item>
          <Menu.Item key="/holiday">
            <Link to="holiday">{json['Holiday List']}</Link>
          </Menu.Item>
          <Menu.Item key="/salary-list">
            <Link to="salary-list">{json['Salary List']}</Link>
          </Menu.Item>
        </>
      )}
      {loggedIn && user.role === 'GUARD' && (
        <>
          <Menu.Item key="/guard-shift">
            <Link to="guard-shift">{json.Shift}</Link>
          </Menu.Item>
          <Menu.Item key="/leave-guard">
            <Link to="leave-guard">{json['Leaves Requests']}</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  )
}

export default Sidemenu
