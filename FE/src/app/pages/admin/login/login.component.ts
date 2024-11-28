import { Component } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { AdminService } from '../admin.service';
import { Route, Router } from '@angular/router';
import { MessageService } from '../../../services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  validateForm: FormGroup<{
    username: FormControl<string>;
    password: FormControl<string>;
    remember: FormControl<boolean>;
  }> = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [true]
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.login()
    } else {      
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async login(){
    await this._loginService.loginAdmin(this.validateForm.value).then((res) => {
      if(res.result.responseCode == '00'){
        if(res.data.listRoleString.includes('atino_admin')){
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('userName', res.data.userName)
          localStorage.setItem('roles', res.data.listRoleString)
          this._router.navigate(['./admin'])
        } else {
          this._messageServide.notificationWarning("Bạn không có quyền truy cập")
        }
      } else {
        this._messageServide.notificationError(res.result.message);
      }
    })
  }


  constructor(private fb: NonNullableFormBuilder,
    private _loginService: AdminService,
    private _router: Router,
    private _messageServide: MessageService
  ) {}

}
