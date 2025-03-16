import {Book, Note, ReadingStats} from '../../repository/data';

export const getRecentBooks = async (): Promise<Book[]> => {
    // 使用 mock 数据
    // return getMockRecentBooks();
    // 真实数据逻辑
    return [];
};

export const getLatestNotes = async (): Promise<Note[]> => {
    // 使用 mock 数据
    return [];
    // 真实数据逻辑
    // const result = await db.select("SELECT note FROM notes ORDER BY created_at DESC LIMIT 3");
    // return result.map((row: any) => ({ note: row.note }));
};

export const getReadingStats = async (): Promise<ReadingStats> => {
    // 使用 mock 数据
    return {
        hoursThisMonth: 0
    };
    // 真实数据逻辑
    // const result = await db.select("SELECT SUM(hours) as hoursThisMonth FROM reading_stats WHERE MONTH(date) = MONTH(CURRENT_DATE())");
    // return { hoursThisMonth: result[0].hoursThisMonth };
};
