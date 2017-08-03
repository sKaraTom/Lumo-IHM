import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Departement } from "../objet-metier/departement";
import { DepartementService } from "../services/departement.service";
import { Message } from "primeng/primeng";
import { Profession } from "../objet-metier/profession";
import { ProfessionService } from "../services/profession.service";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Compte } from "../objet-metier/compte";
import { Membre } from "../objet-metier/Membre";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit,AfterViewChecked {

  // sélection du département
  private listeDepartements : Departement[] = [];
  private saisieDepartement: Departement;
  private filtreDepartements : any[];
  private departementsSelectionnes : Departement[] = [];

  // sélection de la profession
  private listeProfessions: Profession[] = [];
  private saisieProfession : Profession;
  private filtreProfessions : Profession[] = [];
  private professionsSelectionnees : Profession[] = [];

  // Upload de la photo
  uploadedFiles: any[] = [];
  @ViewChild('photo') element:ElementRef;
  private urlPhoto : string;

  // growl primeng
  msgs: Message[] = [];


  constructor(private departementService:DepartementService,
            private professionService:ProfessionService,
            private changeDetectionRef : ChangeDetectorRef) { 
        
        this.saisieDepartement = new Departement();
        this.saisieProfession = new Profession();

    }


  ngOnInit() {
        this.obtenirListeDepartements();
        this.obtenirListeProfessions();
  }

  // pour détecter les changements après le chargement de la vue
  // sert pour passer en [disabled] avec la méthode limiterSelections(liste) : boolean
  ngAfterViewChecked() : void {
    this.changeDetectionRef.detectChanges();
  }


private creerCompte(form:NgForm) : void {

  // vérifier : 
  // 2 passwords égaux, formulaire valide
  //  

  let compte = new Compte();

  compte.email = form.value.email;
  compte.password = form.value.mdp;
  
  let membre = new Membre();
  membre.nom = form.value.nom;
  membre.prenom = form.value.prenom;
  membre.urlSite = form.value.url;
  membre.photo = "../../assets/wedding-photographer-portrait.jpg"; // à revoir
  membre.compteurPopularite = 0;
  membre.listeDepartements = this.departementsSelectionnes;
  membre.listeProfessions = this.professionsSelectionnees;
  membre.listeFavoris = [];
  membre.listeVotes = [];

  compte.membre = membre;

  console.dir(compte);

}


/**
 * Annuler l'inscription : reset complet du formulaire.
 * vider les listes de départements/professions sélectionnées.
 * réinitialiser les listes complètes de départements/professions depuis le sessionStorage.
 */
private annulerInscription() : void {
    this.departementsSelectionnes=[];
    this.professionsSelectionnees=[];

    this.listeProfessions = JSON.parse(sessionStorage.getItem('professions'));
    this.listeDepartements = JSON.parse(sessionStorage.getItem('departements'));
}


 // ***********ZONE UPLOAD PHOTO **********

private chargerPhoto(event) : void {
    console.log(this.element);
    console.log(this.element.nativeElement.files[0].name);
    console.log(this.element.nativeElement.files[0].type);
    console.log(this.element.nativeElement.files[0].size/1000 + " Kbytes.");

    // partie pour récupérer la photo et l'afficher dans la vue
    // sans passer par le serveur.
    let reader = new FileReader();

    reader.onload = (event:any) => {
      this.urlPhoto = event.target.result;
    }

    reader.readAsDataURL(event.target.files[0]);

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        formData.append('photoChargee', file, file.name);
        let headers = new Headers();
        
        // PARTIE SERVICE
        /** No need to include Content-Type in Angular 4 */
        // headers.append('Content-Type', 'multipart/form-data');
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
        // this.http.post(`${this.apiEndPoint}`, formData, options)
        //     .map(res => res.json())
        //     .catch(error => Observable.throw(error))
        //     .subscribe(
        //         data => console.log('success'),
        //         error => console.log(error)
        //     )
    }

}

