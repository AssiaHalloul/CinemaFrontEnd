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
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;


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
        duree: ['', Validators.required, Validators.pattern("^[0-9]*$")],
        poster: ['', Validators.required],
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

  onSelectFile(event) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.userFile = file;
      // this.f['profile'].setValue(file);

      var mimeType = event.target.files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();

      this.imagePath = file;
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = new  FormData();
    this.evenement =this.form.value;
    formData.append('evenement',JSON.stringify(this.evenement));
    formData.append('file',this.userFile);
    // const dataa = {
    //   titre : this.evenement.titre,
    //   description : this.evenement.description,
    //   duree : this.evenement.duree,
    //   poster : this.evenement.poster,
    //   film: this.evenement.film,
    //   typeEvent: this.evenement.typeEvent,
    // }
    this.evenementService.createEvenement(formData).subscribe(data => {
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
