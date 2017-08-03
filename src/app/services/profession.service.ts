import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import { Profession } from "../objet-metier/profession";

@Injectable()
export class ProfessionService {

  private urlLumo : String = "http://localhost:8080/lumo-0.1/ws/";


  constructor(private http: Http) { }


  /**
   * obtenir la liste de toutes les professions
   * 
   * @return Profession[]
   */
  public obtenirToutesProfessions() : Observable<Profession[]> {

    const url = `${this.urlLumo +"profession"}`;
    
    return this.http.get(url)
                     .map((response:Response) => response.json());
  }




}
