import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-listar',
  templateUrl: './usuarios-listar.component.html',
  styleUrls: ['./usuarios-listar.component.css']
})
export class UsuariosListarComponent implements OnInit {
  
  usuarios: any = [];
  animales: any = [];
  revelar:boolean=true;

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {
    this.usuariosService.listarUsuarios().subscribe(
      res => {
        this.usuarios = res;
        console.log(res);
      },
      err => console.log(err)
    )

    this.usuariosService.listarAnimales().subscribe(
      res => {
        this.animales = res;
        console.log(res);
      },
      err => console.log(err)
    )
    

  }


  irAPerfil(id: number){
    
    console.log("El id ",id)

     
      this.router.navigate(['usuarios/perfil/',id]);


  }
  
  irAAnimal(id: number){
    
    console.log("El id ",id)
     
      this.router.navigate(['usuarios/animal/',id]);
        
  }


}
