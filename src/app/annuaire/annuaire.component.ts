import { Component, OnInit } from '@angular/core';

import { SelectItem } from "primeng/primeng";
import { FormControl } from "@angular/forms";

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

import { Departement } from "../objet-metier/departement";
import { Profession } from "../objet-metier/profession";
import { Membre } from "../objet-metier/Membre";
import { DepartementService } from "../services/departement.service";
import { ProfessionService } from "../services/profession.service";
import { MembreService } from "../services/membre.service";


@Component({
  selector: 'app-annuaire',
  templateUrl: './annuaire.component.html',
  styleUrls: ['./annuaire.component.css']
})
export class AnnuaireComponent implements OnInit {

  private uuidMembre = "96f75bf3-216b-4813-ae99-03a3728b70fc";

  private membre : Membre;

  // sélection du département
  private listeDepartements : Departement[] = [];
  private saisieDepartement: Departement;
  private filtreDepartements : any[];

  // sélection de la profession
  private listeProfessions: Profession[] = [];
  private saisieProfession : Profession;
  private filtreProfessions : Profession[] = [];

  private rechercheSansResultat : String; 

  private listeMembresSelectionnes: Membre[];
  private listeMembres : Membre[];
  
  // private listeProfessions : Profession[] = [
  //   {"id" : 1, "nomMetier":"photographie"},
  //   {"id" : 2,"nomMetier":"retouche photo"},
  //   {"id" : 3,"nomMetier":"maquillage"},
  // ];

  // autocomplete PROFESSION
  private listeToutesProfessions = ["Photographie","Retouche","Maquillage","Coiffure","Stylisme","Cadreuse/cadreuse","Montage vidéo","Ingénieur(e) son","Etalonnage"];
  

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


  constructor(private departementService:DepartementService,
              private professionService:ProfessionService,
              private membreService:MembreService) {
    

    this.obtenirListeDepartements();
    this.obtenirListeProfessions();

    // this.chercherMembres();



    this.membre = new Membre();
    this.membre.uuid = "26cbcd2f-f67f-4e21-a8fb-acaca3299c3e";
    this.membre.nom = "Sitter";
    this.membre.prenom = "Alexandre";
    this.membre.listeFavoris = [{
        "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc0",
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom 0",
        "prenom" : "prenom 0",
        "professions": this.listeProfessions,
        "localisation": this.listeDepartements,
        "compteurPopularite" : 0,
        "urlSite" : "http://www.yahoo.fr"
      }];
      this.membre.listeVotes = [
        "96f75bf3-216b-4813-ae99-03a3728b70fc0"
      ];
    
    this.listeMembres = [];

    this.listeMembresSelectionnes = [];

    //  this.listeDepartements = [
    //   {"numero" :971, "nom" :"Guadeloupe"},
    //   {"numero" :972, "nom" :"Martinique"},
    //   {"numero" :973, "nom" :"Guyane"},
    //   {"numero" :974, "nom" :"La Réunion"},
    //   {"numero" :976, "nom" :"Mayotte"},
    // ];

    this.listeVilles = [];
        this.listeVilles.push({label:'sélectionner une ville', value:null});
        this.listeVilles.push({label:'New York', value:{id:1, name: 'New York', code: 'NY'}});
        this.listeVilles.push({label:'Rome', value:{id:2, name: 'Rome', code: 'RM'}});
        this.listeVilles.push({label:'London', value:{id:3, name: 'London', code: 'LDN'}});
        this.listeVilles.push({label:'Istanbul', value:{id:4, name: 'Istanbul', code: 'IST'}});
        this.listeVilles.push({label:'Paris', value:{id:5, name: 'Paris', code: 'PRS'}});

    // Angular Material
    // this.stateCtrl = new FormControl();
    // this.filteredStates = this.stateCtrl.valueChanges
    //     .startWith(null)
    //     .map(name => this.filterStates(name));

   }

  ngOnInit() {


    // for (var index = 0; index < 10; index++) {
    //   this.listeMembres.push({
    //     "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc" + index,
    //     "photo":"../../assets/wedding-photographer-portrait.jpg",
    //     "nom":"nom " + index,
    //     "prenom" : "prenom " + index,
    //     "listeProfessions": this.listeProfessions,
    //     "listeDepartements": this.listeDepartements,
    //     "compteurPopularite" : index,
    //     "urlSite" : "http://www.yahoo.fr",
    //     "listeVotes" : [],
    //     "listeFavoris" : []
    //   });      
    // }
    
  }

  // ***********ZONE SELECTION DEPARTEMENT**********
  
