import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): boolean {
    //Si el token está caducado, devuelve a Home
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/Home']);
      return false;
    }
    return true;
  }
}
