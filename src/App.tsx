import {HashRouter as Router, Route, Routes, Navigate} from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute/index.tsx'
import Login from './pages/Login/index.tsx'
import LayoutWrapper from './layout/index.tsx'
import {useSelector} from 'react-redux'
import ConnectionStatusPage from './pages/Result/ConnectionStatus/index.tsx'
import {RootState} from "./redux/store.ts";
import RegisterPage from './pages/Register'

function App() {
    const initStatus = useSelector((state: RootState) => state.config.initStatus)
    const token = localStorage.getItem("token");

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        token ? (
                            initStatus !== 'inited' ? (
                                <Navigate to="/login"/>
                            ) : (
                                <ProtectedRoute>
                                    <LayoutWrapper/>
                                </ProtectedRoute>
                            )
                        ) : (
                            <Navigate to="/login"/>
                        )
                    }
                />
                <Route
                    path="/*"
                    element={
                        token ? (
                            <ProtectedRoute>
                                <LayoutWrapper/>
                            </ProtectedRoute>
                        ) : (
                            <Navigate to="/login"/>
                        )
                    }
                />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/connection-status" element={<ConnectionStatusPage/>}/>
            </Routes>
        </Router>
    )
}

export default App