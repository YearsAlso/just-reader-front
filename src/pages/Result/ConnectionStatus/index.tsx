import React from 'react'
import { Alert } from 'antd' // 引入Button组件

const ConnectionStatusPage: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <Alert message="数据库连接中..." type="info" showIcon />
      <p>请稍等片刻</p>
      <p>正在连接数据库...</p>
      <p>连接中...</p>
    </div>
  )
}

export default ConnectionStatusPage
