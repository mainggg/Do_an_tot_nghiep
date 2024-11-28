import { environment } from './../../../../environment/environment';

import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
} from '@angular/core';
import { NzResizeEvent } from 'ng-zorro-antd/resizable';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MessageService } from '../../../services/message.service';
import { UploadService } from '../../../services/upload.service';

const url_download = environment.api_end_point_download;
const url_preview = environment.api_end_point_preview;
@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent implements OnInit {
  @Output() outputListFile: EventEmitter<any> = new EventEmitter<any>();
  @Output() outputListFileFromBE: EventEmitter<any> = new EventEmitter<any>();
  @Input() files: any[] = [];
  @Input() filesFromBE: any[] = [];
  @Input() type: string = 'file';
  @Input() maxFiles = 999;
  @Input() maxFileSizeMB = 100;
  @Input() allowUpload: boolean = true;
  @Input() isUpdate: boolean = false;

  constructor(
    private notificationMessage: MessageService,
    public sanitizer: DomSanitizer,
    private downloadFileService: UploadService,
  ) {}
  // Preview file
  @Input() width = 1000;
  currentFilePath: any = '';
  currentFileName: string = '';
  fileType: string = '';
  iframeContentImage: any = '';
  isDragOver = false;
  id = -1;

  sanitizeResourceUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit() {
    if (this.files == undefined) {
      this.files = [];
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if ('isUpdate' in changes) {
      this.files = [];
    }
  }

  // Open drawer
  visible = false;
  openDrawer() {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  // onFileChange1(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.visible = true;
  //     this.currentFilePath = this.sanitizer.bypassSecurityTrustResourceUrl(
  //       URL.createObjectURL(file)
  //     );
  //     this.currentFileName = file.name;
  //   }
  // }

  downloadFile(file: any) {
    this.downloadFileService
      .downloadFile(`${url_download}/${file.path}`, file.fileName)
      .subscribe((data: Blob) => {
        this.downloadFileService.saveFile(data, file.fileName);
      });
  }

  onFileChange(event: any) {
    event.preventDefault();
    const selectedFiles: File[] = Array.from(event.target.files);
    this.handleFileSelection(selectedFiles);
  }

  previewFile(file: any) {
    if (file.id) {
      const fileExtension = this.getFileExtension(file.fileName);
      this.fileType = fileExtension;
      switch (fileExtension) {
        case 'pdf':
          // console.log(`${url_preview}/${file.path}`);
          this.currentFileName = file.fileName;
          this.currentFilePath = this.sanitizer.bypassSecurityTrustResourceUrl(
            `${url_preview}/${file.path}`
          );
          this.visible = true;
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
          // case 'heic':
          // console.log(`${url_preview}/${file.path}`);
          this.iframeContentImage = this.sanitizer.bypassSecurityTrustHtml(
            `<html><body style="margin: 0;"><img src="${url_preview}/${file.path}" style="width: 100%;"></body></html>`
          );
          // console.log(this.iframeContentImage);
          this.currentFileName = file.fileName;
          this.visible = true;
          break;
        default:
          this.downloadFile(file);
          // this.notificationMessage.notificationError(
          //   `Chức năng này chỉ hỗ trợ các file có định dạng .jpg, .jpeng, .png, .heic, .pdf, .txt,`
          // );
          break;
      }
    } else {
      const fileExtension = this.getFileExtension(file.name);
      this.fileType = fileExtension;
      switch (fileExtension) {
        case 'pdf':
          this.currentFilePath = this.sanitizer.bypassSecurityTrustResourceUrl(
            URL.createObjectURL(file)
          );
          this.currentFileName = file.name;
          this.visible = true;
          break;
        case 'jpg':
        case 'jpeg':
        case 'png':
          // case 'heic':
          this.iframeContentImage = this.sanitizer.bypassSecurityTrustHtml(
            `<html><body style="margin: 0;"><img src="${URL.createObjectURL(
              file
            )}" style="width: 100%;"></body></html>`
          );
          this.currentFileName = file.name;
          this.visible = true;
          break;
        default:
          // Tạo một URL cho file đã chọn
          var url = URL.createObjectURL(file);

          // Tạo một anchor element để tải file
          var a = document.createElement('a');
          a.href = url;
          a.download = file.name;

          // Mô phỏng sự kiện nhấn nút tải file
          var event = new MouseEvent('click');
          a.dispatchEvent(event);

          // Giải phóng bộ nhớ đã dùng để tạo URL
          URL.revokeObjectURL(url);
          // this.notificationMessage.notificationError(
          //   `Chức năng này chỉ hỗ trợ các file có định dạng .jpg, .jpeng, .png, .heic, .pdf`
          // );
          break;
      }
    }
  }

  onResize({ width }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
    });
  }

  isShowDeleteWarning: boolean = false;
  titleDeleteWarning: string = '';
  contentDeleteWarning: string = '';
  fileDelete: any = {};
  onHandleCancelDelete($event: any) {
    this.isShowDeleteWarning = $event;
  }

  async onHandleConfirmDelete($event: any) {
    // if ($event == true) {
    //   const index = this.filesFromBE.findIndex(
    //     (file) => file.fileName === this.fileDelete.fileName
    //   );

    //   if (index !== -1) {
    //     if (this.type == 'agent') {
    //       let res = await this.__agentService.deleteFileAgent(
    //         this.fileDelete.fileName
    //       );
    //       if (res) {
    //         if (res.result.responseCode == '00') {
    //           this.filesFromBE.splice(index, 1);
    //           this.notificationMessage.notificationSuccess(
    //             `Đã xóa ${this.fileDelete.fileName} khỏi danh sách`
    //           );
    //         } else {
    //           this.notificationMessage.notificationError(
    //             `${res.result.message}`
    //           );
    //         }
    //       } else {
    //         this.notificationMessage.notificationError(
    //           `Đã có lỗi xảy ra, vui lòng thử lại`
    //         );
    //       }
    //     }

    //     if (this.type == 'file') {
    //       let res = await this.__commonService.deleteFile(this.fileDelete.path);
    //       if (res) {
    //         if (res.result.responseCode == '00') {
    //           this.filesFromBE.splice(index, 1);
    //           this.notificationMessage.notificationSuccess(
    //             `Đã xóa ${this.fileDelete.fileName} khỏi danh sách`
    //           );
    //         } else {
    //           this.notificationMessage.notificationError(
    //             `${res.result.message}`
    //           );
    //         }
    //       } else {
    //         this.notificationMessage.notificationError(
    //           `Đã có lỗi xảy ra, vui lòng thử lại`
    //         );
    //       }
    //     }

    //     if (this.type == 'imageFile') {
    //       let res = await this.__seaportService.deleteFileSeaport(
    //         this.fileDelete.savedFileName
    //       );
    //       if (res) {
    //         if (res.result.responseCode == '00') {
    //           this.filesFromBE.splice(index, 1);
    //           this.notificationMessage.notificationSuccess(
    //             `Đã xóa ${this.fileDelete.fileName} khỏi danh sách`
    //           );
    //         } else {
    //           this.notificationMessage.notificationError(
    //             `${res.result.message}`
    //           );
    //         }
    //       } else {
    //         this.notificationMessage.notificationError(
    //           `Đã có lỗi xảy ra, vui lòng thử lại`
    //         );
    //       }
    //     }
    //   }
    // }
    // this.outputListFileFromBE.emit(this.filesFromBE);
  }

  async deleteFile(file: any) {
    if (file.id) {
      this.isShowDeleteWarning = true;
      this.titleDeleteWarning = `File`;
      this.contentDeleteWarning = `${file.fileName}`;
      this.fileDelete = file;
    } else {
      const index = this.files.findIndex(
        (fileIndex) => fileIndex.name === file.name
      );
      if (index !== -1) {
        this.files.splice(index, 1);
        this.notificationMessage.notificationSuccess(
          // `Đã xóa ${file.name} khỏi danh sách`
          `Đã xóa thành công`
        );
      }
      this.outputListFile.emit(this.files);
    }
  }

  handleFileSelection(selectedFiles: File[]) {
    // Kiểm tra kích thước và số lượng file
    for (const file of selectedFiles) {
      if (file.size > this.maxFileSizeMB * 1024 * 1024) {
        this.notificationMessage.notificationWarning(
          `File ${file.name} vượt quá kích thước tối đa (${this.maxFileSizeMB} MB).`
        );
        return;
      }
    }
    if (this.files.length + selectedFiles.length > this.maxFiles) {
      this.notificationMessage.notificationWarning(
        `Số lượng file đã chọn vượt quá giới hạn (${this.maxFiles}).`
      );
      return;
    }
    for (const file of selectedFiles) {
      const fileExtension = this.getFileExtension(file.name);
      this.fileType = fileExtension;
      // switch (fileExtension) {
      //   case 'pdf':
      //   case 'jpg':
      //   case 'jpeg':
      //   case 'png':
      //   case 'heic':
      //     break;
      //   default:
      //     this.notificationMessage.notificationWarning(
      //       `Không hỗ trợ File định dạng`
      //     );
      //     return;
      // }
    }

    for (const file of selectedFiles) {
      if (this.isFileExist(file.name)) {
        this.notificationMessage.notificationWarning(
          `File ${file.name} đã tồn tại trong danh sách`
        );
      } else {
        this.files.push(file);
      }
    }
    this.outputListFile.emit(this.files);
  }

  isFileExist(fileName: string): boolean {
    return this.files.some((file) => file.name === fileName);
  }

  onFileDrop(event: any) {
    event.preventDefault();
    this.isDragOver = false;
    const droppedFiles: File[] = Array.from(event.dataTransfer.files);
    this.handleFileSelection(droppedFiles);
  }

  onDragEnter(event: any) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: any) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDragOver(event: any) {
    this.isDragOver = true;
    event.preventDefault();
  }

  getFileExtension(fileName: string): string {
    const parts = fileName.split('.');
    return parts[parts.length - 1].toLowerCase();
  }

  getFileDisplayName(fileName: string, limit: number): string {
    if (fileName?.length <= limit) {
      return fileName;
    } else {
      return fileName?.substring(0, limit) + '...';
    }
  }

  
}
