import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsuariosListarComponent} from "./components/usuarios-listar/usuarios-listar.component";
import {UsuariosIngresarComponent} from "./components/usuarios-ingresar/usuarios-ingresar.component";
import {UsuariosRegistrarComponent} from "./components/usuarios-registrar/usuarios-registrar.component";

import { UsuariosPrincipalComponent } from "./components/usuarios-principal/usuarios-principal.component";
import { UsuariosHomeComponent } from "./components/usuarios-home/usuarios-home.component";

import {UsuariosBuscadorAvanzadoComponent} from "./components/usuarios-buscador-avanzado/usuarios-buscador-avanzado.component";

import {UsuariosPerfilComponent} from "./components/usuarios-perfil/usuarios-perfil.component";
import {UsuariosAnimalComponent} from "./components/usuarios-animal/usuarios-animal.component";


import {AuthGuard} from './auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'usuarios/principal',
		pathMatch: 'full'
	},
	{
		path: 'usuarios/listar',
		component: UsuariosListarComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/ingresar',
		component: UsuariosIngresarComponent
	},
	{
		path: 'usuarios/registrar',
		component: UsuariosRegistrarComponent
	},
	{
		path: 'usuarios/principal',
		component: UsuariosPrincipalComponent
	},
	{
		path: 'usuarios/home',
		component: UsuariosHomeComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/buscador-avanzado',
		component: UsuariosBuscadorAvanzadoComponent,
	},
	{
		path: 'usuarios/perfil/:id',
		component: UsuariosPerfilComponent,
		canActivate: [AuthGuard]
	},
	{
		//Este se borra cuando hayamos hecho q se listen los animales del respectivo usuario
		path: 'usuarios/animal',
		component: UsuariosAnimalComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'usuarios/animal/:id',
		component: UsuariosAnimalComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
