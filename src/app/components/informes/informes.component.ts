import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';

import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  cantidadUsuariosRegistrado: any = [];
  cantidadAnimalesRegistrado: any = [];
  cantidadAnimalesAdoptado: any = [];
  cantidadAnimalesAdopcion: any = [];
  promedioAnimalesAdoptado: any = [];


  constructor(
    private usuariosService: UsuariosService,
    private router: Router
  ) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
    
  }

  ngOnInit(): void {
    this.cantidadAnimalesAdoptados();
    this.cantidadAnimalesRegistrados();
    this.cantidadUsuariosRegistrados();
    this.cantidadAnimalesEnAdopcion();
    this.promedioAnimalesAdoptados();


  }

  /* Grafico de torta

    public pieChartOptions: ChartOptions = {
      responsive: true,
    };
    public pieChartLabels: Label[] = [['Adoptados'], [ 'Sin Adoptar']];
    public pieChartData: SingleDataSet = [ , ]; // tomo el valor dentro de una funcion de mas abajo para que guarde el valor
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartPlugins = [];
  */

 barChartOptions: ChartOptions = {
    responsive: true,
  };
 barChartLabels: Label[] = ['Animales registrados', 'Animales Adoptados', 'Animales sin Adoptar', 'Usuarios Registrados', 'Promedo de Animales Adoptados'];
 barChartType: ChartType = 'bar';
 barChartLegend = true;
 barChartPlugins = [];

 barChartData: ChartDataSets[] = [{ data: [ , , , , ], label: 'Cantidad' }];


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
        this.promedioAnimalesAdoptado.prom = Math.round(this.promedioAnimalesAdoptado.prom * 1000)/1000;
        // Aca guardo los valores del grafico, si lo pongo por fuera me trae undefined
        //this.pieChartData = [this.cantidadAnimalesAdoptado.ana, this.cantidadAnimalesAdopcion.ane];
        this.barChartData = [{ data: [this.cantidadAnimalesRegistrado.an, this.cantidadAnimalesAdoptado.ana, this.cantidadAnimalesAdopcion.ane, this.cantidadUsuariosRegistrado.us, this.promedioAnimalesAdoptado.prom], label: 'Cantidad' }];
      },
      err => console.log(err)
    )

  }

}
