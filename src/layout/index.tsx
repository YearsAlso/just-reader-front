import BooksPage from '@/pages/books'
import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import './index.less'
import Challenge from '@/pages/challenge'
import MedalPage from '@/pages/medal'
import ReviewCenter from '@/pages/review'
import ReadingReport from '@/pages/reading'
import AccountPage from '@/pages/account'
import Library from '@/pages/library'

const LayoutWrapper = () => {
  const [activeTab, setActiveTab] = useState('我的书架')
  const navigate = useNavigate()
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
          <h1>Just Reader</h1>
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
          <div
            className="icon-btn"
            onClick={() => {
              navigate('/account')
            }}
          >
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>

      <div className="nav-tabs">
        <div
          className={`tab ${activeTab === '我的书架' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('我的书架')
            navigate('/library')
          }}
        >
          我的书架
        </div>
        <div
          className={`tab ${activeTab === '阅读报告' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('阅读报告')
            navigate('/reading-report')
          }}
        >
          阅读报告
        </div>
        <div
          className={`tab ${activeTab === '复习中心' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('复习中心')
            navigate('/review-center')
          }}
        >
          复习中心
        </div>
        <div
          className={`tab ${activeTab === '勋章墙' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('勋章墙')
            navigate('/medal-wall')
          }}
        >
          勋章墙 <span className="tab-badge">3</span>
        </div>
        <div
          className={`tab ${activeTab === '学习挑战' ? 'active' : ''}`}
          onClick={() => {
            handleTabClick('学习挑战')
            navigate('/study-challenge')
          }}
        >
          学习挑战
        </div>
      </div>
      <Routes>
        <Route index element={<Library />} />
        <Route path="/books" element={<BooksPage />} />
        <Route path="/library" element={<Library />} />
        <Route path="/reading-report" element={<ReadingReport />} />
        <Route path="/review-center" element={<ReviewCenter />} />
        <Route path="/medal-wall" element={<MedalPage />} />
        <Route path="/study-challenge" element={<Challenge />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </div>
  )
}

export default LayoutWrapper
