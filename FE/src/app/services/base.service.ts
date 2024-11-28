import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment.cloud';
import { firstValueFrom } from 'rxjs';

const path = environment.api_end_point;

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  accpetLanguage: string = '';
  constructor(private httpClient: HttpClient) {
    let language = localStorage.getItem('language');
    if (language !== null) {
      this.accpetLanguage = language;
    } else {
      this.accpetLanguage = 'vi';
    }
  }

  header: any;


  getHeader(){
    if(localStorage.getItem('token') != undefined || localStorage.getItem('token') != null){
      this.header = new HttpHeaders({
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
        'Accept-language': this.accpetLanguage,
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    } else {
      this.header = new HttpHeaders({
        'Content-Type': 'application/json',
        //'Access-Control-Allow-Origin': '**',
        'Accept-language': this.accpetLanguage,
      })
    }
  }

  async getData(url: string): Promise<any> {
    this.getHeader();
    let response = await firstValueFrom(
      this.httpClient.get<any>(`${path}/${url}`, {
        headers: this.header,
        observe: 'response',
      })
    );
    return response.body;
  }

  async getDataV2(url: string): Promise<any> {
    let response = await firstValueFrom(
      this.httpClient.get<any>(`${url}`, {
        // headers: new HttpHeaders({
        //   'Content-Type': 'application/json',
        //   'Access-Control-Allow-Origin': '**',
        //   'Accept-language': this.accpetLanguage,
        // }),
        observe: 'response',
      })
    );
    return response.body;
  }

  async postData(url: string, data: any): Promise<any> {
    this.getHeader();
    let response = await firstValueFrom(
      this.httpClient.post<any>(`${path}/${url}`, data, {
        headers: this.header,
        observe: 'response',
      })
    );
    return response?.body;
  }

  async deleteData(url: string): Promise<any> {
    this.getHeader();
    let response = await firstValueFrom(
      this.httpClient.delete<any>(`${path}/${url}`, {
        headers: this.header,
        observe: 'response',
      })
    );
    return response.body;
  }

  async putData(url: string, data: object): Promise<any> {
    this.getHeader();
    let response = await firstValueFrom(
      this.httpClient.put<any>(`${path}/${url}`, data, {
        headers: this.header,
        observe: 'response',
      })
    );
    return response.body;
  }
}
