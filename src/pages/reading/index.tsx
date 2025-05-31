import React, { useState } from 'react';
import './styles.less';

interface StatItem {
  value: string;
  label: string;
}

interface ChartBar {
  label: string;
  height: number;
  color: string;
}

interface ReviewItem {
  id: string;
  title: string;
  cardCount: number;
  estimatedTime: number;
  status: 'completed' | 'pending';
  icon: string;
}

const ReadingReport: React.FC = () => {
  const [activeTab, setActiveTab] = useState('阅读报告');

  const overviewStats: StatItem[] = [
    { value: '12', label: '阅读天数' },
    { value: '28.5', label: '阅读时长(小时)' },
    { value: '86%', label: '理解度' },
    { value: '74%', label: '知识留存率' }
  ];

  const chartData: ChartBar[] = [
    { label: '周一', height: 40, color: '#4361ee' },
    { label: '周二', height: 60, color: '#4361ee' },
    { label: '周三', height: 85, color: '#4895ef' },
    { label: '周四', height: 70, color: '#4361ee' },
    { label: '周五', height: 50, color: '#4361ee' },
    { label: '周六', height: 65, color: '#4895ef' },
    { label: '周日', height: 45, color: '#4361ee' }
  ];

  const reviewItems: ReviewItem[] = [
    {
      id: '1',
      title: '认知心理学 - 记忆系统',
      cardCount: 12,
      estimatedTime: 25,
      status: 'completed',
      icon: 'fas fa-brain'
    },
    {
      id: '2',
      title: '认知心理学 - 问题解决',
      cardCount: 8,
      estimatedTime: 15,
      status: 'pending',
      icon: 'fas fa-lightbulb'
    },
    {
      id: '3',
      title: '认知心理学 - 语言处理',
      cardCount: 15,
      estimatedTime: 30,
      status: 'pending',
      icon: 'fas fa-language'
    }
  ];

  const generateHeatmapData = () => {
    const levels = [1, 2, 3, 4];
    return Array.from({ length: 40 }, () => 
      levels[Math.floor(Math.random() * levels.length)]
    );
  };

  const heatmapData = generateHeatmapData();

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  const handleDownloadReport = () => {
    console.log('下载报告');
  };

  const handleAddPlan = () => {
    console.log('添加计划');
  };

  const handleViewFullGraph = () => {
    console.log('查看完整图谱');
  };

  return (
    <div className="page-content"> 
      <div className="page-title">
        <h1>您的阅读报告</h1>
        <p>以下是您过去30天的阅读数据统计和知识掌握情况</p>
      </div>

      <div className="report-container">
        {/* 阅读概览卡片 */}
        <div className="card overview-card">
          <div className="card-header">
            <h2 className="card-title">阅读概览</h2>
          </div>
          <div className="stats-grid">
            {overviewStats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 阅读趋势卡片 */}
        <div className="card trend-card">
          <div className="card-header">
            <h2 className="card-title">阅读趋势</h2>
            <div>
              <span>过去30天</span>
            </div>
          </div>
          <div className="chart-container">
            {chartData.map((bar, index) => (
              <div key={index} className="chart-bar">
                <div
                  className="bar-value"
                  style={{
                    height: `${bar.height}%`,
                    background: bar.color
                  }}
                ></div>
                <div className="bar-label">{bar.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 知识点掌握卡片 */}
        <div className="card knowledge-card">
          <div className="card-header">
            <h2 className="card-title">知识点掌握情况</h2>
            <div>
              <span>认知心理学导论</span>
            </div>
          </div>
          <div className="heatmap">
            {heatmapData.map((level, index) => (
              <div
                key={index}
                className="heatmap-cell"
                data-level={level}
              ></div>
            ))}
          </div>
          <div className="heatmap-labels">
            <span>第一章</span>
            <span>第五章</span>
          </div>
        </div>

        {/* 成就卡片 */}
        <div className="card achievement-card">
          <div className="card-header">
            <h2 className="card-title">最新成就</h2>
          </div>
          <div className="medal-showcase">
            <div className="medal-large">
              <i className="fas fa-crown"></i>
            </div>
            <div className="medal-name">记忆大师</div>
            <div className="medal-desc">您已成功创建超过50张知识闪卡</div>
            <div style={{ width: '100%' }}>
              <div className="medal-progress-header">
                <span>下一成就：黄金读者</span>
                <span>65%</span>
              </div>
              <div className="medal-progress">
                <div className="medal-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>

        {/* 复习计划卡片 */}
        <div className="card review-card">
          <div className="card-header">
            <h2 className="card-title">复习计划</h2>
            <button className="btn" onClick={handleAddPlan}>
              <i className="fas fa-plus"></i> 添加计划
            </button>
          </div>
          <div className="review-list">
            {reviewItems.map((item) => (
              <div key={item.id} className="review-item">
                <div className="review-icon">
                  <i className={item.icon}></i>
                </div>
                <div className="review-info">
                  <div className="review-title">{item.title}</div>
                  <div className="review-meta">
                    <span>
                      <i className="fas fa-book"></i> {item.cardCount}张闪卡
                    </span>
                    <span>
                      <i className="fas fa-clock"></i> 预计{item.estimatedTime}分钟
                    </span>
                  </div>
                </div>
                <div className={`review-status ${item.status}`}>
                  {item.status === 'completed' ? '已完成' : '待复习'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 知识图谱卡片 */}
        <div className="card graph-card">
          <div className="card-header">
            <h2 className="card-title">知识图谱</h2>
            <button className="btn" onClick={handleViewFullGraph}>
              <i className="fas fa-expand"></i> 查看完整图谱
            </button>
          </div>
          <div className="graph-preview">
            <div className="graph-node main">记忆系统</div>
            <div className="graph-node" style={{ top: '50px', left: '200px' }}>
              感觉记忆
            </div>
            <div className="graph-node" style={{ top: '150px', left: '100px' }}>
              短期记忆
            </div>
            <div className="graph-node" style={{ top: '150px', left: '300px' }}>
              长期记忆
            </div>
            <div className="graph-node" style={{ top: '250px', left: '50px' }}>
              容量限制
            </div>
            <div className="graph-node" style={{ top: '250px', left: '150px' }}>
              复述策略
            </div>
            <div className="graph-node" style={{ top: '250px', left: '350px' }}>
              陈述性记忆
            </div>
            <div className="graph-node" style={{ top: '250px', left: '450px' }}>
              程序性记忆
            </div>
            
            {/* 连接线 */}
            <div className="graph-line" style={{
              width: '100px',
              top: '110px',
              left: '160px',
              transform: 'rotate(30deg)'
            }}></div>
            <div className="graph-line" style={{
              width: '100px',
              top: '110px',
              left: '160px',
              transform: 'rotate(-30deg)'
            }}></div>
            <div className="graph-line" style={{
              width: '80px',
              top: '190px',
              left: '120px',
              transform: 'rotate(60deg)'
            }}></div>
            <div className="graph-line" style={{
              width: '80px',
              top: '190px',
              left: '120px',
              transform: 'rotate(-60deg)'
            }}></div>
            <div className="graph-line" style={{
              width: '80px',
              top: '190px',
              left: '320px',
              transform: 'rotate(60deg)'
            }}></div>
            <div className="graph-line" style={{
              width: '80px',
              top: '190px',
              left: '320px',
              transform: 'rotate(-60deg)'
            }}></div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          className="btn download-btn"
          onClick={handleDownloadReport}
        >
          <i className="fas fa-download"></i> 下载完整报告
        </button>
      </div>
    </div>
  );
};

export default ReadingReport;
