export interface UserInfo {
  username: string
  email: string
  role: 'admin' | 'user' | 'guest'
  preferences?: {
    theme?: 'light' | 'dark'
    language?: string
  }
  permissions: string[]
  lastLogin?: string // ISO 8601 format
  createdAt?: string // ISO 8601 format
  updatedAt?: string // ISO 8601 format
  profilePicture?: string // URL to the user's profile picture
  bio?: string // Short biography or description
}
