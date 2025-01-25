import {Book} from "./data";
import defaultDbConnector from "./DefaultDbConnector.ts";
import PageDto from "../dto/PageDto.ts";
import SearchDto from "../dto/SearchDto.ts";

class BooksRepository {
    private books: Book[] = [];

    public async create(book: Book): Promise<Book> {
        const db = await defaultDbConnector.getDB();
        this.books.push(book);
        await db?.execute("INSERT INTO t_books (id, title, author, description, cover) VALUES (?, ?, ?, ?, ?)",
            [book.id, book.title, book.author, book.description, book.cover]
        );
        return book;
    }

    public async delete(id: string): Promise<void> {
        const db = await defaultDbConnector.getDB();
        this.books = this.books.filter(book => book.id !== id);
        await db?.execute("DELETE FROM t_books WHERE id = ?", [id]);
    }

    public async findAll(): Promise<Book[]> {
        const db = await defaultDbConnector.getDB();
        const result = await db?.select<Book[]>("SELECT * FROM t_books");
        if (!result) {
            return [];
        }

        return result;
    }

    public async findById(id: string): Promise<Book | undefined> {
        const db = await defaultDbConnector.getDB();
        const result = await db?.select<Book[]>("SELECT * FROM t_books WHERE id = ?", [id]);
        if (!result) {
            return undefined;
        }

        return result[0];
    }

    public async update(id: string, book: Book): Promise<Book | undefined> {
        const index = this.books.findIndex(book => book.id === id);
        if (index !== -1) {
            this.books[index] = book;
            return book;
        }
        return undefined;
    }

    async findPaginated(pageDto: PageDto, searchDto: SearchDto): Promise<Book[] | undefined> {
        const db = await defaultDbConnector.getDB();
        const {page, size} = pageDto;
        const {sortBy, desc} = searchDto;
        const result = await db?.select<Book[]>(
            "SELECT * FROM t_books LIMIT $1 OFFSET $2 ORDER BY $3 $4",
            [
                size,
                (page - 1) * size,
                sortBy || "id",
                desc ? "DESC" : "ASC"
            ]
        );

        if (!result) {
            return undefined;
        }

        return result;
    }
}

export default BooksRepository;
