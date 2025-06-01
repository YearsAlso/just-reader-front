import React, { useState, useCallback } from 'react'
import './styles.less'

interface Challenge {
  id: string
  name: string
  stats: string[]
  status: 'pending' | 'active' | 'completed'
  icon: string
  backgroundColor: string
}

interface LeaderboardUser {
  id: string
  username: string
  avatar: string
  points: number
  rank: number
  avatarBg: string
}

interface ChallengeCard {
  id: string
  title: string
  description: string
  reward: string
  rewardIcon: string
  bannerGradient: string
  featured?: boolean
  timeLimit?: string
}

const Challenge: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [participatedChallenges, setParticipatedChallenges] = useState<
    Set<string>
  >(new Set())

  const challenges: Challenge[] = [
    {
      id: '1',
      name: '认知心理学精通',
      stats: ['5/10章', '12闪卡'],
      status: 'active',
      icon: 'fas fa-brain',
      backgroundColor: '#f72585'
    },
    {
      id: '2',
      name: '复述大师',
      stats: ['8/10次', '85%准确率'],
      status: 'active',
      icon: 'fas fa-microphone-alt',
      backgroundColor: '#4cc9f0'
    },
    {
      id: '3',
      name: '7日阅读连胜',
      stats: ['6/7天', '92%完成度'],
      status: 'active',
      icon: 'fas fa-calendar-check',
      backgroundColor: '#7209b7'
    },
    {
      id: '4',
      name: '记忆大师挑战',
      stats: ['已完成'],
      status: 'completed',
      icon: 'fas fa-trophy',
      backgroundColor: '#adb5bd'
    }
  ]

  const leaderboardData: LeaderboardUser[] = [
    {
      id: '1',
      username: '你的名字',
      avatar: '你',
      points: 3200,
      rank: 1,
      avatarBg: '#4895ef'
    },
    {
      id: '2',
      username: '学习达人',
      avatar: 'L',
      points: 2850,
      rank: 2,
      avatarBg: '#f72585'
    },
    {
      id: '3',
      username: '知识探索者',
      avatar: 'K',
      points: 2710,
      rank: 3,
      avatarBg: '#4cc9f0'
    },
    {
      id: '4',
      username: '记忆高手',
      avatar: 'M',
      points: 2450,
      rank: 4,
      avatarBg: '#7209b7'
    },
    {
      id: '5',
      username: '终身学习者',
      avatar: 'T',
      points: 2310,
      rank: 5,
      avatarBg: '#4361ee'
    }
  ]

  const challengeCards: ChallengeCard[] = [
    {
      id: 'card1',
      title: '30天阅读马拉松',
      description: '连续30天每天完成至少30分钟的深度阅读，建立终身阅读习惯',
      reward: '黄金勋章 + 500积分',
      rewardIcon: 'fas fa-gem',
      bannerGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      featured: true,
      timeLimit: '限时挑战'
    },
    {
      id: 'card2',
      title: '知识图谱构建者',
      description: '为3本不同书籍创建完整知识图谱，展示知识间的联系',
      reward: '专属勋章 + 300积分',
      rewardIcon: 'fas fa-medal',
      bannerGradient: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
    },
    {
      id: 'card3',
      title: '闪卡大师挑战',
      description: '创建100张高质量知识闪卡，并通过复习达到90%掌握率',
      reward: '闪卡大师勋章',
      rewardIcon: 'fas fa-trophy',
      bannerGradient: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)'
    },
    {
      id: 'card4',
      title: '跨学科探索者',
      description: '在三个不同学科领域各完成一本书的深度阅读',
      reward: '300积分 + 称号',
      rewardIcon: 'fas fa-star',
      bannerGradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
    }
  ]

  const handleCategoryChange = useCallback((category: string) => {
    setActiveCategory(category)
  }, [])

  const handleParticipateChallenge = useCallback(
    (challengeId: string, title: string) => {
      setParticipatedChallenges((prev) => new Set(prev).add(challengeId))

      // 显示成功提示
      const successMsg = document.createElement('div')
      successMsg.textContent = `成功参与"${title}"挑战!`
      successMsg.className = 'success-message'
      document.body.appendChild(successMsg)

      setTimeout(() => {
        successMsg.remove()
      }, 3000)
    },
    []
  )

  return (
    <>
      <div className="challenge-categories">
        {[
          { key: 'all', icon: 'fas fa-fire', label: '全部挑战' },
          { key: 'active', icon: 'fas fa-hourglass-half', label: '进行中' },
          { key: 'completed', icon: 'fas fa-trophy', label: '已完成' },
          { key: 'high-reward', icon: 'fas fa-crown', label: '高奖励' },
          { key: 'team', icon: 'fas fa-users', label: '组队挑战' }
        ].map((category) => (
          <button
            key={category.key}
            className={`category-btn ${activeCategory === category.key ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category.key)}
          >
            <i className={category.icon}></i> {category.label}
          </button>
        ))}
      </div>

      <div className="challenges-container">
        {/* 本周挑战卡片 */}
        <div className="card weekly-challenge">
          <div className="card-header">
            <h2 className="card-title">本周挑战</h2>
            <div className="challenge-timer">
              <i className="fas fa-clock"></i> 剩余时间: 2天15小时
            </div>
          </div>

          <div className="challenge-content">
            <div className="challenge-goal">
              <i className="fas fa-book"></i>
              <span>完成3次完整的SQ3R阅读循环，包括提问、精读和复述</span>
            </div>

            <div className="progress-container">
              <div className="progress-label">
                <span>当前进度</span>
                <span>2/3 次</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '66%' }}></div>
              </div>
            </div>

            <div className="reward-badge">
              <div className="reward-icon">
                <i className="fas fa-medal"></i>
              </div>
              <div className="reward-info">
                <h3>挑战成功奖励</h3>
                <p>专属"知识探索者"勋章 + 200积分</p>
              </div>
            </div>
          </div>
        </div>

        {/* 挑战列表卡片 */}
        <div className="card challenges-list">
          <div className="card-header">
            <h2 className="card-title">我的挑战</h2>
          </div>

          {challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-item">
              <div
                className="challenge-icon"
                style={{ background: challenge.backgroundColor }}
              >
                <i className={challenge.icon}></i>
              </div>
              <div className="challenge-info">
                <div className="challenge-name">{challenge.name}</div>
                <div className="challenge-stats">
                  {challenge.stats.map((stat, index) => (
                    <span key={index}>{stat}</span>
                  ))}
                </div>
              </div>
              <div
                className={`challenge-status ${challenge.status === 'pending' ? 'pending' : ''}`}
              >
                {challenge.status === 'active'
                  ? '进行中'
                  : challenge.status === 'completed'
                    ? '已完成'
                    : '待开始'}
              </div>
            </div>
          ))}
        </div>

        {/* 排行榜卡片 */}
        <div className="card leaderboard-card">
          <div className="card-header">
            <h2 className="card-title">挑战排行榜</h2>
            <div
              className="btn btn-outline"
              style={{ padding: '8px 15px', fontSize: '0.9rem' }}
            >
              <i className="fas fa-sync-alt"></i> 刷新
            </div>
          </div>

          <div className="leaderboard-list">
            {leaderboardData.map((user) => (
              <div key={user.id} className="leaderboard-item">
                <div className={`rank ${user.rank <= 3 ? 'top' : ''}`}>
                  {user.rank}
                </div>
                <div className="user-info">
                  <div className="avatar" style={{ background: user.avatarBg }}>
                    {user.avatar}
                  </div>
                  <div className="username">{user.username}</div>
                </div>
                <div className="points">{user.points}分</div>
              </div>
            ))}
          </div>
        </div>

        {/* 挑战卡片网格 */}
        <div className="challenges-grid">
          {challengeCards.map((card) => (
            <div
              key={card.id}
              className={`challenge-card ${card.featured ? 'featured' : ''}`}
            >
              {card.featured && <div className="featured-badge">推荐挑战</div>}
              <div
                className="challenge-banner"
                style={{ background: card.bannerGradient }}
              >
                {card.timeLimit && (
                  <div className="challenge-time">
                    <i className="fas fa-clock"></i> {card.timeLimit}
                  </div>
                )}
              </div>
              <div className="challenge-content-card">
                <h3 className="challenge-title">{card.title}</h3>
                <p className="challenge-desc">{card.description}</p>
                <div className="challenge-meta">
                  <div className="challenge-reward">
                    <i className={card.rewardIcon}></i>
                    <span>{card.reward}</span>
                  </div>
                  <button
                    className="challenge-btn"
                    onClick={() =>
                      handleParticipateChallenge(card.id, card.title)
                    }
                    disabled={participatedChallenges.has(card.id)}
                    style={
                      participatedChallenges.has(card.id)
                        ? { background: '#28a745' }
                        : {}
                    }
                  >
                    {participatedChallenges.has(card.id)
                      ? '已参与'
                      : '参与挑战'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Challenge
