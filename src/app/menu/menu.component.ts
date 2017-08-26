import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CompteService } from "../services/compte.service";

@Component({
  selector: 'app-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  idClient : string;

  lienAccueil : String = "/accueil";

  constructor( private changeDetectionRef : ChangeDetectorRef,
              private compteService:CompteService) { }

  ngOnInit() {

    this.compteService.idClientObs.subscribe(
      res => {
          if(res) {  this.idClient = res; 
                      this.lienAccueil="/accueil/cli"; 
                      this.changeDetectionRef.markForCheck(); // permet de détecter le changement de valeur
          }
          else    {  this.idClient = null; this.lienAccueil="/accueil"; this.changeDetectionRef.markForCheck();}
      })


    

  }


  ngAfterViewChecked() : void {
    this.changeDetectionRef.detectChanges();
  }


  private deconnecterCompte () : void {

    // localStorage.clear();
    // this.idClient = null;
    // this.changeDetectionRef.markForCheck();

    this.compteService.deconnecterCompte();
    
  }


}
