
export interface Book {
  id: number
  title: string
  author: string
  pages: number
  chapters: number
  terms: number
  difficulty: 'easy' | 'medium' | 'hard'
  coverColor: string
  icon: string
}