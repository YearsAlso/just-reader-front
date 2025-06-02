import React, { useState } from 'react'
import './styles.less'
import { Button, Col, Row } from 'antd'

const AccountPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [preferences, setPreferences] = useState({
    readingMode: '新手引导',
    theme: '默认蓝',
    font: '思源黑体',
    aiAssist: '标准'
  })

  const handleEditAvatar = () => {
    alert('头像编辑功能将在下一个版本中提供')
  }

  const handleEditProfile = () => {
    alert('个人资料编辑功能')
  }

  const handlePreferenceChange = (category: string, value: string) => {
    setPreferences((prev) => ({
      ...prev,
      [category]: value
    }))
  }

  const handleSettingClick = (title: string) => {
    alert(`打开${title}设置`)
  }

  return (
    <div className="account-page-content">
      <Row gutter={[16, 16]} className="account-page-row">
        <Col span={6}>
          {/* 个人信息卡片 */}
          <div className="card profile-card">
            <div className="profile-header">
              <div className="profile-bg"></div>
              <div className="avatar-container">
                <div className="avatar">知</div>
                <div className="edit-avatar" onClick={handleEditAvatar}>
                  <i className="fas fa-pencil-alt"></i>
                </div>
              </div>
            </div>

            <div className="user-info">
              <div className="user-name">知识探索者</div>
              <div className="user-title">黄金读者</div>
              <div className="user-stats">
                <div className="stat-item">
                  <div className="stat-value">28</div>
                  <div className="stat-label">勋章</div>
                </div>
                <div className="stat-item">
                  <div className="stat-value">126</div>
                  <div className="stat-label">闪卡</div>
                </div>
              </div>
            </div>

            <div className="level-container">
              <div className="level-header">
                <div className="level-title">当前等级</div>
                <div className="level-value">Lv.7</div>
              </div>
              <div className="level-bar">
                <div className="level-progress"></div>
              </div>
              <div className="level-header" style={{ marginTop: '8px' }}>
                <div>下一等级</div>
                <div>65%</div>
              </div>
            </div>

            <button
              className="btn btn-outline"
              style={{ width: '100%', marginTop: '20px' }}
              onClick={handleEditProfile}
            >
              <i className="fas fa-cog"></i> 编辑个人资料
            </button>
          </div>
        </Col>
        <Col span={18}>
          {/* 内容区域 */}
          <div className="content-section">
            {/* 阅读统计 */}
            <div className="card">
              <div className="section-header">
                <h2 className="section-title">阅读统计</h2>
                <Button className="btn btn-outline">
                  <i className="fas fa-chart-line"></i> 详细报告
                </Button>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon icon-1">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <div className="stat-card-title">阅读天数</div>
                  <div className="stat-card-value">42</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-2">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="stat-card-title">阅读时长</div>
                  <div className="stat-card-value">86h</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-3">
                    <i className="fas fa-brain"></i>
                  </div>
                  <div className="stat-card-title">知识留存率</div>
                  <div className="stat-card-value">78%</div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon icon-4">
                    <i className="fas fa-tasks"></i>
                  </div>
                  <div className="stat-card-title">挑战完成</div>
                  <div className="stat-card-value">12</div>
                </div>
              </div>
            </div>

            {/* 勋章展示 */}
            <div className="card">
              <div className="section-header">
                <h2 className="section-title">我的勋章</h2>
                <div className="btn btn-outline">
                  <i className="fas fa-trophy"></i> 查看全部
                </div>
              </div>

              <div className="medals-container">
                {[
                  {
                    icon: 'fas fa-crown',
                    name: '记忆大师',
                    gradient:
                      'linear-gradient(135deg, #ffd700 0%, #fff8c9 100%)'
                  },
                  {
                    icon: 'fas fa-calendar-check',
                    name: '七日连胜',
                    gradient:
                      'linear-gradient(135deg, #c0c0c0 0%, #e0e0e0 100%)'
                  },
                  {
                    icon: 'fas fa-book-reader',
                    name: '阅读新星',
                    gradient:
                      'linear-gradient(135deg, #cd7f32 0%, #e0a95c 100%)'
                  },
                  {
                    icon: 'fas fa-lightbulb',
                    name: '问题大师',
                    gradient:
                      'linear-gradient(135deg, #f72585 0%, #f78fb3 100%)'
                  }
                ].map((medal, index) => (
                  <div key={index} className="medal-item">
                    <div
                      className="medal-icon"
                      style={{ background: medal.gradient }}
                    >
                      <i className={medal.icon}></i>
                    </div>
                    <div className="medal-name">{medal.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 账户设置 */}
            <div className="card">
              <div className="section-header">
                <h2 className="section-title">账户设置</h2>
              </div>

              <div className="settings-list">
                {[
                  {
                    icon: 'fas fa-user-shield',
                    title: '账户安全',
                    desc: '修改密码、双重验证等'
                  },
                  {
                    icon: 'fas fa-bell',
                    title: '通知设置',
                    desc: '管理应用通知偏好'
                  },
                  {
                    icon: 'fas fa-language',
                    title: '语言设置',
                    desc: '简体中文'
                  }
                ].map((setting, index) => (
                  <div
                    key={index}
                    className="setting-item"
                    onClick={() => handleSettingClick(setting.title)}
                  >
                    <div className="setting-icon">
                      <i className={setting.icon}></i>
                    </div>
                    <div className="setting-info">
                      <div className="setting-title">{setting.title}</div>
                      <div className="setting-desc">{setting.desc}</div>
                    </div>
                    <i className="fas fa-chevron-right"></i>
                  </div>
                ))}

                <div className="setting-item">
                  <div className="setting-icon">
                    <i className="fas fa-moon"></i>
                  </div>
                  <div className="setting-info">
                    <div className="setting-title">深色模式</div>
                    <div className="setting-desc">切换日间/夜间模式</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>

            {/* 阅读偏好 */}
            <div className="card">
              <div className="section-header">
                <h2 className="section-title">阅读偏好</h2>
              </div>

              <div className="preference-grid">
                {[
                  {
                    icon: 'fas fa-book',
                    title: '阅读辅助模式',
                    key: 'readingMode',
                    options: ['新手引导', '标准模式', '专家模式']
                  },
                  {
                    icon: 'fas fa-palette',
                    title: '主题颜色',
                    key: 'theme',
                    options: ['默认蓝', '深色', '护眼绿', '活力橙']
                  },
                  {
                    icon: 'fas fa-font',
                    title: '字体设置',
                    key: 'font',
                    options: ['思源黑体', '宋体', '楷体']
                  },
                  {
                    icon: 'fas fa-robot',
                    title: 'AI辅助强度',
                    key: 'aiAssist',
                    options: ['基础', '标准', '增强']
                  }
                ].map((preference, index) => (
                  <div key={index} className="preference-card">
                    <div className="preference-title">
                      <i className={preference.icon}></i>
                      <span>{preference.title}</span>
                    </div>
                    <div className="preference-options">
                      {preference.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className={`option-btn ${preferences[preference.key as keyof typeof preferences] === option ? 'active' : ''}`}
                          onClick={() =>
                            handlePreferenceChange(preference.key, option)
                          }
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AccountPage
