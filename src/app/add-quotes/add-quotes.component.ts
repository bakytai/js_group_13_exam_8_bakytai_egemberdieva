import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-quotes',
  templateUrl: './add-quotes.component.html',
  styleUrls: ['./add-quotes.component.css']
})
export class AddQuotesComponent implements OnInit {
  category!: string;
  text!: string;
  author!: string;

  constructor() { }

  ngOnInit(): void {
  }

  createQuote() {

  }
}
