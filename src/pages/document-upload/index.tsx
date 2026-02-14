import React, { useState } from 'react';
import { Card, Tabs, Typography, Space, Alert, Button, Modal } from 'antd';
import { UploadOutlined, FileSearchOutlined, CloudUploadOutlined, InfoCircleOutlined } from '@ant-design/icons';
import DocumentUpload from '@/components/DocumentUpload';
import './index.less';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const DocumentUploadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [showHelpModal, setShowHelpModal] = useState(false);

  const features = [
    {
      title: '多格式支持',
      description: '支持PDF、EPUB、DOCX、DOC、TXT等多种文档格式',
      icon: '📄'
    },
    {
      title: '批量上传',
      description: '支持同时上传多个文件，提高工作效率',
      icon: '📦'
    },
    {
      title: '断点续传',
      description: '大文件支持分片上传，网络中断后可恢复上传',
      icon: '🔁'
    },
    {
      title: '智能解析',
      description: '自动解析文档内容，提取文本和元数据',
      icon: '🤖'
    },
    {
      title: '进度跟踪',
      description: '实时显示上传进度和状态',
      icon: '📊'
    },
    {
      title: '安全存储',
      description: '文档安全存储，支持权限管理和访问控制',
      icon: '🔒'
    }
  ];

  const uploadTips = [
    '建议文件大小不超过100MB，确保上传速度',
    '支持批量上传，但建议一次不要超过10个文件',
    '上传过程中请勿关闭浏览器或刷新页面',
    '大文件上传可能需要较长时间，请耐心等待',
    '上传完成后系统会自动开始解析文档',
    '如有问题，请查看帮助文档或联系技术支持'
  ];

  return (
    <div className="document-upload-page">
      <div className="page-header">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div className="header-content">
            <Title level={2} style={{ marginBottom: 0 }}>
              <CloudUploadOutlined style={{ marginRight: '12px', color: '#1890ff' }} />
              文档上传中心
            </Title>
            <Button 
              type="link" 
              icon={<InfoCircleOutlined />}
              onClick={() => setShowHelpModal(true)}
            >
              使用帮助
            </Button>
          </div>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            上传您的文档文件，系统将自动解析内容并提供智能阅读体验
          </Text>
        </Space>
      </div>

      <div className="main-content">
        <div className="content-left">
          <Card className="upload-card">
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane 
                tab={
                  <span>
                    <UploadOutlined />
                    文档上传
                  </span>
                } 
                key="upload"
              >
                <DocumentUpload />
              </TabPane>
              <TabPane 
                tab={
                  <span>
                    <FileSearchOutlined />
                    上传记录
                  </span>
                } 
                key="history"
                disabled
              >
                <div className="coming-soon">
                  <Title level={4}>功能开发中</Title>
                  <Text type="secondary">
                    上传记录功能将在下一个版本中提供，敬请期待！
                  </Text>
                </div>
              </TabPane>
            </Tabs>
          </Card>

          <Alert
            message="上传提示"
            description={
              <ul style={{ marginBottom: 0 }}>
                {uploadTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            }
            type="info"
            showIcon
            style={{ marginTop: '24px' }}
          />
        </div>

        <div className="content-right">
          <Card title="功能特性" className="features-card">
            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-icon">{feature.icon}</div>
                  <div className="feature-content">
                    <Title level={5} style={{ marginBottom: '4px' }}>
                      {feature.title}
                    </Title>
                    <Text type="secondary">{feature.description}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="支持格式" className="formats-card" style={{ marginTop: '24px' }}>
            <div className="formats-list">
              <div className="format-item">
                <div className="format-badge pdf">PDF</div>
                <div className="format-info">
                  <Text strong>PDF文档</Text>
                  <Text type="secondary">便携式文档格式，支持文字和图片</Text>
                </div>
              </div>
              <div className="format-item">
                <div className="format-badge epub">EPUB</div>
                <div className="format-info">
                  <Text strong>EPUB电子书</Text>
                  <Text type="secondary">电子出版物标准格式</Text>
                </div>
              </div>
              <div className="format-item">
                <div className="format-badge word">DOCX</div>
                <div className="format-info">
                  <Text strong>Word文档</Text>
                  <Text type="secondary">Microsoft Word文档格式</Text>
                </div>
              </div>
              <div className="format-item">
                <div className="format-badge text">TXT</div>
                <div className="format-info">
                  <Text strong>纯文本</Text>
                  <Text type="secondary">纯文本文件格式</Text>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        title="文档上传帮助"
        open={showHelpModal}
        onCancel={() => setShowHelpModal(false)}
        footer={[
          <Button key="close" onClick={() => setShowHelpModal(false)}>
            关闭
          </Button>
        ]}
        width={600}
      >
        <div className="help-content">
          <Paragraph>
            <Text strong>1. 如何上传文档？</Text>
            <br />
            您可以通过以下方式上传文档：
            <ul>
              <li>点击"选择文件"按钮选择本地文件</li>
              <li>将文件拖放到上传区域</li>
              <li>支持批量选择多个文件</li>
            </ul>
          </Paragraph>

          <Paragraph>
            <Text strong>2. 支持哪些文件格式？</Text>
            <br />
            目前支持以下格式：
            <ul>
              <li>PDF (.pdf)</li>
              <li>EPUB (.epub)</li>
              <li>Word文档 (.docx, .doc)</li>
              <li>纯文本 (.txt)</li>
            </ul>
          </Paragraph>

          <Paragraph>
            <Text strong>3. 文件大小限制是多少？</Text>
            <br />
            单个文件最大支持100MB。如果文件过大，建议分割后上传。
          </Paragraph>

          <Paragraph>
            <Text strong>4. 上传后文档会如何处理？</Text>
            <br />
            上传完成后，系统会自动：
            <ul>
              <li>解析文档内容</li>
              <li>提取文本和元数据</li>
              <li>生成文档摘要</li>
              <li>建立搜索索引</li>
            </ul>
          </Paragraph>

          <Paragraph>
            <Text strong>5. 遇到问题怎么办？</Text>
            <br />
            如果遇到上传问题，请：
            <ul>
              <li>检查网络连接</li>
              <li>确认文件格式和大小</li>
              <li>清除浏览器缓存后重试</li>
              <li>联系技术支持</li>
            </ul>
          </Paragraph>
        </div>
      </Modal>
    </div>
  );
};

export default DocumentUploadPage;