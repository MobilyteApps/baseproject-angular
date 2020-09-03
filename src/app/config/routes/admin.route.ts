import { AdminHomeComponent } from 'src/app/admin/admin-home.component';
import { AuthGuardAdmin } from '../guards/admin.auth';
import { AddEditUserComponent } from 'src/app/admin/components/add-edit-user/add-edit-user.component';

 export  const ADMIN_ROUTES = [
    {
		path: '',
		component: AdminHomeComponent,
		pathMatch: 'full'
	},
	{
		path: 'user/:mode',
		component: AddEditUserComponent,
	},
	{
		path: 'user/:mode/:user_id',
		component: AddEditUserComponent,
	}  

    
]