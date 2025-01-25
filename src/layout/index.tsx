import { Layout, Menu, theme } from 'antd'
import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import {
  BookOutlined,
  FormOutlined,
  HighlightOutlined,
  PieChartOutlined,
  SettingOutlined
} from '@ant-design/icons'
import ChatAIOptionPage from '../pages/Option/ChatAI'
import StorageOptionPage from '../pages/Option/Storage'
import DashboardPage from '../pages/Dashboard'
import BooksPage from '../pages/Books'
import NotesPage from '../pages/Notes'
import HighlightPage from '../pages/Highlight'

const LayoutWrapper = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        collapsible
        style={{ background: colorBgContainer ,minHeight: '100vh'}}
        collapsed={collapsed}
        theme="light"
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          mode="inline"
          theme="light"
          items={[
            {
              key: 'dashboard',
              icon: <PieChartOutlined />,
              label: <Link to={'dashboard'}>首页</Link>
            },
            {
              key: 'books',
              icon: <BookOutlined />,
              label: <Link to={'books'}>全部图书</Link>
            },
            {
              key: 'notes',
              icon: <FormOutlined />,
              label: <Link to={'books'}>我的笔记</Link>
            },
            {
              key: 'highlight',
              icon: <HighlightOutlined />,
              label: <Link to={'highlight'}>我的划线</Link>
            },
            {
              key: 'options',
              icon: <SettingOutlined />,
              label: '系统设置',
              children: [
                {
                  key: 'chat-ai',
                  label: <Link to="options/chat-ai">AI 设置</Link>
                },
                {
                  key: 'storage',
                  label: <Link to="options/storage">存储设置</Link>
                }
              ]
            }
          ]}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{ padding: 0, background: colorBgContainer,height: '3vh' }}
        ></Layout.Header>
        <Layout.Content style={{ height: '97vh'}}>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="highlight" element={<HighlightPage />} />
            <Route path="options/chat-ai" element={<ChatAIOptionPage />} />
            <Route path="options/storage" element={<StorageOptionPage />} />
          </Routes>
        </Layout.Content> 
      </Layout>
    </Layout>
  )
}

export default LayoutWrapper
