import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Seance } from '../../models/seance.model';
import { SeanceService } from '../../_services/SeanceService/seance.service';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { FilmService } from '../../_services/filmService/film.service';
import { SalleService } from '../../_services/salleService/salle.service';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  seances:any;
  seance: Seance = new Seance();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  nom:any;
  noms:any;
  films:any;
  salles:any;
  evenements:any;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private seanceService: SeanceService,
    private evenementService: EvenementService, private salleService: SalleService,
    private filmService: FilmService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getSeances();
  }

  getSeances(){
    this.seanceService.getSeances().subscribe(res => {
      console.log(res);
      this.seances = res;
      console.log(res);
    });
  }
  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
    });
  }

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }

  getSalles(){
    this.salleService.getSalles().subscribe(res => {
      this.salles = res;
    });
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
       this.seances=this.seances.filter(res=>{
        return res.date.toLocaleLowerCase().match(this.noms.toLocaleLowerCase());
       });
    }
  }

  showDeleteModal(seance) {
    this.seance.id = seance.id;
    this.warningDeleteModal.show();
  }

  deleteSeance(id: number) {

    this.seanceService.deleteSeance(id)
      .subscribe(
        data => {
          console.log(data);
          this.getSeances();
          this.warningDeleteModal.hide();
          this._snackBar.open(" Seance well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => {console.log(error);
        this._snackBar.open(" this Seance is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
  }


  id: number;
  showEditModal(seance) {
    this.seance = seance;
    this.getFilms();
    this.getSalles();
    this.getEvenements();
    this.warningModal.show();
  }

  editSeance(id): void {
    this.seance.film = (this.seance.film == "NULL") ? null : this.seance.film;
    this.seance.evenement = (this.seance.evenement == "NULL") ? null : this.seance.evenement;
    if(this.seance.film ==null && this.seance.evenement ==null){
      this._snackBar.open("ajouter un film ou evenement 1",'cancel',{duration: this.durationInSeconds * 700 });
      this.getSeances();
      return;
    }
    if(this.seance.film != null && this.seance.evenement != null){
      this._snackBar.open("ajouter un film ou evenement",'cancel',{duration: this.durationInSeconds * 700 });
      this.getSeances();
      return;
    }
    this.seanceService.updateSeance(id, this.seance).subscribe(res => {
      console.log("update........");
      this.warningModal.hide();
      this.getSeances();
       this._snackBar.open(" Seance well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => {console.log(error);
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });
      });
  }

 

  valueHasError = true;
  validateValue(value) {
    if (!value) {
      this.valueHasError = true;
    } else {
      this.valueHasError = false;
    }
  }



}
