import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-usuarios-buscador-avanzado',
  templateUrl: './usuarios-buscador-avanzado.component.html',
  styleUrls: ['./usuarios-buscador-avanzado.component.css']
})
export class UsuariosBuscadorAvanzadoComponent implements OnInit {

  constructor(
    private usuariosService: UsuariosService, 
    private router: Router
  ) { }

  animales: any = [];
  filterPost = '';

  
  filtroClick: boolean = false;
  excluirClick: boolean = false;
  
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



/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
clickEnFiltro() {
  
  if(this.filtroClick==true){

    this.filtroClick=false;
    console.log("Lo desactiva", this.filtroClick);
  }
  else
  {
    this.filtroClick=true;
    console.log("Activado", this.filtroClick);
  }

}

clickEnExcluir() {
  
  if(this.excluirClick==true){

    this.excluirClick=false;
    console.log("Lo desactiva", this.excluirClick);
  }
  else
  {
    this.excluirClick=true;
    console.log("Activado", this.excluirClick);
  }

}


clickEnAplicar() {
  
  //

}

}
