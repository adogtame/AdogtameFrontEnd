import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }



  cargarUploadAni$ = new EventEmitter<string>();
  cargarUploadPer$ = new EventEmitter<string>();





  /*



  pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    console.log("file path" + filePath);
    const storageRef = this.storage.ref(filePath);
    console.log("storage ref" + storageRef);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    console.log("task" + uploadTask);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          console.log("down url: " + downloadURL);
          fileUpload.name = fileUpload.file.name;
          console.log("name " + fileUpload.name);
          this.saveFileData(fileUpload);
          console.log("save data " +this.saveFileData);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }
  /**/

  pushFileToStorageAnimal(fileUpload: FileUpload, idAnimal: string){





	var file: any=[];

	console.log("idAnimal", idAnimal)
	this.getAnimalProfileKey(idAnimal).subscribe(fileKey => {
		console.log(" fileKey snapshotChanges de upload es ",   fileKey)

		if(fileKey.length!=0){
			this.getAnimalProfileImage(idAnimal).subscribe(fileUploads => {

				file = fileUploads;
				file[0]['key'] = fileKey[0].key;
				console.log("  fileKey de upload es ",   fileKey)
				console.log("  fileUploads de upload es ",   fileUploads)


				console.log(" ahora se elimina deleteFile", file);
				this.deleteFile(file); 
				
			});

				
		}
		file=[];
		fileKey=[];
		
	

      });

	 

		
			/* o aca eliminamos el actual o en el perfil component */


			const filePath = `${this.basePath}/ani${idAnimal}.jpg`;
			console.log("file path" + filePath);
			const storageRef = this.storage.ref(filePath);
			console.log("storage ref" + storageRef);
			const uploadTask = this.storage.upload(filePath, fileUpload.file);
			console.log("task" + uploadTask);

			uploadTask.snapshotChanges().pipe(
			finalize(() => {
				storageRef.getDownloadURL().subscribe(downloadURL => {
				fileUpload.url = downloadURL;
				console.log("down url: " + downloadURL);
				fileUpload.name = `ani${idAnimal}.jpg`;
				console.log("name " + fileUpload.name);
				this.saveFileData(fileUpload);
				console.log("save data " +this.saveFileData);
				});
			})
			).subscribe();



  }

  pushFileToStorageUsuario(fileUpload: FileUpload, idusuario: string): Observable<number | undefined> {
    const filePath = `${this.basePath}/per${idusuario}.jpg`;
    console.log("file path" + filePath);
    const storageRef = this.storage.ref(filePath);
    console.log("storage ref" + storageRef);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
    console.log("task" + uploadTask);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          console.log("down url: " + downloadURL);
          fileUpload.name = `per${idusuario}.jpg`;
          console.log("name " + fileUpload.name);
          this.saveFileData(fileUpload);
          console.log("save data " +this.saveFileData);
        });
      })
    ).subscribe();

    return uploadTask.percentageChanges();
  }

  pushFileToStorageActualizarFotoPerfil(fileUpload: FileUpload, idusuario: string){
	
	var file: any=[];

	console.log("idusuario", idusuario)
	this.getUserProfileKey(idusuario).subscribe(fileKey => {
		console.log(" fileKey snapshotChanges de pushFile es ",   fileKey)

		if(fileKey.length!=0){
			this.getUserProfileImage(idusuario).subscribe(fileUploads => {

				file = fileUploads;
				file[0]['key'] = fileKey[0].key;
				console.log("  fileKey de pushFile es ",   fileKey)
				console.log("  fileUploads de pushFile es ",   fileUploads)

				console.log(" ahora se elimina deleteFile", file)
			  	this.deleteFile(file); 
				//() => console.log('huzzah, I\'m done!');
			});
		}
	
		file=[];
		fileKey=[];
    });


		/* o aca eliminamos el actual o en el perfil component */



		const filePath = `${this.basePath}/per${idusuario}.jpg`;
		console.log("file path" + filePath);
		const storageRef = this.storage.ref(filePath);
		console.log("storage ref" + storageRef);
		const uploadTask = this.storage.upload(filePath, fileUpload.file);
		console.log("task" + uploadTask);

		uploadTask.snapshotChanges().pipe(
		finalize(() => {
			storageRef.getDownloadURL().subscribe(downloadURL => {
			fileUpload.url = downloadURL;
			console.log("down url: " + downloadURL);
			fileUpload.name = `per${idusuario}.jpg`;
			console.log("name " + fileUpload.name);
			this.saveFileData(fileUpload);
			console.log("save data " +this.saveFileData);
			});
		})
		).subscribe();

		
	
	
  }


  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  // getFiles(numberItems: number): AngularFireList<FileUpload> {
  //   return this.db.list(this.basePath, ref =>
  //     ref.limitToLast(numberItems));
  // }

  getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));

  }


  getUserProfileKey(userID: string) {
    return this.db.list(this.basePath, ref =>
      ref.orderByChild('name').equalTo('per'+userID+'.jpg')).snapshotChanges();

  }

  getUserProfileImage(userID: string) {
    return this.db.list(this.basePath, ref =>
      ref.orderByChild('name').equalTo('per'+userID+'.jpg')).valueChanges();

  }

  getAnimalProfileKey(animalID: string) {
    return this.db.list(this.basePath, ref =>
      ref.orderByChild('name').equalTo('ani'+animalID+'.jpg')).snapshotChanges();

  }

  getAnimalProfileImage(animalID: string) {

    return this.db.list(this.basePath , ref =>
      ref.orderByChild('name').equalTo('ani'+animalID+'.jpg')).valueChanges();

  }



  deleteFile(fileUpload: FileUpload): void {
	

	console.log("q onda fileUpload 1", fileUpload)
	console.log("q onda fileUpload.key 2", fileUpload.key)
    this.deleteFileDatabase(fileUpload.key); () => 
    this.deleteFileStorage(fileUpload.name);
	

    //.then(() => {
    // })
    //.catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
	console.log("termina una")
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
	console.log("termina otra")
  }



}
