import { Book, Note, ReadingStats } from '../repository/data';
import { faker } from '@faker-js/faker';

const mockBooks: Book[] = Array.from({ length: 4 }, () => ({
    bookName: faker.lorem.words(3),
    title: faker.lorem.sentence(),
    author: faker.name.firstName(),
    createdAt: faker.date.past(),
    sort: faker.number.int(),
    id: faker.string.uuid(),
    overview: faker.lorem.paragraph(),
    cover: faker.image.url({ width: 200, height: 300  }),
}));


const mockNotes: Note[] = Array.from({ length: 5 }, () => ({
    note: faker.lorem.sentence(),
}));

const mockReadingStats: ReadingStats = {
    hoursThisMonth: faker.number.int({ min: 1, max: 100 }),
};

export const getMockRecentBooks = async (): Promise<Book[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(mockBooks), 1000);
    });
};

export const getMockLatestNotes = async (): Promise<Note[]> => {
    return new Promise((resolve) => resolve(mockNotes));
};

export const getMockReadingStats = async (): Promise<ReadingStats> => {
    return new Promise((resolve) => resolve(mockReadingStats));
};
