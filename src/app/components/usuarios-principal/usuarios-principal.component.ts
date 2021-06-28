import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios-principal',
  templateUrl: './usuarios-principal.component.html',
  styleUrls: ['./usuarios-principal.component.css']
})

export class UsuariosPrincipalComponent implements OnInit, OnDestroy {

  constructor(private usuariosService: UsuariosService) { }

  animales: any = [];
  filterPost = '';

  ngOnInit(): void {
    this.usuariosService.revelarBusquedaRapida = true;
    //este dice q si esta en principal 
    this.usuariosService.revelarBusquedaRapida$.emit('si')
    console.log(this.usuariosService.revelarBusquedaRapida);
    this.usuariosService.listarAnimales().subscribe(
      res => {
        this.animales = res;
        console.log(res);
      },
      err => console.log(err)
    )
  }

  ngOnDestroy(): void {
    this.usuariosService.revelarBusquedaRapida = false;
    //este dice q no esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('no')
    console.log(this.usuariosService.revelarBusquedaRapida);
  }



  irAAnimal(id: number){
    
    console.log("El id ",id)
    this.router.navigate(['usuarios/animal/',id]);
  }




}
