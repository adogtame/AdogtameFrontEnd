import { Component, OnInit, OnDestroy} from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router'

//recibir parametros en las rutas del componente
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-usuarios-animal',
  templateUrl: './usuarios-animal.component.html',
  styleUrls: ['./usuarios-animal.component.css']
})
export class UsuariosAnimalComponent implements OnInit, OnDestroy {

  Animal: any = [];
  AnimalID: any = [];

  constructor(private usuariosService: UsuariosService, private router: Router, private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {
      this.AnimalID = this.rutaActiva.snapshot.params
      this.animalCargarDatos();
      console.log("Animal", this.AnimalID);

    });

  }

  ngOnDestroy(): void {
    this.AnimalID = [];
    this.Animal = [];

  }

  irADador(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['usuarios/perfil/',this.Animal.idDador]);

    });

  }

  animalCargarDatos(){

    this.usuariosService.buscarAnimal(this.AnimalID.id).subscribe(
      res => {
        this.Animal = res
        console.log(this.Animal);

      },
      err => console.log(err)
    );

  }

}
