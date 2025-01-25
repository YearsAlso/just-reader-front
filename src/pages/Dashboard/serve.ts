import {Book, Note, ReadingStats} from '../../repository/data';
import {getMockLatestNotes, getMockReadingStats} from '../../mock/mock';
import BookRepository from '../../repository/BooksRepository';

const bookRepository = new BookRepository();

export const getRecentBooks = async (): Promise<Book[]> => {
    // 使用 mock 数据
    // return getMockRecentBooks();
    // 真实数据逻辑
    return bookRepository.findAll();
};

export const getLatestNotes = async (): Promise<Note[]> => {
    // 使用 mock 数据
    return getMockLatestNotes();
    // 真实数据逻辑
    // const result = await db.select("SELECT note FROM notes ORDER BY created_at DESC LIMIT 3");
    // return result.map((row: any) => ({ note: row.note }));
};

export const getReadingStats = async (): Promise<ReadingStats> => {
    // 使用 mock 数据
    return getMockReadingStats();
    // 真实数据逻辑
    // const result = await db.select("SELECT SUM(hours) as hoursThisMonth FROM reading_stats WHERE MONTH(date) = MONTH(CURRENT_DATE())");
    // return { hoursThisMonth: result[0].hoursThisMonth };
};
