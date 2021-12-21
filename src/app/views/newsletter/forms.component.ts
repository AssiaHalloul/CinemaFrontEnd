import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Newsletter } from '../../models/newsletter.model';
import { NewsletterService } from '../../_services/newsLetterService/newsletter.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit {
  durationInSeconds = 5;

  constructor(private newsletterservice: NewsletterService,
    private router: Router,
    private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {}

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  newsletters:any;
  newsletter: Newsletter = new Newsletter();

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        email: ['', Validators.required],
      },
    );
    this.getNewsLetters();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getNewsLetters(){
    this.newsletterservice.getNewsletters().subscribe(res => {
      this.newsletters = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.newsletter =this.form.value;
    this.newsletterservice.createNewsletter(this.newsletter).subscribe(data => {
      this.newsletter = new Newsletter();
      this.getNewsLetters();
      this.gotoList();
      this._snackBar.open("newsletter well add",'cancel',{duration: this.durationInSeconds * 700 });

    },error => {
      console.log(error);
      this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
    });
  }

  gotoList() {
    this.router.navigate(['/newsletter/tables']);
  }


}