private chargerImage(event) : void {

    for(let file of event.files) {
            console.log(file);
            this.uploadedFiles.push(file);
            console.log(this.uploadedFiles.length);
    }

}

// ***********ZONE SELECTION DEPARTEMENTS/PROFESSIONS**********

/**
 * obtenir la liste de tous les départements et l'attribuer à listeDepartements : Departement[].
 * - Si début de session récupérer la liste depuis le serveur.
 * - Sinon récupère la liste depuis ce sessionStorage.
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
 * - Sinon récupère la liste depuis ce sessionStorage.
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
          this.filtreDepartements = this.listeDepartements;
      }, 10)
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

/**
 * sélectionner un département depuis le dropdown : l'ajouter à la liste departementsSelectionnes.
 * S'assurer qu'il n'y a pas de doublon ou + de 3 entrées.
 * Retirer le département sélectionné de la liste initiale.
 * 
 */    
private selectionnerDepartement() : void {
    
    if(this.departementsSelectionnes.some(x => x.numero === this.saisieDepartement.numero) ) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Doublon', detail:'Vous ne pouvez ajouter 2 fois le même département.'});
    }

    else if(this.departementsSelectionnes.length >= 3) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Maximum atteint', detail:'Vous ne pouvez ajouter plus de trois départements comme lieux d\' activité.'});
    }

    else {
        this.departementsSelectionnes.push(this.saisieDepartement);
        this.listeDepartements = this.listeDepartements.filter(item => item != this.saisieDepartement);
    }

    this.saisieDepartement = new Departement();
}

/**
 * sélectionner une profession depuis le dropdown : l'ajouter à la liste professionsSelectionnees.
 * S'assurer qu'il n'y a pas de doublon ou + de 3 entrées.
 * retirer la profession sélectionnée de la liste initiale.
 * 
 */    
private selectionnerProfession() : void {
    
    if(this.professionsSelectionnees.some(x => x.id === this.saisieProfession.id) ) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Doublon', detail:'Vous ne pouvez ajouter 2 fois la même profession.'});
    }

    else if(this.professionsSelectionnees.length >= 3) {
        this.msgs = [];
        this.msgs.push({severity:'info', summary:'Maximum atteint', detail:'Vous ne pouvez ajouter plus de trois professions.'});
    }

    else {
        this.professionsSelectionnees.push(this.saisieProfession);
        this.listeProfessions = this.listeProfessions.filter(item => item != this.saisieProfession);
    }

    this.saisieProfession = new Profession();
}

/**
 * Déselectionner un département --> le retirer de la liste departementsSelectionnes.
 * Remettre le département dans sa liste initiale et trier la liste par nom de département.
 * 
 * @param departement le département à retirer
 */
private retirerDepartement(departement:Departement) : void {

    this.departementsSelectionnes = this.departementsSelectionnes.filter(item => item !== departement);

    this.listeDepartements.push(departement);
    this.listeDepartements.sort( (a,b) => {
                                if (a.nom < b.nom) {return -1 };
                                if (a.nom > b.nom) { return 1 };
                                // a doit être égal à b
                                return 0;
    });
}

/**
 * Déselectionner une profession --> le retirer de la liste professionsSelectionnees
 * Remettre la profession dans la liste initiale et trier la liste par nom de métier.
 * 
 * @param profession la profession à retirer
 */
private retirerProfessionSelectionnee(profession:Profession) : void {

    this.professionsSelectionnees = this.professionsSelectionnees.filter(item => item !== profession);
    
    this.listeProfessions.push(profession);
    this.listeProfessions.sort((a,b) => {
                                if (a.metier < b.metier) {return -1 };
                                if (a.metier > b.metier) { return 1 };
                                // a doit être égal à b
                                return 0;
    });
}

/**
 * méthode pour passer en disabled si la liste département ou profession a 3 entrées.
 * 
 * @param liste 
 */
private limiterSelections(liste:any[] ) : boolean {
    
    return liste.length >= 3;
}

//   *****************************











}
