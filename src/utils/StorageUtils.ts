/**
 * 存储工具类，提供编码、解码、读取、写入和删除本地存储中的数据的功能
 */
class StorageUtils {
  /**
   * 对字符串进行编码
   * @param value 需要编码的字符串
   * @returns 编码后的字符串
   */
  static encode(value: string): string {
    return encodeURIComponent(value)
  }

  /**
   * 对字符串进行解码
   * @param value 需要解码的字符串
   * @returns 解码后的字符串
   */
  static decode(value: string): string {
    return decodeURIComponent(value)
  }

  /**
   * 从本地存储中获取指定键的数据
   * @param key 数据的键
   * @returns 数据的值，如果不存在则返回null
   */
  static getItem(key: string): string | null {
    // TODO: 对 key 和 value 进行编码和解码处理，避免特殊字符导致的问题
    const encodedKey = encodeURIComponent(key)

    let value = localStorage.getItem(encodedKey)
    if (value !== null) {
      value = StorageUtils.decode(value)
    }

    return value
  }

  /**
   * 从本地存储中获取指定键的数据，并尝试将其解析为对象
   * 如果项不存在则返回默认值
   * @param key 数据的键
   * @param defaultValue 如果数据不存在时返回的默认值
   * @returns 解析后的对象或默认值
   */
  static getItemObj<T>(key: string, defaultValue: T | null = null): T | null {
    const encodedKey = encodeURIComponent(key)
    const item = localStorage.getItem(encodedKey)
    if (item === null) {
      return defaultValue
    }

    try {
      let value = localStorage.getItem(encodedKey)
      if (value !== null) {
        value = StorageUtils.decode(value)
        return JSON.parse(value) as T
      }

      return value
    } catch (e) {
      console.error(`Error parsing JSON from localStorage for key "${key}":`, e)
      return defaultValue
    }
  }

  /**
   * 将数据存储到本地存储中
   * @param key 数据的键
   * @param value 数据的值，可以是任意类型
   */
  static setItem<T>(key: string, value: T): void {
    const encodedKey = encodeURIComponent(key)
    if (typeof value === 'object') {
      let objValueJsonStr = JSON.stringify(value)
      const encodedValue = StorageUtils.encode(objValueJsonStr)
      localStorage.setItem(encodedKey, encodedValue)
      return
    }

    localStorage.setItem(encodedKey, StorageUtils.encode(`${value}`))
  }

  /**
   * 从本地存储中删除指定键的数据
   * @param key 数据的键
   */
  static removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}

export default StorageUtils
