import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/usuarioModel';
import { Animal } from '../models/usuarioModel';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


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




  //Una cagada pero tengo q hacer estos emitt porq sino la base dice
  //q hay demasiadas cosas cargando al mismo tiempo

  //Componente usuarios-animal
	cargarAnimalDatos$ = new EventEmitter<string>();
	cargarAnimalIntereses$ = new EventEmitter<string>();
	cargarTerminado$ = new EventEmitter<string>();
	cargarAnimalEstado$ = new EventEmitter<string>();


	//

	//admin


	rol$ = new EventEmitter<string>();
	rol: any = "";


//Notificaciones - Navigations

	//
	notificacionesListar(id: string) {

		//Buscar los id de los animales del usuario logueado
		return this.http.get(`${this.API_URI}/notificacionesListar/${id}`);

	}

	//El obsevable de navigations
	notificaciones$ = new EventEmitter<string>();

	notificacionesConteo(id: string) {

		//Buscar los id de los animales del usuario logueado
		return this.http.get(`${this.API_URI}/notificacionesConteo/${id}`);

	}

	notificacionesVistas(id: string) {

		//Buscar los id de los animales del usuario logueado
		return this.http.get(`${this.API_URI}/notificacionesVistas/${id}`);

	}


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

	listarAnimalesAdoptados() {
		return this.http.get(`${this.API_URI}/listarAnimalesAdoptados`);
	}

  listarAnimalesSinAdoptar() {
		return this.http.get(`${this.API_URI}/listarAnimalesSinAdoptar`);
	}

  fechaAdoptados(){
    return this.http.get(`${this.API_URI}/fechaAdoptados`);
  }

	listarAnimalesFiltrado(filtro: any) {
		//para expandir/especializar las variables usamos ` y no ' o "
		//Las variables salen pintadas de otro color diferente del de texto

		console.log({message:"filtro: ", filtro});
		return this.http.post(`${this.API_URI}/listAnimalsFiltrado`, filtro);
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

	listarAnimalesDelUsuarioAdoptados(id: string) {
		return this.http.get(`${this.API_URI}/listAnimalsUserAdoptados/${id}`);
	}

	listarAnimalesDelUsuarioEnAdopcion(id: string) {
		return this.http.get(`${this.API_URI}/listAnimalsUserEnAdopcion/${id}`);
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

    recoverPassword(email: any) {
        console.log('email => ', email);
        let emailToSend = '{ "email": "'+email+ '" }';
        let emailJsoned = JSON.parse(emailToSend);
        return this.http.post(`${this.API_URI}/password-recovery`, emailJsoned);
    }

    newPassword(token: any, password: any) {
        console.log('token => ', token);
        console.log('password => ', password);
        let passToSend = '{ "newPassword": "'+password+ '" }';
        let passJsoned = JSON.parse(passToSend);
        return this.http.post(`${this.API_URI}/new-password/${token}`, passJsoned,  { headers: {'reset': token}});
    }

	registrarAnimal(animal: any, id: string) {
		animal.idDador=id;
		console.log(animal.idDador)
		return this.http.post(`${this.API_URI}/signupAnimal`, animal);
	}

	//Dar en adopcion
	comenzarAdopcion(idAnimal: string, idUsuario: string) {
		const adopcionData={id_animal: idAnimal, id_usuario: idUsuario}
		return this.http.post(`${this.API_URI}/comenzarAdopcion`, adopcionData);
	}

	confirmarAdopcion(idAnimal: string, idUsuario: object) {
		return this.http.post(`${this.API_URI}/confirmarAdopcion/${idAnimal}`, idUsuario);
	}

	//Cancelar adopcion
	cancelarProcesoAdopcion(idAnimal: string) {
		return this.http.delete(`${this.API_URI}/cancelarProcesoAdopcion/${idAnimal}`);
	}


	//Sacar el estado del Animal


	estadoAnimal(idAnimal: string) {

		return this.http.get(`${this.API_URI}/estadoAnimal/${idAnimal}`);

	}

	//


	//Interes
	mostrarInteres(idAnimal: string, idInteresado: object) {
		return this.http.post(`${this.API_URI}/mostrarInteres/${idAnimal}`, idInteresado);
	}

	quitarInteres(idAnimal: string, idInteresado: object) {
		return this.http.post(`${this.API_URI}/quitarInteres/${idAnimal}`, idInteresado);
	}

	cargarInteres(idAnimal: string, idUsuario: object) {
		return this.http.post(`${this.API_URI}/cargarInteres/${idAnimal}`, idUsuario);
	}


	cargarInteresados(idAnimal: string) {

		console.log("cargarInteresados ");
		return this.http.get(`${this.API_URI}/cargarInteresados/${idAnimal}`);
	}



	// //
	listarAnimalesConInteres() {
	 	//Sacar los animales a los q le diste interes y cargarlos a tu perfil
	 	return this.http.get(`${this.API_URI}/listarAnimalesConInteres`);
	}

	siguiendoAnimales(idUsuario: string) {

		console.log("cargar animales siguiendo");
		return this.http.get(`${this.API_URI}/siguiendoAnimales/${idUsuario}`);
	}



	//


	isLoggedIn():Boolean{
		return !!localStorage.getItem('token'); //Si existe token retorna true
		//es el equivalente de testearlo con if pero ahora en una sola linea.
	}


	logOut(){

		this.user = { id: "" };
		localStorage.removeItem('token');
		this.router.navigate(['usuarios/buscador-avanzado']);
	}


	getToken(){//Obtenemos el token que despues enviara el interceptor x cada req
		return localStorage.getItem('token');
	}

	decodificarToken(token: any) {

		console.log({message:"tokenAngular "+token});

		return this.http.post(`${this.API_URI}/dToken`, token);

	}


	eliminarComentario(id: string) {
		return this.http.delete(`${this.API_URI}/deleteComentario/${id}`);
	}


	//Editar datos



	editarPerfil(actualizarUsuario: Usuario, id: string): Observable<Usuario> {
		return this.http.put(`${this.API_URI}/updateDataUsuario/${id}`, actualizarUsuario);
	}

	traerVacunasAnimal(id: string){
		return this.http.get(`${this.API_URI}/traerVacunasAnimal/${id}`);
	}

	modificarVacunasAnimal(vacunas: any, id: string){
		return this.http.put(`${this.API_URI}/modificarVacunasAnimal/${id}`, vacunas);
	}

	modificarDatosAnimal(animal: Animal, id: string): Observable<Usuario> {
		console.log("id", id);
		return this.http.put(`${this.API_URI}/modificarDatosAnimal/${id}`, animal);
	}

	/*

	cantidadInteresados(cantidad: any){
		return this.http.get(`${this.API_URI}/cantidadInteresados/${cantidad}`);
	}
	*/


  cantidadUsuariosRegistrados(){
    return this.http.get(`${this.API_URI}/cantidadUsuariosRegistrados`);
  }

  cantidadAnimalesRegistrados(){
    return this.http.get(`${this.API_URI}/cantidadAnimalesRegistrados`);
  }

  cantidadAnimalesAdoptados(){
    return this.http.get(`${this.API_URI}/cantidadAnimalesAdoptados`);
  }

  cantidadAnimalesEnAdopcion(){
    return this.http.get(`${this.API_URI}/cantidadAnimalesEnAdopcion`);
  }

  promedioAnimalesAdoptados(){
    return this.http.get(`${this.API_URI}/promedioAnimalesAdoptados`);
  }
}
