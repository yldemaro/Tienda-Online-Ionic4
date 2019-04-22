import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetallesProductoPage } from './detalles-producto.page';
import { DetallesResolver } from './detalles.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      data: DetallesResolver
    },
    component: DetallesProductoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetallesProductoPage],
  providers: [DetallesResolver]
})
export class DetallesProductoPageModule { }
