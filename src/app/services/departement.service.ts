import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers,RequestOptions } from "@angular/http";

import { Departement } from "../objet-metier/departement";

@Injectable()
export class DepartementService {

  private urlLumo : String = "http://localhost:8080/lumo-0.1/ws/";


  constructor(private http: Http) { }

  /**
   * obtenir la liste de tous les départements.
   * 
   * @return Departement[]
   */
  public obtenirTousDepartements() : Observable<Departement[]> {

    const url = `${this.urlLumo +"departement"}`;
    
    return this.http.get(url)
                     .map((response:Response) => response.json());
  }


}
