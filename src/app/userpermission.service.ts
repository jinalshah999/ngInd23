import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserPermissionService {
  adminPermission: boolean = true;
  constructor() {}
  isAdmin() {
    return this.adminPermission;
  }
}
