import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {AuthGuard} from "./auth/auth.guard";
import {ReportViewerComponent} from "./powerbi-backend/report-viewer/report-viewer.component";
import {RegisterComponent} from "./auth/register/register.component";
import {UserManagementComponent} from "./auth/user-management/user-management.component";
import {DashboardComponent} from "./navbar/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', redirectTo: 'report', pathMatch: 'full'}, // Redirect to report on dashboard load
      {path: 'report', component: ReportViewerComponent},
      {
        path: 'admin/users',
        component: UserManagementComponent,
        canActivate: [AuthGuard],
        data: {roles: ['ROLE_ADMIN']}
      },
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '**', redirectTo: ''} // Fallback to dashboard root
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
