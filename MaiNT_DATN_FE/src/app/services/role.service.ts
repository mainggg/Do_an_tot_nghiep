import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  listRole: string[] = [];

  constructor(private __baseService: BaseService) {}

  getListRole() {
    return this.__baseService.getData(`api/current-user/roles`);
  }

  setListRole(data: string[]) {
    this.listRole = data;
  }

  hasAnyRoleOf(desiredRoles: string[]) {
    for (const role of desiredRoles) {
      if (this.listRole.includes(role)) {
        return role;
      }
    }
    return null;
  }

  checkRole(role: string) {
    return this.listRole.some((str) => str.includes(role));
  }
}
