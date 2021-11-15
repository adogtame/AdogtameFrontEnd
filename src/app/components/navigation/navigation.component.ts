import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
//import { Subscription } from 'rxjs';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

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
          'min-height': '9em',
        })
      ),
      transition('showNoti => noShowNoti', [
        animate('0s')
      ]),
      transition('noShowNoti => showNoti', [
        animate('0s')
      ])
    ]),
    trigger('clickPerfil', [
      state('noShowPerfil',
        style({
          display: 'none',
          height: '0px'
        })
      ),
      state('showPerfil',
        style({
          display: 'block',
          'min-height': '4em',
        })
      ),
      transition('showPerfil => noShowPerfil', [
        animate('0s')
      ]),
      transition('noShowPerfil => showPerfil', [
        animate('0s')
      ])
    ]),
    trigger('clickAnimals', [
      state('noShowAnimals',
        style({
          display: 'none',
          height: '0px'
        })
      ),
      state('showAnimals',
        style({
          display: 'block',
          'min-height': '2em',
        })
      ),
      transition('showAnimals => noShowAnimals', [
        animate('0s')
      ]),
      transition('noShowAnimals => showAnimals', [
        animate('0s')
      ])
    ]),
  ]
})

export class NavigationComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router, private rutaActiva: ActivatedRoute) { }
  token: any = "";
  UsuarioID: any = { user: "No logueado" };
  Usuario: any = [];
  idUsuario: string = "";
  TokenJSON = { token: "" };
  //Revela y oculta botones si esta logueado el usuario
  revelar: boolean = false;
  revelarBusRapida: boolean = this.usuariosService.revelarBusquedaRapida;
  // public user$: Observable<any>= this.revelar
  //nombreSubscription: Subscription | any;

  //

  //abrir dropdowns  
  isOpenAnimals: boolean = false;  
  isOpenPerfil: boolean = false;

  //Cargaron mis animales
  
  animalesCargados: boolean = false;


  //Notificacion
  notificacion: boolean = false;
  isOpenNoti: boolean = false;
  notificacionesInteresados: any = [];
  notificacionesContador: any = [];
  notificacionesCargadas: boolean = false;

  //ubi para saber como hacer la img del firebase
  ubiUsuarioPerfil1: string = "PerfilNavUsuarioPerfil1";
  ubiUsuarioPerfil2: string = "PerfilNavUsuarioPerfil2";
  ubi2AnimalUsuario: string = "PerfilNavAnimalUsuario";
  ubiI: string = "NavNotiI";
  ubiA: string = "NavNotiA";
  cargoID: boolean = false;

  // admin
  rol: any = "";
  animales: any = [];


  ngOnInit(): void {

    this.logueado();

    this.usuariosService.logued$.subscribe(log => {
      this.revelar = true;
      this.sacarUsuario();
    });


    this.usuariosService.revelarBusquedaRapida$.subscribe(log => {
      this.revelarBusRapida = this.usuariosService.revelarBusquedaRapida;
    });

    this.usuariosService.notificaciones$.subscribe(log => {
      this.notificacionesConteo();

    });


		document.addEventListener('mouseup', (e) => {
			
      var container2: any = document.getElementById('campanita');
			if (container2.contains(e.target)) {
				this.isOpenNoti=!this.isOpenNoti;
			}
			else{
				var container: any = document.getElementById('notificaciones');
				if (!container.contains(e.target)) {
					this.isOpenNoti=false;
				}
			}


      var container3: any = document.getElementById('perfilDropdownBoton');
			if (container3.contains(e.target)) {
				this.isOpenPerfil=!this.isOpenPerfil;
			}
			else{
				var container4: any = document.getElementById('perfilDropdownContenido');
				if (!container4.contains(e.target)) {
					this.isOpenPerfil=false;
				}
			}



      var container5: any = document.getElementById('animalsDropdownBoton');
			if (container5.contains(e.target)) {
				this.isOpenAnimals=!this.isOpenAnimals;
			}
			else{
				var container6: any = document.getElementById('animalsDropdownContenido');
				if (!container6.contains(e.target)) {
					this.isOpenAnimals=false;
				}
			}

		});



    
    

  }




  ngOnDestroy(): void {

    this.token = "";
    this.UsuarioID = { user: "No logueado" };
    this.Usuario = [];
    this.idUsuario = "";
    this.TokenJSON = { token: "" };
    //Revela y oculta botones si esta logueado el usuario
    this.revelar = false;
    this.revelarBusRapida = false;
    // public user$: Observable<any>= this.revelar
    //nombreSubscription: Subscription | any;
  
  
    //abrir dropdowns  
    this.isOpenAnimals = false;  
    this.isOpenPerfil = false;
  
    //Cargaron mis animales
    
    this.animalesCargados = false;
  
  
    //Notificacion
    this.notificacion = false;
    this.isOpenNoti = false;
    this.notificacionesInteresados = [];
    this.notificacionesContador = [];
    this.notificacionesCargadas = false;
  
    this.rol = "";
    this.animales = [];
  



  }







  logout() {
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.usuariosService.logOut();
    this.revelar = false;
    this.UsuarioID = { user: "No logueado" };
    this.usuariosService.user.id = "";
    this.Usuario = [];

    //Cargaron mis animales
    
    this.animalesCargados = false;
	this.isOpenPerfil = false;
	this.isOpenAnimals = false;  
  
    //Notificacion
    this.notificacion = false;
    this.isOpenNoti = false;
    this.notificacionesInteresados = [];
    this.notificacionesContador = [];
    this.notificacionesCargadas = false;
  
    this.rol = "";
    this.animales = [];
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
						this.cargoID=true;
						this.rol = this.Usuario.tipo_perfil;
						this.usuariosService.rol = this.Usuario.tipo_perfil;
						console.log("El rol del usuario es", this.usuariosService.rol);
						console.log(this.Usuario);
						
            
            //Activar noti
						this.usuariosService.notificaciones$.emit()

					},
					err => console.log(err)
				);
				console.log("ID del usu", this.UsuarioID);
			},
			err => console.log(err)
		);
	}



  irAPerfil() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuarios/perfil/', this.Usuario.id]);
    });
  }


  notificacionesConteo() {

    this.usuariosService.notificacionesConteo(this.UsuarioID.user).subscribe(
      res => {
        this.notificacionesContador = res;
        console.log(res)
        console.log("Notificaciones Contador", this.notificacionesContador.SumCount)


        if (this.notificacionesContador.SumCount > 0) {

          this.notificacion = true;
        }
        else {

          this.notificacion = false;
        }



      },
      err => console.log(err)
    );

  }

  notificaciones() {

    if (this.notificacionesCargadas == false) {


      this.usuariosService.notificacionesListar(this.UsuarioID.user).subscribe(
        res => {

          console.log(res)
          this.notificacionesInteresados = res;

          this.notificacionesCargadas = true;
        },
        err => console.log(err)
      );
      console.log(this.UsuarioID.user);




    }



    if (this.notificacion == true) {

      setTimeout(() => {

        this.usuariosService.notificacionesVistas(this.UsuarioID.user).subscribe(
          res => {


            this.notificacion = false;
            console.log("Notificaciones", this.notificacion);

          },
          err => console.log(err)
        );

      }, 100)

    }




  }

  irAInteresado(idInteresado: string) {
    console.log("Ir al interesado de la notificacion", idInteresado);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuarios/perfil/', idInteresado]);
    });


  }

  irAAnimal(idAnimal: string) {

    console.log("Ir al animal de la notificacion", idAnimal);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuarios/animal/', idAnimal]);
    });



  }


  listarAnimalesDelUsuario() {

    //Aca pregunta si ya se cargo esto una vez
    //Hay q hacer q recargue la pagina cuando registre un animal nuevo el usuario porq sino no va a aparecer en el nav
    if (this.animalesCargados == false) {
      this.usuariosService.listarAnimalesDelUsuario(this.UsuarioID.user).subscribe(
        res => {
          this.animales = res;
          console.log("Animales", res);
          this.animalesCargados=true;
        },
        err => console.log(err)
      )
    }

    
 
  }

}
