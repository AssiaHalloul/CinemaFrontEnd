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
  //new_nationalite:  any;

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
  url="";
  userFile ;
  public imagePath;
  imgURL: any;
  public message: string;


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
        photo: ['', Validators.required],
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
    this.personne =this.form.value;
    formData.append('personne',JSON.stringify(this.personne));
    formData.append('file',this.userFile);
    // const dataa = {
    //   nom : this.personne.nom,
    //   prenom : this.personne.prenom,
    //   type: this.personne.type,
    //   date_naissance : this.personne.date_naissance,
    //   nationalite :this.personne.nationalite,
    // }
    this.personneService.createPersonne(formData).subscribe(data => {
      this.personne = new Personne();
      this.getPersonnes();
      this.gotoList();
      this._snackBar.open("personne well add",'cancel',{duration: this.durationInSeconds * 700 });

    } ,error => {
      console.log(error);
      this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
    });
  }

  gotoList() {
    this.router.navigate(['/personne/tables']);
  }

}
