/**
 * 图书信息接口
 * 定义图书馆中书籍的基本信息结构
 */
export interface Book {
  /** 书籍唯一标识符 */
  id: number
  /** 书籍标题 */
  title: string
  /** 作者姓名 */
  author: string
  /** 总页数 */
  pages: number
  /** 章节数量 */
  chapters: number
  /** 术语/词汇数量 */
  terms: number
  /** 阅读难度等级：简单、中等、困难 */
  difficulty: 'easy' | 'medium' | 'hard'
  /** 封面背景颜色 */
  coverColor: string
  /** 书籍图标名称或路径 */
  icon: string
}