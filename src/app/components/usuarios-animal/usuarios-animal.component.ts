import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

//cesar jueves

import { AdminService } from '../../services/admin.service';

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
  selector: 'app-usuarios-animal',

 
  templateUrl: './usuarios-animal.component.html',

  styleUrls: ['./usuarios-animal.component.css'],

  animations: [

     trigger('clickContent', [
       state('noShow', 
         style({ 
          
           display: 'none',
           height: '0px',
           opacity: 0.6

         })
       ),
       state('show', 
         style({ 
          display: 'block', 
          
          'min-height':'45px',


          // height: '260px',

          'margin-top': '32px',
          opacity: 1
          })
       ),
       transition('show => noShow', [
         animate('0s')
       ]),
       transition('noShow => show', [
         animate('0s')
       ])
     ]),


  ]
})
export class UsuariosAnimalComponent implements OnInit, OnDestroy {


  Animal: any = [];

  AnimalID: any = [];


  //interesado seleccionado

    
  seleccionadoName: string = "";
  seleccionadoApellido: string = "";
  seleccionadoNum: string = "";
  
  estadoDelAnimal: any = [];

  modalEleccionAbierto: boolean = false;
  modalConfirmarAdopcionAbierto: boolean = false;
  chatAbierto: boolean = false;

  //


  //Nose de q es esto de moment, mepa q es inutil, no hace nada, hay q comprobar
  moment: any = [];
  //
  
  interesadoSeleccionado: any = [];

  interesados: any = [];

  interes: boolean = false;

  isOpenInteresados: boolean = false;

  cargoPagina: boolean = false;



  // admin
  rol: any = "";
  //



  //Fin de lo de cesar

  constructor(

    private usuariosService: UsuariosService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
    //cesar
    private adminService: AdminService
    //
  ) { }

  ngOnInit() {

    this.rutaActiva.params.subscribe(routeParams => {


      this.AnimalID = this.rutaActiva.snapshot.params



      this.funcionesEnInit();



      console.log("Animal", this.AnimalID);



      this.usuariosService.cargarAnimalEstado$.subscribe(log => {

        this.estadoAnimal();
      

      });
  
  



    



      this.usuariosService.rol$.subscribe(log => {

        this.rol = this.usuariosService.rol;

        console.log("El rol del usuario es", this.usuariosService.rol);

      });
      //


    });

  }




  ngOnDestroy(): void {



    this.AnimalID = [];

    this.Animal = [];    

    this.interesados = [];

    
  }


  //Estado animal
  estadoAnimal(){

    this.usuariosService.estadoAnimal(this.AnimalID.id).subscribe(
      res => {



        this.estadoDelAnimal=res;
        


        this.usuariosService.cargarTerminado$.emit()

        console.log("estado animal",  this.estadoDelAnimal);



      },
      err => console.log(err)
    );

  } 


  //

  token: any = "";
  UsuarioID: any = { user: "No logueado" };
  Usuario: any = [];
  TokenJSON = { token: "" };

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

            this.usuariosService.cargarAnimalDatos$.emit()
            //


