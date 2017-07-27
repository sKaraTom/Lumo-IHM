import { Component, OnInit } from '@angular/core';
import { Departement } from "../objet-metier/departement";
import { ProfilPublic } from "../objet-metier/profil-public";
import { Profession } from "../objet-metier/profession";
import { ProfilClient } from "../objet-metier/profil-client";
import { SelectItem } from "primeng/primeng";
import { FormControl } from "@angular/forms";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  private uuidClient = "96f75bf3-216b-4813-ae99-03a3728b70fc";

  private client : ProfilClient;
  private listeMembresSelectionnes: ProfilPublic[];
  
  private saisieDepartement: any;
  private listeDepartementsSelectionnes : Departement [];
  listeDepartementsFiltres : any[];

  private listeDepartements : Departement[];
  private listeMembres : ProfilPublic[];
  private listeProfessions : Profession[] = [
    {"id" : 1, "nomMetier":"photographie", "listeMembres":this.listeMembres},
    {"id" : 2,"nomMetier":"retouche photo", "listeMembres":this.listeMembres},
    {"id" : 3,"nomMetier":"maquillage", "listeMembres":this.listeMembres},
  ];

  // autocomplete PROFESSION
  private listeToutesProfessions = ["Photographie","Retouche","Maquillage","Coiffure","Stylisme","Cadreuse/cadreuse","Montage vidéo","Ingénieur(e) son","Etalonnage"];
  private saisieProfession : string;
  private filtreProfessions : any[];

  private listeVilles: SelectItem[];

    country: any;
    countries: any[]
    filteredCountriesSingle: any[];
    filteredCountriesMultiple: any[];

    // Angular Material
    stateCtrl: FormControl;
    filteredStates: any;

     states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];


  constructor() {
    
    this.client = new ProfilClient();


    this.client.uuid = "bea5657e-a021-416d-b2a0-eda44fed7244";
    this.client.nom = "Sitter";
    this.client.prenom = "Alexandre";
    this.client.listeFavoris = [{
        "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc0",
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom 0",
        "prenom" : "prenom 0",
        "professions": this.listeProfessions,
        "localisation": this.listeDepartements,
        "compteurPopularite" : 0,
        "urlSite" : "http://www.yahoo.fr"
      }];
      this.client.listeVotes = [
        "96f75bf3-216b-4813-ae99-03a3728b70fc0"
      ];
    
    this.listeMembres = [];

    this.listeMembresSelectionnes = [];
    this.listeDepartementsSelectionnes = [];

    this.listeDepartementsFiltres = [];

     this.listeDepartements = [
      {"numero" :971, "nom" :"Guadeloupe", "listeMembres" : this.listeMembres},
      {"numero" :972, "nom" :"Martinique", "listeMembres" : this.listeMembres},
      {"numero" :973, "nom" :"Guyane", "listeMembres" : this.listeMembres},
      {"numero" :974, "nom" :"La Réunion", "listeMembres" : this.listeMembres},
      {"numero" :976, "nom" :"Mayotte", "listeMembres" : this.listeMembres},
    ];

    this.listeVilles = [];
        this.listeVilles.push({label:'sélectionner une ville', value:null});
        this.listeVilles.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
        this.listeVilles.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
        this.listeVilles.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
        this.listeVilles.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
        this.listeVilles.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});

    // Angular Material
    this.stateCtrl = new FormControl();
    this.filteredStates = this.stateCtrl.valueChanges
        .startWith(null)
        .map(name => this.filterStates(name));

   }

  ngOnInit() {


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




  private verifierSiFavori(uuid:string) : boolean {

    return this.client.listeFavoris.some(x => x.uuid === uuid)
  }

  private verifierSiVoteExistant(uuid:string) : boolean {
     return this.client.listeVotes.some(x => x === uuid);
  }

  private voter(membre:ProfilPublic, index:number) : void {

      // vérifier d'abord que le client n'a pas déjà voté (si contourne html) : A faire
      this.listeMembres[index].compteurPopularite = membre.compteurPopularite + 1;
      this.client.listeVotes.push(membre.uuid);

      // envoyer au mw : 
      // - le nouveau compteur de popularité du ProfilPublic à modifier dans la bdd.
      // - la liste de votes du ProfilClient à modifier dans la bdd : nouvelle entrée.  

  }


  // Angular Material
  filterStates(val: string) {
    return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.states;
  }


  private selectionnerProfil(membre:ProfilPublic, estSelectionne:boolean) : void {
    
    if(estSelectionne) {
      this.listeMembresSelectionnes.push(membre);
    }

    else if(!estSelectionne) {
      this.listeMembresSelectionnes = this.listeMembresSelectionnes.filter( item => item.uuid != membre.uuid )  
    }

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


   filtrerProfessions(event) {
        this.filtreProfessions = [];
        
        for(let i = 0; i < this.listeToutesProfessions.length; i++) {
            let profession = this.listeToutesProfessions[i];
            if(profession.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filtreProfessions.push(profession);
            }
        }
    }
    
    cliquerSurDropdownProfessions() {
        this.filtreProfessions = [];
        
        //mimic remote call
        setTimeout(() => {
            this.filtreProfessions = this.listeToutesProfessions;
        }, 10)
    }


    filterCountryMultiple(event) {
        let query = event.query;
      
            this.listeDepartementsFiltres = this.filterCountry(query, this.listeDepartements);
    }
    
    filterCountry(query, listeDepartements: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];


        for(let i = 0; i < listeDepartements.length; i++) {
            let departement = listeDepartements[i];
            if(departement.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(departement);
            }
        }
        return filtered;
    }



}
