import ReadBookPage from '@/pages/readbook'

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'

import './index.less'
import Challenge from '@/pages/challenge'
import MedalPage from '@/pages/medal'
import ReviewCenter from '@/pages/review'
import ReadingReport from '@/pages/reading'
import AccountPage from '@/pages/account'
import Library from '@/pages/library'
import { message } from 'antd'
import UploadPage from '@/pages/upload'
import BookInfoPage from '@/pages/bookinfo'

const LayoutWrapper = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getNavTabClass = (tabName: string) => {
    return location.pathname === `/${tabName}` ? 'tab active' : 'tab'
  }

  const handleTabClick = (tabName: string) => {
    navigate(`/${tabName}`)
  }

  return (
    <div className="root-layout-container">
      <header>
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-brain"></i>
          </div>
          <h1>Just Reader</h1>
        </div>
        <div className="user-actions">
          <button className="icon-btn" onClick={() => navigate('/medal-wall')}>
            <i className="fas fa-medal"></i>
            <div className="badge">3</div>
          </button>
          <button
            className="icon-btn"
            onClick={() => message.info('功能开发中')}
          >
            <i className="fas fa-bell"></i>
            <div className="badge">5</div>
          </button>
          <button
            className="icon-btn"
            title="账户"
            onClick={() => {
              navigate('/account')
            }}
          >
            <i className="fas fa-user"></i>
          </button>
        </div>
      </header>

      <div className="nav-tabs">
        <button
          className={getNavTabClass('my-library')}
          key={'my-library-tab'}
          onClick={() => {
            handleTabClick('my-library')
          }}
        >
          我的书架
        </button>
        <button
          className={getNavTabClass('reading-report')}
          key={'reading-report-tab'}
          onClick={() => {
            handleTabClick('reading-report')
          }}
        >
          阅读报告
        </button>
        <button
          className={getNavTabClass('review-center')}
          onClick={() => {
            handleTabClick('review-center')
          }}
        >
          复习中心
        </button>
        <button
          className={getNavTabClass('medal-wall')}
          key={'medal-wall-tab'}
          onClick={() => {
            handleTabClick('medal-wall')
          }}
        >
          勋章墙 <span className="tab-badge">3</span>
        </button>
        <button
          className={getNavTabClass('study-challenge')}
          key={'study-challenge-tab'}
          onClick={() => {
            handleTabClick('study-challenge')
          }}
        >
          学习挑战
        </button>
      </div>
      <Routes>
        <Route index element={<Library />} /> 
        <Route path="/my-library" element={<Library />} />
        <Route path="/reading-report" element={<ReadingReport />} />
        <Route path="/review-center" element={<ReviewCenter />} />
        <Route path="/medal-wall" element={<MedalPage />} />
        <Route path="/study-challenge" element={<Challenge />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/readbook/:bookId" element={<ReadBookPage />} />
        <Route path="/bookinfo/:bookId" element={<BookInfoPage />} />
      </Routes>
    </div>
  )
}

export default LayoutWrapper
