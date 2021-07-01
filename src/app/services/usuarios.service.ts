import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Animal } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


//

//

@Injectable({
	providedIn: 'root'
})
export class UsuariosService {
	API_URI = 'https://adogtame-servidor.herokuapp.com/user';
  //API_URI = 'http://localhost:3000/user';

	constructor(private http: HttpClient, private router:Router) { }

	//Para comprobar si esta logueado el usuario
	 logued$ = new EventEmitter<string>();

	//Para comprobar si esta en principal, sino no esta la busqueda rapida


	revelarBusquedaRapida$ = new EventEmitter<string>();
	revelarBusquedaRapida: boolean = false;

	user = { id: ""};

	//cesar Jueves
	coment$ = new EventEmitter<string>();
	likes$ = new EventEmitter<string>();



	rol$ = new EventEmitter<string>();
	rol: any = "";


	//
	listarUsuarios() {
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/list`);
		//si no funciona usar
		//return this.http.get(this.API_URI+'/list');
	}

	listarAnimales() {
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/listAnimals`);
		//si no funciona usar
		//return this.http.get(this.API_URI+'/list');
	}

	listarAnimalesDelUsuario(id: string) {
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto
		return this.http.get(`${this.API_URI}/listAnimalsUser/${id}`);
		//si no funciona usar
		//return this.http.get(this.API_URI+'/list');
	}

	buscarUsuario(id: string) {
		return this.http.get(`${this.API_URI}/find/${id}`);
	}

	buscarAnimal(id: string) {
		return this.http.get(`${this.API_URI}/findAnimal/${id}`);
	}

	guardarUsuario(usuario: Usuario) {
		return this.http.post(`${this.API_URI}/create`, usuario);
	}

	eliminarUsuario(id: string) {
		return this.http.delete(`${this.API_URI}/delete/${id}`);
	}

	actualizarUsuario(id: string, actualizaUsuario: Usuario): Observable<Usuario> {
		return this.http.put(`${this.API_URI}/update/${id}`, actualizaUsuario);
	}

	ingresar(usuario: any) {
		return this.http.post(`${this.API_URI}/signin`, usuario);
	}

	registrar(usuario: any) {
		this.user = usuario;
		return this.http.post(`${this.API_URI}/signup`, usuario);

	}
	
	verificar(token: any) {
		return this.http.get(`${this.API_URI}/confirmar/${token}`);
	}

	registrarAnimal(animal: any, id: string) {
		animal.idDador=id;
		console.log(animal.idDador)
		return this.http.post(`${this.API_URI}/signupAnimal`, animal);
	}

	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}


	logOut(){

		this.user = { id: "" };
		localStorage.removeItem('token');
		this.router.navigate(['usuarios/principal']);
	}


	getToken(){//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}

	decodificarToken(token: any) {

		console.log({message:"tokenAngular "+token});

		return this.http.post(`${this.API_URI}/dToken`, token);

	}


	//Cesar Jueves
	agregarComentario(comentario: any) {
		return this.http.post(`${this.API_URI}/comentario`, comentario);
	}


	listarComentarios(id: string) {
		return this.http.get(`${this.API_URI}/listComentarios/${id}`);

	}

	listarUsuariosLikes(id: string) {
		return this.http.get(`${this.API_URI}/listUsuariosLikes/${id}`);

	}


	actualizarComentarioLikeDislike(idComentario: string, usuario: any): Observable<Usuario> {
		return this.http.put(`${this.API_URI}/updateLikeDislikeComentario/${idComentario}`, usuario);
	}







	eliminarComentario(id: string) {
		return this.http.delete(`${this.API_URI}/deleteComentario/${id}`);
	}


}
