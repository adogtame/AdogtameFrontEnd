import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-usuarios-perfil',
  templateUrl: './usuarios-perfil.component.html',
  styleUrls: ['./usuarios-perfil.component.css']
})
export class UsuariosPerfilComponent implements OnInit, OnDestroy {


  animal={  idDador:"",nombre:"",sexo:"",tipo:"",fNac:"",tamano:"",peso:""};

  Usuario: any = [];

  animales: any = [];

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

  // statusAnimales = 'Disable';

  //firebase
  ubi: string="PerfilU";
  //

  constructor(private usuariosService: UsuariosService, private router: Router, private rutaActiva: ActivatedRoute) { }


  mensaje: string = "Vacio";

  mensajeEnviado: string = "";


  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {



      this.UsuarioID = this.rutaActiva.snapshot.params


      console.log("Estoy en el usuario",this.UsuarioID.id);
      this.usuarioCargarDatos();


      console.log("Usuario", this.UsuarioID);


    });



  }


  ngOnDestroy(): void {


    console.log("Se cierra el usuario",this.UsuarioID.id);

    this.UsuarioID = [];

    this.Usuario = [];






    this.animalesSiguiendo = [];
    this.animalesInteresPendienteMe = [];
    this.animalesInteresAdoptadoMe = [];
    this.animalesInteresDisponible = [];
    this.animalesInteresPendienteAdoptadoOtro = [];


    console.log("Se cerro el usuario",this.UsuarioID.id);

  }



  usuarioCargarDatos(){

    this.usuariosService.buscarUsuario(this.UsuarioID.id).subscribe(
      res => {
        this.Usuario = res
        console.log(this.Usuario);

      },
      err => console.log(err)
    );

    this.usuariosService.listarAnimalesDelUsuario(this.UsuarioID.id).subscribe(
      res => {
        this.animales = res;
        console.log(res);
      },
      err => console.log(err)
    )


  }


  irAAnimal(id: number){

    console.log("El id ",id)
    this.router.navigate(['usuarios/animal/',id]);
  }

  registrar(){
		console.log("Registrando animal");
    console.log(this.animal);


    this.usuariosService.registrarAnimal(this.animal, this.usuariosService.user.id).subscribe(

      res => {
        let result:any=res;
        console.log(result);
        //por ahora no funca porq hace falta recibir un id del animal recien creado y redireccionar con eso
        this.router.navigate(['usuarios/animal/', result.id]);
      },
      err => {

        console.log(err.error.message);

        this.mensaje=err.error.message;


      }




    )


	}



  siguiendoAnimales(){

  console.log("siguiendo Animales");


  this.usuariosService.siguiendoAnimales(this.UsuarioID.id).subscribe(
    res => {

      this.animalesSiguiendo=res;

      for (let anim of this.animalesSiguiendo) {
        
        if(anim.est==1 && anim.estado=="Pendiente"){

          this.animalesInteresPendienteMe.push(anim);
        }

        if(anim.est==1 && anim.estado=="Adoptado"){

          this.animalesInteresAdoptadoMe.push(anim);
        }

        if(anim.est==0 && anim.estado=="Disponible"){

          this.animalesInteresDisponible.push(anim);
        }

        if(anim.est==0 && (anim.estado=="Pendiente" || anim.estado=="Adoptado")){

          this.animalesInteresPendienteAdoptadoOtro.push(anim);
        }
        

      }


      console.log("Pendientes para vos", this.animalesInteresPendienteMe)
      console.log("Adoptados por vos", this.animalesInteresAdoptadoMe)
      console.log("Disponibles aun", this.animalesInteresDisponible)
      console.log("Pendiente o adoptado por otro", this.animalesInteresPendienteAdoptadoOtro)

      console.log(res)



    },
    err => console.log(err)
    );

  }

  
  quitarInteres(idAnimal: string){


    
    this.usuariosService.quitarInteres(idAnimal, { idInteresado: this.usuariosService.user.id }).subscribe(
      res => {

     

        console.log("id",idAnimal);

        //Este codigo de abajo me funciono
        // get index of object with id of ?
        const removeIndex1 = this.animalesInteresDisponible.findIndex( (item:any) => item.id === idAnimal );
        // remove object
        this.animalesInteresDisponible.splice( removeIndex1, 1 );

        // get index of object with id of ?
        const removeIndex2 = this.animalesInteresPendienteAdoptadoOtro.findIndex( (item:any) => item.id === idAnimal );
        // remove object
        this.animalesInteresPendienteAdoptadoOtro.splice( removeIndex2, 1 );


        console.log("quitando de array", this.animalesInteresDisponible);
        console.log("quitando de array", this.animalesInteresPendienteAdoptadoOtro);
        console.log("Resultado", res);

      },
      err => console.log(err)
    );

    /**/
  }
  

  confirmarPendiente(AniPend: any){



    
    this.usuariosService.confirmarAdopcion(AniPend.id, { idInteresado: this.usuariosService.user.id }).subscribe(
      res => {

     

        console.log("animal datos",AniPend);

        // get index of object with id of ?
        const removeIndex = this.animalesInteresPendienteMe.findIndex( (item:any) => item.id === AniPend.id );
        // remove object
        this.animalesInteresPendienteMe.splice( removeIndex, 1 );

     
        //Agregar a animales adoptados
        this.animalesInteresAdoptadoMe.push(AniPend);


        console.log("quitando de array", this.animalesInteresPendienteMe);
        console.log("agregando a array", this.animalesInteresAdoptadoMe);
        console.log("Resultado", res);

      },
      err => console.log(err)
    );


  }


  rechazarPendiente(AniPend: any){


    this.usuariosService.cancelarProcesoAdopcion(AniPend.id).subscribe(
      res => {
        

        // get index of object with id of ?
        const removeIndex = this.animalesInteresPendienteMe.findIndex( (item:any) => item.id === AniPend.id );
        // remove object
        this.animalesInteresPendienteMe.splice( removeIndex, 1 );


        AniPend.est=0;
     
        console.log("object ", AniPend);
        //Agregar a animales Disponible
        this.animalesInteresDisponible.push(AniPend);

        console.log("animalesInteresDisponible ",this.animalesInteresDisponible);
        console.log(res);



      },
      err => console.log(err)
    );

  }






  //Botones menu de perfil

  Informacion(){



    this.toggleInformacion = true;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = false;



    //Limpiando arrays de siguiendo
    this.animalesSiguiendo = [];
    this.animalesInteresPendienteMe = [];
    this.animalesInteresAdoptadoMe = [];
    this.animalesInteresDisponible = [];
    this.animalesInteresPendienteAdoptadoOtro = [];


  }

  Siguiendo(){

    this.siguiendoAnimales();

    this.toggleInformacion = false;
    this.toggleSiguiendo = true;
    this.toggleSeguidores = false;
    this.toggleAnimales = false;
  }

  Seguidores(){



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

  Animales(){

    this.toggleInformacion = false;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = true;



    //Limpiando arrays de siguiendo
    this.animalesSiguiendo = [];
    this.animalesInteresPendienteMe = [];
    this.animalesInteresAdoptadoMe = [];
    this.animalesInteresDisponible = [];
    this.animalesInteresPendienteAdoptadoOtro = [];
  }




}
