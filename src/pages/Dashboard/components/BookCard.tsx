import React from 'react'
import './BookCard.css'
import {Book} from "@/repository/data"; // 引入自定义样式


const BookCard: React.FC<Book> = ({title, author, cover}) => {
    return (
        <div className="book-card-container noselect" style={{background: cover}}>
            <div className="canvas">
                <div className="tracker tr-1"></div>
                <div className="tracker tr-2"></div>
                <div className="tracker tr-3"></div>
                <div className="tracker tr-4"></div>
                <div className="tracker tr-5"></div>
                <div className="tracker tr-6"></div>
                <div className="tracker tr-7"></div>
                <div className="tracker tr-8"></div>
                <div className="tracker tr-9"></div>
                <div className="tracker tr-10"></div>
                <div className="tracker tr-11"></div>
                <div className="tracker tr-12"></div>
                <div className="tracker tr-13"></div>
                <div className="tracker tr-14"></div>
                <div className="tracker tr-15"></div>
                <div className="tracker tr-16"></div>
                <div className="tracker tr-17"></div>
                <div className="tracker tr-18"></div>
                <div className="tracker tr-19"></div>
                <div className="tracker tr-20"></div>
                <div className="tracker tr-21"></div>
                <div className="tracker tr-22"></div>
                <div className="tracker tr-23"></div>
                <div className="tracker tr-24"></div>
                <div className="tracker tr-25"></div>
                <div id="card">
                    <p id="prompt"></p>
                    <div className="title">{title}</div>
                    <div className="subtitle">{author}</div>
                </div>
            </div>
        </div>
    )
}

export default BookCard
