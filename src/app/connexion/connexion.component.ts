import { Component, OnInit } from '@angular/core';
import { CompteService } from "../services/compte.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Compte } from "../objet-metier/compte";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  constructor(private compteService: CompteService,
              private router: Router) { }

  ngOnInit() {
  }


  public connecterCompte(form:NgForm) {

    let compte:Compte = new Compte();
    compte.email = form.value.email;
    compte.password = form.value.password;

    this.compteService.connecterCompte(compte)
            .subscribe(res => {console.dir(res);
                      this.router.navigate(['/accueil/cli']);
                      },
                      err => console.log(err._body));
  }



}
