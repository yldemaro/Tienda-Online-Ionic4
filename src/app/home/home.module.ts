import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
import { HomeResolver } from './home.resolver';
import { AutoResolver } from './auto.resolver';
import { ViveresResolver } from './viveres.resolver';
import { TelefonosResolver } from './telf.resolver';
import { ElectrodomesticosResolver } from './elect.resolver';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    resolve: {
      inm: HomeResolver,
      aut: AutoResolver,
      vi: ViveresResolver,
      tel: TelefonosResolver,
      electr: ElectrodomesticosResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage],
  providers: [
    HomeResolver,
    AutoResolver,
    ViveresResolver,
    TelefonosResolver,
    ElectrodomesticosResolver
  ]
})
export class HomePageModule { }
