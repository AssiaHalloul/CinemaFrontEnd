import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Seance } from '../../models/seance.model';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { FilmService } from '../../_services/filmService/film.service';
import { SalleService } from '../../_services/salleService/salle.service';
import { SeanceService } from '../../_services/seanceService/seance.service';
declare let $: any;

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private seanceService: SeanceService,  private datePipe: DatePipe,
    private evenementService: EvenementService, private salleService: SalleService,
    private filmService: FilmService,
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

  seances:any;
  listseances:any;
  films:any;
  evenements:any;
  salles:any;
  seance: Seance = new Seance();
  hour;

  // datetime
  public minDate: Date = new Date();
  form: FormGroup;
  submitted = false;
  todayDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
  currentDate;

  ngOnInit() {

    this.form = this.formBuilder.group(
      {
        date: ['', Validators.required],
        evenement: [null,],
        film: [null, ],
        salle: ['', Validators.required],
      }
    );
    this.getSeances();
    this.getFilms();
    this.getEvenements();
    this.getSalles();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  getSeances(){
    this.seanceService.getSeances().subscribe(res => {
      this.seances = res;
    });
  }
  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
    });
  }

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }

  getSalles(){
    this.salleService.getSalles().subscribe(res => {
      this.salles = res;
    });
  }

  onSubmit() {
    console.log("date", this.form.value.date);
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.seance =this.form.value;
    if(this.seance.film == null && this.seance.evenement == null){
      this._snackBar.open("ajouter un film ou evenement",'cancel',{duration: this.durationInSeconds * 700 });
      return;
    }
    if(this.seance.film != null && this.seance.evenement != null){
      console.log("nulll");
      this._snackBar.open("Seance ne peut pas etre pour film/evenement au mm temps",'cancel',{duration: this.durationInSeconds * 700 });
      return;
    }
    const dataa = {
      date : this.seance.date,
      film : this.seance.film,
      evenement: this.seance.evenement,
      salle : this.seance.salle,
    }
    this.seanceService.createSeance(dataa).subscribe(data => {
      this.seance = new Seance();
      this.getSeances();
      this.gotoList();
      this._snackBar.open("seance well add",'cancel',{duration: this.durationInSeconds * 700 });

    },
    error => {console.log(error);
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
    });
  }

  gotoList() {
    this.router.navigate(['/seance/tables']);
  }

  validation(){
    this.getSeances();
    this.seances.forEach(element => {
      if(this.form.value.date.toISOString().split("T")[0] == element.date.split("T")[0]){
        // console.log("time curr", this.form.value.date.toISOString().split("T")[1]);
        // console.log("time exist", element.date.split("T")[1]);
        if(this.form.value.date.toISOString().split("T")[1] >=  element.date.split("T")[1]){
          this.hour = this.form.value.date.getHours() * 60 + this.form.value.date.getMinutes() ;
          // console.log("element" , element);
          this.currentDate = new Date(element.date);
          this.hour = this.form.value.date.getHours() * 60 + this.form.value.date.getMinutes() ;
          // console.log("time exist end",   this.convertMinsToHrsMins( (this.currentDate.getHours() *60+this.currentDate.getMinutes())+element.film.duree));
          // console.log("time cureent end",  this.convertMinsToHrsMins( this.hour+element.film.duree));
          if(this.convertMinsToHrsMins( this.hour+element.film.duree) <= this.convertMinsToHrsMins( (this.currentDate.getHours() *60+this.currentDate.getMinutes())+element.film.duree) ){
            this._snackBar.open(" seance deja utilise ",'cancel',{duration: this.durationInSeconds * 700 });
            return ;
          }
        }
      }
    });
  }

  convertMinsToHrsMins = (mins) => {
    let h = Math.floor(mins / 60);
    let m = Math.round(mins % 60);
    let hh = (h < 10) ? ('0' + h) : (h);
    let mm = (m < 10) ? ('0' + m) : (m);
    return `${hh}:${mm}`;
  }

}
