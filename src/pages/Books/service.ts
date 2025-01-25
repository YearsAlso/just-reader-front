import { Book } from "../../repository/data";
import BookRepository from '../../repository/BooksRepository';

const bookRepository = new BookRepository();

export async function getBooks(): Promise<Book[]> {
  // TODO: 使用
  return bookRepository.findAll();
}
