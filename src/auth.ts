// auth.ts
export function isAuthenticated() {
  // 这里可以添加实际的身份验证逻辑
  return localStorage.getItem("authenticated") === "true";
}

