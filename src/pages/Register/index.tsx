import React, { useState } from 'react';
import './style.css'; // 引入样式文件

const RegisterPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // 简单的注册逻辑
        if (username && email && password) {
            localStorage.setItem("registered", "true");
            alert('Registration successful!');
            window.location.href = "/login";
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Register</h1>
                <form className="register-form" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
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
                        <label className="form-label">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="register-button">Register</button>
                    <div className="login-link">
                        <a href="/login">Already have an account? Login here</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterPage;