import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { QuotesModel } from '../../shared/quotes.model';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quotes-of-category',
  templateUrl: './quotes-of-category.component.html',
  styleUrls: ['./quotes-of-category.component.css']
})
export class QuotesOfCategoryComponent implements OnInit {
  quotes!: QuotesModel[];
  categoryName!: string;
  urlQuotes!: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private routerService: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];
      this.categoryName = id;
      if (id === 'all') {
        this.urlQuotes = 'https://plovo-13-default-rtdb.firebaseio.com/quotes.json';
      } else {
        this.urlQuotes = `https://plovo-13-default-rtdb.firebaseio.com/quotes.json?orderBy="category"&equalTo="${this.categoryName}"`;
      }

      this.http.get<{[id: string]: QuotesModel}>(this.urlQuotes)
        .pipe(map(result => {
          return Object.keys(result).map(id => {
            const quotes = result[id];
            return  new QuotesModel(id, quotes.category, quotes.author, quotes.text);
          });
        }))
        .subscribe(quotes => {
          this.quotes = quotes;
        });

    });
  }

  deleteThisQuotes(idOfQuotes: string) {
    void this.routerService.navigate(['/']);
    this.http.delete(`https://plovo-13-default-rtdb.firebaseio.com/quotes/${idOfQuotes}.json`).subscribe();
    this.http.get<{[id: string]: QuotesModel}>('https://plovo-13-default-rtdb.firebaseio.com/quotes.json').subscribe();
  }
}
