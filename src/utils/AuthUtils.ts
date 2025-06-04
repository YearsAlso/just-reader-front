import StorageUtils from '@/utils/StorageUtils.ts'
import { UserInfo } from '@/types/userInfo.ts'

class AuthUtils {
  static getToken(): string | null {
    return StorageUtils.getItem('token')
  }

  static setToken(token: string): void {
    StorageUtils.setItem('token', token)
  }

  static removeToken(): void {
    StorageUtils.removeItem('token')
  }

  static isAuthenticated(): boolean {
    return this.getToken() !== null
  }

  static login(token: string): void {
    this.setToken(token)
    window.location.href = '/'
  }

  static logout(): void {
    this.removeToken()
    window.location.href = '/login'
  }

  static getUserInfo(): UserInfo | null {
    const userInfo = StorageUtils.getItemObj<UserInfo>('userInfo')
    return userInfo
  }

  static setUserInfo(userInfo: any): void {
    StorageUtils.setItem('userInfo', JSON.stringify(userInfo))
  }

  static removeUserInfo(): void {
    StorageUtils.removeItem('userInfo')
  }

  static isAdmin(): boolean {
    const userInfo = this.getUserInfo()
    if (!userInfo) {
      return false
    }

    return userInfo && userInfo.role === 'admin'
  }

  static isUser(): boolean {
    const userInfo = this.getUserInfo()
    if (!userInfo) {
      return false
    }

    return userInfo && userInfo.role === 'user'
  }

  static isGuest(): boolean {
    const userInfo = this.getUserInfo()
    return !userInfo || userInfo.role === 'guest'
  }

  static hasPermission(permission: string): boolean {
    const userInfo = this.getUserInfo()
    if (!userInfo) {
      return false
    }

    return (
      userInfo &&
      userInfo.permissions &&
      userInfo.permissions.includes(permission)
    )
  }

  static setPermissions(permissions: string[]): void {
    const userInfo = this.getUserInfo() || ({} as UserInfo)
    userInfo.permissions = permissions
    this.setUserInfo(userInfo)
  }
}

const authUtils = new AuthUtils()
export default authUtils
