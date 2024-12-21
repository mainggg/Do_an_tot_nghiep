import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../environment/environment.cloud';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { saveAs } from 'file-saver';


@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(
    private http: HttpClient,
    private toast: ToastrService,
    private loader: NgxUiLoaderService,
  ) {
    
  }

  token: string = '';
  path: string = environment.api_end_point;

  async postUploadFile(url: any, formData: FormData): Promise<any> {
    try {
      let response = await firstValueFrom(this.http
        .post<any>(`${this.path}/${url}`, formData, {
          headers: new HttpHeaders({
            // 'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        }))

      if (response?.status == 200 && response?.body) {
        this.loader.stop();
        if (response?.body.result.responseCode !== '00') {
          //Swal.fire('Thông báo', `${response?.body.message}`, 'warning');
          return response?.body;
        } else {
          return response?.body;
        }
      } else {
        throw new Error(`${response?.body.result.message}`);
      }
    } catch (error: any) {
      this.loader.stop();
      if (error.error.result) {
        this.toast.error(error.error.result.message, 'Thông báo');
      } else {
        this.toast.error(
          ` Kết nối không ổn định, vui lòng thử lại`,
          'Thông báo'
        );
      }
      throw error;
    }
  }

  async putUploadFile(url: any, formData: FormData): Promise<any> {
    try {
      let response = await firstValueFrom(this.http
        .put<any>(`${this.path}/${url}`, formData, {
          headers: new HttpHeaders({
            // 'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': '*',
          }),
          observe: 'response',
        }))

      if (response?.status == 200 && response?.body) {
        this.loader.stop();
        if (response?.body.result.responseCode !== '00') {
          //Swal.fire('Thông báo', `${response?.body.message}`, 'warning');
          return response?.body;
        } else {
          return response?.body;
        }
      } else {
        throw new Error(`${response?.body.result.message}`);
      }
    } catch (error: any) {
      this.loader.stop();
      if (error.error.result) {
        this.toast.error(error.error.result.message, 'Thông báo');
      } else {
        this.toast.error(
          ` Kết nối không ổn định, vui lòng thử lại`,
          'Thông báo'
        );
      }
      throw error;
    }
  }

  async deleteFile(url: any): Promise<any> {
    try {
      let response = await firstValueFrom(this.http
        .delete<any>(`${this.path}/${url}`, {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${this.token}`,
          }),

          observe: 'response',
        }))

      if (response?.status == 200 && response?.body) {
        this.loader.stop();
        if (response?.body.result.responseCode !== '00') {
          // Swal.fire('Thông báo', `${response?.body.message}`, 'warning');
          this.toast.error(`${response?.body.message}`);
          return response?.body;
        } else {
          return response?.body;
        }
      }
    } catch (error: any) {
      this.loader.stop();
      if (error.error.result) {
        this.toast.error(error.error.result.message, 'Thông báo');
      } else {
        this.toast.error(
          ` Kết nối không ổn định, vui lòng thử lại`,
          'Thông báo'
        );
      }
      throw error;
    }
  }

  downloadFile(url: string, fileName: string): Observable<Blob> {
    return this.http.get(url, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      }),
      responseType: 'blob',
    });
  }

  downloadFileGetParams(
    url: string,
    fileName: string,
    param: any
  ): Observable<Blob> {
    return this.http.get(url, {
      params: param,
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
        'Access-Control-Allow-Origin': '*',
      }),
      responseType: 'blob',
    });
  }

  async postUploadFileDocument(url: any, formData: FormData): Promise<any> {
    try {
      let response = await firstValueFrom(this.http
        .post<any>(`${this.path}/${url}`, formData, {
          headers: new HttpHeaders({
            //'Content-Type': 'image/png',
            //'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${this.token}`,
          }),
          observe: 'response',
        }))

      if (response?.status == 200 && response?.body) {
        this.loader.stop();
        if (response?.body.result.responseCode !== '00') {
          //Swal.fire('Thông báo', `${response?.body.message}`, 'warning');
          return response?.body;
        } else {
          return response?.body;
        }
      } else {
        throw new Error(`${response?.body.result.message}`);
      }
    } catch (error: any) {
      this.loader.stop();
      if (error.error.result) {
        this.toast.error(error.error.result.message, 'Thông báo');
      } else {
        this.toast.error(
          ` Kết nối không ổn định, vui lòng thử lại`,
          'Thông báo'
        );
      }
      throw error;
    }
  }


  saveFile(blob: Blob, fileName: string) {
    saveAs(blob, fileName);
  }
}
