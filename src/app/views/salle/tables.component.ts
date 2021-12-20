import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Salle } from '../../models/salle.model';
import { SalleService } from '../../_services/salleService/salle.service';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';



@Component({
  templateUrl: 'tables.component.html'
})
export class TablesComponent implements OnInit{

  salles:any;
  salle: Salle = new Salle();
  totalLength: any;
  durationInSeconds = 5;
  length: any;
  page: number = 1;
  num:any;
  nums:any;
  
  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;


  constructor(private salleService: SalleService,
    private router: Router,private _snackBar: MatSnackBar,
    private route: ActivatedRoute) { }

    ngOnInit() {
      this.getSalles();
    }
  
    getSalles(){
      this.salleService.getSalles().subscribe(res => {
        this.salles = res;
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
      if(this.nums == ""){
        this.ngOnInit();
      }else{
         this.salles=this.salles.filter(res=>{
           console.log("search",this.nums);
          return res.num.toString().match(this.nums.toString());
         });
      }
    }

    
  showDeleteModal(salle) {
    this.salle.id = salle.id;
    //this.nationalite.libelle = nationalite.libelle;
    this.warningDeleteModal.show();
  }
  
    deleteSalle(id) {
      this.salleService.deleteSalle(id)
        .subscribe(
          data => {
            console.log(data);
            this.getSalles();
            this.warningDeleteModal.hide();
            this._snackBar.open(" salle well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
          },
          error => console.log(error));
          this._snackBar.open(" this salle is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        }


    showEditModal(salle) {
      this.salle.id = salle.id;
      this.salle.num = salle.num;
      this.salle.nombre_places = salle.nombre_places;
      this.warningModal.show();
    }

    editSalle(id): void {
      this.salleService.updateSalle(id, this.salle).subscribe(res => {
        this.warningModal.hide();
        this.getSalles();
        this._snackBar.open(" salle well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });
    }
}
