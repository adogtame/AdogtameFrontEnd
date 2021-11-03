import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

// Subir foto
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios-perfil',
  templateUrl: './usuarios-perfil.component.html',
  styleUrls: ['./usuarios-perfil.component.css']
})
export class UsuariosPerfilComponent implements OnInit, OnDestroy {

  animal = { idDador: "", nombre: "", sexo: "", tipo: "", fNac: "", tamano: "", peso: "" };
  Usuario: any = [];
  animales: any = [];
  animalesAdoptados: any = [];
  animalesEnAdopcion: any = [];
  UsuarioID: any = [];
  animalesSiguiendo: any = [];
  animalesInteresPendienteMe: any = [];
  animalesInteresAdoptadoMe: any = [];
  animalesInteresDisponible: any = [];
  animalesInteresPendienteAdoptadoOtro: any = [];
  toggleInformacion = true;
  toggleSiguiendo = false;
  toggleSeguidores = false;
  toggleAnimales = false;
  //Booleano para if si ya paso por ahi una vez
  siguiendoAnimCargado: boolean = false;

  //Mi usuario||Para comprobar si es el mismo q el del perfil
  miUsuario:any ="";


  // statusAnimales = 'Disable';
  //firebase
  ubi: string = "PerfilU";
  ubi2: string = "SiguiendoA";
  ubi3: string = "misAnimales";
  ubi4: string = "PerfilUAct";
  
  fechaAdoptado: any = [];
  AnimalID: any = [];
  Animal: any = [];
  siguienteIdAnimal: string = "0";
  actualizarId: Number = 0;

  datosNuevos={nombre:"vacio",apellido:"vacio",email:"vacio",nro_celular:"vacio"};

  errorNombre=0;
  errorApellido=0;
  errorEmail=0;
  errorCelular=0;

  /* Subir foto */
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;


  constructor(private usuariosService: UsuariosService, private router: Router, private rutaActiva: ActivatedRoute, private uploadService: FileUploadService) { }


