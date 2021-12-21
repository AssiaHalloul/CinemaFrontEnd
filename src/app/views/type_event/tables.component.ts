import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Eventtype } from '../../models/eventtype.model';
import { EventtypeService } from '../../_services/eventTypeService/eventtype.service';

@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {
  eventTypes:Eventtype []=[];
  eventType: Eventtype = new Eventtype();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  type:any;
  types:any;


  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private eventTypeService: EventtypeService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute,private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getEventTypes();
  }
  key: string;
  reverse:boolean=false;
  sort(key){
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.types == ""){
      this.ngOnInit();
    }else{
       this.eventTypes=this.eventTypes.filter(res=>{
        return res.type_event.toLocaleLowerCase().match(this.types.toLocaleLowerCase());
       });
    }
  }
  getEventTypes(){
    this.eventTypeService.getEventTypes().subscribe(res => {
              this.eventTypes = res;
              console.log(res);
    });
  }

  deleteEventType(id: number) {

    this.eventTypeService.deleteEventType(id)
      .subscribe(
        data => {
          console.log(data);
          this.getEventTypes();
          this.warningDeleteModal.hide();
          this._snackBar.open(" event type well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => {console.log(error);
        this._snackBar.open(" this genre is already used ",'cancel',{duration: this.durationInSeconds * 700 });
        });
  }

  onSubmit() {
    this.eventTypeService.createEventType(this.eventType).subscribe(data => {
      console.log(data)
      this.eventType = new Eventtype();
      this.getEventTypes();
    },
    error => console.log(error));
  }

  id: number;
  showEditModal(eventType) {
      this.eventType.id = eventType.id;
      this.eventType.type_event = eventType.type_event;
      this.warningModal.show();
    }

  showDeleteModal(eventType) {
      this.eventType.id = eventType.id;
      this.warningDeleteModal.show();
    }

  editEventType(id): void {
    this.eventTypeService.updateEventType(id, this.eventType).subscribe(res => {
      this.warningModal.hide();
      this.getEventTypes();
       this._snackBar.open(" Event type well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },error => {
        console.log(error);
        this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
      });

  }







}
