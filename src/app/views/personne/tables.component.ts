import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Personne } from '../../models/personne.model';
import { PersonneService } from '../../_services/personneService/personne.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  personnes:any;
  personne: Personne = new Personne();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  nom:any;
  noms:any;
  roles: any = ['realisateur', 'acteur'];
  nationalites:any;
  update_nationalite:  any;
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;

  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private personneService: PersonneService,
    private router: Router, public dialog: MatDialog,private nationaliteService: NationaliteService,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getPersonnes();
  }

  getPersonnes(){
    this.personneService.getPersonnes().subscribe(res => {
      console.log(res);
      this.personnes = res;
      console.log(res);
    });
  }

  getNationalites(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
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
       this.personnes=this.personnes.filter(res=>{
        return res.nom.toLocaleLowerCase().match(this.noms.toLocaleLowerCase());
       });
    }
  }

  showDeleteModal(personne) {
    this.personne.id = personne.id;
    //this.personne.libelle = personne.libelle;
    this.warningDeleteModal.show();
  }

  deletePersonne(id: number) {

    this.personneService.deletePersonne(id)
      .subscribe(
        data => {
          console.log(data);
          this.getPersonnes();
          this.warningDeleteModal.hide();
          this._snackBar.open(" personne well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => {console.log(error);
        this._snackBar.open(" this personne is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
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

  id: number;
  showEditModal(personne) {
    this.personne = personne;
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
    });
    
    this.warningModal.show();
  }

  editPersonne(id): void {
    const formData = new FormData();
   formData.append('personne',JSON.stringify(this.personne));
   formData.append('file',this.userFile);
    this.personneService.updatePersonne(id, formData).subscribe(res => {
      this.warningModal.hide();
      this.getPersonnes();
       this._snackBar.open(" personne well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },error => {
        console.log(error);
        this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
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
