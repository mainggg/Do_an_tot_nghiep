import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accouting',
  templateUrl: './accouting.component.html',
  styleUrls: ['./accouting.component.css'],
})
export class AccoutingComponent implements OnInit {
  dataInformation: any = {};

  name: any = ''

  constructor(private userService: AdminService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getUserDetail()
  }

  listSex: any = [
    {
      type: 1,
      name: 'Nam',
    },
    {
      type: 2,
      name: 'Nữ',
    },
  ];


  columns: any[] = [
    {
      keyName: 'name',
      keyTitle: 'Họ và tên',
      check: true,
      isRequired: true,
    },
    {
      keyName: 'phoneNumber',
      keyTitle: 'Số điện thoại',
      check: true,
      isRequired: true,
    },
    {
      keyName: 'email',
      keyTitle: 'Email',
      check: true,
      isRequired: false,
    },
    {
      keyName: 'address',
      keyTitle: 'Địa chỉ',
      check: true,
    },
  ];

  visibleModal: boolean  = false;

  async getUserDetail(){
    const userName = localStorage.getItem('customerUserName')
    await this.userService.getUserDetail(userName).then((res) => {
      if(res.result.responseCode == '00'){
        this.name = res.data.firstName + ' ' + res.data.lastName
        this.dataInformation = {
          name: res.data.firstName + ' ' + res.data.lastName,
          phoneNumber: res.data.phoneNumber,
          email: res.data.email,
          address: res.data.address
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('customerUserName');
    this._router.navigate(['./home/home-page'])
  }

  changePassword: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  onHandleChangePassword() {
    this.visibleModal = true;
  }

  onHandleCancel() {
    this.visibleModal = false;
  }

  handleConfirm() {

  }

  passwordVisible: boolean = false;
  passwordNewVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }
  togglePasswordNewVisibility() {
    this.passwordNewVisible = !this.passwordNewVisible;
  }
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }
}
