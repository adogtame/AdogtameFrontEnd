import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'
//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';
import { AdminService } from '../../services/admin.service';

// Subir foto
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

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

//import { resourceUsage } from 'process';


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
  seleccionadoId: string = "";
  seleccionadoName: string = "";
  seleccionadoApellido: string = "";
  seleccionadoNum: string = "";
  estadoDelAnimal: any = [];
  modalEleccionAbierto: boolean = false;
  modalConfirmarAdopcionAbierto: boolean = false;
  modalAdopcionPendienteAbierto: boolean = false;
  modalEditarDatosAierto: boolean = false;
  modalDatosMedicosAbierto: boolean = false;
  chatAbierto: boolean = false;
  //ubi para saber como hacer la img del firebase
  ubi: string="Perfil";
  interesadosA: string="interesadosA";
  //Nose de q es esto de moment, mepa q es inutil, no hace nada, hay q comprobar
  moment: any = [];
  interesadoSeleccionado: any = [];
  interesados: any = [];
  interes: boolean = false;
  isOpenInteresados: boolean = false;
  cargoPagina: boolean = false;

  display='none';

  vacuna : any = {};
  datosMedicosCambio : any = {};
  //Modificar datos animal

  datosLista: any =["nombre", "sexo", "tipo", "fNac", "tamano", "peso"];
  sexoArray:any=["macho", "hembra"]
  tipoArray:any=["perro", "gato"]
  tamanoArray:any=["grande", "mediano", "chico"]
  datosNuevos: any ={nombre: "", sexo: "", tipo: "", fNac: "", tamano: "", peso: ""};

  fechaAdoptado: any = [];

  /* Subir foto */
  selectedFiles?: FileList;
  currentFileUpload?: FileUpload;

  percentage = 0;


  // admin
  //rol: any = "";

  constructor(

    private usuariosService: UsuariosService,
    private router: Router,
    private rutaActiva: ActivatedRoute,
	private uploadService: FileUploadService

  ) { }

  ngOnInit() {

    this.rutaActiva.params.subscribe(routeParams => {
      this.AnimalID = this.rutaActiva.snapshot.params
      this.funcionesEnInit();
      console.log("Animal", this.AnimalID);
      this.usuariosService.cargarAnimalEstado$.subscribe(log => {
        this.estadoAnimal();
      });

      //Esto no va en el init, nose donde va pero ponganlo en la parte q vaya
      //Porq en init solo va lo q es necesario cargar apenas se arranca y no hay ninguna fecha q sea necesaria apenas se arranca
      //Tambien vi q en la base pide q traiga todo de proceso_adopcion lo q tambien esta mal supongo
      //Onda si quieren sacar la fecha nomas hay q hacer "select fecha from proceso" 
      //Esta mal si sacas todo haciendo "Select * from proceso"
      //Solo saquen lo q usan sino estamos haciendo al pedo eso
      //Ademas q si vos queres sacar una fecha, q nose para q sea esta funcion, fijense q sean solo las necesarias.
      //Si traern todas las fechas no sirve, si quieren una fecha pongan una condicion
      //por ejemplo "select fecha from proceso where id=?" algo asi, asi nomas te trae la fecha necesaria
      //this.fechaAdoptados();
      //Cada vez q vea q se llame a una funcion q nose q hace y q esta mal 
      //porq no debe ir en el init o porq la llamada a base es muy general la comento
      //porq nose donde se usa y si me pongo a buscar pierdo mucho tiempo


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
  

  editarDatos(){

	this.datosNuevos.nombre=this.Animal.nombre;
	this.datosNuevos.sexo=this.Animal.sexo;
	this.datosNuevos.tipo=this.Animal.tipo;
	this.datosNuevos.fNac=this.Animal.fNac;
	this.datosNuevos.tamano=this.Animal.tamano;
	this.datosNuevos.peso=this.Animal.peso;


	this.modalEditarDatosAierto=true;


  }

  cerrarModalEditarDatos(){

	this.modalEditarDatosAierto=false;

  }

 

  modificarDatosAnimal() {

    console.log("datosNuevos del animal cambios", this.datosNuevos);
    console.log("animal a modificar", this.Animal);
	
	
	/*
	var nombresArray: any =["nombre","sexo","tipo","fNac","tamano","peso"];
	let datosArray:any={};


    for (var i = 0; i < nombresArray.length; i++) {
      if(this.Animal[`${nombresArray[i]}`]!=datosNuevos[`${nombresArray[i]}`] && datosNuevos[`${nombresArray[i]}`]!=null && datosNuevos[`${nombresArray[i]}`]!="vacio"){

        //
        console.log("i",  i);
        console.log("this.Animal", [`${nombresArray[i]}`],this.Animal[`${nombresArray[i]}`]);
        console.log("datosNuevos", [`${nombresArray[i]}`],datosNuevos[`${nombresArray[i]}`]);

        datosArray[`${nombresArray[i]}`]= datosNuevos[`${nombresArray[i]}`];



      }
    }
	/**/


    //Editar datos animal

    this.usuariosService.modificarDatosAnimal(this.datosNuevos, this.Animal.id).subscribe(
      res => {

        console.log(res);

        this.animalCargarDatos();

		this.modalEditarDatosAierto=false;

      },
      err => {

        console.log(err.error.message);

      }



    )

    /**/


  }





  comenzarChat(id: string, nombre: string, apellido: string, num: string){
    this.seleccionadoId = id;
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
    const url = `https://api.whatsapp.com/send?phone=${ind}${num}&text=¡Hola ${this.seleccionadoName}!. Estas interesado en adoptar a ${this.Animal.nombre}. ¿Podemos conversar?`;
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



  datosMedicos(){

    
	console.log("this.AnimalID.id vacunas: ", this.AnimalID.id);
    this.usuariosService.traerVacunasAnimal(this.AnimalID.id).subscribe(
      res => {
        this.vacuna = res;
        this.datosMedicosCambio = res;
        console.log("Cantidad de vacunas: ", this.vacuna);

        this.modalDatosMedicosAbierto=true;

      },
      err => console.log(err)
    );


    //Chequear overlay z index porq habia varios overlay con distintos index
    //Asiq puede q el overlay tape algunos modales


  }

  cerrarModalDatosMedicos(){
    
    console.log("Se cerro el modal Datos Medicos");
    this.modalDatosMedicosAbierto = false;
  }
  



  //onCloseHandled(){
  //  this.display='none';
  //}
  //this.traerVacunasAnimal();


  returnZero() {
    //Para q funcione bien la parte de datos medicos y la parte de castrado aparezca abajo  
    //|Esto hace q el array se itere segun como vino de la base sin el order by q aplica automaticamente el ngFor|
    return 0
  }

  datoMedicoUnCambio(propiedad: any, valor: any){
    console.log("Propiedad: ", propiedad, "| Nuevo valor: ", valor);
    if(valor==false){valor=0;}
    if(valor==true){valor=1;}
    this.datosMedicosCambio[`${propiedad}`] = valor;
  }

  modificarVacunasAnimal() {
    console.log("Datos medicos cambios: ", this.datosMedicosCambio);
    
    this.usuariosService.modificarVacunasAnimal(this.datosMedicosCambio, this.AnimalID.id).subscribe(
      res => {
        this.vacuna = res;
        this.datosMedicosCambio = res;

        console.log("Cantidad de vacunas: ", this.vacuna);

        
        this.modalDatosMedicosAbierto = false;

      },
      err => console.log(err)
    );
    /**/
  }

  fechaAdoptados() {
    this.usuariosService.fechaAdoptados().subscribe(
      res => {
        this.fechaAdoptado = res
        console.log("Aca guardo datos proceso ", this.fechaAdoptado);
      },
      err => console.log(err)
    );
  }


  /* Subir foto */

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }


  actualizarFoto(): void {
/* Falta buscar el file y pasarle al delete para eliminarlo, aca o en upload service */


    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      this.selectedFiles = undefined;

      if (file) {
        this.currentFileUpload = new FileUpload(file);


        this.uploadService.pushFileToStorageAnimal(this.currentFileUpload,  this.AnimalID.id);
      }
    }

  }


  chekearAni(){

	this.uploadService.chekearAni(this.AnimalID.id);
  }





}
