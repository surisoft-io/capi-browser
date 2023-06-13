import { Injectable, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService implements OnInit {
    authenticated: boolean = false;

    constructor(public oidcSecurityService: OidcSecurityService) { }
    ngOnInit(): void {
        this.oidcSecurityService.isAuthenticated$.subscribe(({ isAuthenticated }) => {
            if (isAuthenticated) {
                this.authenticated = true;
            }
        });
    }

    login() {
        this.oidcSecurityService.authorize();
    }

    accessToken(): Observable<string> {
        return this.oidcSecurityService.getAccessToken();
    }

    refreshSession() {
        this.oidcSecurityService.forceRefreshSession().subscribe((result) => console.log(result));
    }

    logout() {
        this.oidcSecurityService.logoff();
    }

    logoffAndRevokeTokens() {
        this.oidcSecurityService.logoffAndRevokeTokens().subscribe((result) => console.log(result));
    }

    revokeRefreshToken() {
        this.oidcSecurityService.revokeRefreshToken().subscribe((result) => console.log(result));
    }

    revokeAccessToken() {
        this.oidcSecurityService.revokeAccessToken().subscribe((result) => console.log(result));
    }
}