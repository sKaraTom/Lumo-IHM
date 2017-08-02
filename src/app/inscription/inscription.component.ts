import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Departement } from "../objet-metier/departement";
import { DepartementService } from "../services/departement.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  // sélection du département
  private listeDepartements : Departement[] = [];
  private saisieDepartement: Departement;
  private filtreDepartements : any[];
  private departementsSelectionnes : Departement[] = [];

  // Upload de la photo
  uploadedFiles: any[] = [];
  @ViewChild('photo') element:ElementRef;
  private urlPhoto : string;


  constructor(private departementService:DepartementService) { }

  ngOnInit() {
    this.obtenirListeDepartements();
  }


private creerCompte(form:NgForm) : void {

  console.log(form.value.photo);

}

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
// ********************










private chargerImage(event) : void {

    for(let file of event.files) {
            console.log(file);
            this.uploadedFiles.push(file);
            console.log(this.uploadedFiles.length);
    }

}




}
