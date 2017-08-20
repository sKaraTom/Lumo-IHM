import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import { Compte } from "../objet-metier/compte";

@Injectable()
export class CompteService {

  private urlLumo : String = "http://localhost:8080/lumo-0.1/ws/";

  constructor(private http: Http) { }

  public creerCompte(compte:Compte) {

    const url = `${this.urlLumo +"compte"}`;

    return this.http.post(url, compte)
            .map(res => res.text());

  }



}