  mensaje: string = "Vacio";
  mensajeEnviado: string = "";

  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {
      this.UsuarioID = this.rutaActiva.snapshot.params
      console.log("Estoy en el usuario", this.UsuarioID.id);
      this.usuarioCargarDatos();
      console.log("Usuario", this.UsuarioID);

    });

    this.tokenIdUsuario();
  
  	}


  ngOnDestroy(): void {
    console.log("Se cierra el usuario", this.UsuarioID.id);
    this.UsuarioID = [];
    this.Usuario = [];
    this.animalesSiguiendo = [];
    this.animalesInteresPendienteMe = [];
    this.animalesInteresAdoptadoMe = [];
    this.animalesInteresDisponible = [];
    this.animalesInteresPendienteAdoptadoOtro = [];
    this.miUsuario=[];
    console.log("Se cerro el usuario", this.UsuarioID.id);



  }


  tokenIdUsuario(){
    this.miUsuario = this.usuariosService.getToken();
		console.log(this.miUsuario);
		const TokenJSON = { token: this.miUsuario };
		this.usuariosService.decodificarToken(TokenJSON).subscribe(
			res => {
				this.miUsuario = res;
				this.miUsuario = this.miUsuario.user;
				console.log("Este es el id decodificado del usurio |Perfil usuario|", this.miUsuario);

			},
			err => console.log(err)
		);
  }
  //Botones menu de perfil

  Informacion() {



    this.toggleInformacion = true;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = false;


  }

  Siguiendo() {

    this.siguiendoAnimales();

    this.toggleInformacion = false;
    this.toggleSiguiendo = true;
    this.toggleSeguidores = false;
    this.toggleAnimales = false;


  }

  /* Esto no lo usamos por ahora, no hace nada.
  Seguidores() {



    this.toggleInformacion = false;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = true;
    this.toggleAnimales = false;


    //Limpiando arrays de siguiendo
    this.animalesSiguiendo = [];
    this.animalesInteresPendienteMe = [];
    this.animalesInteresAdoptadoMe = [];
    this.animalesInteresDisponible = [];
    this.animalesInteresPendienteAdoptadoOtro = [];
    // this.statusSeguidores = this.toggleSeguidores ? 'Enable' : 'Disable';

  }
  /**/

  Animales() {

    this.toggleInformacion = false;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = true;

  }



  //Perfil Tab de Informacion

  usuarioCargarDatos() {
    this.usuariosService.buscarUsuario(this.UsuarioID.id).subscribe(
      res => {
        this.Usuario = res
        console.log(this.Usuario);

        //Los datos q se van a reemplazar si hace un edit
        //this.datosNuevos=this.Usuario

      },
      err => console.log(err)
    );

    this.usuariosService.listarAnimalesDelUsuarioAdoptados(this.UsuarioID.id).subscribe(
      res => {
        this.animalesAdoptados = res;
        console.log(res);
      },
      err => console.log(err)
    )

    this.usuariosService.listarAnimalesDelUsuarioEnAdopcion(this.UsuarioID.id).subscribe(
      res => {
        this.animalesEnAdopcion = res;
        console.log(res);
      },
      err => console.log(err)
    )

  }

  editarPerfil(datosNuevos: any) {

    console.log("User del editar perfil", this.Usuario);
    console.log("datosNuevos del editar perfil cambios", datosNuevos);

		var nombresArray: any =["nombre","apellido","email","nro_celular"];
		let datosArray:any={};


    console.log(`Usuario dato 0`, this.Usuario[`${nombresArray[0]}`]);
    console.log("datosNuevos 0", datosNuevos[`${nombresArray[0]}`]);
    console.log("nombresArray.length", nombresArray.length);

    for (var i = 0; i < nombresArray.length; i++) {
      if(this.Usuario[`${nombresArray[i]}`]!=datosNuevos[`${nombresArray[i]}`] && datosNuevos[`${nombresArray[i]}`]!=null && datosNuevos[`${nombresArray[i]}`]!="vacio"){

        //
        console.log("i",  i);
        console.log("this.Usuario", [`${nombresArray[i]}`],this.Usuario[`${nombresArray[i]}`]);
        console.log("datosNuevos", [`${nombresArray[i]}`],datosNuevos[`${nombresArray[i]}`]);

        datosArray[`${nombresArray[i]}`]= datosNuevos[`${nombresArray[i]}`];



      }
    }

    console.log("datosArray que se guarda", datosArray);






    this.usuariosService.editarPerfil(datosArray, this.miUsuario).subscribe(
      res => {

        console.log(res);

        this.usuariosService.buscarUsuario(this.UsuarioID.id).subscribe(
          res => {
            this.Usuario = res
            console.log(this.Usuario);

            //Los datos q se van a reemplazar si hace un edit
            //this.datosNuevos=this.Usuario

          },
          err => console.log(err)
        );

        /*
        for (var i = 0; i < nombresArray.length; i++) {
          if(this.Usuario[`${nombresArray[i]}`]!=datosNuevos[`${nombresArray[i]}`] && datosNuevos[`${nombresArray[i]}`]!=null && datosNuevos[`${nombresArray[i]}`]!="vacio"){
            this.Usuario[`${nombresArray[i]}`]=datosNuevos[`${nombresArray[i]}`]
          }
        }

        /**/

        //this.adminService.abm$.emit();



      },
      err => {

        console.log(err.error.message);

      }



    )

    /**/


  }


  limpiarEmail() {
    if(this.errorEmail>0){
      console.log("Limpiar email");
      this.datosNuevos.email = "";
      this.errorEmail = 0;
    }
  }

  limpiarCelular() {
    if (this.errorCelular > 0) {
      console.log("Limpiar Celular");
      this.datosNuevos.nro_celular = "";
      this.errorCelular = 0;
    }
  }

  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.datosNuevos.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarApellido() {
    if (this.errorApellido > 0) {
      console.log("Limpiar Apellido");
      this.datosNuevos.apellido = "";
      this.errorApellido = 0;
    }
  }


  //FIN Tab de Informacion



  //Perfil Tab de Siguiendo

  siguiendoAnimales() {

    if(this.siguiendoAnimCargado==false){


      console.log("siguiendo Animales");
      this.usuariosService.siguiendoAnimales(this.UsuarioID.id).subscribe(
        res => {
          this.animalesSiguiendo = res;
          for (let anim of this.animalesSiguiendo) {
            if (anim.est == 1 && anim.estado == "Pendiente") {
              this.animalesInteresPendienteMe.push(anim);
            }
            if (anim.est == 1 && anim.estado == "Adoptado") {
              this.animalesInteresAdoptadoMe.push(anim);
            }
            if (anim.est == 0 && anim.estado == "Disponible") {
              this.animalesInteresDisponible.push(anim);
            }
            if (anim.est == 0 && (anim.estado == "Pendiente" || anim.estado == "Adoptado")) {
              this.animalesInteresPendienteAdoptadoOtro.push(anim);
            }
          }
          console.log("Pendientes para vos", this.animalesInteresPendienteMe)
          console.log("Adoptados por vos", this.animalesInteresAdoptadoMe)
          console.log("Disponibles aun", this.animalesInteresDisponible)
          console.log("Pendiente o adoptado por otro", this.animalesInteresPendienteAdoptadoOtro)
          this.fechaAdoptados();
          console.log("Informacion de proceso adoptados ", this.fechaAdoptado);
          console.log(res)
          this.siguiendoAnimCargado=true;



        },
        err => console.log(err)
      );


    }


  }


  quitarInteresAdoptadoOtro(idAnimal: string) {

	if(this.miUsuario==this.UsuarioID.id){

		
		this.usuariosService.quitarInteres(idAnimal, { idInteresado: this.usuariosService.user.id }).subscribe(
			res => {
			  console.log("id", idAnimal);
			  
			
				console.log("AdoptadoOtro");
				// get index of object with id of ?
				const removeIndex2 = this.animalesInteresPendienteAdoptadoOtro.findIndex((item: any) => item.id === idAnimal);
				// remove object
				this.animalesInteresPendienteAdoptadoOtro.splice(removeIndex2, 1);
		
				console.log("quitado de array", this.animalesInteresPendienteAdoptadoOtro);
			 
			},
			err => console.log(err)
		);
	  
		/**/
	}
	else
	{
		

	}

  }

  quitarInteresDisponible(idAnimal: string) {

	if(this.miUsuario==this.UsuarioID.id){

		
		this.usuariosService.quitarInteres(idAnimal, { idInteresado: this.usuariosService.user.id }).subscribe(
			res => {
				console.log("id", idAnimal);
				//Este codigo de abajo me funciono
				// get index of object with id of ?

			
				
				console.log("Disponible");
				const removeIndex1 = this.animalesInteresDisponible.findIndex((item: any) => item.id === idAnimal);
				// remove object
				this.animalesInteresDisponible.splice(removeIndex1, 1);

	  
	  
				console.log("quitado de array", this.animalesInteresDisponible);
				console.log("Resultado", res);
		
			},
			err => console.log(err)
		);
	  
		/**/
	}
	else
	{
		

	}

  }






  confirmarPendiente(AniPend: any) {
	
	if(this.miUsuario==this.UsuarioID.id){
		this.usuariosService.confirmarAdopcion(AniPend.id, { idInteresado: this.usuariosService.user.id }).subscribe(
			res => {
	
	
	
				console.log("animal datos", AniPend);
	
				// get index of object with id of ?
				const removeIndex = this.animalesInteresPendienteMe.findIndex((item: any) => item.id === AniPend.id);
				// remove object
				this.animalesInteresPendienteMe.splice(removeIndex, 1);
	
	
				//Agregar a animales adoptados
				this.animalesInteresAdoptadoMe.push(AniPend);
	
	
				console.log("quitando de array", this.animalesInteresPendienteMe);
				console.log("agregando a array", this.animalesInteresAdoptadoMe);
				console.log("Resultado", res);
	
			},
			err => console.log(err)
		);
	
	}
	else
	{
		
		return
		
	}

  }


  rechazarPendiente(AniPend: any) {
	
	if(this.miUsuario==this.UsuarioID.id){
		this.usuariosService.cancelarProcesoAdopcion(AniPend.id).subscribe(
			res => {
	
	
				// get index of object with id of ?
				const removeIndex = this.animalesInteresPendienteMe.findIndex((item: any) => item.id === AniPend.id);
				// remove object
				this.animalesInteresPendienteMe.splice(removeIndex, 1);
	
	
				AniPend.est = 0;
	
				console.log("object ", AniPend);
				//Agregar a animales Disponible
				this.animalesInteresDisponible.push(AniPend);
	
				console.log("animalesInteresDisponible ", this.animalesInteresDisponible);
				console.log(res);
	
	
	
			},
			err => console.log(err)
		);
	}
	else
	{
		return

		
	}

  }

  //Esto habria q traerlo cuando traemos los datos capaz
  fechaAdoptados() {
    this.usuariosService.fechaAdoptados().subscribe(
      res => {
        this.fechaAdoptado = res
        console.log("Aca guardo datos proceso ", this.fechaAdoptado);
      },
      err => console.log(err)
    );
  }


  irAAnimal(id: number) {
    console.log("El id ", id)
    this.router.navigate(['usuarios/animal/', id]);
  }

  //FIN Tab de Siguiendo

  //Perfil Tab de Animales

  registrar() {
    console.log("Registrando animal");
    console.log(this.animal);
    this.usuariosService.registrarAnimal(this.animal, this.usuariosService.user.id).subscribe(
      res => {
        let result: any = res;
        console.log(result);
        this.siguienteIdAnimal = result.id;
        console.log("Id animal siguiente: ", this.siguienteIdAnimal);
        this.upload();
        this.router.navigate(['usuarios/animal/', result.id]);

      },
      err => {
        console.log(err.error.message);
        this.mensaje = err.error.message;
      }
    )
  }

  /* Subir foto */

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorageAnimal(this.currentFileUpload, this.siguienteIdAnimal);
      }
    }

  }

  actualizarFoto(): void {
	/* Falta buscar el file y pasarle al delete para eliminarlo, aca o en upload service */


    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorageActualizarFotoPerfil(this.currentFileUpload, this.UsuarioID.id);
      }
    }

  }


  chekearPer(){

	
	this.uploadService.chekearPer(this.UsuarioID.id);
  }
}
