import React, { useState } from 'react';

interface ReviewItem {
  id: string;
  title: string;
  book: string;
  chapter: string;
  dueTime: string;
  cardCount: number;
  isUrgent: boolean;
  icon: string;
}

interface FlashCard {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags: string[];
  hint: string;
}

interface KnowledgeItem {
  id: string;
  title: string;
  book: string;
  chapter: string;
  status: 'mastered' | 'reviewed' | 'weak';
  progress: number;
  lastReview: string;
}

const ReviewCenter: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('全部');
  const [activeDifficulty, setActiveDifficulty] = useState<string | null>(null);

  const reviewItems: ReviewItem[] = [
    {
      id: '1',
      title: '记忆系统与信息处理',
      book: '认知心理学导论',
      chapter: '第三章',
      dueTime: '今天 18:00',
      cardCount: 12,
      isUrgent: true,
      icon: 'fas fa-fire'
    },
    {
      id: '2',
      title: '问题解决与决策',
      book: '认知心理学导论',
      chapter: '第五章',
      dueTime: '明天 10:00',
      cardCount: 8,
      isUrgent: false,
      icon: 'fas fa-lightbulb'
    },
    {
      id: '3',
      title: '语言与认知',
      book: '认知心理学导论',
      chapter: '第七章',
      dueTime: '2天后',
      cardCount: 10,
      isUrgent: false,
      icon: 'fas fa-language'
    }
  ];

  const flashCards: FlashCard[] = [
    {
      id: '1',
      category: '认知心理学 - 第三章',
      question: '工作记忆的主要组成部分有哪些？',
      answer: '根据Baddeley的工作记忆模型，主要包含三个部分：<br><br>1. 中央执行系统：负责注意控制和协调子系统<br>2. 语音回路：处理言语信息<br>3. 视觉空间画板：处理视觉和空间信息',
      tags: ['工作记忆', '认知模型'],
      hint: '点击卡片查看答案'
    },
    {
      id: '2',
      category: '认知心理学 - 第三章',
      question: '什么是记忆巩固过程？',
      answer: '记忆巩固是指将短期记忆转化为长期记忆的神经过程。它涉及：<br><br>1. 突触巩固：发生在学习后的最初几小时<br>2. 系统巩固：将记忆从海马体转移到新皮质，可能需要数周或数月',
      tags: ['记忆巩固', '神经过程'],
      hint: '点击卡片查看答案'
    }
  ];

  const knowledgeItems: KnowledgeItem[] = [
    {
      id: '1',
      title: '工作记忆模型',
      book: '认知心理学导论',
      chapter: '第三章',
      status: 'mastered',
      progress: 90,
      lastReview: '2天前'
    },
    {
      id: '2',
      title: '记忆巩固过程',
      book: '认知心理学导论',
      chapter: '第三章',
      status: 'reviewed',
      progress: 65,
      lastReview: '3天前'
    },
    {
      id: '3',
      title: '遗忘曲线理论',
      book: '认知心理学导论',
      chapter: '第四章',
      status: 'weak',
      progress: 35,
      lastReview: '5天前'
    },
    {
      id: '4',
      title: '感觉记忆特征',
      book: '认知心理学导论',
      chapter: '第三章',
      status: 'mastered',
      progress: 90,
      lastReview: '1天前'
    }
  ];

  const handleFlashCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDifficultyClick = (difficulty: string) => {
    setActiveDifficulty(difficulty);
    
    setTimeout(() => {
      setIsFlipped(false);
      setActiveDifficulty(null);
      
      setTimeout(() => {
        setCurrentCardIndex((prev) => (prev + 1) % flashCards.length);
      }, 300);
    }, 800);
  };

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const currentCard = flashCards[currentCardIndex];

  return (
    <div className="page-content"> 

      <div className="page-title">
        <div>
          <h1>复习中心</h1>
          <p>基于艾宾浩斯记忆曲线优化的复习计划</p>
        </div>
        <button className="btn">
          <i className="fas fa-plus"></i> 创建新复习
        </button>
      </div>

      <div className="review-container">
        {/* 待复习任务区 */}
        <div className="card pending-card">
          <div className="card-header">
            <h2 className="card-title">待复习任务</h2>
            <div className="btn btn-outline">
              <i className="fas fa-filter"></i> 筛选
            </div>
          </div>

          <div className="review-list">
            {reviewItems.map((item) => (
              <div
                key={item.id}
                className={`review-item ${item.isUrgent ? 'urgent' : ''}`}
              >
                <div className="review-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="review-info">
                  <div className="review-title">{item.title}</div>
                  <div className="review-meta">
                    <span>
                      <i className="fas fa-book"></i> {item.book} - {item.chapter}
                    </span>
                    <span>
                      <i className="fas fa-clock"></i> 到期时间: {item.dueTime}
                    </span>
                    <span>
                      <i className="fas fa-sticky-note"></i> {item.cardCount}张闪卡
                    </span>
                  </div>
                </div>
                <div className="review-actions">
                  <button className="btn">
                    <i className="fas fa-play"></i> 开始复习
                  </button>
                  <button className="btn btn-outline">
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 闪卡复习区 */}
        <div className="card flashcard-section">
          <div className="card-header">
            <h2 className="card-title">闪卡复习</h2>
            <div>
              <span>{currentCardIndex + 1}/{flashCards.length}</span>
            </div>
          </div>

          <div className="flashcard-container">
            <div
              className={`flashcard ${isFlipped ? 'flipped' : ''}`}
              onClick={handleFlashCardClick}
            >
              <div className="flashcard-front">
                <div className="card-category">{currentCard.category}</div>
                <div className="card-question">{currentCard.question}</div>
                <div className="card-hint">{currentCard.hint}</div>
              </div>
              <div className="flashcard-back">
                <div
                  className="card-answer"
                  dangerouslySetInnerHTML={{ __html: currentCard.answer }}
                />
                <div className="card-tags">
                  {currentCard.tags.map((tag, index) => (
                    <div key={index} className="tag">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <div
              className={`difficulty-btn easy ${
                activeDifficulty === 'easy' ? 'active' : ''
              }`}
              onClick={() => handleDifficultyClick('easy')}
            >
              <i className="fas fa-smile"></i> 简单
            </div>
            <div
              className={`difficulty-btn medium ${
                activeDifficulty === 'medium' ? 'active' : ''
              }`}
              onClick={() => handleDifficultyClick('medium')}
            >
              <i className="fas fa-meh"></i> 中等
            </div>
            <div
              className={`difficulty-btn hard ${
                activeDifficulty === 'hard' ? 'active' : ''
              }`}
              onClick={() => handleDifficultyClick('hard')}
            >
              <i className="fas fa-frown"></i> 困难
            </div>
          </div>
        </div>

        {/* 复习进度区 */}
        <div className="card progress-card">
          <div className="card-header">
            <h2 className="card-title">复习进度</h2>
            <div>
              <i className="fas fa-sync-alt"></i>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <span>整体完成度</span>
              <span>65%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <span>记忆强度</span>
              <span>78%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: '78%', background: '#4cc9f0' }}
              ></div>
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value completed">42</div>
              <div className="stat-label">已完成闪卡</div>
            </div>
            <div className="stat-card">
              <div className="stat-value pending">18</div>
              <div className="stat-label">待复习闪卡</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">85%</div>
              <div className="stat-label">平均准确率</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">7</div>
              <div className="stat-label">连胜天数</div>
            </div>
          </div>
        </div>

        {/* 知识点巩固区 */}
        <div className="card knowledge-card">
          <div className="knowledge-header">
            <h2 className="card-title">知识点巩固</h2>
            <div className="knowledge-filter">
              {['全部', '已掌握', '待加强'].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${
                    activeFilter === filter ? 'active' : ''
                  }`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="knowledge-grid">
            {knowledgeItems.map((item) => (
              <div
                key={item.id}
                className={`knowledge-item ${item.status}`}
              >
                <div
                  className={`knowledge-title ${
                    item.status === 'weak' ? 'weak' : ''
                  }`}
                >
                  <i
                    className={
                      item.status === 'mastered'
                        ? 'fas fa-check-circle'
                        : item.status === 'reviewed'
                        ? 'fas fa-sync-alt'
                        : 'fas fa-exclamation-circle'
                    }
                  ></i>
                  <span>{item.title}</span>
                </div>
                <div className="knowledge-meta">
                  <span>
                    {item.book} - {item.chapter}
                  </span>
                </div>
                <div className="knowledge-progress">
                  <div className="knowledge-progress-fill"></div>
                </div>
                <div className="knowledge-meta">最后复习: {item.lastReview}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCenter;
