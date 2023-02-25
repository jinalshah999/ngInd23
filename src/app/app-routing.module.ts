import { inject, NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Dashboard1Component } from './dashboard1/dashboard1.component';
import { isLoggedGuardFn } from './func.guard';
import { HomeComponent } from './home/home.component';
import { NoAccessComponent } from './no-access/no-access.component';
import { ProductComponent } from './product/product.component';
import { UserPermissionService } from './userpermission.service';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      () => inject(AuthService).isLoggedIn(),
      () => inject(UserPermissionService).isAdmin(),
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    //canActivate: [isLoggedGuardFn],
    canMatch: [
      () => {
        const auth = inject(AuthService);
        const userPermission = inject(UserPermissionService);
        return userPermission.isAdmin() && auth.isLoggedIn();
      },
    ],
  },
  {
    path: 'dashboard',
    component: Dashboard1Component,
    canMatch: [
      () => {
        const auth = inject(AuthService);
        return auth.isLoggedIn();
      },
    ],
  },
  {
    path: 'demo',
    loadComponent: () =>
      import('./demo/demo.component').then((c) => c.DemoComponent),
    canMatch: [
      () =>
        inject(UserPermissionService).isAdmin() ||
        inject(Router).navigate(['no-access']),
    ],
    // canLoad: [
    //   () =>
    //     inject(UserPermissionService).isAdmin() ||
    //     inject(Router).navigate(['no-access']),
    // ],
  },
  { path: 'no-access', component: NoAccessComponent },
  { path: '**', redirectTo: 'no-access' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
