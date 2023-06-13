import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchFilterPipe } from './shared/search-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListRoutesComponent } from './list-routes/list-routes.component';
import { CertificatesComponent } from './certificates/certificates';
import { CertificateNewComponent } from './certificate-new/certificate-new.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthModule } from 'angular-auth-oidc-client';
import { AuthGuardService } from './auth/auth-guard.service';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ListRoutesComponent,
    CertificatesComponent,
    CertificateNewComponent,
    DashboardComponent,
    SearchFilterPipe,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule.forRoot({
      config: {
        authority: environment.authority,
        redirectUrl: environment.redirectUri,
        postLogoutRedirectUri: window.location.origin,
        clientId: environment.oidcClientId,
        scope: 'openid profile',
        responseType: 'code',
        silentRenew: false,
        useRefreshToken: false,
        customParamsRefreshTokenRequest: {
          scope: 'openid profile',
        },
      },
    }),
  ],
  providers: [
    AuthGuardService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }