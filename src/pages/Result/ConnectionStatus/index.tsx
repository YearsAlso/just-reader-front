import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert, Button } from 'antd' // 引入Button组件
import { RootState } from '../../../redux/store.ts'
import { useNavigate } from 'react-router-dom'

const ConnectionStatusPage: React.FC = () => {
  const initStatus = useSelector((state: RootState) => state.config.initStatus)
  const navigate = useNavigate() // 新增导航

  useEffect(() => {
    if (initStatus === 'initing') {
    }
  }, [initStatus])

  if (initStatus === 'initing') {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Alert message="数据库连接中..." type="info" showIcon />
        <p>请稍等片刻</p>
        <p>正在连接数据库...</p>
        <p>连接中...</p>
      </div>
    )
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      {initStatus === 'inited' ? (
        <>
          <Alert message="数据库连接成功" type="success" showIcon />
          <Button type="primary" onClick={() => navigate('/')}>
            返回首页
          </Button>{' '}
          {/* 添加按钮 */}
        </>
      ) : (
        <Alert message="数据库连接失败" type="error" showIcon />
      )}
    </div>
  )
}

export default ConnectionStatusPage
