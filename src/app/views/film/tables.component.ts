import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '../../models/film.model';
import { FilmService } from '../../_services/filmService/film.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { PersonneService } from '../../_services/personneService/personne.service';
import { GenreService } from '../../_services/genreService/genre.service';


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
  allstatus= [
    {id: 1, value: "En cours"},
    {id: 2, value: "prochainement"},
  ];
  nationalites:any;
  realisateurs:any;
  genres:any;
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;

  //multiple select
  dropdownList = [];
  selectedItems = [];
  acteurs=[];
  dropdownSettings:IDropdownSettings;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private filmService: FilmService,private genreService: GenreService,private nationaliteService: NationaliteService,private personneService: PersonneService,
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

  getNationalities(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
      console.log(res);
    });
  }

  getActeurs() : Array<any>{
    this.personneService.getActeurs().subscribe(res => {
      this.dropdownList = res;
    });
    return this.dropdownList;
  }

  getObjectListFromData(ids){
    return this.getActeurs().filter(item => ids.includes(item.id))
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
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

      this.selectedItems = film.acteurs;
      this.dropdownList = this.getActeurs();
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'nom',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true
      };
      this.getNationalities();
      this.getActeurs();
      this.getRealisateur();
      this.getGenres();
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


  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  editFilm(id): void {
    console.log("id", id);
    const formData = new FormData();
     this.film.acteurs = this.getObjectListFromData(this.selectedItems.map(item => item.id));
    formData.append('film',JSON.stringify(this.film));
    formData.append('file',this.userFile);
    this.filmService.updateFilm(id, formData).subscribe(res => {
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
