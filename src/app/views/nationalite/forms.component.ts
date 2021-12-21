import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private nationaliteService: NationaliteService,
    private router: Router,
    private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {}

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

  nationalites:any;
  nationalite: Nationalite = new Nationalite();

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        libelle: ['', Validators.required],
      },
    );
    this.getNationalites();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getNationalites(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.nationalite =this.form.value;
    this.nationaliteService.createNationalite(this.nationalite).subscribe(data => {
      this.nationalite = new Nationalite();
      this.getNationalites();
      this.gotoList();
      this._snackBar.open("nationalite well add",'cancel',{duration: this.durationInSeconds * 700 });

    }
    ,error => {
      console.log(error);
      this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
    });
  }

  gotoList() {
    this.router.navigate(['/nationalite/tables']);
  }

}
