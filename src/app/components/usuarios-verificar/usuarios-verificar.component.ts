import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-usuarios-verificar',
	templateUrl: './usuarios-verificar.component.html',
	styleUrls: ['./usuarios-verificar.component.css']
})
export class UsuariosVerificarComponent implements OnInit {

	token: string = "";
	UsuarioID: any;
	reintentar: boolean = false;
	mensaje: string = "";
	TokenJSON = { token: "" };

	constructor(private usuariosService: UsuariosService, private router: ActivatedRoute, private route: Router) { }

	ngOnInit(): void {
		console.log('Cliente -> verificando');

		//Obtengo el token desde el parametro de la URL que es enviada por email
		let token = this.router.snapshot.params.token;
		console.log('Cliente token => ', token);

		this.usuariosService.verificar(token).subscribe(
			res => {
				let result: any = res;
				
				console.log('Cliente res desde metodo verificar => ', result.message);
				if(result.message > 0){
					this.route.navigate(['usuarios/verificado']);
				} else {
					this.route.navigate(['usuarios/verificacionfallida']);
				}
			},
			err => {
				console.log(err);
			}
		);

		//Paso el token a una variable de tipo objeto para que jwt no me lo rechace y se produzca un error 500
		this.TokenJSON = { token : token };
		//Decodifico el token para obtener el id del usuario
		this.usuariosService.decodificarToken(this.TokenJSON).subscribe(
			res => {
				this.UsuarioID = res;
				console.log("Este es el id decodificado by Chris", this.UsuarioID);
				console.log(this.UsuarioID.user);
			},
			err => console.log(err)
		);
	}
}
