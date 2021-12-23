import {Nationalite} from './nationalite.model';
import {Personne} from './personne.model';
import {Genre} from './genre.model';

export class Film {

  id: number;
  titre: string;
  annee: Date;
  duree: number;
  description: string;
  trailer: string;
  poster: string;
  statue: string;
  nationalite: object;
  genre: object;
  realisateur: object;
  acteurs: object;
  galleries:object;
}
