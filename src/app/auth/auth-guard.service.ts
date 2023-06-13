import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthService, public router: Router) { }

  canActivate(): boolean {
    if(environment.applicationProtected) {
      if(this.authService.authenticated) {
        return true;
      } else {
        this.router.navigate(["unauthorized"]);
        return false;
      }
    } else {
      return true;
    }
    
  }
}