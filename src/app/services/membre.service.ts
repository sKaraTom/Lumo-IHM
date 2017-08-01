import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from "rxjs/Observable";
import { Http, Response, Headers,RequestOptions } from "@angular/http";
import { Membre } from "../objet-metier/Membre";

@Injectable()
export class MembreService {

  private urlLumo : String = "http://localhost:8080/lumo-0.1/ws/";

  constructor(private http: Http) { }

  public chercherMembres(numeroDepartement:string, idProfession:number, uuidMembre:string) {

    const url = `${this.urlLumo +"membre"}/${numeroDepartement}/${idProfession}/${uuidMembre}`;
    console.log(url);

    return this.http.get(url)
                     .map((response:Response) => {
                       if(response.status == 204) {
                            return response.status }
                      else{
                            return response.json();
                      }})
                     .do(res => console.dir(res));
  }


}
