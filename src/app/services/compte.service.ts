import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { Compte } from "../objet-metier/compte";
import { Router } from "@angular/router";

@Injectable()
export class CompteService {

  private urlLumo : String = "http://localhost:8080/lumo-0.1/ws/";

  private headers = new Headers({'Content-Type': 'application/json'});

  private idClient: string;
  // observable string sources
  public idClientSource : BehaviorSubject<string> = new BehaviorSubject<string>('');
  // observable string flux
  public idClientObs : Observable<string> = this.idClientSource.asObservable();



  constructor(private http: Http,private router: Router) {

    this.idClient = localStorage.getItem('id');
    this.idClientSource.next(localStorage.getItem('id'));

    this.headers.append('authorization', `Bearer ${localStorage.getItem('token')}`);

   }

  public creerCompte(compte:Compte) {

    const url = `${this.urlLumo +"compte"}`;

    return this.http.post(url, compte)
            .map(res => res.text());

  }

  public connecterCompte(compte:Compte) {

    const url = `${this.urlLumo +"compte/connexion"}`;

    return this.http.post(url, compte, { headers: this.headers })
        .map((data:Response) => {
              let token = data.json().token;

              if(token) {
                this.headers = new Headers({ 'Content-Type': 'application/json',
                'authorization': token});
                let id = data.json().uuidMembre;
                this.idClient = id;
                this.idClientSource.next(id);

                localStorage.setItem('token', token);
                localStorage.setItem('id',id);
                localStorage.setItem('prenom',data.json().prenom);

                console.dir(data);

                return data.json();

              }
            }
        )
  }

  public deconnecterCompte() : void {

      this.idClient = null;
      this.idClientSource.next('');
      localStorage.clear();
      this.router.navigate(['/accueil']);

  }
  

}
