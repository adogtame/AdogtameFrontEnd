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


  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public barChartLabels: Label[] = ['Animales Registrados', 'Animales Adoptados', 'Animales en Adopcion', 'Usuarios Registrados', 'Promedio de Adoptados'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartData: ChartDataSets[] = [{ data: [, , , , , ,], label: 'Cantidad' }]; // Lo pongo vacio porque todavia no tengo los datos


  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Cargo los valores despues que los cargue en el init con el suscribe
    this.barChartData = [{ data: [this.cantidadAnimalesRegistrado.an, this.cantidadAnimalesAdoptado.ana, this.cantidadAnimalesAdopcion.ane, this.cantidadUsuariosRegistrado.us, this.promedioAnimalesAdoptado.prom], label: 'Cantidad' }];
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
        this.promedioAnimalesAdoptado.prom = Math.round(this.promedioAnimalesAdoptado.prom * 1000) / 1000;
      },
      err => console.log(err)
    )

  }

}