            this.rol = this.Usuario.tipo_perfil;
            this.usuariosService.rol = this.Usuario.tipo_perfil;
            console.log("El rol del usuario es", this.usuariosService.rol);            
            console.log(this.Usuario);
          },
          err => console.log(err)
        );
        console.log(this.UsuarioID.user);
      },
      err => console.log(err)
    );
  }



  funcionesEnInit() {

    this.sacarUsuario();


    this.estadoAnimal();

    this.usuariosService.cargarAnimalDatos$.subscribe(log => {

      this.animalCargarDatos();

    });

    this.usuariosService.cargarAnimalIntereses$.subscribe(log => {

      if(this.Animal.idDador==this.usuariosService.user.id){

        //si sos el dador
        this.cargarInteresados();

        console.log("interesados",this.interesados);
      }
      else
      {

        this.cargarInteres();

      }


      

    });


    

    this.usuariosService.cargarTerminado$.subscribe(log => {

      setTimeout(()=>{ this.cargoPagina=true }, 2000)


      console.log("interesados",this.interesados);
    });




  }



  irADador() {

    this.router.navigate(['usuarios/perfil/', this.Animal.idDador]);

  } 

  irAInteresado(id: number){
    
    console.log("El id ",id)
    const url = this.router.serializeUrl(this.router.createUrlTree(['usuarios/perfil/',id]));
    window.open(url, '_blank');
    //this.router.navigate(['usuarios/perfil/',id])
  }

  comenzarChat(id: number, nombre: string, apellido: string, num: string){
    
    this.seleccionadoName = nombre;
    this.seleccionadoApellido = apellido;
    this.seleccionadoNum = num;

    this.chatAbierto = true;
    
    console.log("El id ",id)


  }


  cerrarChat(){
    this.seleccionadoName = "";
    this.seleccionadoApellido = "";
    this.seleccionadoNum = "";

    this.chatAbierto = false;
  }


  abrirWhats(){

    const ind = "54";
    const num = this.seleccionadoNum;
    const url = `https://api.whatsapp.com/send?phone=${ind}${num}`;

    console.log(url)

    window.open(url, '_blank');
     
  } 


  abrirEleccion(){

    console.log("Se abrio el modal Elejir Adoptante")
    this.modalEleccionAbierto=true;

  }

  cerrarModalEleccion(){

    console.log("Se cerro el modal Elejir Adoptante")
    this.modalEleccionAbierto = false;

  }


  abirConfirmarAdopcion(nombre: string, apellido: string, id: string){

    console.log("Se abrio el modal Confirmar Adopcion")
    this.modalConfirmarAdopcionAbierto=true;

    this.interesadoSeleccionado={id: id, nombre: nombre, apellido: apellido};

    console.log("El interesado Seleccionado", this.interesadoSeleccionado);

  }

  cerrarModalConfirmarAdopcion(){

    console.log("Se cerro el modal Confirmar Adopcion")
    this.modalConfirmarAdopcionAbierto = false;

  }

  confirmarAdopcion(idUsuario: string){

    console.log("Confirmar Adopcion")

    this.usuariosService.comenzarAdopcion(this.AnimalID.id, idUsuario).subscribe(
      res => {

        
        this.modalEleccionAbierto = false;
        this.modalConfirmarAdopcionAbierto = false;
        console.log(res)


        this.usuariosService.cargarAnimalEstado$.emit()

      },
      err => console.log(err)
    );

  }

  animalCargarDatos() {

    this.usuariosService.buscarAnimal(this.AnimalID.id).subscribe(
      res => {
        this.Animal = res
        console.log(this.Animal);

        this.usuariosService.cargarAnimalIntereses$.emit()
      },
      err => console.log(err)
    );



  }


  //si sos el dador
  cargarInteresados() {


    console.log("El id del usuario es este de aca (dador)", this.usuariosService.user.id);


    this.usuariosService.cargarInteresados(this.AnimalID.id).subscribe(
      res => {

        console.log("Resultado del cargar interesados", res);

        this.interesados=res;

        console.log("Interesados del animal", this.interesados);

        this.usuariosService.cargarTerminado$.emit()
      },
      err => console.log(err)
    );



  }


  //si sos un interesado
  cargarInteres() {


    console.log("El id del usuario es este de aca (interes)", this.usuariosService.user.id);


    this.usuariosService.cargarInteres(this.AnimalID.id, { idUsuario: this.usuariosService.user.id }).subscribe(
      res => {

        console.log("Resultado del cargar interes", res);



        if (res == 0 || res == null || res == undefined) {

          this.interes = false;
        }
        else {

          this.interes = true;
        }


        this.usuariosService.cargarTerminado$.emit()
      },
      err => console.log(err)
    );



  }

  mostrarInteres() {

    if (this.interes == true) {

      this.usuariosService.quitarInteres(this.AnimalID.id, { idInteresado: this.usuariosService.user.id }).subscribe(
        res => {

          this.interes = false;
          console.log("Resultado", res);

        },
        err => console.log(err)
      );

      console.log("interes quitado");

    }
    else {

      this.usuariosService.mostrarInteres(this.AnimalID.id, { idInteresado: this.usuariosService.user.id }).subscribe(
        res => {

          this.interes = true;
          
          console.log("Resultado", res);


        },
        err => console.log(err)
      );

      console.log("interes enviado");

    }







  }













}
