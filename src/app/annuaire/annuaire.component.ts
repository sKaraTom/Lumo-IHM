import { Component, OnInit } from '@angular/core';
import { Departement } from "../objet-metier/departement";
import { ProfilPublic } from "../objet-metier/profil-public";
import { Profession } from "../objet-metier/profession";
import { ProfilClient } from "../objet-metier/profil-client";

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  private client : ProfilClient;
  private listeMembresSelectionnes: ProfilPublic[];
  
  private saisieDepartement: string;
  private listeDepartementsSelectionnes : Departement [];

  private listeDepartements : Departement[];
  private listeMembres : ProfilPublic[];
  private listeProfessions : Profession[] = [
    {"nomMetier":"photographie", "listeMembres":this.listeMembres},
    {"nomMetier":"retouche photo", "listeMembres":this.listeMembres},
    {"nomMetier":"maquillage", "listeMembres":this.listeMembres},
  ];



  // public uuid:string;
    // public photo:string;
    // public nom:string;
    // public prenom:string;
    // public professions:Profession[];
    // public localisation:Departement[];
    // public urlSite:string;
    // public compteurPopularite:number;

    // public listeFavoris:ProfilPublic[];
    // public listeVotes:String[];



  constructor() {

    this.client = new ProfilClient();


    this.client.uuid = "bea5657e-a021-416d-b2a0-eda44fed7244";
    this.client.nom = "Sitter";
    this.client.prenom = "Alexandre";
    this.client.listeFavoris = [{
        "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc",
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom 0",
        "prenom" : "prenom 0",
        "professions": this.listeProfessions,
        "localisation": this.listeDepartements,
        "compteurPopularite" : 0,
        "urlSite" : "http://www.yahoo.fr"
      }];
    
    this.listeMembres = [];

    this.listeMembresSelectionnes = [];
    this.listeDepartementsSelectionnes = [];

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
        "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc" + index,
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom " + index,
        "prenom" : "prenom " + index,
        "professions": this.listeProfessions,
        "localisation": this.listeDepartements,
        "compteurPopularite" : index,
        "urlSite" : "http://www.yahoo.fr"
      });      
    }
    


  }


  private selectionnerProfil(membre:ProfilPublic, estSelectionne:boolean) : void {
    
    console.log("estSelectionne ",estSelectionne);
    // console.dir(this.listeMembresSelectionnes);

    if(estSelectionne) {
      // console.log("boucle true");
      this.listeMembresSelectionnes.push(membre);
    }

    else if(!estSelectionne) {
      // console.log("boucle false");
      this.listeMembresSelectionnes = this.listeMembresSelectionnes.filter( item => item.uuid != membre.uuid )  
    }

    console.dir(this.listeMembresSelectionnes);

  }

  private filtrerDepartements(event) : void {
    
    this.listeDepartementsSelectionnes = [];

    let query = event.query;
    console.log(query);

    for(let i = 0; i < this.listeDepartements.length; i++) {
        
      let departement = this.listeDepartements[i];
        
      if(departement.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
            this.listeDepartementsSelectionnes.push(departement);
      }
    }
    
    console.dir(this.listeDepartementsSelectionnes);
  }

  private cliquerDropdownDepartements(event) : void {

    this.listeDepartementsSelectionnes = [];

    this.listeDepartementsSelectionnes = this.listeDepartements;

  }


}
