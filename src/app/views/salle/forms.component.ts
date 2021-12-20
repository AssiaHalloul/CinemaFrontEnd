import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Salle } from '../../models/salle.model';
import { SalleService } from '../../_services/salleService/salle.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private salleService: SalleService,
    private router: Router,
    private formBuilder: FormBuilder,private _snackBar: MatSnackBar) { }

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

  salles:any;
  salle: Salle = new Salle();

  form: FormGroup;
  submitted = false;


  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        num: ['', Validators.required],
        nombre_places: [
          '',
          [
            Validators.required,
          ]
        ],
      }
    );
    this.getSalles();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }


  getSalles(){
    this.salleService.getSalles().subscribe(res => {
      this.salles = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.salle =this.form.value;
    this.salleService.createSalle(this.salle).subscribe(data => {
      this.salle = new Salle();
      this.getSalles();
      this.gotoList();
      this._snackBar.open("salle well add",'cancel',{duration: this.durationInSeconds * 700 });

    }, 
    error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }

  gotoList() {
    this.router.navigate(['/salle/tables']);
  }

  // insertSalle(): void {
  //   const data = {
  //     num: this.salle.num,
  //     nombre_places : this.salle.nombre_places,
  //   };
  //   this.salleService.createSalle(data).subscribe(res => {
  //     console.log(res);
  //     this.getSalles();
  //     this.gotoList();
  //   });
  // }



}
