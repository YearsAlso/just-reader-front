import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Login from './pages/Login/index.tsx'
import LayoutWrapper from './layout/index.tsx'
import {useSelector} from 'react-redux'
import InitConfigPage from './pages/Init/index.tsx'
import ConnectionStatusPage from './pages/Result/ConnectionStatus/index.tsx'
import {RootState} from "./redux/store.ts"; // 新增导入

function App() {
    const initStatus = useSelector((state: RootState) => state.config.initStatus)

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        initStatus !== 'inited' ? (
                            <Navigate to="/init"/>
                        ) : (
                            <ProtectedRoute>
                                <LayoutWrapper/>
                            </ProtectedRoute>
                        )
                    }
                />
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <LayoutWrapper/>
                        </ProtectedRoute>
                    }
                />
                <Route path="/login" element={<Login/>}/>
                <Route path="/init" element={<InitConfigPage/>}/>
                <Route path="/connection-status" element={<ConnectionStatusPage/>}/> {/* 新增路由 */}
            </Routes>
        </Router>
    )
}

export default App
