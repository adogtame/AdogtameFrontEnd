import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-usuarios-principal',
  templateUrl: './usuarios-principal.component.html',
  styleUrls: ['./usuarios-principal.component.css']
})
export class UsuariosPrincipalComponent implements OnInit, OnDestroy {

  constructor(private usuariosService: UsuariosService) { }


  

  ngOnInit(): void {

    this.usuariosService.revelarBusquedaRapida=true;
    //este dice q si esta en principal 
    this.usuariosService.revelarBusquedaRapida$.emit('si')
    console.log( this.usuariosService.revelarBusquedaRapida);


  }


  ngOnDestroy(): void {

    
    this.usuariosService.revelarBusquedaRapida=false;

    //este dice q no esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('no')

    console.log( this.usuariosService.revelarBusquedaRapida);

  }

}
