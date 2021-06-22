import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
//import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
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



  ngOnInit(): void {

    //this.nombreSubscription =
    this.usuariosService.logued$.subscribe(log => {
      this.revelar = true;

      this.sacarUsuario();
          
    });

   







    this.usuariosService.revelarBusquedaRapida$.subscribe(log => {
      this.revelarBusRapida = this.usuariosService.revelarBusquedaRapida;
    });

    this.logueado();




    



  }




  logout() {
    //Es de notar que la redireccion del metodo logOut podria haberse hecho aqui y dejar el servicio lo mas acotado posible.
    this.usuariosService.logOut();
    this.revelar = false;
    
    this.UsuarioID = { user: "No logueado" };
    this.usuariosService.user.id = "";
    this.Usuario = [];
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
  /**/



  sacarUsuario(){



    this.token = this.usuariosService.getToken();
    console.log(this.token);

    this.TokenJSON = { token: this.token };

    this.usuariosService.decodificarToken(this.TokenJSON).subscribe(
      res => {  

        this.UsuarioID=res;
        this.usuariosService.buscarUsuario(this.UsuarioID.user).subscribe(
          res => {
            this.Usuario = res
            
            this.usuariosService.user.id = this.Usuario.id;
            console.log(this.Usuario); 
          },
          err => console.log(err) 
        );
        console.log(this.UsuarioID.user);   
        
      },
      err => console.log(err)  
      
    );

  }


  
  irAPerfil(){
    

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
     
     this.router.navigate(['usuarios/perfil/',this.Usuario.id]);

    }); 



  }


}

