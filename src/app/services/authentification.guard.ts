import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthentificationGuard implements CanActivate {

  constructor(private router: Router) {}
  



  canActivate(next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    let url = state.url; 

    return this.validerConnexion(url);
  }


  private validerConnexion(url:string) : boolean {

    if( (localStorage.getItem('token')) && (localStorage.getItem('id')) && (localStorage.getItem('prenom')) ) { 

      return true;
    }

    else {
      this.router.navigate(['/connexion']);
      return false;
    }
  }

}
