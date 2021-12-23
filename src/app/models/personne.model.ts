import {Nationalite} from './nationalite.model';

export class Personne {
  id: number;
  nom: string;
  prenom: string;
  type: string;
  date_naissance: Date;
  nationalite?: Nationalite;  

}
