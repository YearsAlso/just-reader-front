class TokenUtils {
  static getToken(): string {
    const token = localStorage.getItem('token')
    return token ? token : ''
  }

  static setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  static removeToken(): void {
    localStorage.removeItem('token')
  }
}

export default TokenUtils
