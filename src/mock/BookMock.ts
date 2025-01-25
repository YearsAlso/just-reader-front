import {faker} from "@faker-js/faker";
import {Book} from "../repository/data";

class BookMock {
    mockBook = (): Book => {
        return {
            bookName: faker.lorem.words(3),
            title: faker.lorem.sentence(),
            author: faker.person.firstName(),
            createdAt: faker.date.past(),
            sort: faker.number.int(),
            id: faker.string.uuid(),
            cover: faker.image.url({width: 200, height: 300}),
        }
    }

    public findAll = async (): Promise<Book[]> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(Array.from({length: 26}, () => this.mockBook())), 1000);
        });
    }

    public findById = async (id: string): Promise<Book | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.mockBook()), 1000);
        });
    }

    public create = async (book: Book): Promise<Book> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(book), 1000);
        });
    }

    public update = async (id: string, book: Book): Promise<Book | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(book), 1000);
        });
    }

    public delete = async (id: string): Promise<void> => {
        return new Promise((resolve) => {
            setTimeout(() => resolve(), 1000);
        });
    }
}


