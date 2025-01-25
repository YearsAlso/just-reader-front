export type Note =  {
    content: string;
    createdAt: Date;
    id: string;
    bookId: string;
    bookName: string;
    authorName: string;
}

export interface ReadingStats {
    hoursThisMonth: number;
}



export type Book = {
    bookName: string; // 书籍名称
    title: string; // 书籍标题
    author: string; // 作者名称
    createdAt?: Date; // 创建日期
    sort?: number; // 分类
    id: string; // 书籍ID
    description: string; // 书籍概述
    cover: string; // 书籍封面
}
