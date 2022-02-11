import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/store/auth/auth.state';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root'
})
export class RedirectIfAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user = this.store.selectSnapshot(AuthState.user);
      if (user) {
        const redirectUrl: string = user.role === RolesEnum.Admin ? 'admin/dashboard' : '/';
        this.router.navigate([redirectUrl]);
        return false;
      }
    
      return true;
  }
  
}
