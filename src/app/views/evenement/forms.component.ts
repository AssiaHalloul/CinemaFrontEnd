import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Evenement } from '../../models/evenement.model';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { EventtypeService } from '../../_services/eventtypeService/eventtype.service';
import { FilmService } from '../../_services/filmService/film.service';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{

  durationInSeconds = 5;

  constructor(private evenementService: EvenementService, private eventTypeService: EventtypeService,
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

  evenements:any;
  films:any;
  eventtypes:any;
  evenement: Evenement = new Evenement();

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
        poster: ['', Validators.required],
        date: ['', Validators.required],
        film: ['', Validators.required],
        typeEvent: ['', Validators.required],
      }
    );
    this.getEvenements();
    this.getFilms();
    this.getEventsTypes();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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

  getEventsTypes(){
    this.eventTypeService.getEventTypes().subscribe(res => {
      this.eventtypes = res;
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.evenement =this.form.value;
    const dataa = {
      titre : this.evenement.titre,
      description : this.evenement.description,
      date: this.evenement.date,
      duree : this.evenement.duree,
      poster : this.evenement.poster,
      film: this.evenement.film,
      typeEvent: this.evenement.typeEvent,
    }
    this.evenementService.createEvenement(dataa).subscribe(data => {
      this.evenement = new Evenement();
      this.getEvenements();
      this.gotoList();
      this._snackBar.open("evenement well add",'cancel',{duration: this.durationInSeconds * 700 });

    } ,error => {
      console.log(error);
      this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
    });
  }

  gotoList() {
    this.router.navigate(['/evenement/tables']);
  }

}
