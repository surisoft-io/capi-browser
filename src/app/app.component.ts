import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = environment.appName;
  endpoint: string = "";
  claims: any;
  authenticated: boolean = false;
  applicationProtected: boolean = environment.applicationProtected;
  certificateManagementEnabled: boolean = environment.certificateManagementEnabled;
  loginButtonText: string = "Login";

  constructor(public oidcSecurityService: OidcSecurityService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated }) => {
      this.authService.authenticated = isAuthenticated;
      this.authenticated = isAuthenticated;
      if (isAuthenticated) {
        this.oidcSecurityService.getUserData().subscribe((result: any) => {
          this.loginButtonText = "Logout (" + result.name + ")";
        });
      }
    });

  }

  handleLogin = () => this.authenticated ? this.authService.logout() : this.authService.login();

}