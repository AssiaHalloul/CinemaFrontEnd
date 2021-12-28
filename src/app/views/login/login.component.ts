import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../_services';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  returnUrl: string;
  public error = null;
  loading = false;

  constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,) { }


    ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/film/tables';
    }

    onSubmit(): void {
    this.loading = true;
    const { username, password } = this.form;

    console.log("username :" +username);
    //this.loading = true;
    this.authenticationService.login(username,password)
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => this.handleError(error));
  }

  handleError(error) {
    this.error = error.error.error;
  }

}