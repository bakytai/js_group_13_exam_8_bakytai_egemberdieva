import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuotesComponent } from './add-quotes/add-quotes.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuotesOfCategoryComponent } from './quotes/quotes-of-category/quotes-of-category.component';

const routes: Routes = [
  {path: '', component: QuotesComponent},
  {path: 'quotes', component: QuotesComponent, children: [
      {path: ':id', component: QuotesOfCategoryComponent},
    ]},
  {path: 'add', component: AddQuotesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
