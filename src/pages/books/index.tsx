import React from 'react'
import './styles.less' // 引入样式文件
import { Button } from 'antd'

const BooksPage: React.FC = () => {
  return (
    <div className="books-page-content">
      <div className="main-content">
        {/* SQ3R步骤导航 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">SQ3R阅读流程</h2>
            <div className="progress-container">
              <div className="progress-label">
                <span>当前进度</span>
                <span>65%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>

          <div className="sq3r-steps">
            <div className="step-card completed">
              <div className="step-icon survey-icon">
                <i className="fas fa-binoculars"></i>
              </div>
              <div className="step-title">概览 (Survey)</div>
              <div className="step-desc">掌握全局结构</div>
            </div>

            <div className="step-card completed">
              <div className="step-icon question-icon">
                <i className="fas fa-question"></i>
              </div>
              <div className="step-title">提问 (Question)</div>
              <div className="step-desc">明确阅读目标</div>
            </div>

            <div className="step-card active">
              <div className="step-icon read-icon">
                <i className="fas fa-book-reader"></i>
              </div>
              <div className="step-title">精读 (Read)</div>
              <div className="step-desc">寻找问题答案</div>
            </div>

            <div className="step-card">
              <div className="step-icon recite-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <div className="step-title">复述 (Recite)</div>
              <div className="step-desc">检验理解程度</div>
            </div>

            <div className="step-card">
              <div className="step-icon review-icon">
                <i className="fas fa-sync-alt"></i>
              </div>
              <div className="step-title">复习 (Review)</div>
              <div className="step-desc">强化长期记忆</div>
            </div>
          </div>
        </div>

        {/* 阅读区域 */}
        <div className="reading-area card">
          <h2 className="book-title">认知心理学导论</h2>
          <div className="book-author">作者：罗伯特·斯坦伯格</div>

          <h3 className="chapter-title">第三章：记忆系统与信息处理</h3>

          <div className="content">
            <p>
              人类的记忆系统通常分为三个主要部分：感觉记忆、短期记忆和长期记忆。感觉记忆是记忆系统的
              <span className="highlight">最初阶段</span>
              ，它短暂地保存来自感官的信息，持续时间通常不超过几秒钟。
            </p>

            <p>
              短期记忆，也称为工作记忆，是信息处理的
              <span className="highlight">核心环节</span>
              。根据Baddeley的工作记忆模型，它包含中央执行系统、语音回路和视觉空间画板等组件。短期记忆的容量有限，通常只能容纳7±2个信息单元。
            </p>

            <p>
              长期记忆则具有近乎无限的存储容量，信息可以在此存储几天、几个月甚至几十年。长期记忆又可分为
              <span className="highlight">陈述性记忆</span>
              （关于事实和事件的知识）和
              <span className="highlight">程序性记忆</span>
              （关于技能和操作的知识）。
            </p>

            <p>
              信息从短期记忆转移到长期记忆的过程称为
              <span className="highlight">巩固</span>
              。这个过程可以通过多种策略加强，如精细复述、组织信息和间隔重复等。SQ3R阅读法正是利用了这些认知原理，通过结构化步骤提高信息保持率。
            </p>
          </div>
        </div>

        {/* AI辅助功能区 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">AI阅读助手</h2>
            <button className="icon-btn" title="AI阅读助手">
              <i className="fas fa-robot"></i>
            </button>
          </div>

          <div className="content">
            <p>
              📘 <strong>本章重点概念：</strong>{' '}
              感觉记忆，短期记忆/工作记忆，长期记忆，陈述性记忆，程序性记忆，记忆巩固
            </p>

            <p>
              ❓ <strong>推荐问题：</strong>
            </p>
            <ul>
              <li>感觉记忆、短期记忆和长期记忆的主要区别是什么？</li>
              <li>工作记忆模型包含哪些组成部分？</li>
              <li>哪些策略可以促进信息从短期记忆转移到长期记忆？</li>
            </ul>

            <p>
              💡 <strong>记忆提示：</strong>{' '}
              将记忆系统想象成计算机：感觉记忆是USB接口，短期记忆是RAM，长期记忆是硬盘。
            </p>
          </div>
        </div>
      </div>

      <div className="sidebar">
        {/* 勋章展示 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">我的勋章</h2>
            <Button className="icon-btn">
              <i className="fas fa-trophy" aria-hidden="true"></i>
              <span className="sr-only">View My Medals</span>
            </Button>
          </div>

          <div className="medals-grid">
            <div className="medal-card">
              <div className="medal-icon">
                <i className="fas fa-star"></i>
              </div>
              <div className="medal-name">阅读新星</div>
              <div className="medal-desc">完成首次阅读</div>
            </div>

            <div className="medal-card">
              <div className="medal-icon">
                <i className="fas fa-fire"></i>
              </div>
              <div className="medal-name">三日连胜</div>
              <div className="medal-desc">连续3天阅读</div>
            </div>

            <div className="medal-card">
              <div className="medal-icon medal-locked">
                <i className="fas fa-lock"></i>
              </div>
              <div className="medal-name">记忆大师</div>
              <div className="medal-desc">创建50张闪卡</div>
            </div>
          </div>
        </div>

        {/* 学习挑战 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">本周挑战</h2>
            <Button className="icon-btn">
              <i className="fas fa-flag"></i>
            </Button>
          </div>

          <div className="challenge-card">
            <div className="challenge-icon">
              <i className="fas fa-book"></i>
            </div>
            <div className="challenge-info">
              <div className="challenge-title">完成3次完整SQ3R循环</div>
              <div className="challenge-progress">
                <div
                  className="challenge-progress-fill"
                  style={{ width: '67%' }}
                ></div>
              </div>
            </div>
            <div className="challenge-reward">
              <i className="fas fa-medal"></i> 新勋章
            </div>
          </div>

          <div className="challenge-card">
            <div className="challenge-icon">
              <i className="fas fa-microphone"></i>
            </div>
            <div className="challenge-info">
              <div className="challenge-title">完成5次语音复述</div>
              <div className="challenge-progress">
                <div
                  className="challenge-progress-fill"
                  style={{ width: '40%' }}
                ></div>
              </div>
            </div>
            <div className="challenge-reward">
              <i className="fas fa-coins"></i> 50积分
            </div>
          </div>

          <div className="challenge-card">
            <div className="challenge-icon">
              <i className="fas fa-sync-alt"></i>
            </div>
            <div className="challenge-info">
              <div className="challenge-title">复习20张闪卡</div>
              <div className="challenge-progress">
                <div
                  className="challenge-progress-fill"
                  style={{ width: '25%' }}
                ></div>
              </div>
            </div>
            <div className="challenge-reward">
              <i className="fas fa-gem"></i> 稀有皮肤
            </div>
          </div>
        </div>

        {/* 阅读统计 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">阅读统计</h2>
            <Button className="icon-btn">
              <i className="fas fa-chart-line"></i>
            </Button>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <span>理解度评分</span>
              <span>82%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: '82%', background: '#4cc9f0' }}
              ></div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <span>知识留存率</span>
              <span>76%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: '76%', background: '#7209b7' }}
              ></div>
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-label">
              <span>阅读效率</span>
              <span>68%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: '68%', background: '#f72585' }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BooksPage
