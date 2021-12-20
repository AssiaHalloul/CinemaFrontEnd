import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Nationalite } from '../../models/nationalite.model';
import { Personne } from '../../models/personne.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { PersonneService } from '../../_services/personneService/personne.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private personneService: PersonneService, private nationaliteService: NationaliteService,
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

  personnes:any;
  nationalites:any;
  personne: Personne = new Personne();
  roles: any = ['realisateur', 'acteur'];

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        nom: ['', Validators.required],
        prenom: [
          '',
          [
            Validators.required,
          ]
        ],
        date_naissance: ['', Validators.required],
        type: ['', Validators.required],
        nationalite: ['', Validators.required],
      }
    );
    this.getPersonnes();
    this.getNationalites();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getPersonnes(){
    this.personneService.getPersonnes().subscribe(res => {
      this.personnes = res;
    });
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
    this.personne =this.form.value;
    this.new_nationalite = this.form.value.nationalite;
    console.log('nationalite',this.new_nationalite);
    const dataa = {
      nom : this.personne.nom,
      prenom : this.personne.prenom,
      type: this.personne.type,
      date_naissance : this.personne.date_naissance,
      nationalite :{"id": this.new_nationalite.id, "libelle": this.new_nationalite.libelle}
    }
    this.personneService.createPersonne(dataa).subscribe(data => {
      this.personne = new Personne();
      this.getPersonnes();
      this.gotoList();
      this._snackBar.open("personne well add",'cancel',{duration: this.durationInSeconds * 700 });

    }, 
    error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }

  gotoList() {
    this.router.navigate(['/personne/tables']);
  }

  getNationalite(id) {

  }

  // insertNationalite(): void {
  //   // this.new_nationalite = this.nationaliteService.getNationalite(this.personne.nationalite).subscribe(res => {
  //   //   res;
  //   //   console.log(res);
  //   // });
  //   console.log("meeeeeeeeeeeeeessage",this.personne);
  //   this.new_nationalite = this.personne.nationalite;
  //   const dataa = {
  //     nom : this.personne.nom,
  //     prenom : this.personne.prenom,
  //     type: this.personne.type,
  //     date_naissance : this.personne.date_naissance,
  //     nationalite :{"id": this.new_nationalite.id, "libelle": this.new_nationalite.libelle}
  //   }
  //   //this.personne.nationalite={ "id": 5, "libelle": 'libelle 2' };
  //   this.personneService.createPersonne(dataa).subscribe(res => {
  //     console.log(res);
  //     this.getPersonnes();
  //     this.gotoList();
  //   });
  // }

}
