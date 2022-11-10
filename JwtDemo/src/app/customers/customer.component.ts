import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomersComponent implements OnInit {

    customers: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get("https://localhost:5001/api/customers", {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
    }).subscribe({
        next: (result: any) => this.customers = result,
        error: (err: HttpErrorResponse) => console.log(err)
    });
  }
}

