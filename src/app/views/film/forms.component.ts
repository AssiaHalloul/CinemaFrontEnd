import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../_services/genreService/genre.service';
import { Nationalite } from '../../models/nationalite.model';
import { NationaliteService } from '../../_services/nationaliteService/nationalite.service';
import { Film } from '../../models/film.model';
import { FilmService } from '../../_services/filmService/film.service';
import { PersonneService } from '../../_services/personneService/personne.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{
  durationInSeconds = 5;
  form: FormGroup;
  submitted = false;
  genres: any;
  genre: Genre = new Genre();
  nationalites:any;
  films:Film  []=[];
  film:any;
  realisateurs: any;
  allstatus= [
    {id: 1, value: "En cours"},
    {id: 2, value: "prochainement"},
  ];
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;

  //multiple select
  dropdownList = [];
  selectedItems = [];
  acteurs=[];
  dropdownSettings:IDropdownSettings;

  // multiple files
  image: any;
  filesGallerie: FileList;
  images: any = [];
  allfiles :any = [] ;


  constructor(private genreService: GenreService,private filmService: FilmService,private nationaliteService: NationaliteService,private personneService: PersonneService,
              private router: Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar
              ) {
                
              }

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


  ngOnInit() {

    this.dropdownList = this.getActeurs();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

    this.getNationalities();
    this.getGenres();
    this.getRealisateur();

    this.form = this.formBuilder.group(
      {
        titre: ['', Validators.required],
        annee: ['', Validators.required],
        duree: ['', Validators.required],
        description: ['', Validators.required],
        trailer: ['', Validators.required],
        poster: ['', Validators.required],
        nationalite: ['', Validators.required],
        genre: ['', Validators.required],
        statue: ['', Validators.required],
        realisateur: ['', Validators.required],
        acteurs: ['', Validators.required],
        galleries: ['', ],
      },
    );

  }

  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems.push(items);
  }



  getNationalities(){
    this.nationaliteService.getNationalites().subscribe(res => {
      this.nationalites = res;
      console.log(res);
    });
  }

  getActeurs() : Array<any>{
    this.personneService.getActeurs().subscribe(res => {
      this.dropdownList = res;
    });
    return this.dropdownList;
  }

  getObjectListFromData(ids){
    return this.getActeurs().filter(item => ids.includes(item.id))
  }


  getRealisateur(){
    this.personneService.getRealisateurs().subscribe(res => {
      this.realisateurs = res;
    });
  }

  getGenres(){
    this.genreService.getGenres().subscribe(res => {
      this.genres = res;
    });
  }

  getFilms(){
    this.filmService.getFilms().subscribe(res => {
      this.films = res;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
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
    //event.srcElement.value=null;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log("reactive form:" , this.form.value);
    console.log("les acteurs", this.getObjectListFromData(this.form.value.acteurs.map(item => item.id)) );
    const formData = new  FormData();
    this.film =this.form.value;
    this.film.acteurs = this.getObjectListFromData(this.form.value.acteurs.map(item => item.id));
    formData.append('film',JSON.stringify(this.film));
    formData.append('file',this.userFile);
   // formData.append('files',this.filesGallerie);
   if(this.filesGallerie){
    for (let i = 0; i < this.filesGallerie.length; i++) {
      formData.append('files', this.filesGallerie[i]);
      console.log("single file",this.filesGallerie[i]);
    }
   }

    console.log("poster",this.userFile);
    console.log("files gallerie",this.allfiles);
    console.log("files gallerie list",this.allfiles);
    console.log("files gallerie size",this.filesGallerie);
    this.film =this.form.value;
    console.log("eeeeeeeee",this.film);
    this.filmService.createData(formData).subscribe(data => {
        this.film = new Film();
        //createData(formData)
        console.log("inside");

        this.getFilms();
        this.gotoList();
        this._snackBar.open("film well add",'cancel',{duration: this.durationInSeconds * 700 });
      },
      error => {console.log(error);
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  });
}

  gotoList() {
    this.router.navigate(['/film/tables']);
  }

  

}
