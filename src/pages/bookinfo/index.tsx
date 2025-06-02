import React, { useState } from 'react'
import './styles.less' // 引入样式文件
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'

const BookInfoPage: React.FC = () => {
  const [activeTocItem, setActiveTocItem] = useState<string | null>(null)
  // 使用 React Router 的 useNavigate 钩子
  const navigate = useNavigate()

  // 从路由当中获取参数
  const params = useParams<{ bookId: string }>()
  const bookId = params.bookId ?? 'default-book-id'
  console.log(`当前书籍ID: ${bookId}`)

  const handleTocItemClick = (chapterName: string) => {
    setActiveTocItem(chapterName)
    alert(`准备跳转到 ${chapterName}`)
  }

  const handleTermClick = (term: string) => {
    message.info(`显示"${term}"的定义和相关章节`)
  }

  const handleGraphNodeClick = (concept: string) => {
    message.info(`显示"${concept}"的详细解释`)
  }

  const handleStartReading = () => {
    message.info('进入SQ3R阅读流程')

    navigate(`/readbook/${bookId}`) // 使用 React Router 的 navigate 函数
  }

  return (
    <div className="book-overview-container">
      {/* 左侧书籍信息 */}
      <div className="card book-info-card">
        <div className="book-cover">
          <i className="fas fa-book"></i>
        </div>

        <h2 className="book-title">认知心理学导论</h2>
        <div className="book-author">罗伯特·斯坦伯格</div>

        <div className="book-meta">
          <div className="meta-item">
            <div className="meta-value">12</div>
            <div className="meta-label">章节</div>
          </div>
          <div className="meta-item">
            <div className="meta-value">286</div>
            <div className="meta-label">页数</div>
          </div>
          <div className="meta-item">
            <div className="meta-value">42</div>
            <div className="meta-label">术语</div>
          </div>
        </div>

        <div className="book-stats">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '5px'
            }}
          >
            <span>理解难度</span>
            <span>中等</span>
          </div>
          <div
            style={{
              height: '8px',
              background: '#e9ecef',
              borderRadius: '4px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                height: '100%',
                width: '65%',
                background: 'var(--accent)'
              }}
            ></div>
          </div>
        </div>

        <button className="action-btn" onClick={handleStartReading}>
          <i className="fas fa-play"></i> 开始阅读
        </button>
        <button className="action-btn outline">
          <i className="fas fa-download"></i> 下载摘要
        </button>
      </div>

      {/* 右侧书籍内容 */}
      <div className="book-content-card">
        {/* 目录结构 */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">
              <div className="section-icon">
                <i className="fas fa-list"></i>
              </div>
              <span>书籍目录</span>
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>共12章</div>
          </div>

          <div className="toc-container">
            <ul className="toc-list">
              <li
                className={`toc-item ${activeTocItem === '第一部分：认知基础' ? 'active' : ''}`}
                onClick={() => handleTocItemClick('第一部分：认知基础')}
              >
                <i className="fas fa-book toc-icon"></i>
                <span>第一部分：认知基础</span>
              </li>
              <ul className="toc-children">
                <li
                  className={`toc-item ${activeTocItem === '第一章：认知心理学导论' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第一章：认知心理学导论')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第一章：认知心理学导论</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第二章：知觉与注意' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第二章：知觉与注意')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第二章：知觉与注意</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第三章：记忆系统' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第三章：记忆系统')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第三章：记忆系统</span>
                </li>
              </ul>

              <li
                className={`toc-item ${activeTocItem === '第二部分：高级认知' ? 'active' : ''}`}
                onClick={() => handleTocItemClick('第二部分：高级认知')}
              >
                <i className="fas fa-book toc-icon"></i>
                <span>第二部分：高级认知</span>
              </li>
              <ul className="toc-children">
                <li
                  className={`toc-item ${activeTocItem === '第四章：知识表征' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第四章：知识表征')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第四章：知识表征</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第五章：语言与认知' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第五章：语言与认知')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第五章：语言与认知</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第六章：问题解决' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第六章：问题解决')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第六章：问题解决</span>
                </li>
              </ul>

              <li
                className={`toc-item ${activeTocItem === '第三部分：应用认知' ? 'active' : ''}`}
                onClick={() => handleTocItemClick('第三部分：应用认知')}
              >
                <i className="fas fa-book toc-icon"></i>
                <span>第三部分：应用认知</span>
              </li>
              <ul className="toc-children">
                <li
                  className={`toc-item ${activeTocItem === '第七章：决策与判断' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第七章：决策与判断')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第七章：决策与判断</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第八章：认知发展' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第八章：认知发展')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第八章：认知发展</span>
                </li>
                <li
                  className={`toc-item ${activeTocItem === '第九章：认知神经科学' ? 'active' : ''}`}
                  onClick={() => handleTocItemClick('第九章：认知神经科学')}
                >
                  <i className="fas fa-file toc-icon"></i>
                  <span>第九章：认知神经科学</span>
                </li>
              </ul>
            </ul>
          </div>
        </div>

        {/* 关键术语 */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">
              <div className="section-icon">
                <i className="fas fa-key"></i>
              </div>
              <span>关键术语</span>
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
              AI提取的42个核心概念
            </div>
          </div>

          <div className="terms-container">
            <div
              className="term-card"
              onClick={() => handleTermClick('工作记忆')}
            >
              <div className="term-badge">1</div>
              <div className="term-text">工作记忆</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('感觉记忆')}
            >
              <div className="term-badge">2</div>
              <div className="term-text">感觉记忆</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('长期记忆')}
            >
              <div className="term-badge">3</div>
              <div className="term-text">长期记忆</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('中央执行系统')}
            >
              <div className="term-badge">4</div>
              <div className="term-text">中央执行系统</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('语音回路')}
            >
              <div className="term-badge">5</div>
              <div className="term-text">语音回路</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('视觉空间画板')}
            >
              <div className="term-badge">6</div>
              <div className="term-text">视觉空间画板</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('记忆巩固')}
            >
              <div className="term-badge">7</div>
              <div className="term-text">记忆巩固</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('遗忘曲线')}
            >
              <div className="term-badge">8</div>
              <div className="term-text">遗忘曲线</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('认知负荷')}
            >
              <div className="term-badge">9</div>
              <div className="term-text">认知负荷</div>
            </div>
            <div
              className="term-card"
              onClick={() => handleTermClick('组块化')}
            >
              <div className="term-badge">10</div>
              <div className="term-text">组块化</div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              className="action-btn outline"
              style={{
                display: 'inline-flex',
                width: 'auto',
                padding: '10px 20px'
              }}
            >
              <i className="fas fa-plus"></i> 查看全部术语
            </button>
          </div>
        </div>

        {/* 知识图谱预览 */}
        <div className="card">
          <div className="section-header">
            <div className="section-title">
              <div className="section-icon">
                <i className="fas fa-project-diagram"></i>
              </div>
              <span>知识图谱预览</span>
            </div>
            <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>
              核心概念关系
            </div>
          </div>

          <div className="graph-container">
            <div className="graph-node main">记忆系统</div>

            {/* 模拟知识图谱节点 */}
            <div
              className="graph-node"
              style={{ top: '50px', left: '200px' }}
              onClick={() => handleGraphNodeClick('感觉记忆')}
            >
              感觉记忆
            </div>
            <div
              className="graph-node"
              style={{ top: '150px', left: '100px' }}
              onClick={() => handleGraphNodeClick('短期记忆')}
            >
              短期记忆
            </div>
            <div
              className="graph-node"
              style={{ top: '150px', left: '300px' }}
              onClick={() => handleGraphNodeClick('长期记忆')}
            >
              长期记忆
            </div>
            <div
              className="graph-node"
              style={{ top: '250px', left: '50px' }}
              onClick={() => handleGraphNodeClick('容量限制')}
            >
              容量限制
            </div>
            <div
              className="graph-node"
              style={{ top: '250px', left: '150px' }}
              onClick={() => handleGraphNodeClick('复述策略')}
            >
              复述策略
            </div>
            <div
              className="graph-node"
              style={{ top: '250px', left: '350px' }}
              onClick={() => handleGraphNodeClick('陈述性记忆')}
            >
              陈述性记忆
            </div>
            <div
              className="graph-node"
              style={{ top: '250px', left: '450px' }}
              onClick={() => handleGraphNodeClick('程序性记忆')}
            >
              程序性记忆
            </div>

            {/* 模拟连接线 */}
            <div
              className="graph-line"
              style={{
                width: '100px',
                top: '110px',
                left: '160px',
                transform: 'rotate(30deg)'
              }}
            ></div>
            <div
              className="graph-line"
              style={{
                width: '100px',
                top: '110px',
                left: '160px',
                transform: 'rotate(-30deg)'
              }}
            ></div>
            <div
              className="graph-line"
              style={{
                width: '80px',
                top: '190px',
                left: '120px',
                transform: 'rotate(60deg)'
              }}
            ></div>
            <div
              className="graph-line"
              style={{
                width: '80px',
                top: '190px',
                left: '120px',
                transform: 'rotate(-60deg)'
              }}
            ></div>
            <div
              className="graph-line"
              style={{
                width: '80px',
                top: '190px',
                left: '320px',
                transform: 'rotate(60deg)'
              }}
            ></div>
            <div
              className="graph-line"
              style={{
                width: '80px',
                top: '190px',
                left: '320px',
                transform: 'rotate(-60deg)'
              }}
            ></div>
          </div>

          <div className="graph-preview-text">
            点击节点查看详情，<a href="#">查看完整知识图谱</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookInfoPage
