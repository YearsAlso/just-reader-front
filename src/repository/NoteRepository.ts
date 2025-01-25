import defaultDbConnector from "./DefaultDbConnector.ts";
import {Note} from "./data";
import PageDto from "../dto/PageDto.ts";
import SearchDto from "../dto/SearchDto.ts";

class NoteRepository {

    async create(note: Note): Promise<Note> {
        const db = await defaultDbConnector.getDB();
        await db?.execute("INSERT INTO t_notes (id, content) VALUES (?, ?)", [note.id, note.content]);
        return note;
    }

    async delete(id: string): Promise<void> {
        const db = await defaultDbConnector.getDB();
        await db?.execute("DELETE FROM t_notes WHERE id = ?", [id]);
    }

    async findAll(): Promise<Note[]> {
        const db = await defaultDbConnector.getDB();
        const result = await db?.select<Note[]>("SELECT * FROM t_notes");
        if (!result) {
            return [];
        }

        return result;
    }

    async findById(id: string): Promise<Note | undefined> {
        const db = await defaultDbConnector.getDB();
        const result = await db?.select<Note[]>("SELECT * FROM t_notes WHERE id = $1", [id]);
        if (!result) {
            return undefined;
        }

        return result[0];
    }

    async update(id: string, note: Note): Promise<Note | undefined> {
        const db = await defaultDbConnector.getDB();
        await db?.execute("UPDATE t_notes SET content = $1 WHERE id = $2", [note.content, id]);
        return note;
    }

    async findPaginated(pageDto: PageDto, searchDto: SearchDto): Promise<Note[] | undefined> {
        const db = await defaultDbConnector.getDB();
        const {page, size} = pageDto;
        const {sortBy, desc} = searchDto;
        const result = await db?.select<Note[]>(
            "SELECT * FROM t_notes LIMIT $1 OFFSET $2 ORDER BY $3 $4",
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

export default NoteRepository;
