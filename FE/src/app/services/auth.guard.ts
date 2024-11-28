import { CanActivateFn, Router } from '@angular/router';
import { MessageService } from './message.service';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

const roles: any = localStorage.getItem('roles');

export const authGuard: CanActivateFn = (route, state) => {
  const messageService = inject(MessageService);
  const router = inject(Router);
  const translateService = inject(TranslateService);
  let authMessage = '';
  // translateService
  //   .get('auth.message')
  //   .subscribe((item) => (authMessage = item));
  // Lấy danh sách các vai trò được phân quyền từ Backend
  
  const rolesFromBackend: string[] = roles ? roles.split(',') : [];

   // Lấy các vai trò cần thiết từ route data
   const rolesRequired = route.data['roles'] as Array<string>;

   let hasRequiredRoles = true;
   // Kiểm tra xem người dùng có vai trò không
  
   for(let role of rolesFromBackend){
    if(role == 'atino_admin'){
      hasRequiredRoles = false;
    }
   }
 
   console.log(hasRequiredRoles)
   if (hasRequiredRoles) {
    router.navigate(['./admin/login']);
     return true;
   } else {
     //messageService.notificationWarning(authMessage);
     router.navigate(['./admin']);
     return false;
   }
};
