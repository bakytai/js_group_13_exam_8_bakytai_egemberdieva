import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuotesModel } from '../shared/quotes.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-quotes',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  categoryName!: string;
  userText!: string;
  authorName!: string;
  idQuotes!: string;
  title!: string;

  constructor(public http: HttpClient, public route: ActivatedRoute, private routeService: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.idQuotes = id;
      if (this.idQuotes) {
        this.title = 'Edit this post';
        this.http.get<QuotesModel>(`https://plovo-13-default-rtdb.firebaseio.com/quotes/${id}.json`)
          .pipe(map(quotes => {
            return new QuotesModel(quotes.id, quotes.category, quotes.author, quotes.text);
          }))
          .subscribe(quote => {
            this.authorName= quote.author;
            this.userText = quote.text;
            this.categoryName = quote.category;
          });
      } else {
        this.title = 'Add new post';
      }
    });
  }

  createQuote() {
    const category = this.categoryName;
    const author = this.authorName;
    const text = this.userText;
    const body = {category, author, text};

    if (this.idQuotes) {
      this.http.put(`https://plovo-13-default-rtdb.firebaseio.com/quotes/${this.idQuotes}.json`, body).subscribe();
      this.http.get<{[id: string]: QuotesModel}>('https://plovo-13-default-rtdb.firebaseio.com/quotes.json').subscribe();
      void this.routeService.navigate(['/']);
    } else {
      this.http.post('https://plovo-13-default-rtdb.firebaseio.com/quotes.json', body).subscribe();
    }
  }
}
