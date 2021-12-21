import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Evenement } from '../../models/evenement.model';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { FilmService } from '../../_services/filmService/film.service';
import { EventtypeService } from '../../_services/eventtypeService/eventtype.service';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  evenements:any;
  evenement: Evenement = new Evenement();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  titre:any;
  titres:any;
  films:any;
  eventtypes:any;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private evenementService: EvenementService, private eventTypeService: EventtypeService,
    private filmService: FilmService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getEvenements();
  }

  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      console.log(res);
      this.evenements = res;
      console.log(res);
    });
  }

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }

  getEventsTypes(){
    this.eventTypeService.getEventTypes().subscribe(res => {
      this.eventtypes = res;
    });
  }

  key: string;
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.titres == ""){
      this.ngOnInit();
    }else{
       this.evenements=this.evenements.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.titres.toLocaleLowerCase());
       });
    }
  }

  showDeleteModal(evenement) {
    this.evenement.id = evenement.id;
    this.warningDeleteModal.show();
  }

  deleteEvenement(id: number) {

    this.evenementService.deleteEvenement(id)
      .subscribe(
        data => {
          console.log(data);
          this.getEvenements();
          this.warningDeleteModal.hide();
          this._snackBar.open(" evenement well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => {
        console.log(error);
        this._snackBar.open(" this evenement is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
  }

  id: number;
  showEditModal(evenement) {
    this.evenement = evenement;
    this.getFilms();
    this.getEventsTypes();
    this.warningModal.show();
  }

  editEvenement(id): void {
    this.evenementService.updateEvenement(id, this.evenement).subscribe(res => {
      this.warningModal.hide();
      this.getEvenements();
       this._snackBar.open(" evenement well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error =>{ 
      console.log(error);
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
