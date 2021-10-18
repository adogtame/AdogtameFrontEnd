import { Injectable } from '@angular/core';
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


  pushFileToStorageAnimal(fileUpload: FileUpload, idAnimal: Number): Observable<number | undefined> {
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

    return uploadTask.percentageChanges();
  }

  pushFileToStorageUsuario(fileUpload: FileUpload, idusuario: Number): Observable<number | undefined> {
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



  getUserProfileImage(userID: string) {

    // return this.db.list(this.basePath , ref =>
    //   ref.orderByChild('name').equalTo('ani1.jpg')).valueChanges();

    return this.db.list(this.basePath , ref =>
      ref.orderByChild('name').equalTo('per'+userID+'.jpg')).valueChanges();

  }


  getAnimalProfileImage(animalID: string) {

    return this.db.list(this.basePath , ref =>
      ref.orderByChild('name').equalTo('ani'+animalID+'.jpg')).valueChanges();

  }

  deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  private deleteFileStorage(name: string): void {
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }
}
