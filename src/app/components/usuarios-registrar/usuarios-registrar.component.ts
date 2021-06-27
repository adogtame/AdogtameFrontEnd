import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-registrar',
  templateUrl: './usuarios-registrar.component.html',
  styleUrls: ['./usuarios-registrar.component.css']
})
export class UsuariosRegistrarComponent implements OnInit {

  user={  tipo_perfil:"persona", nombre:"",apellido:"", password:"",repassword:"",email:"",dni:"",nro_celular:"",calle:"",nro_calle:""};


  errorNombre=0;
  errorApellido=0;
  errrorPassword=0;
  errorRePassrword=0;
  errorEmail=0;
  errorDNI=0;
  errorCelular=0;
  errorCalle=0;
  errorNro_calle=0;


  mensaje: string = "Vacio";

  mensajeEnviado: string = "";

	constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(){
		console.log("Sign Up");
    console.log(this.user);

    this.usuariosService.registrar(this.user).subscribe(

      res => {
        let result:any=res;
        console.log(result.message);
        localStorage.setItem('token',result.token);        
        this.usuariosService.logued$.emit('si')
        this.router.navigate(['usuarios/home']);
      },
      err => {
        
        console.log(err.error.message);

        this.mensaje=err.error.message;
        this.verificarNombre(this.user.nombre);

      }




    )


	}


  verificarForm():boolean{
  
    this.errorNombre=this.verificarNombre(this.user.nombre);
    this.errorApellido=this.verificarApellido(this.user.apellido);
    this.errrorPassword=this.verificarPassword(this.user.password);
    this.errorRePassrword=this.verificarRePassword(this.user.password, this.user.repassword);
    this.errorEmail=this.verificarEmail(this.user.email);
    this.errorDNI=this.verificarDNI(this.user.dni);
    this.errorCelular=this.verificarCelular(this.user.nro_celular);
    this.errorCalle=this.verificarCalle(this.user.calle);
    this.errorNro_calle=this.verificarNro_calle(this.user.nro_calle);
    if(  (this.errorNombre+this.errrorPassword+this.errorRePassrword+this.errorEmail)>0){
      return false;
    }
    return true;
  }
  
 
  //Cambiar los patrones porq tengo q poner solo numerico en algunos como dni


  verificarNombre(nombre:string):number {
    const patron=/^[A-Za-z]{2,20}$/;
    if(nombre.length==0)
      return 1;
    if(nombre.length>20)
      return 2;
    if(!patron.test(nombre))
      return 3;
    if(this.mensaje!="Vacio"){ 
        this.mensajeEnviado = this.mensaje; 
        this.mensaje = "Vacio";
      return 4; 
    }
    else
    {
    return 0;
    }
  }
  
  verificarApellido(apellido:string):number {
    const patron=/^[A-Za-z]{2,20}$/;
    if(apellido.length==0)
      return 1;
    if(apellido.length>20)
      return 2;
    if(!patron.test(apellido))
      return 3;
    return 0;
  }
 
  //[A-Z][A-Za-z0-9]
  verificarPassword(password:any): number {
    const patron=/^[A-Za-z0-9]{6,20}$/;
    if(password.length==0)
      return 1;
    if(password.length>20)
      return 2;
    if(!patron.test(password))
      return 3;    
    return 0;
    
  }
  
  verificarRePassword(password:any, repassword:any): number {
    if(password!=repassword){
      return 1;
    }
    return 0;
  }
  
  verificarEmail(email:any): number {
    const patron=/^[a-z0-9]{1,20}@[a-z0-9]{1,10}\.[a-z]{2,3}$/;
    if(email.length==0)
      return 1;
    if(email.length>20)
      return 2;
    if(!patron.test(email))
      return 3;
    return 0;
  }


  verificarCelular(nro_celular:string):number {
    const patron=/^[0-9]{6,20}$/;
    if(nro_celular.length==0)
      return 1;
    if(nro_celular.length>20)
      return 2;
    if(!patron.test(nro_celular))
      return 3;
    return 0;
  }

  verificarCalle(calle:string):number {
    const patron=/^[A-Za-z]{2,20}$/;
    if(calle.length==0)
      return 1;
    if(calle.length>20)
      return 2;
    if(!patron.test(calle))
      return 3;
    return 0;
  }

  verificarNro_calle(nro_calle:string):number {
    const patron=/^[0-9]{2,20}$/;
    if(nro_calle.length==0)
      return 1;
    if(nro_calle.length>20)
      return 2;
    if(!patron.test(nro_calle))
      return 3;
    return 0;
  }


  verificarDNI(dni:string):number {
    const patron=/^[0-9]{6,20}$/;
    if(dni.length==0)
      return 1;
    if(dni.length>20)
      return 2;
    if(!patron.test(dni))
      return 3;
    return 0;
  }





  limpiarNombre() {
    if (this.errorNombre > 0) {
      console.log("Limpiar nombre");
      this.user.nombre = "";
      this.errorNombre = 0;
    }
  }

  limpiarApellido() {
    if (this.errorApellido > 0) {
      console.log("Limpiar Apellido");
      this.user.apellido = "";
      this.errorApellido = 0;
    }
  }

  limpiarPassword() {
    if (this.errrorPassword > 0) {
      console.log("Limpiar password");
      this.user.password = "";
      this.errrorPassword = 0;
    }
  }

  limpiarRePassword() {
    if (this.errorRePassrword > 0) {
      console.log("Limpiar repassword");
      this.user.repassword = "";
      this.errorRePassrword = 0;
    }

  }

  limpiarEmail() {
    if(this.errorEmail>0){
      console.log("Limpiar email");
      this.user.email = "";
      this.errorEmail = 0;
    }
  }

  limpiarCelular() {
    if (this.errorCelular > 0) {
      console.log("Limpiar Celular");
      this.user.nro_celular = "";
      this.errorCelular = 0;
    }
  }

  limpiarCalle() {
    if (this.errorCalle > 0) {
      console.log("Limpiar Calle");
      this.user.calle = "";
      this.errorCalle = 0;
    }
  }

  limpiarNro_calle() {
    if (this.errorNro_calle > 0) {
      console.log("Limpiar Nro_calle");
      this.user.nro_calle = "";
      this.errorNro_calle = 0;
    }
  }

  limpiarDNI() {
    if (this.errorDNI > 0) {
      console.log("Limpiar DNI");
      this.user.dni = "";
      this.errorDNI = 0;
    }
  }



}
