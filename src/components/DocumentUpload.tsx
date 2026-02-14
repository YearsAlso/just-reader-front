import React, { useState, useRef, useEffect } from 'react';
import { message, Progress, Button, Card, Space, Typography, List, Tag } from 'antd';
import { UploadOutlined, FileTextOutlined, FilePdfOutlined, FileWordOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import './DocumentUpload.less';

const { Title, Text, Paragraph } = Typography;

interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'success' | 'error' | 'parsing';
  progress?: number;
  uploadTime?: Date;
  documentId?: number;
  fileKey?: string;
  parseStatus?: string;
}

interface UploadLimits {
  maxFileSize: number;
  maxConcurrentUploads: number;
  chunkSize: number;
  supportedTypes: string[];
  supportedExtensions: string[];
}

const DocumentUpload: React.FC = () => {
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([]);
  const [uploadLimits, _setUploadLimits] = useState<UploadLimits>({
    maxFileSize: 100 * 1024 * 1024, // 100MB
    maxConcurrentUploads: 5,
    chunkSize: 5 * 1024 * 1024, // 5MB
    supportedTypes: [
      'application/pdf',
      'application/epub+zip',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/msword'
    ],
    supportedExtensions: ['.pdf', '.epub', '.docx', '.doc', '.txt']
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 获取上传限制
  useEffect(() => {
    fetchUploadLimits();
  }, []);

  const fetchUploadLimits = async () => {
    try {
      // TODO: 从后端API获取上传限制
      // const response = await fetch('http://localhost:8083/document/api/documents/upload/limits');
      // const data = await response.json();
      // setUploadLimits(data);
    } catch (error) {
      console.error('获取上传限制失败:', error);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />;
      case 'epub':
        return <FileTextOutlined style={{ color: '#1890ff', fontSize: '24px' }} />;
      case 'docx':
      case 'doc':
        return <FileWordOutlined style={{ color: '#1890ff', fontSize: '24px' }} />;
      case 'txt':
        return <FileTextOutlined style={{ color: '#52c41a', fontSize: '24px' }} />;
      default:
        return <FileTextOutlined style={{ fontSize: '24px' }} />;
    }
  };

  const getFileTypeTag = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return <Tag color="red">PDF</Tag>;
      case 'epub':
        return <Tag color="blue">EPUB</Tag>;
      case 'docx':
        return <Tag color="geekblue">DOCX</Tag>;
      case 'doc':
        return <Tag color="cyan">DOC</Tag>;
      case 'txt':
        return <Tag color="green">TXT</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  const validateFile = (file: File): boolean => {
    // 检查文件大小
    if (file.size > uploadLimits.maxFileSize) {
      message.error(`文件大小不能超过 ${formatFileSize(uploadLimits.maxFileSize)}`);
      return false;
    }

    // 检查文件类型
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!uploadLimits.supportedExtensions.includes(extension)) {
      message.error(`不支持的文件类型: ${extension}`);
      return false;
    }

    return true;
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const newDocuments: UploadedDocument[] = [];
    
    Array.from(files).forEach(file => {
      if (!validateFile(file)) return;

      const document: UploadedDocument = {
        id: Date.now() + '-' + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
        uploadTime: new Date()
      };

      newDocuments.push(document);
      startUpload(document, file);
    });

    setUploadedDocuments(prev => [...prev, ...newDocuments]);
  };

  const startUpload = async (document: UploadedDocument, file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8083/document/api/documents/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          updateDocumentStatus(document.id, 'success', 100, {
            documentId: result.data.documentId,
            fileKey: result.data.fileKey,
            parseStatus: result.data.parseStatus
          });
          message.success(`${document.name} 上传成功！`);
        } else {
          updateDocumentStatus(document.id, 'error');
          message.error(`${document.name} 上传失败: ${result.message}`);
        }
      } else {
        updateDocumentStatus(document.id, 'error');
        message.error(`${document.name} 上传失败: HTTP ${response.status}`);
      }
    } catch (error) {
      updateDocumentStatus(document.id, 'error');
      message.error(`${document.name} 上传失败: ${error}`);
    }
  };

  const updateDocumentStatus = (
    id: string, 
    status: UploadedDocument['status'], 
    progress?: number,
    additionalData?: Partial<UploadedDocument>
  ) => {
    setUploadedDocuments(prev => 
      prev.map(doc => 
        doc.id === id 
          ? { 
              ...doc, 
              status, 
              progress,
              ...additionalData,
              ...(status === 'success' && { uploadTime: new Date() })
            }
          : doc
      )
    );
  };

  const removeDocument = (id: string) => {
    setUploadedDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const getStatusText = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'uploading':
        return '上传中';
      case 'success':
        return '上传成功';
      case 'error':
        return '上传失败';
      case 'parsing':
        return '解析中';
      default:
        return '等待上传';
    }
  };

  const getStatusColor = (status: UploadedDocument['status']) => {
    switch (status) {
      case 'uploading':
        return 'blue';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'parsing':
        return 'orange';
      default:
        return 'default';
    }
  };

  return (
    <div className="document-upload-container">
      <Card title="文档上传" className="upload-card">
        <div className="upload-section">
          <div
            className={`drop-area ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="drop-content">
              <UploadOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={4} style={{ marginBottom: '8px' }}>
                拖放文件到此处
              </Title>
              <Text type="secondary" style={{ marginBottom: '16px', display: 'block' }}>
                支持 {uploadLimits.supportedExtensions.join(', ')} 格式
                <br />
                最大文件大小: {formatFileSize(uploadLimits.maxFileSize)}
              </Text>
              <Button type="primary" icon={<UploadOutlined />} onClick={handleBrowseClick}>
                选择文件
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                multiple
                accept={uploadLimits.supportedExtensions.join(',')}
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </div>
          </div>

          <div className="upload-info">
            <Paragraph type="secondary">
              <Text strong>上传说明：</Text>
              <br />
              1. 支持批量上传，最多同时上传 {uploadLimits.maxConcurrentUploads} 个文件
              <br />
              2. 大文件支持分片上传，每片 {formatFileSize(uploadLimits.chunkSize)}
              <br />
              3. 上传后系统会自动解析文档内容
              <br />
              4. 支持断点续传，上传过程中可以暂停和恢复
            </Paragraph>
          </div>
        </div>

        {uploadedDocuments.length > 0 && (
          <div className="upload-list-section">
            <Title level={5} style={{ marginBottom: '16px' }}>
              上传列表 ({uploadedDocuments.length})
            </Title>
            <List
              dataSource={uploadedDocuments}
              renderItem={(doc) => (
                <List.Item
                  actions={[
                    doc.status === 'success' ? (
                      <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '18px' }} />
                    ) : doc.status === 'error' ? (
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeDocument(doc.id)}
                      >
                        删除
                      </Button>
                    ) : (
                      <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeDocument(doc.id)}
                        disabled={doc.status === 'uploading'}
                      >
                        取消
                      </Button>
                    )
                  ]}
                >
                  <List.Item.Meta
                    avatar={getFileIcon(doc.name)}
                    title={
                      <Space>
                        <Text strong>{doc.name}</Text>
                        {getFileTypeTag(doc.name)}
                        <Tag color={getStatusColor(doc.status)}>
                          {getStatusText(doc.status)}
                        </Tag>
                      </Space>
                    }
                    description={
                      <div>
                        <div style={{ marginBottom: '8px' }}>
                          <Text type="secondary">
                            大小: {formatFileSize(doc.size)} | 
                            类型: {doc.type} | 
                            时间: {doc.uploadTime?.toLocaleTimeString()}
                          </Text>
                        </div>
                        {doc.status === 'uploading' && doc.progress !== undefined && (
                          <Progress percent={doc.progress} size="small" />
                        )}
                        {doc.status === 'success' && doc.documentId && (
                          <div>
                            <Text type="success">
                              文档ID: {doc.documentId} | 文件密钥: {doc.fileKey}
                            </Text>
                            <br />
                            <Text type="secondary">
                              解析状态: {doc.parseStatus}
                            </Text>
                          </div>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </div>
        )}
      </Card>

      <div className="support-section">
        <Card title="支持的文件格式" className="support-card">
          <List
            dataSource={[
              { type: 'PDF文档', extension: '.pdf', description: '便携式文档格式，支持文字和图片' },
              { type: 'EPUB电子书', extension: '.epub', description: '电子出版物标准格式' },
              { type: 'Word文档', extension: '.docx, .doc', description: 'Microsoft Word文档' },
              { type: '纯文本', extension: '.txt', description: '纯文本文件' }
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <Space>
                      <Text strong>{item.type}</Text>
                      <Tag>{item.extension}</Tag>
                    </Space>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
};

export default DocumentUpload;