import React, { useState } from 'react'
import './styles.less'

interface Medal {
  id: string
  name: string
  description: string
  icon: string
  type: 'bronze' | 'silver' | 'gold'
  isLocked: boolean
  achievedDate?: string
  progress?: number
  maxProgress?: number
  unlockCondition?: string
  category: 'all' | 'achieved' | 'locked' | 'challenge' | 'rare'
}

interface Requirement {
  text: string
  completed: boolean
}

interface Level {
  title: string
  description: string
  badge: string
  requirements: Requirement[]
  progress: number
  maxProgress: number
}

const MedalPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeTab, setActiveTab] = useState<string>('medal')

  const medals: Medal[] = [
    {
      id: '1',
      name: '记忆大师',
      description: '成功创建超过50张知识闪卡，展示出色的知识管理能力',
      icon: 'fas fa-crown',
      type: 'gold',
      isLocked: false,
      achievedDate: '2025年5月26日获得',
      category: 'achieved'
    },
    {
      id: '2',
      name: '七日连胜',
      description: '连续7天完成每日阅读目标，展现非凡的坚持与毅力',
      icon: 'fas fa-calendar-check',
      type: 'silver',
      isLocked: false,
      achievedDate: '2025年5月20日获得',
      category: 'achieved'
    },
    {
      id: '3',
      name: '阅读新星',
      description: '完成首次完整的SQ3R阅读流程，踏上知识积累之旅',
      icon: 'fas fa-book-reader',
      type: 'bronze',
      isLocked: false,
      achievedDate: '2025年4月15日获得',
      category: 'achieved'
    },
    {
      id: '4',
      name: '终身学习者',
      description: '持续使用阅读器超过100天，展现对知识的持久追求',
      icon: 'fas fa-infinity',
      type: 'gold',
      isLocked: true,
      progress: 65,
      maxProgress: 100,
      unlockCondition: '还需使用35天',
      category: 'locked'
    },
    {
      id: '5',
      name: '认知专家',
      description: '在认知心理学领域完成3本书的精读，成为领域专家',
      icon: 'fas fa-brain',
      type: 'silver',
      isLocked: true,
      progress: 1,
      maxProgress: 3,
      unlockCondition: '还需完成2本相关书籍',
      category: 'locked'
    },
    {
      id: '6',
      name: '黄金读者',
      description: '累计阅读超过100小时，知识储备达到新高度',
      icon: 'fas fa-trophy',
      type: 'gold',
      isLocked: true,
      progress: 42,
      maxProgress: 100,
      unlockCondition: '还需阅读58小时',
      category: 'locked'
    },
    {
      id: '7',
      name: '问题大师',
      description: '提出超过100个深度问题，展现批判性思维能力',
      icon: 'fas fa-lightbulb',
      type: 'bronze',
      isLocked: false,
      achievedDate: '2025年5月10日获得',
      category: 'achieved'
    },
    {
      id: '8',
      name: '复述高手',
      description: '完成50次章节复述，知识内化能力卓越',
      icon: 'fas fa-microphone-alt',
      type: 'silver',
      isLocked: false,
      achievedDate: '2025年5月18日获得',
      category: 'achieved'
    }
  ]

  const levels: Level[] = [
    {
      title: '青铜读者',
      description: '刚刚启程的知识探索者，掌握基础阅读技巧',
      badge: '🥉',
      requirements: [
        { text: '完成首次阅读', completed: true },
        { text: '创建10张闪卡', completed: true },
        { text: '连续3天阅读', completed: true }
      ],
      progress: 3,
      maxProgress: 3
    },
    {
      title: '白银学者',
      description: '形成良好阅读习惯，具备系统学习能力',
      badge: '🥈',
      requirements: [
        { text: '完成5本书阅读', completed: true },
        { text: '创建50张闪卡', completed: true },
        { text: '连续21天阅读', completed: false }
      ],
      progress: 2,
      maxProgress: 3
    },
    {
      title: '黄金智者',
      description: '知识渊博的终身学习者，具备专家级理解能力',
      badge: '🥇',
      requirements: [
        { text: '完成20本书阅读', completed: false },
        { text: '创建200张闪卡', completed: false },
        { text: '掌握3个学科领域', completed: false }
      ],
      progress: 0,
      maxProgress: 3
    }
  ]

  const categories = [
    { key: 'all', label: '全部勋章', icon: 'fas fa-star' },
    { key: 'achieved', label: '已获得', icon: 'fas fa-medal' },
    { key: 'locked', label: '待解锁', icon: 'fas fa-lock' },
    { key: 'challenge', label: '挑战勋章', icon: 'fas fa-fire' },
    { key: 'rare', label: '稀有勋章', icon: 'fas fa-gem' }
  ]

  const tabs = [
    { key: 'bookshelf', label: '我的书架' },
    { key: 'report', label: '阅读报告' },
    { key: 'review', label: '复习中心' },
    { key: 'medal', label: '勋章墙' },
    { key: 'challenge', label: '学习挑战' }
  ]

  const filteredMedals = medals.filter((medal) => {
    if (activeCategory === 'all') return true
    return medal.category === activeCategory
  })

  const stats = {
    bronze: medals.filter((m) => m.type === 'bronze' && !m.isLocked).length,
    silver: medals.filter((m) => m.type === 'silver' && !m.isLocked).length,
    gold: medals.filter((m) => m.type === 'gold' && !m.isLocked).length,
    total: medals.filter((m) => !m.isLocked).length
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
  }

  const handleStartReading = () => {
    // 实际应用中会跳转到阅读页面
    console.log('开始阅读')
  }

  return (
    <div className="page-content medal-page">
      <div className="page-title">
        <h1>我的成就殿堂</h1>
        <p>通过SQ3R阅读法积累知识，解锁更多荣誉勋章</p>
      </div>

      <div className="stats-container">
        <div className="stat-card bronze">
          <div className="stat-value">{stats.bronze}</div>
          <div className="stat-label">青铜勋章</div>
        </div>
        <div className="stat-card silver">
          <div className="stat-value">{stats.silver}</div>
          <div className="stat-label">白银勋章</div>
        </div>
        <div className="stat-card gold">
          <div className="stat-value">{stats.gold}</div>
          <div className="stat-label">黄金勋章</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">勋章总数</div>
        </div>
      </div>

      <div className="medal-categories">
        {categories.map((category) => (
          <button
            key={category.key}
            className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.key)}
          >
            <i className={category.icon}></i> {category.label}
          </button>
        ))}
      </div>

      <div className="medals-grid">
        {filteredMedals.map((medal, index) => (
          <div
            key={medal.id}
            className={`medal-card ${medal.type}-medal ${medal.isLocked ? 'locked' : ''}`}
          >
            {!medal.isLocked && index === 0 && (
              <div className="ribbon">最新获得</div>
            )}

            <div className="medal-icon">
              <i className={medal.icon}></i>
            </div>

            <div className="medal-name">{medal.name}</div>
            <div className="medal-desc">{medal.description}</div>

            {medal.isLocked &&
              medal.progress !== undefined &&
              medal.maxProgress && (
                <>
                  <div className="medal-progress">
                    <div
                      className="medal-progress-fill"
                      style={{
                        width: `${(medal.progress / medal.maxProgress) * 100}%`
                      }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <span>进度</span>
                    <span>
                      {medal.maxProgress === 100
                        ? `${medal.progress}%`
                        : `${medal.progress}/${medal.maxProgress}本书`}
                    </span>
                  </div>
                  {medal.unlockCondition && (
                    <div className="unlock-condition">
                      <i className="fas fa-tasks"></i> {medal.unlockCondition}
                    </div>
                  )}
                </>
              )}

            {medal.achievedDate && (
              <div className="achievement-date">{medal.achievedDate}</div>
            )}
          </div>
        ))}
      </div>

      <div className="achievement-level">
        {levels.map((level, index) => (
          <div key={index} className="level-card">
            <div className="level-title">{level.title}</div>
            <div className="level-desc">{level.description}</div>
            <div className="level-badge">{level.badge}</div>

            <div className="level-requirements">
              {level.requirements.map((req, reqIndex) => (
                <div key={reqIndex} className="requirement">
                  <i
                    className={`fas ${req.completed ? 'fa-check-circle' : 'fa-times-circle'}`}
                  ></i>
                  <span>{req.text}</span>
                </div>
              ))}
            </div>

            <div className="level-progress">
              <div
                className="level-progress-fill"
                style={{
                  width: `${(level.progress / level.maxProgress) * 100}%`
                }}
              ></div>
            </div>

            <div className="level-info">
              <span>
                {level.progress === level.maxProgress ? '已达成' : '进度'}
              </span>
              <span>
                {level.progress === level.maxProgress
                  ? '100%'
                  : `${level.progress}/${level.maxProgress}`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="call-to-action">
        <h2>开启你的下一个知识里程碑</h2>
        <p>
          继续使用SQ3R阅读法，解锁更多成就勋章，建立完整的知识体系，成为真正的终身学习者
        </p>
        <button className="btn" onClick={handleStartReading}>
          <i className="fas fa-book-open"></i> 立即开始阅读
        </button>
      </div>
    </div>
  )
}

export default MedalPage
