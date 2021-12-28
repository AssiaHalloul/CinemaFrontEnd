import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../_services/genreService/genre.service';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { Film } from '../../models/film.model';
import { FilmService } from '../../_services/filmService/film.service';
import { EvenementService } from '../../_services/evenementService/evenement.service';
import { GallerieService } from '../../_services/gallerieService/gallerie.service';
import {Personne} from '../../models/personne.model';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {valueReferenceToExpression} from '@angular/compiler-cli/src/ngtsc/annotations/src/util';
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
  urls = [] ;
  file2 ;
  file1;
  // files: string[];
  image: any;
  filesGallerie: FileList;
  images: any = [];
  allfiles : any = [];


  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  files_data : string[] = [];

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
  // selectFiles(event) {
  //   const files = event.target.files;
  //   // this.filesGallerie = files;
  //   if (event.target.files) {
  //     for (var i = 0; i < files.length; i++){
  //       // this.files.push(event.target.files[i]);
  //       this.file1 = event.target.files[0];
  //       this.file2 = event.target.files[0];
  //       console.log(event.target.files[i]);
  //       var reader = new FileReader();
  //       reader.readAsDataURL(event.target.files[i]);
  //        reader.onload = ( event: any) => { this.urls.push(event.target.result);
  //       }
  //
  //     }
  //   }
  // }

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

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
      console.log(res);
    });
  }

  getEvenements(){
    this.evenementService.getEvenements().subscribe(res => {
      this.evenements = res;
      console.log(res);
    });
  }

  getgalleries(){
    this.gallerieService.getGalleries().subscribe(res => {
      this.galleries = res;
    });
  }


  onSubmit() {
    this.gallerie =this.form.value;
    if(this.gallerie.film == null && this.gallerie.evenement == null){
      this._snackBar.open("ajouter un film ou evenement",'cancel',{duration: this.durationInSeconds * 700 });
      return;
    }
    if(this.gallerie.film != null && this.gallerie.evenement != null){
      console.log("nulll");
      this._snackBar.open("Seance ne peut pas etre pour film/evenement au mm temps",'cancel',{duration: this.durationInSeconds * 700 });
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
