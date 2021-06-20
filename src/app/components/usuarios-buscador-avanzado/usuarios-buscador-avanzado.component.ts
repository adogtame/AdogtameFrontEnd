import { Component, OnInit } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-buscador-avanzado',
  templateUrl: './usuarios-buscador-avanzado.component.html',
  styleUrls: ['./usuarios-buscador-avanzado.component.css']
})
export class UsuariosBuscadorAvanzadoComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private router: Router) { }

  animales: any = [];

  ngOnInit(): void {

    this.usuariosService.listarAnimales().subscribe(
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



}
