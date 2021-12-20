import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Genre } from '../../models/genre.model';
import { GenreService } from '../../_services/genreService/genre.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{
  durationInSeconds = 5;
  form: FormGroup;
  submitted = false;
  constructor(private genreService: GenreService,
    private router: Router,private formBuilder: FormBuilder,private _snackBar: MatSnackBar) {}

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

  genres:any;
  genre: Genre = new Genre();



  ngOnInit() {
    this.form = this.formBuilder.group(
        {
          nom: ['', Validators.required],
        },
      );
    this.getGenres();
  }

  get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
   }
  getGenres(){
    this.genreService.getGenres().subscribe(res => {
      this.genres = res;
    });
  }

  onSubmit() {
    this.submitted = true;
        if (this.form.invalid) {
          return;
        }
    this.genre =this.form.value;
    this.genreService.createGenre(this.genre).subscribe(data => {
      this.genre = new Genre();
      this.getGenres();
      this.gotoList();
      this._snackBar.open("genre well add",'cancel',{duration: this.durationInSeconds * 700 });
    },
    error => console.log(error));
    this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 });
  }

  /*insertGenre(): void {
    const data = {
      nom: this.genre.nom,
    };
    this.genreService.createGenre(data).subscribe(res => {
      console.log(res);
      this.getGenres();
      this.gotoList();
    });
  }*/

  gotoList() {
    this.router.navigate(['/genre_film/tables']);
  }

}
