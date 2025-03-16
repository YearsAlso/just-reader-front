import React, { useState } from 'react';
import './style.css'; // 引入样式文件

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // 简单的验证逻辑
        if (username === 'admin' && password === 'password') {
            localStorage.setItem("authenticated", "true");
            window.location.href = "/";
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Login</h1>
                <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="form-group">
                        <label className="form-label">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                    <div className="register-link">
                        <a href="/register">Register</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;