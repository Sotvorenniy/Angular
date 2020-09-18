import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {ApiService} from "./services/api.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private auth: ApiService,
    private router: Router
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/'],
      );
    }
  }
}


