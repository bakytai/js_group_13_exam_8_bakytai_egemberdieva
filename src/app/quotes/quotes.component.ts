import { Component } from '@angular/core';
@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent {
  category = ['All' ,'star-wars', 'famous-people', 'saying', 'humor', 'motivational'];

  constructor() { }

}
