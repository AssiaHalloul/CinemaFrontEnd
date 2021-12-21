import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Eventtype } from '../../models/eventtype.model';
import { EventtypeService } from '../../_services/eventTypeService/eventtype.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  templateUrl: 'forms.component.html'
})
export class FormsComponent implements OnInit{
  durationInSeconds = 5;
  form: FormGroup;
  submitted = false;
  constructor(private eventTypeService: EventtypeService,
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

  eventTypes:any;
  eventType: Eventtype = new Eventtype();



  ngOnInit() {
    this.form = this.formBuilder.group(
        {
          type_event: ['', Validators.required],
        },
      );
    this.getEventTypes();
  }

  get f(): { [key: string]: AbstractControl } {
      return this.form.controls;
   }
  getEventTypes(){
    this.eventTypeService.getEventTypes().subscribe(res => {
      this.eventTypes = res;
    });
  }

  onSubmit() {
    this.submitted = true;
        if (this.form.invalid) {
          return;
        }
    this.eventType =this.form.value;
    console.log("form value",this.form.value)
    this.eventTypeService.createEventType(this.eventType).subscribe(data => {
      this.eventType = new Eventtype();
      this.getEventTypes();
      this.gotoList();
      this._snackBar.open("Event Type well add",'cancel',{duration: this.durationInSeconds * 700 });
    },error => {
      console.log(error);
      this._snackBar.open(" Something was wrong ",'cancel',{duration: this.durationInSeconds * 700 })
    });
  }



  gotoList() {
    this.router.navigate(['/type_event/tables']);
  }

}
