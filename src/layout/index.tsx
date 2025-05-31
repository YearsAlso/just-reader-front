import BooksPage from '@/pages/books'
import { theme } from 'antd'
import { useState } from 'react'
import { Route, Routes as Roues, Link } from 'react-router-dom'

import './index.less'
import Challenge from '@/pages/challenge'
import MedalPage from '@/pages/medal'
import ReviewCenter from '@/pages/review'
import ReadingReport from '@/pages/reading'

const LayoutWrapper = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()
  const [collapsed, setCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('我的书架')

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div className="container">
      <header>
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h1>AI-SQ3R阅读器</h1>
        </div>
        <div className="user-actions">
          <div className="icon-btn">
            <i className="fas fa-medal"></i>
            <div className="badge">3</div>
          </div>
          <div className="icon-btn">
            <i className="fas fa-bell"></i>
            <div className="badge">5</div>
          </div>
          <div className="icon-btn">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div className="nav-tabs">
        <div
          className={`tab ${activeTab === '我的书架' ? 'active' : ''}`}
          onClick={() => handleTabClick('我的书架')}
        >
          <Link to="/books">我的书架</Link>
        </div>
        <div
          className={`tab ${activeTab === '阅读报告' ? 'active' : ''}`}
          onClick={() => handleTabClick('阅读报告')}
        >
          <Link to="/reading-report">阅读报告</Link>
        </div>
        <div
          className={`tab ${activeTab === '复习中心' ? 'active' : ''}`}
          onClick={() => handleTabClick('复习中心')}
        >
          <Link to="/review-center">复习中心</Link>
        </div>
        <div
          className={`tab ${activeTab === '勋章墙' ? 'active' : ''}`}
          onClick={() => handleTabClick('勋章墙')}
        >
          <Link to="/medal-wall">勋章墙 <span className="tab-badge">3</span></Link>
        </div>
        <div
          className={`tab ${activeTab === '学习挑战' ? 'active' : ''}`}
          onClick={() => handleTabClick('学习挑战')}
        >
          <Link to="/study-challenge">学习挑战</Link>
        </div>
      </div>
      <Roues>
        <Route path="/" element={<BooksPage />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/reading-report" element={<ReadingReport />} />
        <Route path="/review-center" element={<ReviewCenter />} />
        <Route path="/medal-wall" element={<MedalPage />} />
        <Route path="/study-challenge" element={<Challenge />} />
      </Roues>
    </div>
  )
}

export default LayoutWrapper
