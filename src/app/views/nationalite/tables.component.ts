import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  nationalites:any;
  nationalite: Nationalite = new Nationalite();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  libelle:any;
  libelles:any;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private nationaliteService: NationaliteService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getNationalites();
  }

  getNationalites(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
      console.log(res);
    });
  }

  key: string;
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.libelles == ""){
      this.ngOnInit();
    }else{
       this.nationalites=this.nationalites.filter(res=>{
        return res.libelle.toLocaleLowerCase().match(this.libelles.toLocaleLowerCase());
       });
    }
  }

  showDeleteModal(nationalite) {
    this.nationalite.id = nationalite.id;
    this.warningDeleteModal.show();
  }

  deleteNationalite(id: number) {

    this.nationaliteService.deleteNationalite(id)
      .subscribe(
        data => {
          console.log(data);
          this.getNationalites();
          this.warningDeleteModal.hide();
          this._snackBar.open(" nationalite well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => {console.log(error);
        this._snackBar.open(" this nationalite is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
  }

  onSubmit() {
    this.nationaliteService.createNationalite(this.nationalite).subscribe(data => {
      console.log(data)
      this.nationalite = new Nationalite();
      this.getNationalites();
    },
    error => console.log(error));
  }

  id: number;
  showEditModal(nationalite) {
    this.nationalite.id = nationalite.id;
    this.nationalite.libelle = nationalite.libelle;
    this.warningModal.show();
  }

  editNationalite(id): void {
    this.nationaliteService.updateNationalite(id, this.nationalite).subscribe(res => {
      this.warningModal.hide();
      this.getNationalites();
       this._snackBar.open(" nationalite well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },error => {
        console.log(error);
        this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
      });
  }


}
