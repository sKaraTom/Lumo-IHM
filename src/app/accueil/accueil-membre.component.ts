import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accueil-membre',
  templateUrl: './accueil-membre.component.html',
  styleUrls: ['./accueil-membre.component.css']
})
export class AccueilMembreComponent implements OnInit {

  prenomMembre : String;

  constructor() { }

  ngOnInit() {

    this.prenomMembre = localStorage.getItem('prenom');


  }

}
