import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Evenement } from '../../models/evenement.model';
import { EvenementService } from '../../_services/evenementService/evenement.service';


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
  nom:any;
  noms:any;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private evenementService: EvenementService,
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
       this.evenements=this.evenements.filter(res=>{
        return res.titre.toLocaleLowerCase().match(this.noms.toLocaleLowerCase());
       });
    }
  }

  showDeleteModal(evenement) {
    this.evenement.id = evenement.id;
    //this.personne.libelle = personne.libelle;
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
        error => console.log(error));
        this._snackBar.open(" this evenement is already used ",'cancel',{duration: this.durationInSeconds * 700 });

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
  showEditModal(evenement) {
    this.evenement = evenement;
    // this.nationaliteService.getNationalites().subscribe(res => {
    //   this.nationalites = res;
    // });
    
    this.warningModal.show();
  }

  editEvenement(id): void {
    // this.update_nationalite = this.personne.nationalite;
    // this.personne.nationalite ={"id": this.update_nationalite.id, "libelle": this.update_nationalite.libelle}
    this.evenementService.updateEvenement(id, this.evenement).subscribe(res => {
      this.warningModal.hide();
      this.getEvenements();
       this._snackBar.open(" evenement well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
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
