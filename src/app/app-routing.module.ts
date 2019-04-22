import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'details/:id', loadChildren: './details/details.module#DetailsPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'crearProducto', loadChildren: './crear-producto/crear-producto.module#CrearProductoPageModule' },
  { path: 'detallesProducto/:id', loadChildren: './detalles-producto/detalles-producto.module#DetallesProductoPageModule' },
  { path: 'profile/:id', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'createProfile/:id', loadChildren: './create-profile/create-profile.module#CreateProfilePageModule' },
  { path: 'updatePerfil/:id', loadChildren: './update-perfil/update-perfil.module#UpdatePerfilPageModule' },
  { path: 'search', loadChildren: './search/search.module#SearchPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
