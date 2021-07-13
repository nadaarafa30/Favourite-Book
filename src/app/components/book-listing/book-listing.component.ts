import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from './../../data-model/book';

@Component({
  selector: 'app-book-listing',
  templateUrl: './book-listing.component.html',
  styleUrls: ['./book-listing.component.scss']
})
export class BookListingComponent {
  @Input() books: Book[];
  @Output() removeBook: EventEmitter<Book> = new EventEmitter();
  @Output() swapBooks: EventEmitter<{ startIndex: number, endIndex: number }> = new EventEmitter();
  removeBookItem(item: Book): void {
    this.removeBook.emit(item);
  }
  swapBook(start: number, end: number): void {
    this.swapBooks.emit({ startIndex: start, endIndex: end });
  }

}
