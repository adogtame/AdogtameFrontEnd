import { FileUpload } from './../../models/file-upload.model';
import { Component, OnInit, Input } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.css']
})
export class UploadListComponent implements OnInit {
  @Input() sujetoID!: string;
  @Input() Pertenece!: string;
  
  fileData: any = {name:"", key:""};
  fileUploads: any=[];
  fileKey: any=[];
  //fileUploads?: any[];
  //fileKey?: any[];

  //firebaseImageData
  FileUpload1 = "https://firebasestorage.googleapis.com/v0/b/adogtame-efa8f.appspot.com/o/uploads%2Fadogtame.png?alt=media&token=d56dc7b3-e4c2-4622-ab1a-19260a9b26bf";

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {

    if (this.Pertenece == "PerfilUAct" || this.Pertenece == "PerfilU" || this.Pertenece == "PerfilNavUsuarioPerfil1" || this.Pertenece == "PerfilNavUsuarioPerfil2" || this.Pertenece == "NavNotiI" || this.Pertenece == "interesadosA") {



		console.log("Pertenece a ", this.Pertenece)
		console.log("El usuario es", this.sujetoID)

	  

      
		this.uploadService.getUserProfileImage(this.sujetoID).subscribe(fileUploads => {

			this.fileUploads = fileUploads;


		});
	


	  

		//font-family: roboto, arial, sans-serif;

      
		/*
      console.log("Pertenece a en eliminar ", this.Pertenece);
      console.log("El usuario es en eliminar ", this.sujetoID);
      this.uploadService.getFiles(500).snapshotChanges().pipe(
        map(changes =>
          // store the key
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      ).subscribe(fileUploads => {
        this.fileUploads = fileUploads;
      });
		/**/
    }
    else {
		
		this.uploadService.getAnimalProfileImage(this.sujetoID).subscribe(fileUploads => {

			this.fileUploads = fileUploads;

		});
			



		
    }







    // this.uploadService.getFiles(6).snapshotChanges().pipe(
    //   map(changes =>
    //     // store the key
    //     changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    //   )
    // ).subscribe(fileUploads => {
    //   this.fileUploads = fileUploads;
    // });



    // this.uploadService.getUserProfileImage().subscribe(
    // 	res => {

    //     this.fileUploadsPrueba = fileUploadsPrueba;
    //   },
    // 	err => console.log(err)
    // );



  }
}


