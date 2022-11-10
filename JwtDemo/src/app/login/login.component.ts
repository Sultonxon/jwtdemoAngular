import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Form, NgForm } from '@angular/forms';
import { AuthenticationResponse } from '../_interfaces/authentication.model';
import { LoginModel } from '../_interfaces/login.model';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
    credentials: LoginModel = {username: "", password: ""};
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    
  }

  login(form: NgForm){
    if(form.valid){
        this.http.post<AuthenticationResponse>("https://localhost:5001/api/auth/login", this.credentials, {
            headers: new HttpHeaders({"Content-Type": "application/json"})
        })
        .subscribe({
            next: (response: AuthenticationResponse) => {
                const token = response.token;
                localStorage.setItem("jwt", token);
                this.invalidLogin = false;
                this.router.navigate(["/"]);
            },
            error: (err: HttpErrorResponse) => this.invalidLogin = true
        });
    }
  }
}

