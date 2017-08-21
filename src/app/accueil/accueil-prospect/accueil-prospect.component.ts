import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-accueil-prospect',
  templateUrl: './accueil-prospect.component.html',
  styleUrls: ['./accueil-prospect.component.css']
})
export class AccueilProspectComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }


  private accederInscription() {
       this.router.navigate(['/inscription']);
  }


}
