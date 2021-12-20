import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../_services/genreService/genre.service';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { Film } from '../../models/film.model';
import { FilmService } from '../../_services/filmService/film.service';
import { PersonneService } from '../../_services/personneService/personne.service';
import {Personne} from '../../models/personne.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{
  durationInSeconds = 5;
  form: FormGroup;
  submitted = false;
  genres: any;
  genre: Genre = new Genre();
  nationalites:any;
  films:Film  []=[];
  film:any;
  realisateurs: any;
  allstatus= [
    {id: 1, value: "United States"},
    {id: 2, value: "Australia"},
    {id: 3, value: "Canada"}

  ];

  constructor(private genreService: GenreService,private filmService: FilmService,private nationaliteService: NationaliteService,private personneService: PersonneService,
              private router: Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {}

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }



  ngOnInit() {
    this.getNationalities();
    this.getGenres();
    this.getRealisateur();

    this.form = this.formBuilder.group(
      {
        titre: ['', Validators.required],
        annee: ['', Validators.required],
        duree: ['', Validators.required],
        description: ['', Validators.required],
        trailer: ['', Validators.required],
        poster: ['', Validators.required],
        nationalite: ['', Validators.required],
        genre: ['', Validators.required],
        statue: ['', Validators.required],
        realisateur: ['', Validators.required],
      },
    );

  }

  getNationalities(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
      console.log(res);
    });
  }


  getRealisateur(){
    this.personneService.getRealisateurs().subscribe(res => {
      this.realisateurs = res;
    });
  }

  getGenres(){
    this.genreService.getGenres().subscribe(res => {
      this.genres = res;
    });
  }

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.film =this.form.value;
    console.log("eeeeeeeee",this.film);
    this.filmService.createFilm(this.film).subscribe(data => {
        this.film = new Film();
        console.log("inside");

        this.getFilms();
        this.gotoList();
        this._snackBar.open("film well add",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }


  gotoList() {
    this.router.navigate(['/film/tables']);
  }

}
