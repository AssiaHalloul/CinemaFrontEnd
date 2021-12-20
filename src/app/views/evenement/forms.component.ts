import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Evenement } from '../../models/evenement.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { EvenementService } from '../../_services/evenementService/evenement.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private evenementService: EvenementService, 
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

  evenements:any;
  nationalites:any;
  evenement: Evenement = new Evenement();
  roles: any = ['realisateur', 'acteur'];

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        titre: ['', Validators.required],
        description: [
          '',
          [
            Validators.required,
          ]
        ],
        duree: ['', Validators.required],
        date: ['', Validators.required],
        film: ['', Validators.required],
        typeEvent: ['', Validators.required],
      }
    );
    this.getEvenements();
    //this.getNationalites();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
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
    this.evenement =this.form.value;
   // this.new_nationalite = this.form.value.nationalite;
    const dataa = {
      titre : this.evenement.titre,
      description : this.evenement.description,
      date: this.evenement.date,
      duree : this.evenement.duree,
     // nationalite :{"id": this.new_nationalite.id, "libelle": this.new_nationalite.libelle}
    }
    this.evenementService.createEvenement(dataa).subscribe(data => {
      this.evenement = new Evenement();
      this.getEvenements();
      this.gotoList();
      this._snackBar.open("evenement well add",'cancel',{duration: this.durationInSeconds * 700 });

    }, 
    error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }

  gotoList() {
    this.router.navigate(['/evenement/tables']);
  }

}
