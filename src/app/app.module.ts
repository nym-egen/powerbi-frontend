import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {JwtModule} from "@auth0/angular-jwt";
import {LoginComponent} from './auth/login/login.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ReportViewerComponent} from './powerbi-backend/report-viewer/report-viewer.component';
import {AuthInterceptor} from "./auth/auth.interceptor";
import {RegisterComponent} from './auth/register/register.component';
import {UserManagementComponent} from './auth/user-management/user-management.component';
import {DashboardComponent} from './navbar/dashboard/dashboard.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import {MatGridListModule} from "@angular/material/grid-list";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ReportViewerComponent,
    RegisterComponent,
    UserManagementComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('jwt-token'),
        allowedDomains: ['localhost:8080'], // your API domain
      }
    }),
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
