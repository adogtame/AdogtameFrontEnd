import { Component, OnInit } from '@angular/core';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner',
  //Saque el url de template, asi en vez de tener un .html el codigo html lo pongo directamente aca
  //Entiendo q es porq es cortito el codigo html q necesita el spinner
  template: `<div class="overlay" *ngIf="isLoading$ | async">
  <div class="lds-ring"><div>
  </div>`,
  styleUrls: ['./spinner.component.css'],
})
export class SpinnerComponent implements OnInit {

  isLoading$=this.spinnerSvc.isLoading$

  constructor(private spinnerSvc: SpinnerService) { }

  ngOnInit(): void {
  }

}
