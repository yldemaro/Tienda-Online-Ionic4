import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { ProductosResolver } from './productos.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      data: ProductosResolver
    },
    component: ProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage],
  providers: [ProductosResolver]
})
export class ProfilePageModule { }
