import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {

  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) { }

  cantidadUsuariosRegistrado: any = [];
  cantidadAnimalesRegistrado: any = [];
  cantidadAnimalesAdoptado: any = [];
  cantidadAnimalesAdopcion: any = [];
  promedioAnimalesAdoptado: any = [];

  ngOnInit(): void {
  this.cantidadAnimalesAdoptados();
  this.cantidadAnimalesRegistrados();
   this.cantidadUsuariosRegistrados();
  this.cantidadAnimalesEnAdopcion();
  this.promedioAnimalesAdoptados();
  }


   cantidadUsuariosRegistrados(): void {
     this.usuariosService.cantidadUsuariosRegistrados().subscribe(
       res => {
         this.cantidadUsuariosRegistrado = res;
         console.log(res);
         console.log("cantidad regiss", this.cantidadUsuariosRegistrado);
       },
       err => console.log(err)
     )
   }

  cantidadAnimalesRegistrados(): void {
    this.usuariosService.cantidadAnimalesRegistrados().subscribe(
      res => {
        this.cantidadAnimalesRegistrado = res;
        console.log(res);
        console.log("animales registrados", this.cantidadAnimalesRegistrado);
      },
      err => console.log(err)
    )
  }

  cantidadAnimalesAdoptados(): void {
    this.usuariosService.cantidadAnimalesAdoptados().subscribe(
      res => {
        this.cantidadAnimalesAdoptado = res;
        console.log(res);
        console.log("cantidad adoptados", this.cantidadAnimalesAdoptado);
      },
      err => console.log(err)
    )
  }

  cantidadAnimalesEnAdopcion(): void {
    this.usuariosService.cantidadAnimalesEnAdopcion().subscribe(
      res => {
        this.cantidadAnimalesAdopcion = res;
        console.log(res);
        console.log("cantidad en adopcion", this.cantidadAnimalesAdopcion);
      },
      err => console.log(err)
    )
  }

  promedioAnimalesAdoptados(): void {
    this.usuariosService.promedioAnimalesAdoptados().subscribe(
      res => {
        this.promedioAnimalesAdoptado = res;
        console.log(res);
        console.log("promedio adoptado", this.promedioAnimalesAdoptado);
      },
      err => console.log(err)
    )
  }
}
