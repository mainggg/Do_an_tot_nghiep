import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { MessageService } from '../../../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  ngOnInit(): void {}

  constructor(private _loginService: AdminService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  activeTab: any = 'login';

  loginData = {
    username: '',
    password: '',
  };

  signupData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userName: '',
    passWord: '',
    roles: [{
      id: 1,
      name: 'AURA_user',
      description: 'Quyền người dùng'
    }]
  };

  isNotEmpty(obj: any) {
    for (let key in obj) {
      if (obj[key] === '') {
        return false;
      }
    }
    return true;
  }

  setActiveTab(tab: string) {
    console.log(tab)
    this.activeTab = tab;
  }

  handleLogin(){
    if(!this.loginData.username || !this.loginData.password){
      this._messageService.notificationWarning('Bạn phải nhập đủ thông tin')
      return;
    }
    this.logIn();
  }


  async logIn() {
    await this._loginService.loginAdmin(this.loginData).then((res) => {
      if(res.result.responseCode == '00'){
        localStorage.setItem('customerUserName', res.data.userName)
        this._router.navigate(['./home/home-page'])
      } else {
        this._messageService.notificationError(res.result.message);
      }
    })
  }

  async signUp() {
    await this._loginService.saveUser(this.signupData).then((res) => {
      if(res.result.responseCode == '00'){
        this.loginData.username = this.signupData.userName;
        this.loginData.password = this.signupData.passWord;
        this.activeTab = 'login'
      }
    })
    
  }

  onFocus(event: FocusEvent) {
    const label = (event.target as HTMLElement).previousElementSibling;
    if (label) {
      label.classList.add('active');
      label.classList.add('highlight');
    }
  }

  onBlur(event: FocusEvent) {
    const input = event.target as HTMLInputElement;
    const label = input.previousElementSibling;
    if (label) {
      if (input.value === '') {
        label.classList.remove('active');
        label.classList.remove('highlight');
      } else {
        label.classList.remove('highlight');
      }
    }
  }
}
