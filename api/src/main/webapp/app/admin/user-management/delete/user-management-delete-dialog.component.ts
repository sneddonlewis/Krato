import { Component } from '@angular/core';

import { User } from '../user-management.model';
import { UserManagementService } from '../service/user-management.service';

@Component({
  selector: 'jhi-user-mgmt-delete-dialog',
  templateUrl: './user-management-delete-dialog.component.html',
})
export class UserManagementDeleteDialogComponent {
  user?: User;

  constructor(private userService: UserManagementService) {}

  cancel(): void {}

  confirmDelete(login: string): void {
    this.userService.delete(login).subscribe(() => {
      console.log('deleted: ', login);
    });
  }
}
