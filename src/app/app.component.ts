import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { AuthService } from './auth/auth.service';
import UIkit from 'uikit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  endpointForm: FormGroup;
  title = environment.appName;
  capiEndpoint: string = environment.capiEndpoint;
  endpoint: string = "";
  claims: any;
  authenticated: boolean = false;
  applicationProtected: boolean = environment.applicationProtected;
  loginButtonText: string = "Login";

  constructor(public oidcSecurityService: OidcSecurityService, private authService: AuthService) {
    this.endpointForm = new FormGroup({
      endpoint: new FormControl()
    });
    if (localStorage.getItem("capiEndpoint") === null) {
      localStorage.setItem('capiEndpoint', this.capiEndpoint);
    } else {
      this.capiEndpoint = localStorage.getItem("capiEndpoint")!;
    }
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

  changeEndpoint() {
    localStorage.setItem('capiEndpoint', this.endpointForm.get('endpoint')?.value);
    this.capiEndpoint = this.endpointForm.get('endpoint')?.value;
    UIkit.notification({
      message: 'Endpoint changed to: ' + this.capiEndpoint,
      status: 'warning',
      timeout: 3000
    });
  }

  handleLogin = () => this.authenticated ? this.authService.logout() : this.authService.login();

}