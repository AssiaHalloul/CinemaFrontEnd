import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Evenement } from '../../models/evenement.model';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { FilmService } from '../../_services/filmService/film.service';
import {EventtypeService} from '../../_services/eventTypeService/eventtype.service';



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
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private evenementService: EvenementService, private eventTypeService: EventtypeService,
    private filmService: FilmService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getEvenements();
  }

  // get list of all evenements
  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      console.log(res);
      this.evenements = res;
      console.log(res);
    });
  }

  // get list of all films
  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }
  // get list of all evenements type
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

  id: number;
  showEditModal(evenement) {
    this.evenement = evenement;
    this.getFilms();
    this.getEventsTypes();
    this.warningModal.show();
  }

  editEvenement(id): void {
    const formData = new FormData();
    formData.append('evenement',JSON.stringify(this.evenement));
    formData.append('file',this.userFile);
    this.evenementService.updateEvenement(id, formData).subscribe(res => {
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
