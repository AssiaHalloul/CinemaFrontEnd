import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Newsletter } from '../../models/newsletter.model';
import { NewsletterService } from '../../_services/newsLetterService/newsletter.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalDirective } from 'ngx-bootstrap/modal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Nationalite} from '../../models/nationalite.model';


@Component({
  templateUrl: 'tables.component.html',
})
export class TablesComponent implements OnInit {

  // newsletters:Newsletter []=[];
  newsletters: any;
  newsletter: Newsletter = new Newsletter();
  closeResult: string;
  durationInSeconds = 5;
  totalLength: any;
  length: any;
  page: number = 1;
  email:any;
  Emails:any;



  @ViewChild('warningModal') public warningModal: ModalDirective;
  @ViewChild('warningDeleteModal') public warningDeleteModal: ModalDirective;

  constructor(private newsletterService: NewsletterService,
    private router: Router, public dialog: MatDialog,
    private route: ActivatedRoute, private _snackBar: MatSnackBar) {}

  ngOnInit() {
    this.newsletterService.getNewsletters().subscribe(res => {
          this.newsletters = res;
          console.log(res);
        });
  }
  key: string;
  reverse : boolean=false;
  sort(key) {
    this.key=key;
    this.reverse=!this.reverse;
  }

  Search(){
    if(this.Emails == "") {
      this.ngOnInit();
    }else{
       this.newsletters= this.newsletters.filter(res => {
        return res.email.toLocaleLowerCase().match(this.Emails.toLocaleLowerCase());
       });
    }
  }
  getNewsLetters() {
    this.ngOnInit();
  }

  deleteNewsLetter(id: number) {

    this.newsletterService.deleteNewsletter(id)
      .subscribe(
        data => {
          console.log(data);
          this.getNewsLetters();
          this.warningDeleteModal.hide();
          this._snackBar.open(" newsletter well deleted  ",'cancel',{duration: this.durationInSeconds * 700 });
        },
        error => console.log(error));
        this._snackBar.open(" this newsletter is already used ",'cancel',{duration: this.durationInSeconds * 700 });

  }

  onSubmit() {
    this.newsletterService.createNewsletter(this.newsletter).subscribe(data => {
      console.log(data)
      this.newsletter = new Newsletter();
      this.newsletters();
    },
    error => console.log(error));
  }

  id: number;
  showEditModal(newsletter) {
      this.newsletter.id = newsletter.id;
      this.newsletter.email = newsletter.email;
      this.warningModal.show();
    }
    showDeleteModal(newsletter) {
        this.newsletter.id = newsletter.id;
        this.warningDeleteModal.show();
      }

  editNewsletter(id): void {
    this.newsletterService.updateNewsletter(id, this.newsletter).subscribe(res => {
      this.warningModal.hide();
      this.getNewsLetters();
       this._snackBar.open(" newsletter well updated  ",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
      this._snackBar.open(" Something was wrong",'cancel',{duration: this.durationInSeconds * 700 });

  }







}
