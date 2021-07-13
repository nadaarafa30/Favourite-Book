import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from './../data-model/book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookList: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(null);
  private allBookList: Book[];
  constructor() {
    this.allBookList = [
      { book_title: 'Dune', year: '1965', author_name: 'Frank Herbert' },
      { book_title: 'Ender\'s Game', year: '1985', author_name: 'Orson Scott Card' },
      { book_title: '1984', year: '1949', author_name: 'George Orwell' }
    ];
    this.bookList.next(this.allBookList);
  }
  public addBook(value: Book): void {
    this.allBookList.push(value);
    this.bookList.next(this.allBookList);
  }
  public removeBook(book: Book): void {
    this.allBookList = this.allBookList.filter(item => (item.book_title !== book.book_title) && (item.author_name !== book.author_name));
    this.bookList.next(this.allBookList);
  }
  public swapBook(index: { startIndex: number, endIndex: number }): void {
    [this.allBookList[index.startIndex], this.allBookList[index.endIndex]] =
      [this.allBookList[index.endIndex], this.allBookList[index.startIndex]];
    this.bookList.next(this.allBookList);
  }
  public resetBooks(): void {
    this.allBookList = [];
    this.bookList.next(this.allBookList);
  }
  public getValue(): Observable<Book[]> {
    return this.bookList.asObservable();
  }
}
