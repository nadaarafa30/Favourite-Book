import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksService } from './../../services/books.service';
import { Book } from './../../data-model/book';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnDestroy {
  private subscription: Subscription;
  public listBooks: Book[];
  constructor(private bookService: BooksService) {
    this.subscription = this.bookService.getValue().subscribe(data => {
      this.listBooks = data;
    });
  }
  removeBook(book: Book): void {
    this.bookService.removeBook(book);
  }
  addBook(book: Book): void {
    this.bookService.addBook(book);
  }
  swapBooks(index: { startIndex: number, endIndex: number }): void {
    this.bookService.swapBook(index);
  }
  resetAll(reset: boolean): void {
    if (reset) {
      this.bookService.resetBooks();
    }
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
