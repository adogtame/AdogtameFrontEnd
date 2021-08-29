import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
//import { Subscription } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';

//Animations (Dropdown)
import {
	trigger,
	state,
	style,
	animate,
	transition,  
	
	query,
	sequence,
	stagger,
	// ...
  } from '@angular/animations';
  //


@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css'],
	
	animations: [

		trigger('clickNoti', [
		  state('noShowNoti', 
			style({ 
			 
			  display: 'none',
			  height: '0px'
   
			})
		  ),
		  state('showNoti', 
			style({ 
			 display: 'block', 
			 
			 'min-height':'10em',
   
   
			 })
		  ),
		  transition('showNoti => noShowNoti', [
			animate('0s')
		  ]),
		  transition('noShowNoti => showNoti', [
			animate('0s')
		  ])
		]),
   
   
	]
})
export class NavigationComponent implements OnInit {

	constructor(private usuariosService: UsuariosService, private router: Router) { }


     
    




	token: any = "";
	UsuarioID: any = { user: "No logueado" };
	Usuario: any = [];
	TokenJSON = { token: "" };
	//Revela y oculta botones si esta logueado el usuario
	revelar: boolean = false;
	revelarBusRapida: boolean = this.usuariosService.revelarBusquedaRapida;
	// public user$: Observable<any>= this.revelar
	//nombreSubscription: Subscription | any;

	//Notificacion
	notificacion: boolean = false;
	isOpenNoti: boolean = false;
	notificacionesInteresados: any = [];



	// admin
	rol: any = "";
	//
	ngOnInit(): void {
		
		this.logueado();
		//this.nombreSubscription =
		this.usuariosService.logued$.subscribe(log => {
			this.revelar = true;
			this.sacarUsuario();
		});

		this.usuariosService.revelarBusquedaRapida$.subscribe(log => {
			this.revelarBusRapida = this.usuariosService.revelarBusquedaRapida;
		});


		this.usuariosService.notificaciones$.subscribe(log => {

			this.notificaciones();

		});
	
	
	}

	logout() {
		//Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
		this.usuariosService.logOut();
		this.revelar = false;

		this.UsuarioID = { user: "No logueado" };
		this.usuariosService.user.id = "";
		this.Usuario = [];
		
		//notificacion
		this.notificacion=false;
		this.notificacionesInteresados=[];	
		//this.nombreSubscription.unsubscribe();
	}

	logueado() {
		if (this.usuariosService.isLoggedIn()) {
			this.revelar = true;
			this.sacarUsuario();
		}
		else {
			this.revelar = false;
		}
	}

	sacarUsuario() {
		this.token = this.usuariosService.getToken();
		console.log(this.token);

		this.TokenJSON = { token: this.token };

		this.usuariosService.decodificarToken(this.TokenJSON).subscribe(
			res => {
				this.UsuarioID = res;
				console.log("Este es el id decodificado", this.UsuarioID);

				this.usuariosService.buscarUsuario(this.UsuarioID.user).subscribe(
					res => {
						this.Usuario = res
						console.log("Este es el id dasdasdsa", this.Usuario);
						this.usuariosService.user.id = this.Usuario.id;

						//Hay q mejorar esto, lo q hago es cargar el componente (Animal) 
						//despues de hacer este emit, porq aca es donde cargo al usuario
						
						//
						

						this.rol = this.Usuario.tipo_perfil;
						this.usuariosService.rol = this.Usuario.tipo_perfil;
						console.log("El rol del usuario es", this.usuariosService.rol);						
						console.log(this.Usuario);


						//Activar noti
						this.usuariosService.notificaciones$.emit()
						//


					},
					err => console.log(err)
				);
				console.log(this.UsuarioID.user);
			},
			err => console.log(err)
		);
	}

	irAPerfil() {
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
			this.router.navigate(['usuarios/perfil/', this.Usuario.id]);
		});
	}




	notificaciones() {

		this.usuariosService.notificacionesListarInteresadosDeAnimalNoVistos(this.UsuarioID.user).subscribe(
			res => {
				
				console.log(res)
				this.notificacionesInteresados=res;	

				if(this.notificacionesInteresados.length>0){

					this.notificacion=true;
				}
				else
				{
					
					this.notificacion=false;
				}

			},
			err => console.log(err)
		);
		console.log(this.UsuarioID.user);


		


		
	}

	irAInteresado(idInteresado: string) {


		console.log("Ir al interesado de la notificacion", idInteresado);
		
		this.router.navigate(['usuarios/perfil/', idInteresado]);
	}

	irAAnimal(idAnimal: string) {
		
		console.log("Ir al animal de la notificacion", idAnimal);
		
		this.router.navigate(['usuarios/animal/', idAnimal]);
	}


}