  /**
   * obtenir la liste de tous les départements
   * remplit  listeDepartements : Departement[] avec le résultat.
   */
  private obtenirListeDepartements() : void {

    this.departementService.obtenirTousDepartements()
        .subscribe( res => this.listeDepartements = res,
                    err => console.log(err._body));
  }

  /**
   * filtrer la liste des départements en fonction de la saisie
   * 
   * @param event récupérer en temps réel la saisie
   */
  private filtrerDepartements(event) : void {
      this.filtreDepartements = [];

      let query = event.query;
      console.log(query);

      for(let i = 0; i < this.listeDepartements.length; i++) {
          let departement = this.listeDepartements[i];
          
          if(departement.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              this.filtreDepartements.push(departement);
          }
      }
  }

  /**
   * afficher la liste complète des départements
   * si clic sur dropdown
   * 
   * @param event 
   */
  private cliquerDropdownDepartements(event) : void {

      this.filtreDepartements = [];

      setTimeout(() => {
          this.filtreDepartements = this.listeDepartements;
      }, 10)

  }

  // ***********ZONE SELECTION PROFESSION **********

  /**
   * obtenir la liste de toutes les professions
   * charge ListeProfessions : Profession[] avec le résultat
   * 
   */
  private obtenirListeProfessions() : void {
      this.professionService.obtenirTousDepartements()
          .subscribe(res => this.listeProfessions = res,
                      err => console.log(err._body));
  }
  
  /**
   * filtrer la liste des professions en fonction de la saisie
   * 
   * @param event récupérer en temps réel la saisie
   */
  private filtrerProfessions(event) : void {
        this.filtreProfessions = [];
        
        for(let i = 0; i < this.listeProfessions.length; i++) {
            let profession = this.listeProfessions[i];
            if(profession.metier.toLowerCase().indexOf(event.query.toLowerCase()) == 0) {
                this.filtreProfessions.push(profession);
            }
        }
  }
  
  /**
   * afficher la liste complète des professions
   * si clic sur dropdown
   */
  private cliquerDropdownProfessions() : void {
        this.filtreProfessions = [];

        setTimeout(() => {
            this.filtreProfessions = this.listeProfessions;
        }, 10);
  }

//   *****************************

  /**
   * chercher des membres à partir d'un département et d'une profession.
   * l'uuid du membre connecté est envoyé pour le soustraire de la recherche.
   * 
   */
  private chercherMembres() : void {
    
    if(this.saisieDepartement && this.saisieProfession) {
      this.membreService.chercherMembres(this.saisieDepartement.numero,this.saisieProfession.id,"cdc9a400-1d0c-419e-aa4e-9917f9bb6da7")
          .subscribe(
            res => {
                if(res == 204) { 
                    this.rechercheSansResultat = "Aucun résultat pour cette recherche."; 
                    this.listeMembres = []; }
                else { 
                    this.listeMembres = res; 
                    this.rechercheSansResultat = null; }
            },
            err => console.log(err._body));
    }
    else {
        // mettre message d'erreur type growl.
        console.log("le département et la profession doivent être renseignés.")
    }                
  }





// ***************** TESTS


  // bouton de test des objets récupérés dans champs de saisie.
  // A SUPPRIMER
  private afficherSaisie() {

    console.dir(this.saisieDepartement);
    console.dir(this.saisieProfession);

  }



  private verifierSiFavori(uuid:string) : boolean {

    return this.membre.listeFavoris.some(x => x.uuid === uuid)
  }

  private verifierSiVoteExistant(uuid:string) : boolean {
     return this.membre.listeVotes.some(x => x === uuid);
  }

  private voter(membre:Membre, index:number) : void {

      // vérifier d'abord que le client n'a pas déjà voté (si contourne html) : A faire
      this.listeMembres[index].compteurPopularite = membre.compteurPopularite + 1;
      this.membre.listeVotes.push(membre.uuid);

      // envoyer au mw : 
      // - le nouveau compteur de popularité du Membre à modifier dans la bdd.
      // - la liste de votes du membre à modifier dans la bdd : nouvelle entrée.  

  }


  // Angular Material
  // filterStates(val: string) {
  //   return val ? this.states.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
  //              : this.states;
  // }


  private selectionnerProfil(membre:Membre, estSelectionne:boolean) : void {
    
    if(estSelectionne) {
      this.listeMembresSelectionnes.push(membre);
    }

    else if(!estSelectionne) {
      this.listeMembresSelectionnes = this.listeMembresSelectionnes.filter( item => item.uuid != membre.uuid )  
    }

  }







  
    



}
