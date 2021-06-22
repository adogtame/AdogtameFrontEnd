import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'



@Component({
  selector: 'app-usuarios-principal',
  templateUrl: './usuarios-principal.component.html',
  styleUrls: ['./usuarios-principal.component.css']
})
export class UsuariosPrincipalComponent implements OnInit, OnDestroy {

  constructor(private usuariosService: UsuariosService) { }

  animales: any = [];


  ngOnInit(): void {

    this.usuariosService.revelarBusquedaRapida=true;
    //este dice q si esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('si')
    console.log( this.usuariosService.revelarBusquedaRapida);

    this.usuariosService.listarAnimales().subscribe(
      res => {
        this.animales = res;
        console.log(res);
      },
      err => console.log(err)
    )
  }


  ngOnDestroy(): void {

    this.usuariosService.revelarBusquedaRapida=false;

    //este dice q no esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('no')

    console.log( this.usuariosService.revelarBusquedaRapida);

  }

}
