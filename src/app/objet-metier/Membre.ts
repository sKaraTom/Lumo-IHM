
import { Profession } from "./profession";
import { Departement } from "./departement";
import { ProfilPublic } from "./profil-public";

export class Membre {

    public uuid:string;
    public nom:string;
    public prenom:string;
    
    public urlSite:string;
    public photo:string;
    
    public listeProfessions:Profession[];
    public listeDepartements:Departement[];

    public compteurPopularite:number;
    public listeVotes:String[];

    public listeFavoris:ProfilPublic[];



    

}