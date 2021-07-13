import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Book } from 'src/app/data-model/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {
   public isCollapsed: boolean;
   public bookForm: FormGroup;
   public submitted: boolean;
  @Output() resetBooks: EventEmitter<boolean> = new EventEmitter();
  @Output() addBooks: EventEmitter<Book> = new EventEmitter();
  constructor(private formBuilder: FormBuilder) {
  }
  ngOnInit(): void {
    this.isCollapsed = false;
    this.submitted = false;
    this.bookForm = this.formBuilder.group({
      book_title: ['', Validators.required],
      author_name: ['', Validators.required],
      year: ['', [Validators.required,
      Validators.maxLength(4),
      Validators.pattern(/^\d+$/)]]
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.bookForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    this.addBooks.emit(this.bookForm.value);
    this.onReset();
    this.isCollapsed = false;
  }
  onReset(): void {
    this.submitted = false;
    this.bookForm.reset();
  }
  resetFavoritList(): void {
    this.resetBooks.emit(true);
  }
}
