import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { FileUpload } from 'src/app/models/file-upload.model';

@Component({
  selector: 'app-upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.css']
})
export class UploadDetailsComponent implements OnInit {
  @Input() fileUpload!: FileUpload;
  @Input() Pertenece!: string;

  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    console.log("Este es el file upload de details",this.fileUpload);
  }

  ngOnDestroy(): void {
    this.fileUpload.url="";
    this.fileUpload.key="";
    this.fileUpload.name="";
  }

  deleteFileUpload(fileUpload: FileUpload): void {
    this.uploadService.deleteFile(fileUpload);
  }

}

