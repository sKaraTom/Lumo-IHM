import { Component, OnInit } from '@angular/core';
import { Departement } from "../objet-metier/departement";
import { ProfilPublic } from "../objet-metier/profil-public";
import { Profession } from "../objet-metier/profession";

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  listeDepartements : Departement[];
  listeMembres : ProfilPublic[];
  listeProfessions : Profession[] = [
    {"nomMetier":"photographie", "listeMembres":this.listeMembres},
    {"nomMetier":"retouche photo", "listeMembres":this.listeMembres},
    {"nomMetier":"maquillage", "listeMembres":this.listeMembres},
  
  
  ];

  constructor() {
    this.listeMembres = [];
   }

  ngOnInit() {

    this.listeDepartements = [
      {"numero" :971, "nom" :"Guadeloupe", "listeMembres" : this.listeMembres},
      {"numero" :972, "nom" :"Martinique", "listeMembres" : this.listeMembres},
      {"numero" :973, "nom" :"Guyane", "listeMembres" : this.listeMembres},
      // {"numero" :974, "nom" :"La Réunion", "listeMembres" : this.listeMembres},
      // {"numero" :976, "nom" :"Mayotte", "listeMembres" : this.listeMembres},
    ];

    for (var index = 0; index < 10; index++) {
      this.listeMembres.push({
        "uuid":"uuid" + index,
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom " + index,
        "prenom" : "prenom " + index,
        "professions": this.listeProfessions,
        "localisation": this.listeDepartements,
        "compteurPopularite" : index,
        "urlSite" : "http://www.yahoo.fr"
      });      
    }
    console.dir(this.listeMembres);

//  public uuid:string;
//     public photo:string;
//     public nom:string;
//     public prenom:string;
//     public professions:Profession[];
//     public localisation:Departement[];
//     public compteurPopularite:number;
//     public urlSite:string;

  }






}
