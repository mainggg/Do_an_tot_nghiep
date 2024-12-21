import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { FileService } from '../../../services/file.service';

@Component({
  selector: 'app-area-upload',
  templateUrl: './area-upload.component.html',
  styleUrls: ['./area-upload.component.css'],
})
export class AreaUploadComponent implements OnInit {
  @Input() isShowModalUploadFile: boolean = false;
  @Input() isView: boolean = false;
  @Input() fileFromFE: File[] = [];
  @Input() filesFromBe: any[] = [];
  @Input() maxFiles = 999;
  @Output() cancel: EventEmitter<boolean> = new EventEmitter();
  @Output() listFileUpload: EventEmitter<any> = new EventEmitter();
  @Output() listFileFE: EventEmitter<any> = new EventEmitter();
  @Output() listFileBE: EventEmitter<any> = new EventEmitter();

  constructor(
    private __activated: ActivatedRoute,
    private __notification: MessageService,
    public sanitizer: DomSanitizer,
    private __fileService: FileService
  ) {}

  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  param: any = this.__activated.snapshot.params['id'];

  ngOnInit() {}

  isShowModalConfirm: boolean = false;

  onHandleCancelModal() {
    if (this.tempFileDocument.length > 0) {
      this.isShowModalConfirm = true;
    } else {
      this.isShowModalUploadFile = false;
      this.cancel.emit(false);
    }
  }

  onHandleCancelModalConfirm(event: any) {
    this.isShowModalConfirm = false;
  }

  onHandleConfirm(event: any) {
    this.isShowModalUploadFile = false;
    this.cancel.emit(false);
    this.listFileFE.emit([]);
    this.listFileUpload.emit([]);
  }

  urlImage: any = '';
  urlPDF: any = '';
  spin: boolean = false;
  async onHandleConfirmModal() {
    try {
      if (this.tempFileDocument.length > 0) {
        this.spin = true;
        const formData = new FormData();
        this.tempFileDocument.forEach((file) => {
          formData.append('files', file, file.name);
        });
        const response = await this.__fileService.uploadFileDocument(
          formData
        );

        if (response.result.responseCode == '00') {
          this.spin = false;
          this.__notification.notificationSuccess(`${response.result.message}`);
          let listFile = response.data.map((item: any) => ({
            savedFileName: item.savedFileName,
            fileName: item.fileName,
            name: item.fileName,
            size: item.size,
          }));
          this.listFileFE.emit(this.tempFileDocument);
          this.listFileUpload.emit(listFile);
          this.isShowModalUploadFile = false;
          this.cancel.emit(false);
        }
      } else {
        this.spin = false;
        this.cancel.emit(false);
        this.listFileFE.emit([]);
        this.listFileUpload.emit([]);
        this.isShowModalUploadFile = false;
      }
    } catch (error) {
      console.error(error);
    }
  }

  tempFileDocument: File[] = [];
  onHandleGetUploadFile(event: any) {
    if (event && event.length > 0) {
      this.tempFileDocument = event;
    } else {
      this.tempFileDocument = [];
      this.listFileFE.emit([]);
      this.listFileUpload.emit([]);
    }
  }

  onHandleDeleteFileBE(event: any) {
    this.listFileBE.emit(event);
  }
}
