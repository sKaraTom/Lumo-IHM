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

// primeng
import { ChipsModule, DropdownModule, DataTableModule, SharedModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

// Angular-Material
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { MembreService } from "./services/membre.service";





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilMembreComponent,
    PageNotFoundComponent,
    AnnuaireComponent,
    PublicationOffreComponent,
  ],
  imports: [
    MdAutocompleteModule,MdInputModule, // bloc Angular Material
    DataTableModule,SharedModule, // pour tests, à supprimer
    InputTextModule,DropdownModule,ChipsModule,AutoCompleteModule, // bloc primeng
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [DepartementService,ProfessionService, MembreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
