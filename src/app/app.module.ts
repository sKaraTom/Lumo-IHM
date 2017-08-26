import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilMembreComponent } from "./accueil/accueil-membre.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { PublicationOffreComponent } from './publication-offre/publication-offre.component';

import { DepartementService } from "./services/departement.service";
import { ProfessionService } from "./services/profession.service";
import { CompteService } from "./services/compte.service";

// primeng
import { ChipsModule, DropdownModule, SharedModule, AutoCompleteModule, InputTextModule, FileUploadModule, GrowlModule } from 'primeng/primeng';

// Angular-Material
import { MdAutocompleteModule, MdInputModule, MdTooltipModule } from '@angular/material';
import { MembreService } from "./services/membre.service";
import { InscriptionComponent } from './inscription/inscription.component';
import { AccueilProspectComponent } from './accueil/accueil-prospect/accueil-prospect.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { AuthentificationGuard } from "./services/authentification.guard";


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilMembreComponent,
    PageNotFoundComponent,
    AnnuaireComponent,
    PublicationOffreComponent,
    InscriptionComponent,
    AccueilProspectComponent,
    ConnexionComponent,
  ],
  imports: [
    MdAutocompleteModule,MdInputModule,MdTooltipModule, // Angular Material
    SharedModule, // pour tests, à supprimer
    InputTextModule,DropdownModule,ChipsModule,AutoCompleteModule,FileUploadModule,
    GrowlModule, // primeng
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [AuthentificationGuard,CompteService,DepartementService,ProfessionService, MembreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
