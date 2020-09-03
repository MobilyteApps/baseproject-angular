import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// import { SITE_ROUTES, AUTH_PROVIDERS } from './site.route';
import { SITE_ROUTES } from './site.route';
import { AuthGuardAdmin } from '../guards/admin.auth';

const routing: Routes = [
	{
		path:"admin",
		canActivate: [AuthGuardAdmin],
		loadChildren:"src/app/admin/admin.module#AdminModule",

	},

	...SITE_ROUTES
];

export const routes: ModuleWithProviders = RouterModule.forRoot(routing);


