import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username = new FormControl('');
  firstName = new FormControl('');
  lastName = new FormControl('');
  password = new FormControl('');
  confirmPassword = new FormControl('');
  hasError = false;
  errorMessage = '';


  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }


  onSubmit(e: Event) {
    //Set defaults
    e.preventDefault();
    this.hasError = false;

    //Check fields for values
    if (
      !this.username.value ||
      !this.firstName.value ||
      !this.lastName.value ||
      !this.password.value ||
      !this.confirmPassword.value
    ){
      this.hasError = true;
      this.errorMessage = 'Please fill out all the fields';
      return;
    }

    //Check if passwords match
    if (this.password.value !== this.confirmPassword.value) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }

    //Sends http request to create user
    this.auth.signup(
      this.username.value,
      this.firstName.value,
      this.lastName.value,
      this.password.value
    )
    .subscribe({
      next: (v) => {
        this.router.navigate(['/login']);
        console.log('User Created');
        alert("Account has been created");
      },
      //error: (err) => {
        //this.hasError = true;
        //this.errorMessage = 
        //'Error Creating Account, Please Check Your Details';
      //}
    });

  }

}
