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


  constructor(private departementService:DepartementService,
              private professionService:ProfessionService,
              private membreService:MembreService) {
    

    this.obtenirListeDepartements();
    this.obtenirListeProfessions();

    this.membre = new Membre();
    this.membre.uuid = "26cbcd2f-f67f-4e21-a8fb-acaca3299c3e";
    this.membre.nom = "Sitter";
    this.membre.prenom = "Alexandre";
    this.membre.listeFavoris = [{
        "uuid":"96f75bf3-216b-4813-ae99-03a3728b70fc0",
        "photo":"../../assets/wedding-photographer-portrait.jpg",
        "nom":"nom 0",
        "prenom" : "prenom 0",
        "listeProfessions": this.listeProfessions,
        "listeDepartements": this.listeDepartements,
        "listeVotes": [],
        "listeFavoris":[],
        "compteurPopularite" : 0,
        "urlSite" : "http://www.yahoo.fr"
      }];
      this.membre.listeVotes = [
        "96f75bf3-216b-4813-ae99-03a3728b70fc0"
      ];
    
    this.listeMembres = [];

    this.listeMembresSelectionnes = [];



   }

  ngOnInit() {

    
  }

  // ***********ZONE SELECTION DEPARTEMENT**********
  
 /**
 * obtenir la liste de tous les départements et l'attribuer à listeDepartements : Departement[].
 * - Si début de session récupérer la liste depuis le serveur.
 * - Sinon récupèrer la liste depuis ce sessionStorage.
 * charger listeDepartements[].
 */
private obtenirListeDepartements() : void {

    if(!sessionStorage.getItem('departements')) {
        console.log("obtenirDepartements MW");
        this.departementService.obtenirTousDepartements()
            .subscribe( res => this.listeDepartements = res,
                    err => console.log(err._body),
                    () => sessionStorage.setItem('departements',JSON.stringify(this.listeDepartements))
        )
    }
    else {
       this.listeDepartements = JSON.parse(sessionStorage.getItem('departements'));
    }
}

/**
 * obtenir la liste de toutes les professions
 * - Si début de session récupérer la liste depuis le serveur.
 * - Sinon récupèrer la liste depuis ce sessionStorage.
 * charger listeProfessions[].
 * 
 */
private obtenirListeProfessions() : void {
       if(!sessionStorage.getItem('professions')) {
            console.log("obtenirProfessions MW");
            this.professionService.obtenirToutesProfessions()
            .subscribe(res => this.listeProfessions = res,
                        err => console.log(err._body),
                        () => sessionStorage.setItem('professions',JSON.stringify(this.listeProfessions)) 
                    )
        }
        else {
        this.listeProfessions = JSON.parse(sessionStorage.getItem('professions'));
        }
}

  /**
   * filtrer la liste des départements en fonction de la saisie
   * 
   * @param event récupérer en temps réel la saisie
   */
  private filtrerDepartements(event) : void {
      this.filtreDepartements = [];

      let query = event.query;

      for(let i = 0; i < this.listeDepartements.length; i++) {
          let departement = this.listeDepartements[i];
          
          if(departement.nom.toLowerCase().indexOf(query.toLowerCase()) == 0) {
              this.filtreDepartements.push(departement);
          }
          else if(departement.numero.indexOf(query) == 0) {
            this.filtreDepartements.push(departement); 
          }
      }
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
   * afficher la liste complète des départements
   * si clic sur dropdown
   * 
   * @param event 
   */
  private cliquerDropdownDepartements(event) : void {

      this.filtreDepartements = [];

      setTimeout(() => {
          this.filtreDepartements = this.listeDepartements; //.map(x=>Object.assign({}, x));
          console.dir(this.filtreDepartements);
      }, 10)

  }
  
  /**
   * afficher la liste complète des professions
   * si clic sur dropdown
   */
  private cliquerDropdownProfessions() : void {
        this.filtreProfessions = [];
        console.dir(this.filtreProfessions);

        setTimeout(() => {
            this.filtreProfessions = this.listeProfessions.map(x=>x);
            console.dir(this.filtreProfessions);
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



  private selectionnerProfil(membre:Membre, estSelectionne:boolean) : void {
    
    if(estSelectionne) {
      this.listeMembresSelectionnes.push(membre);
    }

    else if(!estSelectionne) {
      this.listeMembresSelectionnes = this.listeMembresSelectionnes.filter( item => item.uuid != membre.uuid )  
    }

  }







  
    



}
