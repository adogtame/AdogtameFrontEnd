import { Component, OnInit, OnDestroy, Pipe, Input } from '@angular/core';
import { UsuariosService } from '../../services/usuarios.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router'
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-usuarios-principal',
  templateUrl: './usuarios-principal.component.html',
  styleUrls: ['./usuarios-principal.component.css']
})

export class UsuariosPrincipalComponent implements OnInit, OnDestroy {
  fileUploads?: any[];
  @Input() fileUpload!: FileUpload;

  constructor(

    private usuariosService: UsuariosService,
    private router: Router,
    private uploadService: FileUploadService

  ) { }
  animales: any = [];
  ubi: string="BuscadorHome";
  filterPost = '';

  ngOnInit(): void {

    this.uploadService.getFiles(6).snapshotChanges().pipe(
      map(changes =>
        // store the key
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(fileUploads => {
      this.fileUploads = fileUploads;
    });

    this.usuariosService.revelarBusquedaRapida = true;
    //este dice q si esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('si')
    console.log(this.usuariosService.revelarBusquedaRapida);
    this.usuariosService.listarAnimalesSinAdoptar().subscribe(
      res => {
        this.animales = res;
        console.log(res);
      },
      err => console.log(err)
    )

  }

  ngOnDestroy(): void {
    this.usuariosService.revelarBusquedaRapida = false;
    //este dice q no esta en principal
    this.usuariosService.revelarBusquedaRapida$.emit('no')
    console.log(this.usuariosService.revelarBusquedaRapida);
  }



  irAAnimal(id: number){

    console.log("El id ",id)
    this.router.navigate(['usuarios/animal/',id]);
  }

}
