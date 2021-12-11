import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-quotes',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  categoryName!: string;
  userText!: string;
  authorName!: string;

  constructor(public http: HttpClient) { }

  ngOnInit(): void {
  }

  createQuote() {
    const category = this.categoryName;
    const author = this.authorName;
    const text = this.userText;
    const body = {category, author, text};

    this.http.post('https://plovo-13-default-rtdb.firebaseio.com/quotes.json', body).subscribe();
  }
}
