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


  firebaseImageData: any={name:"", key:""};


  cargarUploadAni$ = new EventEmitter<string>();
  cargarUploadPer$ = new EventEmitter<string>();
  /*
	 logued$ = new EventEmitter<string>();

					this.cargarUploadAni$.emit()
    this.cargarUploadAni$.subscribe(log => {
		
    });


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


	console.log("firebaseImageData", this.firebaseImageData);

	if(this.firebaseImageData.key!="" && this.firebaseImageData.name!=""){
		
		
		this.deleteFile();

		console.log("Borro y despues cargo");
		this.uploadAni(fileUpload, idAnimal);
					
			
	}
	else
	{
		
		console.log("Cargo de una");
		this.uploadAni(fileUpload, idAnimal);
	}


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
	


	console.log("firebaseImageData", this.firebaseImageData);

	if(this.firebaseImageData.key!="" && this.firebaseImageData.name!=""){
		
	

		this.deleteFile();

		console.log("Borro y despues cargo");
		this.uploadPer(fileUpload, idusuario);


	}
	else
	{

		console.log("Cargo de una");
		
		this.uploadPer(fileUpload, idusuario);

	}
	
	
  }

  
  chekearPer(idusuario: string){

	this.firebaseImageData={name:"", key:""};
	console.log("chekearPer");
	console.log("firebaseImageData", this.firebaseImageData);

	console.log("idusuario", idusuario);
	this.getUserProfileKey(idusuario).subscribe(Key => {
		var fileKey = Key;

		console.log("Key", Key);
		console.log("fileKey", fileKey);
		if(fileKey.length!=0){

			this.firebaseImageData.key = fileKey[0].key;

			console.log("firebaseImageData", this.firebaseImageData);
			this.getUserProfileImage(idusuario).subscribe(fileUploads => {

				var data: any = fileUploads;
	
				console.log("data", data);
	
				if(data.length!=0){
	
					this.firebaseImageData.name = data[0].name;



					console.log("firebaseImageData 2", this.firebaseImageData);

				}
				
			});


		}
		

	});
		
	

  }

  chekearAni(idAnimal: string){

	this.firebaseImageData={name:"", key:""};
	console.log("chekearAni");
	console.log("firebaseImageData", this.firebaseImageData);


	
	console.log("idAnimal", idAnimal);
	this.getAnimalProfileKey(idAnimal).subscribe(Key => {
		var fileKey = Key;

		if(fileKey.length!==0){

			this.firebaseImageData.key = fileKey[0].key;

			this.getAnimalProfileImage(idAnimal).subscribe(fileUploads => {

				var data: any = fileUploads;
	
	
				if(data.length!=undefined){
	
					this.firebaseImageData.name = data[0].name;

					console.log("firebaseImageData 2", this.firebaseImageData);
				}
				
			});


		}
		

	});	
		
  }



  uploadAni(fileUpload: FileUpload, idAnimal: string){
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

  uploadPer(fileUpload: FileUpload, idusuario: string){
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



  deleteFile() {
	





    this.deleteFileDatabase(this.firebaseImageData.key); () =>
    this.deleteFileStorage(this.firebaseImageData.name);	

	this.firebaseImageData={name:"", key:""};
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
