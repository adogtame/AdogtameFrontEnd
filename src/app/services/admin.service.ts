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
export class AdminService {
	API_URI = 'https://adogtame-app.herokuapp.com/user';
  //API_URI = 'http://localhost:3000/user';


  /*
  ---------------------------------

  Para crear un nuevo service: 

  ng generate service services/nombreservicio

  ---------------------------------

  Para crear un nuevo componente: 

  ng generate component components/usuarios-nombrecomponente
  ng generate component components/admin-nombrecomponente

  ---------------------------------








  */


	constructor(private http: HttpClient, private router:Router) { }
	










  eliminarComentario(id: string) {
		return this.http.delete(`${this.API_URI}/deleteComentario/${id}`);
	}





  //













}
