const LoginPages: React.FC = () => {
    const handleLogin = () => {
        localStorage.setItem("authenticated", "true");
        window.location.href = "/";
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default LoginPages;
