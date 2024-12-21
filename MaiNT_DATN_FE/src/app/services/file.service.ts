
import { Injectable } from '@angular/core';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private uploadService: UploadService) { }

  uploadFileDocument(data: any) {
    return this.uploadService.postUploadFileDocument(
      'api/assets/upload-file',
      data
    );
  }
}