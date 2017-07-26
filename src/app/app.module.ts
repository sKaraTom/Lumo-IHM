import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilMembreComponent } from "./accueil/accueil-membre.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from "./app-routing.module";
import { AnnuaireComponent } from './annuaire/annuaire.component';
import { PublicationOffreComponent } from './publication-offre/publication-offre.component';

// primeng
import { ChipsModule, DropdownModule, DataTableModule, SharedModule, AutoCompleteModule, InputTextModule } from 'primeng/primeng';

import { MdAutocompleteModule, MdInputModule } from '@angular/material';


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
    FormsModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
