import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { SearchResolver } from './search.resolve';
import { SearchPage } from './search.page';
import { SearchPipeModule } from '../pipes/search.module';

const routes: Routes = [
  {
    path: '',
    resolve: {
      data: SearchResolver
    },
    component: SearchPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SearchPipeModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SearchPage],
  providers: [SearchResolver]
})
export class SearchPageModule { }
