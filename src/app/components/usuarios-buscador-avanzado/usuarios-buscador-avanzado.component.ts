import { Component, OnInit, HostBinding   } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'


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


export class AppModule { }
@Component({
  selector: 'app-usuarios-buscador-avanzado',
  templateUrl: './usuarios-buscador-avanzado.component.html',
  styleUrls: ['./usuarios-buscador-avanzado.component.css'],
  animations: [

    
    // trigger('clickContent', [
    //   state('noShow', 
    //     style({ 
          
    //       display: 'none',
    //       height: '0px',
    //       opacity: 0.6

    //     })
    //   ),
    //   state('show', 
    //     style({ 
    //       display: 'block', 
    //       height: '280px',
    //       opacity: 1
    //      })
    //   ),
    //   transition('show => noShow', [
    //     animate('0s')
    //   ]),
    //   transition('noShow => show', [
    //     animate('0.3s')
    //   ])
    // ]),


    

    // trigger('clickBTN', [
    //   state('sube', 
    //     style({ 
          

    //       'margin-top':'0px'

    //     })
    //   ),
    //   state('baja', 
    //     style({ 
          
    //       'margin-top':'240px'

    //      })
    //   ),
    //   transition('sube => baja', [
    //     animate('0.3s')
    //   ]), 
    //   transition('baja => sube', [
    //     animate('0.3s')
    //   ])
    // ]),


    trigger("dropDownMenu", [
      transition(":enter", [
        style({ height: 0, overflow: "hidden" }),
        query(".menu-item", [
          style({ opacity: 0, transform: "translateY(-50px)" })
        ]),
        sequence([
          animate("200ms", style({ height: "*" })),
          query(".menu-item", [
            stagger(-50, [
              animate("400ms ease", style({ opacity: 1, transform: "none" }))
            ])
          ])
        ])
      ]),
    
      transition(":leave", [
        style({ height: "*", overflow: "hidden" }),
        query(".menu-item", [style({ opacity: 1, transform: "none" })]),
        sequence([
          query(".menu-item", [
            stagger(50, [
              animate(
                "50ms ease",
                style({ opacity: 0, transform: "translateY(-50px)" })
              )
            ])
          ]),
          animate("150ms", style({ height: 0 }))
        ])
      ])
    ])




  ]
})
export class UsuariosBuscadorAvanzadoComponent implements OnInit {

  constructor(
    private usuariosService: UsuariosService, 
    private router: Router
  ) { }

  animales: any = [];
  filterPost = '';

  

  //
  isOpenFiltro = false;
  isOpenExcluir = false;
  //
  filtroAplica={cria:false, adulto:false, grande:false, mediano:false, chico:false}
  
  excluirAplica = {cria:false, adulto:false, grande:false, mediano:false, chico:false};

  

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




clickEnAplicar() {
  
  //
  console.log("filtroAplica", this.filtroAplica);
  console.log("excluirAplica", this.excluirAplica);


}





}
