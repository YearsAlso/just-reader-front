import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes, 
} from 'react-router-dom'
import './App.less'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Login from './pages/auth/index.tsx'
import LayoutWrapper from './layout/index.tsx'

/**
 * App组件是应用的入口组件，负责根据用户的认证状态和当前路由路径来决定渲染的组件
 * 它通过检查本地存储中的认证信息来确定用户是否已登录，并根据用户是否登录以及当前路由，
 * 决定是渲染保护路由下的布局组件，还是重定向到登录或主页
 */
function App() {
  // 从本地存储获取用户的认证令牌
  const token = localStorage.getItem('authToken')
  // 从本地存储获取用户的登录状态
  const authenticated = localStorage.getItem('authenticated')
  // 获取当前页面的路径
  const currentLocation = window.location.pathname

  /**
   * 根据用户的认证状态和当前路径，决定返回哪个组件
   * 如果用户已认证且位于登录或注册页面，则重定向到主页
   * 如果用户已认证且不在登录或注册页面，则渲染保护路由下的布局组件
   * 如果用户未认证，则根据当前路径重定向到登录或注册页面
   */
  const getElement = () => {
    return token && authenticated === 'true' ? (
      currentLocation === '/register' || currentLocation === '/login' ? (
        <Navigate to="/" replace />
      ) : (
        <ProtectedRoute>
          <LayoutWrapper />
        </ProtectedRoute>
      )
    ) : currentLocation === '/register' ? (
      <Navigate to="/register" replace />
    ) : (
      <Navigate to="/login" replace />
    )
  }

  // 渲染Router组件，定义应用中的路由
  return (
    <Router>
      <Routes>
        {/*// 主页路由，根据用户的认证状态和路径动态渲染组件*/}
        <Route path="/*" element={getElement()} />
        {/*// 登录页面路由*/}
        <Route path="/login" element={<Login />} />
        {/*// 注册页面路由*/}
        <Route path="/register" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
