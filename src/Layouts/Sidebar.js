import React from 'react'

import { Layout } from 'antd'
import Sidemenu from './Sidemenu'

// import { Link } from "react-router-dom";
const { Sider } = Layout

const Sidebar = () => {
  return (
    <>
      <Sider
        className="sider"
        id="sider"
        width={225}
        style={{
          height: 'calc(100vh - 49px)',
          background: '#ffff',
          overflowY: 'auto',
          position: 'fixed',
          zIndex: '1008',
          left: 0,
          borderRight: '1px solid #eee',
          overflowX: 'hidden',
        }}
      >
        <Sidemenu />
      </Sider>
      <div className="sidebar-margin"></div>
    </>
  )
}

export default Sidebar
