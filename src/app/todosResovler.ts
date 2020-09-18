import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {EMPTY, Observable, of} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable()
// @ts-ignore

export class TodosResovler implements Resolve<any>{

  constructor(private http: HttpClient, private router: Router){}

  resolve(route: ActivatedRouteSnapshot): Observable<any>{
    return this.http.get('/todo-list').pipe(
      tap(
        res => of(res),
        err => {
          this.router.navigate(['/']);
          return EMPTY;
        }
      )
    );
  }
}
