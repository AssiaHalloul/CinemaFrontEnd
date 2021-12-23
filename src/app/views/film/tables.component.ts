import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from '../../models/film.model';
import { FilmService } from '../../_services/filmService/film.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Nationalite} from '../../models/nationalite.model';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {


  films: any;
  film: Film = new Film();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  titre:any;
  titres:any;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private filmService: FilmService,
    private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.filmService.getFilms().subscribe(res => {
          this.films = res;
          console.log(res);
    });
  }


  key: string;
  reverse : boolean=false;
  sort(key) {
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.titres == "") {
      this.ngOnInit();
    }else{
       this.films = this.films.filter(res => {
        return res.titre.toLocaleLowerCase().match(this.titres.toLocaleLowerCase());
       });
    }
  }
  getFilms() {
    this.ngOnInit();
  }

  deleteFilm(id: number) {

    this.filmService.deleteFilm(id)
      .subscribe(
        data => {
          console.log(data);
          this.getFilms();
          this.warningDeleteModal.hide();
          this._snackBar.open(" FilmModule well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => 
        {console.log(error);
        this._snackBar.open(" this film is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
  }

  onSubmit() {
    this.filmService.createFilm(this.film).subscribe(data => {
      console.log(data)
      this.film = new Film();
      this.films();
    },
    error => console.log(error));
  }

  id: number;
  showEditModal(film) {
      this.film.id = film.id;
      this.film.titre = film.titre;
      this.film.description = film.description;
      this.film.annee = film.annee;
      this.film.genre = film.genre;
    this.film.nationalite = film.nationalite;
    this.film.realisateur = film.realisateur;
      this.warningModal.show();
    }
    showDeleteModal(film) {
      this.film.id = film.id;
      this.film.titre = film.titre;
      this.film.description = film.description;
      this.film.annee = film.annee;
      this.film.genre = film.genre;
      this.film.nationalite = film.nationalite;
      this.film.realisateur = film.realisateur;
        this.warningDeleteModal.show();
      }

  editFilm(id): void {
    this.filmService.updateFilm(id, this.film).subscribe(res => {
      this.warningModal.hide();
      this.getFilms();
       this._snackBar.open(" film well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => {
      console.log(error);
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });
      });
  }

}
