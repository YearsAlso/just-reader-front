import React, { useState, useEffect } from 'react'
import './index.less'

interface Book {
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

const Library: React.FC = () => {
  // 模拟图书数据
  const initialBooks: Book[] = [
    {
      id: 1,
      title: '认知心理学导论',
      author: '罗伯特·斯坦伯格',
      pages: 286,
      chapters: 12,
      terms: 42,
      difficulty: 'medium',
      coverColor: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
      icon: 'fas fa-brain'
    },
    {
      id: 2,
      title: '人类简史',
      author: '尤瓦尔·赫拉利',
      pages: 512,
      chapters: 20,
      terms: 68,
      difficulty: 'easy',
      coverColor: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      icon: 'fas fa-globe-americas'
    },
    {
      id: 3,
      title: '深度学习',
      author: '伊恩·古德费洛',
      pages: 775,
      chapters: 28,
      terms: 105,
      difficulty: 'hard',
      coverColor: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      icon: 'fas fa-microchip'
    },
    {
      id: 4,
      title: '时间简史',
      author: '史蒂芬·霍金',
      pages: 256,
      chapters: 10,
      terms: 58,
      difficulty: 'medium',
      coverColor: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
      icon: 'fas fa-atom'
    },
    {
      id: 5,
      title: '思考，快与慢',
      author: '丹尼尔·卡尼曼',
      pages: 499,
      chapters: 38,
      terms: 87,
      difficulty: 'medium',
      coverColor: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
      icon: 'fas fa-lightbulb'
    },
    {
      id: 6,
      title: '失控',
      author: '凯文·凯利',
      pages: 707,
      chapters: 24,
      terms: 112,
      difficulty: 'hard',
      coverColor: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
      icon: 'fas fa-network-wired'
    },
    {
      id: 7,
      title: '原则',
      author: '瑞·达利欧',
      pages: 592,
      chapters: 18,
      terms: 76,
      difficulty: 'medium',
      coverColor: 'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
      icon: 'fas fa-balance-scale'
    },
    {
      id: 8,
      title: '未来简史',
      author: '尤瓦尔·赫拉利',
      pages: 448,
      chapters: 21,
      terms: 91,
      difficulty: 'medium',
      coverColor: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
      icon: 'fas fa-robot'
    }
  ]

  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [displayedBooks, setDisplayedBooks] = useState<Book[]>(initialBooks)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [currentFilter, setCurrentFilter] = useState<string>('all')

  // 搜索功能
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    filterBooks(term, currentFilter)
  }

  // 筛选功能
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterValue = e.target.value
    setCurrentFilter(filterValue)
    filterBooks(searchTerm, filterValue)
  }

  // 筛选图书
  const filterBooks = (term: string, filter: string) => {
    // 首先根据搜索词筛选
    let filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(term) ||
        book.author.toLowerCase().includes(term)
    )

    // 然后根据下拉选择进行筛选
    switch (filter) {
      case 'recent':
        filteredBooks = [...filteredBooks].reverse()
        break
      case 'reading':
        // 模拟阅读中的书籍
        filteredBooks = filteredBooks.slice(0, 3)
        break
      case 'completed':
        // 模拟已完成的书籍
        filteredBooks = filteredBooks.slice(3, 6)
        break
      case 'difficulty':
        filteredBooks.sort((a, b) => {
          const difficultyOrder = { hard: 3, medium: 2, easy: 1 }
          return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty]
        })
        break
    }

    setDisplayedBooks(filteredBooks)
  }

  // 导入新书
  const handleImport = () => {
    alert('打开导入新书界面')
  }

  // 处理书籍点击
  const handleBookClick = (book: Book) => {
    alert(`打开《${book.title}》的详情页面`)
  }

  // 处理开始阅读按钮点击
  const handleReadClick = (e: React.MouseEvent, book: Book) => {
    e.stopPropagation() // 阻止冒泡到书籍卡片
    alert(`开始阅读《${book.title}》`)
  }

  // 处理页码按钮点击
  const handlePageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget
    if (target.classList.contains('disabled')) return

    // 移除所有active状态
    document.querySelectorAll('.page-btn').forEach((btn) => {
      btn.classList.remove('active')
    })

    // 为当前按钮添加active状态
    if (!target.querySelector('i')) {
      target.classList.add('active')
    }
  }

  return (
    <>
      <div className="books-grid" id="booksGrid">
        {displayedBooks.length === 0 ? (
          <div className="no-results">
            <i className="fas fa-book-open"></i>
            <h3>未找到匹配的图书</h3>
            <p>请尝试其他搜索关键词或筛选条件</p>
          </div>
        ) : (
          displayedBooks.map((book) => {
            const difficultyText =
              book.difficulty === 'easy'
                ? '简单'
                : book.difficulty === 'medium'
                  ? '中等'
                  : '困难'

            const difficultyClass =
              book.difficulty === 'easy'
                ? 'success'
                : book.difficulty === 'medium'
                  ? 'warning'
                  : 'danger'

            return (
              <div
                className="book-card"
                key={book.id}
                onClick={() => handleBookClick(book)}
              >
                <div
                  className="book-cover"
                  style={{ background: book.coverColor }}
                >
                  <i className={book.icon}></i>
                </div>
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <div className="book-author">{book.author}</div>
                  <div className="book-stats">
                    <div className="stat-item">
                      <div className="stat-value">{book.chapters}</div>
                      <div className="stat-label">章节</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{book.pages}</div>
                      <div className="stat-label">页数</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-value">{book.terms}</div>
                      <div className="stat-label">术语</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span
                      className="difficulty-badge"
                      style={{
                        background: `rgba(var(--${difficultyClass}), 0.1)`,
                        color: `var(--${difficultyClass})`,
                        padding: '5px 10px',
                        borderRadius: '20px',
                        fontSize: '0.85rem'
                      }}
                    >
                      {difficultyText}
                    </span>
                    <button
                      className="action-btn"
                      style={{
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        padding: '8px 15px',
                        borderRadius: 'var(--border-radius)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'var(--transition)'
                      }}
                      onClick={(e) => handleReadClick(e, book)}
                    >
                      开始阅读
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>

      <div className="pagination">
        <div className="page-btn disabled" onClick={handlePageClick}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <div className="page-btn active" onClick={handlePageClick}>
          1
        </div>
        <div className="page-btn" onClick={handlePageClick}>
          2
        </div>
        <div className="page-btn" onClick={handlePageClick}>
          3
        </div>
        <div className="page-btn" onClick={handlePageClick}>
          <i className="fas fa-ellipsis-h"></i>
        </div>
        <div className="page-btn" onClick={handlePageClick}>
          8
        </div>
        <div className="page-btn" onClick={handlePageClick}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </>
  )
}

export default Library
