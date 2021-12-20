import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Seance } from '../../models/seance.model';
import { SeanceService } from '../../_services/seanceService/seance.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private seanceService: SeanceService, 
    private router: Router,
    private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {}

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';
  new_nationalite:  any;

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

  seances:any;
  nationalites:any;
  seance: Seance = new Seance();
  roles: any = ['realisateur', 'acteur'];

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        date: ['', Validators.required],
        evenement: [
          '',
          [
            Validators.required,
          ]
        ],
        film: ['', Validators.required],
        salle: ['', Validators.required],
      }
    );
    this.getSeances();
    //this.getNationalites();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getSeances(){
    this.seanceService.getSeances().subscribe(res => {
      this.seances = res;
    });
  }

  getNationalites(){
    // this.nationaliteService.getNationalites().subscribe(res => {
    //   this.nationalites = res;
    // });
  }



  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.seance =this.form.value;
   // this.new_nationalite = this.form.value.nationalite;
    const dataa = {
      date : this.seance.date,
      film : this.seance.film,
      evenement: this.seance.evenement,
      salle : this.seance.salle,
     // nationalite :{"id": this.new_nationalite.id, "libelle": this.new_nationalite.libelle}
    }
    this.seanceService.createSeance(dataa).subscribe(data => {
      this.seance = new Seance();
      this.getSeances();
      this.gotoList();
      this._snackBar.open("seance well add",'cancel',{duration: this.durationInSeconds * 700 });

    }, 
    error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }

  gotoList() {
    this.router.navigate(['/seance/tables']);
  }

}
