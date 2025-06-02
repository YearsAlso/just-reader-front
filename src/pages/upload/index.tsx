import React, { useState, useRef } from 'react'
import './styles.less'

interface UploadMethod {
  id: string
  title: string
  description: string
  iconClass: string
  methodClass: string
  disabled?: boolean
}

const UploadPage: React.FC = () => {
  const [activeMethod, setActiveMethod] = useState('local-upload')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadMethods: UploadMethod[] = [
    {
      id: 'local-upload',
      title: '本地上传',
      description: '从您的设备上传文件',
      iconClass: 'fas fa-upload',
      methodClass: 'method-1'
    },
    {
      id: 'cloud-import',
      title: '云存储',
      description: '从Google Drive或Dropbox导入',
      iconClass: 'fas fa-cloud',
      methodClass: 'method-2',
      disabled: true
    },
    {
      id: 'url-import',
      title: 'URL导入',
      description: '通过公开URL添加书籍',
      iconClass: 'fas fa-link',
      methodClass: 'method-3',
      disabled: true
    }
  ]

  const guideItems = [
    {
      title: '格式要求',
      description: '我们仅支持标准EPUB 3.0格式文件，确保您的文件扩展名为.epub'
    },
    {
      title: '文件大小',
      description: '最大支持100MB的文件上传，包含大量图片的书籍可能需要更长的处理时间'
    },
    {
      title: '处理过程',
      description: '上传后系统将自动分析书籍结构，生成思维导图并提取关键概念'
    },
    {
      title: '隐私保护',
      description: '您的书籍内容仅用于本地处理，不会上传到云端服务器'
    }
  ]

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleFile = (file: File) => {
    if (file && file.name.endsWith('.epub')) {
      if (file.size > 100 * 1024 * 1024) {
        alert('文件大小不能超过100MB')
        return
      }
      setSelectedFile(file)
      setActiveMethod('local-upload')
    } else {
      alert('请选择有效的EPUB文件')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleMethodClick = (methodId: string) => {
    const method = uploadMethods.find(m => m.id === methodId)
    if (method?.disabled) {
      if (methodId === 'cloud-import') {
        alert('云存储导入功能将在下一个版本中提供')
      } else if (methodId === 'url-import') {
        alert('URL导入功能将在下一个版本中提供')
      }
      return
    }
    
    setActiveMethod(methodId)
    if (methodId !== 'local-upload') {
      setSelectedFile(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleProcess = () => {
    if (!selectedFile) {
      alert('请先选择要上传的文件')
      return
    }

    setIsProcessing(true)
    setTimeout(() => {
      alert('书籍处理完成！即将进入阅读界面')
      setIsProcessing(false)
      // 实际应用中这里会重定向到阅读页面
    }, 2000)
  }

  return (
    <div className="upload-page-container">
      <div className="page-header">
        <h1>导入EPUB书籍</h1>
        <p>上传您的电子书，开始使用AI辅助的SQ3R阅读法</p>
      </div>

      <div className="import-container">
        {/* 上传区域 */}
        <div className="card upload-card">
          <div className="card-header">
            <h2 className="card-title">添加新书籍</h2>
            <p className="card-subtitle">支持EPUB格式文件，最大不超过100MB</p>
          </div>

          <div className="upload-methods">
            {uploadMethods.map((method) => (
              <div
                key={method.id}
                className={`method-card ${activeMethod === method.id ? 'active' : ''}`}
                onClick={() => handleMethodClick(method.id)}
              >
                <div className={`method-icon ${method.methodClass}`}>
                  <i className={method.iconClass}></i>
                </div>
                <h3 className="method-title">{method.title}</h3>
                <p className="method-desc">{method.description}</p>
              </div>
            ))}
          </div>

          {activeMethod === 'local-upload' && (
            <>
              <div
                className={`drop-area ${isDragOver ? 'dragover' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <div className="drop-icon">
                  <i className="fas fa-file-import"></i>
                </div>
                <h3 className="drop-text">拖放文件到此处</h3>
                <p className="drop-hint">或点击下方按钮选择文件</p>
                <button className="btn btn-outline" onClick={handleBrowseClick}>
                  <i className="fas fa-folder-open"></i> 浏览文件
                </button>
                <input
                  type="file"
                  className="file-input"
                  ref={fileInputRef}
                  accept=".epub"
                  onChange={handleFileInputChange}
                />
              </div>

              {selectedFile && (
                <div className="file-info">
                  <div className="file-icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="file-details">
                    <div className="file-name">{selectedFile.name}</div>
                    <div className="file-size">{formatFileSize(selectedFile.size)}</div>
                  </div>
                  <div className="file-actions">
                    <div className="action-btn" onClick={handleRemoveFile}>
                      <i className="fas fa-times"></i>
                    </div>
                  </div>
                </div>
              )}

              {selectedFile && (
                <button
                  className="btn process-btn"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> 处理中...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-cogs"></i> 处理书籍
                    </>
                  )}
                </button>
              )}
            </>
          )}
        </div>

        {/* 导入指南 */}
        <div className="card guide-card">
          <div className="guide-header">
            <div className="guide-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <h2 className="guide-title">导入指南</h2>
          </div>

          <div className="guide-list">
            {guideItems.map((item, index) => (
              <div key={index} className="guide-item" data-number={index + 1}>
                <div className="guide-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="support-card">
            <div className="support-title">
              <i className="fas fa-exclamation-circle"></i>
              <span>遇到问题？</span>
            </div>
            <p className="support-text">
              如果您在上传过程中遇到问题，或需要转换其他格式的电子书，请参考我们的帮助文档
            </p>
            <a href="#" className="support-link">
              <i className="fas fa-life-ring"></i> 获取帮助
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadPage
