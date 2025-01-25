import React, { useState } from 'react'
import {Form, Input, Button, Select, message, Spin} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { setInitStatus, setMysqlDatabaseConfig, setPostgresDatabaseConfig, setSqliteConfig } from '../../redux/slices/configSlice'
import { useNavigate } from 'react-router-dom' // 新增导入
import './Init.css' // 引入CSS文件

const { Option } = Select

const InitConfigPage: React.FC = () => {
  const [dbType, setDbType] = useState('sqlite')
  const initStatus = useSelector((state: RootState) => state.config.initStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate() // 新增导航

  const onFinish = (values: any) => {
    // 处理表单提交
    console.log('Received values:', values)
    message.success('数据库配置已保存')
    if (values.dbType === 'sqlite') { 
      dispatch(setSqliteConfig({ dbPath: values.dbPath }))
    }
    else if (values.dbType === 'mysql') { 
      dispatch(setMysqlDatabaseConfig({
        host: values.mysqlHost,
        user: values.mysqlUser,
        password: values.mysqlPassword,
        database: values.mysqlDatabase
      }))
    }
    else if (values.dbType === 'postgresql') { 
      dispatch(setPostgresDatabaseConfig({
        host: values.postgresHost,
        user: values.postgresUser,
        password: values.postgresPassword,
        database: values.postgresDatabase
      }))
    }

    dispatch(setInitStatus('initing'))
    navigate('/connection-status') // 导航到数据库连接状态页面
  }

  return (
      <Spin spinning={initStatus === "initing"}>
        <div className="init-page">
          <div className="background-animation"></div>
          {/* 背景动画 */}
          <div className="content">
            <h2>数据库配置</h2>
            <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{dbType: 'sqlite', dbPath: 'sqlite:just-reader.db'}}
            >
              <Form.Item
                  label="数据库类型"
                  name="dbType"
                  rules={[{required: true, message: '请选择数据库类型'}]}
              >
                <Select onChange={(value) => setDbType(value)}>
                  <Option value="sqlite">SQLite</Option>
                  <Option value="mysql">MySQL</Option>
                  <Option value="postgresql">PostgreSQL</Option>
                </Select>
              </Form.Item>

              {dbType === 'sqlite' && (
                  <Form.Item
                      label="SQLite 数据库路径"
                      name="dbPath"
                      rules={[{required: true, message: '请输入数据库路径'}]}
                  >
                    <Input/>
                  </Form.Item>
              )}

              {dbType === 'mysql' && (
                  <>
                    <Form.Item
                        label="MySQL 主机"
                        name="mysqlHost"
                        rules={[{required: true, message: '请输入 MySQL 主机'}]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="MySQL 用户名"
                        name="mysqlUser"
                        rules={[{required: true, message: '请输入 MySQL 用户名'}]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="MySQL 密码"
                        name="mysqlPassword"
                        rules={[{required: true, message: '请输入 MySQL 密码'}]}
                    >
                      <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="MySQL 数据库名"
                        name="mysqlDatabase"
                        rules={[{required: true, message: '请输入 MySQL 数据库名'}]}
                    >
                      <Input/>
                    </Form.Item>
                  </>
              )}

              {dbType === 'postgresql' && (
                  <>
                    <Form.Item
                        label="PostgreSQL 主机"
                        name="postgresHost"
                        rules={[{required: true, message: '请输入 PostgreSQL 主机'}]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="PostgreSQL 用户名"
                        name="postgresUser"
                        rules={[{required: true, message: '请输入 PostgreSQL 用户名'}]}
                    >
                      <Input/>
                    </Form.Item>
                    <Form.Item
                        label="PostgreSQL 密码"
                        name="postgresPassword"
                        rules={[{required: true, message: '请输入 PostgreSQL 密码'}]}
                    >
                      <Input.Password/>
                    </Form.Item>
                    <Form.Item
                        label="PostgreSQL 数据库名"
                        name="postgresDatabase"
                        rules={[
                          {required: true, message: '请输入 PostgreSQL 数据库名'}
                        ]}
                    >
                      <Input/>
                    </Form.Item>
                  </>
              )}

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  保存配置
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Spin>
  )
}

export default InitConfigPage
