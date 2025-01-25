import { useEffect, useState } from 'react'
import './index.css' // 引入样式文件
import BooksDrawer from './components/BooksDrawer' // 引入BooksDrawer组件
import { Book } from '../../repository/data'
import { getBooks } from './service'

const BooksPage = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [books, setBooks] = useState<Book[]>([])

  const handleCardClick = (book: Book) => {
    setSelectedBook(book)
  }

  const handleCloseDrawer = () => {
    setSelectedBook(null)
  }

  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books)
    })
  }, [])

  return (
    <div className="books-container">
      <h1 className="books-title">Books Page</h1>
      <div className="books-grid">
        {books.map((item, index) => (
          <div
            key={index}
            className="book-card"
            onClick={() => handleCardClick(item)}
          >
            <div
              className="book-cover"
              style={{ backgroundImage: `url(${item.cover})` }}
            ></div>
            <div className="book-card-body">
              <h2 className="book-title">{item.title}</h2>
              <p className="book-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <BooksDrawer book={selectedBook} onClose={handleCloseDrawer} />
      )}
    </div>
  )
}

export default BooksPage
