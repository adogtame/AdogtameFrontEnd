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
  

  toggleInformacion = true;
  
  

  toggleSiguiendo = false;
  
  

  toggleSeguidores = false;
   
  


  toggleAnimales = false;

  // statusAnimales = 'Disable'; 
  



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
        console.log(result.message);               
        //por ahora no funca porq hace falta recibir un id del animal recien creado y redireccionar con eso
        //this.router.navigate(['usuarios/animal/',result.id]);
      },
      err => {
        
        console.log(err.error.message);

        this.mensaje=err.error.message;
        

      }




    )


	}



  Informacion(){

     

    this.toggleInformacion = true;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = false;




  }

  Siguiendo(){


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

    // this.statusSeguidores = this.toggleSeguidores ? 'Enable' : 'Disable';

  }

  Animales(){

    this.toggleInformacion = false;
    this.toggleSiguiendo = false;
    this.toggleSeguidores = false;
    this.toggleAnimales = true;
    

  }




}
