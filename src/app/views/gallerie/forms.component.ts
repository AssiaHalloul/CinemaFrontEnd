import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmService } from '../../_services/filmService/film.service';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { GallerieService } from '../../_services/gallerieService/gallerie.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Gallerie} from '../../models/gallerie.model';

@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{
  constructor(private filmService: FilmService,private evenementService: EvenementService,private gallerieService: GallerieService,
              private router: Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {}

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  durationInSeconds = 5;
  form: FormGroup;
  submitted = false;
  evenements: any;
  nationalites:any;
  films:any;
  galleries: Gallerie []=[]
  gallerie:any;
  url="";
  public imagePath;
  imgURL: any;
  public message: string;
  image: any;
  filesGallerie: FileList;
  images: any = [];
  allfiles : any = [];


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
  // upload images for films
  fileuploads(event){
    const files = event.target.files;
    this.filesGallerie = files;
    console.log(files);
    if(files){
      for(let i=0; i< files.length;i++){
        this.allfiles.push(files[i]);
        const readerfiles = new FileReader();
        readerfiles.onload=(filedata)=>{
          this.image = readerfiles.result + '';
          this.images.push(this.image);
        };
        readerfiles.readAsDataURL(files[i]);
      }
    }
  }

  ngOnInit() {
    this.getFilms();
    this.getEvenements();

    this.form = this.formBuilder.group(
      {
        titre: ['', Validators.required],
        film: [null, ],
        image: ['', Validators.required],
        evenement: [null, ],
      },
    );

  }
// get list of all films
  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
      console.log(res);
    });
  }

  // get list of all evenements
  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
      console.log(res);
    });
  }

  // get list of all galleries
  getgalleries(){
    this.gallerieService.getGalleries().subscribe(res => {
      this.galleries = res;
    });
  }
  onSubmit() {
    this.gallerie =this.form.value;
    if(this.gallerie.film == null && this.gallerie.evenement == null){
      this._snackBar.open('ajouter un film ou evenement','cancel',{duration: this.durationInSeconds * 700 });
      return;
    }
    if(this.gallerie.film != null && this.gallerie.evenement != null){
      console.log("nulll");
      this._snackBar.open('Seance ne peut pas etre pour film/evenement au mm temps','cancel',{duration: this.durationInSeconds * 700 });
      return;
    }
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const formData = new  FormData();
    this.gallerie = this.form.value;

    formData.append('gallerie', JSON.stringify(this.gallerie));
    // @ts-ignore

    for (let i = 0; i < this.filesGallerie.length; i++) {
      formData.append('files', this.filesGallerie[i]);
    }
    console.log('single file',this.filesGallerie);
    console.log('gallerie', this.gallerie);

    this.gallerieService.createGallerie(formData).subscribe(data => {
        this.gallerie = new Gallerie();
        console.log('inside');

        this.getgalleries();
        this.gotoList();
        this._snackBar.open("film well add",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }


  gotoList() {
    this.router.navigate(['/gallerie/tables']);
  }

}
