import { Component, OnInit, OnDestroy} from '@angular/core';


import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'


//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

//cesar jueves

import { AdminService } from '../../services/admin.service';

import {
  trigger,
  state,
  style,
  animate,
  transition,

  query,
  sequence,
  stagger,
  // ...
} from '@angular/animations';


@Component({
  selector: 'app-usuarios-home',
  templateUrl: './usuarios-home.component.html',
  styleUrls: ['./usuarios-home.component.css'],
  animations: [


    trigger('clickContent', [
      state('noShow',
        style({

          display: 'none',
          height: '0px',
          opacity: 0.6

        })
      ),
      state('show',
        style({
         display: 'block',

         'min-height':'80px',


         // height: '260px',

         'margin-top': '32px',
         opacity: 1
         })
      ),
      transition('show => noShow', [
        animate('0s')
      ]),
      transition('noShow => show', [
        animate('0s')
      ])
    ]),




  ]
})
export class UsuariosHomeComponent implements OnInit{




  constructor(


  ) { }

  ngOnInit() {


  }




  ngOnDestroy(): void {




  }














}
