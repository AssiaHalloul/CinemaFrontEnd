import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Gallerie } from '../../models/gallerie.model';
import { GallerieService } from '../../_services/gallerieService/gallerie.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { FilmService } from '../../_services/filmService/film.service';
import { EvenementService } from '../../_services/evenementService/evenement.service';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {


  galleries: any;
  gallerie: Gallerie = new Gallerie();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  titre:any;
  titres:any;
  urlSrc:any;
  evenements: any;
  films:any;

  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;
  urls = [];

  urls1 = [];



  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private filmService: FilmService,private evenementService: EvenementService,private gallerieService: GallerieService,
              private router: Router,private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getFilms();
    this.getEvenements();
    this.getGalleries();
  }

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
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
  key : string;
  reverse : boolean = false;
  sort(key) {
    this.key=key;
    this.reverse=!this.reverse;
  }
  Search() {
    if (this.titres == '' ) {
      this.ngOnInit();
    }else{
      this.galleries = this.galleries.filter(res => {
        return res.titre.toLocaleLowerCase().match(this.titres.toLocaleLowerCase());
      });
    }
  }
  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
      console.log(res);
    });
  }

  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
      console.log(res);
    });
  }

  getGalleries() {
    this.gallerieService.getGalleries().subscribe(res => {
      this.galleries = res;
      console.log(res);

    });
  }

  deleteGallerie(id: number) {
    this.gallerieService.deleteGallerie(id)
      .subscribe(
        data => {
          console.log(data);
          this.getGalleries();
          this.warningDeleteModal.hide();
          this._snackBar.open(" GallerieModule well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => console.log(error));
    this._snackBar.open(" this gallerie is already used ",'cancel',{duration: this.durationInSeconds * 700 });

  }
  id: number;
  showEditModal(gallerie) {
    this.gallerie.id = gallerie.id;
    this.gallerie.titre = gallerie.titre;
    this.gallerie.image = gallerie.image;
    this.gallerie.film = gallerie.film;
    this.gallerie.evenement = gallerie.evenement;
    this.warningModal.show();
  }
  showDeleteModal(gallerie) {
    this.gallerie.id = gallerie.id;
    this.gallerie.titre = gallerie.titre;
    this.gallerie.image = gallerie.image;
    this.gallerie.film = gallerie.film;
    this.gallerie.evenement = gallerie.evenement;
    this.warningDeleteModal.show();
  }

  editGallerie(id): void {
    // @ts-ignore
    this.gallerie.film = (this.gallerie.film == "NULL") ? null : this.gallerie.film;
    // @ts-ignore
    this.gallerie.evenement = (this.gallerie.evenement == "NULL") ? null : this.gallerie.evenement;

    if(this.gallerie.film ==null && this.gallerie.evenement ==null){
      this._snackBar.open("ajouter un film ou evenement 1",'cancel',{duration: this.durationInSeconds * 700 });
      this.getGalleries();
      return;
    }
    if(this.gallerie.film != null && this.gallerie.evenement != null){
      this._snackBar.open("ajouter un film ou evenement",'cancel',{duration: this.durationInSeconds * 700 });
      this.getGalleries();
      return;
    }
    const formData = new  FormData();
    formData.append('gallerie', JSON.stringify(this.gallerie));
    formData.append('file',this.userFile);
    console.log(this.gallerie);
    this.gallerieService.updateGallerie(id, formData).subscribe(res => {
        this.warningModal.hide();
        this.getGalleries();
        this._snackBar.open(" film well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });
  }

}
