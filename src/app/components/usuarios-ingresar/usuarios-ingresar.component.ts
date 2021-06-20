import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-usuarios-ingresar',
  templateUrl: './usuarios-ingresar.component.html',
  styleUrls: ['./usuarios-ingresar.component.css']
})
export class UsuariosIngresarComponent implements OnInit {


  user = { id: "", password: "" };

  reintentar: boolean = false;
  mensaje: string = "";

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {

  }


  ingresar() {
    console.log("Sign In");
    console.log(this.user);

    this.usuariosService.ingresar(this.user).subscribe(
      res => {


        this.usuariosService.user.id=this.user.id;
        
        console.log( this.usuariosService.user.id);
        let result: any = res;
        console.log(result.message);
        localStorage.setItem('token',result.token);      
        //este dice q esta logueado, el si ese es al pepe  
        this.usuariosService.logued$.emit('si')
        
        this.router.navigate(['usuarios/home']);
        

      },
      err => {
        console.log(err.error.message);
        this.reintentar=true;
        this.mensaje=err.error.message;
      }
    ) 


  }

  
  recargarForm(){
    this.reintentar=false;
    this.user.id="";
    this.user.password="";
	this.mensaje="";
  }


}
