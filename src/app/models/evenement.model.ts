import { FilmModule } from "../views/film/film.module";

export class Evenement {
    id: number;
    titre: string;
    duree: number;
    description: string;
    date: Date;
    poster: string;
    film:object;
    typeEvent:object;
}
