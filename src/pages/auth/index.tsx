import React from 'react'
import './style.less' // 引入样式文件
import { Form, Input } from 'antd'

const LoginPage: React.FC = () => {
  const form = Form.useFormInstance()

  const handleLogin = () => {
    // 获取表单数据
    const username = form.getFieldValue('username')
    const password = form.getFieldValue('password')
    // 简单的验证逻辑
    if (username === 'admin' && password === 'password') {
      // TODO: 加入真实的登录逻辑
      alert('Login successful!')
      localStorage.setItem('authenticated', 'true')
      localStorage.setItem('authToken', '1234566')
      window.location.href = '/'
    } else {
      alert('Invalid username or password')
    }
  }

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* <!-- 左侧品牌展示区 --> */}
        <div className="brand-section">
          <div>
            <div className="logo">
              <div className="logo-icon">
                <i className="fas fa-brain"></i>
              </div>
              <div className="logo-text">Just Reader</div>
            </div>

            <div className="slogan">
              更智能的阅读
              <br />
              更高效的学习
            </div>

            <div className="features">
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-binoculars"></i>
                </div>
                <div className="feature-text">
                  AI辅助SQ3R阅读法，提升理解效率
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-lightbulb"></i>
                </div>
                <div className="feature-text">智能知识图谱，建立系统性认知</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="feature-text">成就勋章体系，激励持续学习</div>
              </div>
            </div>
          </div>

          <div className="brand-footer">
            © 2025 AI-SQ3R阅读器 | 让知识成为力量
          </div>
        </div>

        {/* <!-- 右侧登录表单 --> */}
        <div className="form-section">
          <div className="form-header">
            <h1>欢迎回来</h1>
            <p>请登录您的账户继续您的学习之旅</p>
          </div>

          <Form className="login-form" onFinish={handleLogin} form={form}>
            <div className="form-group">
              <label className="form-label">
                邮箱地址
                <a href="#">注册账号</a>
              </label>
              <div className="input-group">
                <i className="fas fa-envelope input-icon"></i>
                <Input
                  type="email"
                  className="form-input"
                  placeholder="输入您的邮箱"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                密码
                <a href="#">忘记密码?</a>
              </label>
              <div className="input-group">
                <i className="fas fa-lock input-icon"></i>
                <Input
                  type="password"
                  className="form-input"
                  placeholder="输入您的密码"
                  required
                />
              </div>
            </div>

            <div className="remember-forgot">
              <div className="remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">记住我</label>
              </div>
            </div>

            <button type="submit" className="btn">
              登录账户
            </button>

            <div className="divider">
              <div className="divider-text">或使用以下方式登录</div>
            </div>

            <div className="social-login">
              <div className="social-btn google">
                <i className="fab fa-google"></i>
              </div>
              <div className="social-btn apple">
                <i className="fab fa-apple"></i>
              </div>
              <div className="social-btn wechat">
                <i className="fab fa-weixin"></i>
              </div>
            </div>

            <div className="register-link">
              还没有账户？<a href="#">立即注册</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
