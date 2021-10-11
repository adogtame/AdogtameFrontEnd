import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'
//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';
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
} from '@angular/animations';


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
  userAhora: string="";
  //interesado seleccionado
  seleccionadoName: string = "";
  seleccionadoApellido: string = "";
  seleccionadoNum: string = "";
  estadoDelAnimal: any = [];
  modalEleccionAbierto: boolean = false;
  modalConfirmarAdopcionAbierto: boolean = false;
  modalAdopcionPendienteAbierto: boolean = false;
  chatAbierto: boolean = false;
  //ubi para saber como hacer la img del firebase
  ubi: string="Perfil";
  //Nose de q es esto de moment, mepa q es inutil, no hace nada, hay q comprobar
  moment: any = [];
  interesadoSeleccionado: any = [];
  interesados: any = [];
  interes: boolean = false;
  isOpenInteresados: boolean = false;
  cargoPagina: boolean = false;
  
  display='none';
  vacuna : any = [];
  //Modificar datos animal
  
  datosNuevos={nombre: "vacio", sexo: "vacio", tipo: "vacio", fNac: "vacio", tamano: "vacio", peso: "vacio"};

  

  // admin
  //rol: any = "";

  constructor(

    private usuariosService: UsuariosService,
    private router: Router,
    private rutaActiva: ActivatedRoute,


  ) { }

  ngOnInit() {

    this.rutaActiva.params.subscribe(routeParams => {
      this.AnimalID = this.rutaActiva.snapshot.params
      this.funcionesEnInit();
      console.log("Animal", this.AnimalID);
      this.usuariosService.cargarAnimalEstado$.subscribe(log => {
        this.estadoAnimal();
      });

      /*
      this.usuariosService.rol$.subscribe(log => {
        this.rol = this.usuariosService.rol;
        console.log("El rol del usuario es", this.usuariosService.rol);
      });
      /**/
    });

  }


  ngOnDestroy(): void {
    this.AnimalID = [];
    this.Animal = [];
    this.interesados = [];
    this.seleccionadoName = "";
    this.seleccionadoApellido = "";
    this.seleccionadoNum = "";
    this.estadoDelAnimal = [];
    this.modalEleccionAbierto = false;
    this.modalConfirmarAdopcionAbierto = false;
    this.modalAdopcionPendienteAbierto = false;
    this.chatAbierto = false;
    this.moment = [];
    this.interesadoSeleccionado = [];
    this.interesados = [];
    this.interes = false;
    this.isOpenInteresados = false;
    this.cargoPagina = false;

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
        console.log("Este es el id decodificado", this.UsuarioID.user);
        
        
        this.usuariosService.cargarAnimalDatos$.emit()
        /*
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
        /**/
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
      if(this.Animal.idDador== this.UsuarioID.user){
        //si sos el dador
        this.cargarInteresados();
        console.log("interesados",this.interesados);
      }
      else{
        this.cargarInteres();
      }
    });

    this.usuariosService.cargarTerminado$.subscribe(log => {
      this.userAhora= this.UsuarioID.user;
      setTimeout(()=>{ this.cargoPagina=true }, 2000)
      console.log("interesados",this.interesados);
    });

    this.vacunasAnimal();

  }



  irADador() {

    this.router.navigate(['usuarios/perfil/', this.Animal.idDador]);

  }

  irAInteresado(id: number){

    console.log("El id ",id);
    const url = this.router.serializeUrl(this.router.createUrlTree(['usuarios/perfil/',id]));
    window.open(url, '_blank');
    //this.router.navigate(['usuarios/perfil/',id])
  }




  modificarDatosAnimal(datosNuevos: any) {

    console.log("animal a modificar", this.Animal);
    console.log("datosNuevos del animal cambios", datosNuevos);
 
		var nombresArray: any =["nombre","sexo","tipo","fNac","tamano","peso"];
		let datosArray:any={};

    console.log(`animal dato 0`, this.Animal[`${nombresArray[0]}`]);
    console.log("datosNuevos 0", datosNuevos[`${nombresArray[0]}`]);
    console.log("nombresArray.length", nombresArray.length);

    for (var i = 0; i < nombresArray.length; i++) {
      if(this.Animal[`${nombresArray[i]}`]!=datosNuevos[`${nombresArray[i]}`] && datosNuevos[`${nombresArray[i]}`]!=null && datosNuevos[`${nombresArray[i]}`]!="vacio"){

        //  
        console.log("i",  i);
        console.log("this.Animal", [`${nombresArray[i]}`],this.Animal[`${nombresArray[i]}`]);
        console.log("datosNuevos", [`${nombresArray[i]}`],datosNuevos[`${nombresArray[i]}`]);

        datosArray[`${nombresArray[i]}`]= datosNuevos[`${nombresArray[i]}`];



      }
    }

    console.log("datosArray que se guarda", datosArray);




    //Editar datos animal
    /*
    this.usuariosService.modificarDatosAnimal(datosArray, this.Animal.id).subscribe(
      res => {
        
        console.log(res);  
        
        this.animalCargarDatos();        
        

      },
      err => {
        
        console.log(err.error.message);

      }



    )

    /**/


  }





  comenzarChat(id: number, nombre: string, apellido: string, num: string){
    this.seleccionadoName = nombre;
    this.seleccionadoApellido = apellido;
    this.seleccionadoNum = num;
    this.chatAbierto = true;
    console.log("El id ",id);

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
    console.log(url);
    window.open(url, '_blank');
  }


  abrirDisponibleYPendiente(){
    if(this.estadoDelAnimal.estado=="Disponible"){

      console.log("Se abrio el modal Elejir Adoptante");
      this.modalEleccionAbierto=true;
    }

    if(this.estadoDelAnimal.estado=="Pendiente"){

      console.log("Se abrio  el modal adopcion pendiente");
      this.modalAdopcionPendienteAbierto = true;
    }



  }

  cerrarModalDisponibleYPendiente(){

    if(this.estadoDelAnimal.estado=="Disponible"){

      console.log("Se cerro el modal Elejir Adoptante");
      this.modalEleccionAbierto = false;
    }

    if(this.estadoDelAnimal.estado=="Pendiente"){

      console.log("Se cerro el modal adopcion pendiente");
      this.modalAdopcionPendienteAbierto = false;
    }



  }


  cancelarProcesoAdopcion(){

    console.log("Cancelar adopcion");


    this.usuariosService.cancelarProcesoAdopcion(this.AnimalID.id).subscribe(
      res => {


        this.modalAdopcionPendienteAbierto = false;
        console.log(res)


        this.usuariosService.cargarAnimalEstado$.emit()

      },
      err => console.log(err)
    );

  }




  abirConfirmarAdopcion(nombre: string, apellido: string, id: string){

    console.log("Se abrio el modal Confirmar Adopcion");
    this.modalConfirmarAdopcionAbierto=true;

    this.interesadoSeleccionado={id: id, nombre: nombre, apellido: apellido};

    console.log("El interesado Seleccionado", this.interesadoSeleccionado);

  }

  cerrarModalConfirmarAdopcion(){

    console.log("Se cerro el modal Confirmar Adopcion");
    this.modalConfirmarAdopcionAbierto = false;

  }

  confirmarAdopcion(idUsuario: string){

    console.log("Confirmar Adopcion");

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
    console.log("El id del usuario es este de aca (dador)",  this.UsuarioID.user);
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


    console.log("El id del usuario es este de aca (interes)", this.UsuarioID.user);


    this.usuariosService.cargarInteres(this.AnimalID.id, { idUsuario:  this.UsuarioID.user }).subscribe(
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

      this.usuariosService.quitarInteres(this.AnimalID.id, { idInteresado:  this.UsuarioID.user }).subscribe(
        res => {

          this.interes = false;
          console.log("Resultado", res);

        },
        err => console.log(err)
      );

      console.log("interes quitado");

    }
    else {

      this.usuariosService.mostrarInteres(this.AnimalID.id, { idInteresado:  this.UsuarioID.user}).subscribe(
        res => {

          this.interes = true;

          console.log("Resultado", res);


        },
        err => console.log(err)
      );
      console.log("interes enviado");
    }
  }



  openModal(){
    this.display='block';
 }

 onCloseHandled(){
  this.display='none';
 }

 openModal1(){
  this.display='block';
}

onCloseHandled1(){
this.display='none';
}

vacunasAnimal() {
  this.usuariosService.vacunasAnimal(this.AnimalID.id).subscribe(
    res => {
      this.vacuna = res;
      console.log("Cantidad de vacunas: ", this.vacuna);
    },
    err => console.log(err)
  );
}


}
