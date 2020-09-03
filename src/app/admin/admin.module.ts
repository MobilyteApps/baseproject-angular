import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminHomeComponent } from './admin-home.component';
import { RouterModule } from '@angular/router';
import { ADMIN_ROUTES } from '../config/routes/admin.route';
import { ShareModule } from '../shared/share.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AdminHomeComponent, AddEditUserComponent],
  imports: [
    CommonModule,
    ShareModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(ADMIN_ROUTES)
  ]
})
export class AdminModule { }
