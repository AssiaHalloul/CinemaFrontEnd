import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../_services/genreService/genre.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  genres:Genre []=[];
  genre: Genre = new Genre();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  nom:any;
  noms:any;


  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private genreService: GenreService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getGenres();
  }
  key: string;
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.noms == ""){
      this.ngOnInit();
    }else{
       this.genres=this.genres.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.noms.toLocaleLowerCase());
       });
    }
  }
  getGenres(){
    this.genreService.getGenres().subscribe(res => {
              this.genres = res;
              console.log(res);
    });
  }

  deleteGenre(id: number) {

    this.genreService.deleteGenre(id)
      .subscribe(
        data => {
          console.log(data);
          this.getGenres();
          this.warningDeleteModal.hide();
          this._snackBar.open(" genre well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => console.log(error));
        this._snackBar.open(" this genre is already used ",'cancel',{duration: this.durationInSeconds * 700 });

  }

  onSubmit() {
    this.genreService.createGenre(this.genre).subscribe(data => {
      console.log(data)
      this.genre = new Genre();
      this.getGenres();
    },
    error => console.log(error));
  }

  id: number;
  showEditModal(genre) {
      this.genre.id = genre.id;
      this.genre.nom = genre.nom;
      this.warningModal.show();
    }

  showDeleteModal(genre) {
      this.genre.id = genre.id;
      this.warningDeleteModal.show();
    }

  editGenre(id): void {
    this.genreService.updateGenre(id, this.genre).subscribe(res => {
      this.warningModal.hide();
      this.getGenres();
       this._snackBar.open(" genre well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });

  }







}
