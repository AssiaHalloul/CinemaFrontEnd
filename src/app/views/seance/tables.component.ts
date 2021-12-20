import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Seance } from '../../models/seance.model';
import { SeanceService } from '../../_services/SeanceService/seance.service';


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

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private seanceService: SeanceService,
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

  getNationalites(){
    // this.nationaliteService.getNationalites().subscribe(res => {
    //   this.nationalites = res;
    // });
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
    //this.personne.libelle = personne.libelle;
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
        error => console.log(error));
        this._snackBar.open(" this Seance is already used ",'cancel',{duration: this.durationInSeconds * 700 });

  }

  // onSubmit() {
  //   this.personneService.createPersonne(this.personne).subscribe(data => {
  //     console.log(data)
  //     this.personne = new Personne();
  //     this.getPersonnes();
  //   }, 
  //   error => console.log(error));
  // }

  id: number;
  showEditModal(seance) {
    this.seance = seance;
    // this.nationaliteService.getNationalites().subscribe(res => {
    //   this.nationalites = res;
    // });
    
    this.warningModal.show();
  }

  editSeance(id): void {
    // this.update_nationalite = this.personne.nationalite;
    // this.personne.nationalite ={"id": this.update_nationalite.id, "libelle": this.update_nationalite.libelle}
    this.seanceService.updateSeance(id, this.seance).subscribe(res => {
      this.warningModal.hide();
      this.getSeances();
       this._snackBar.open(" Seance well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });

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
