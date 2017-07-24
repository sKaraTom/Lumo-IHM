
import { ProfilPublic } from "./profil-public";

export class Departement {

    public numero : number;
    public nom : string;
    public listeMembres : ProfilPublic[];

    constructor(numero,nom) {
        this.numero = numero;
        this.nom = nom;
      }

}