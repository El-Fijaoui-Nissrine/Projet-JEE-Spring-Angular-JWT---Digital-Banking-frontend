import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerService } from '../services/customer.service';
import { catchError } from 'rxjs/operators';
import {  Observable,throwError } from 'rxjs';
import {   ReactiveFormsModule,FormGroup ,FormBuilder } from '@angular/forms';

import {Customer } from '../model/customer.model';
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers! : Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup :FormGroup | undefined;
constructor(private customerService: CustomerService,private fb:FormBuilder){}
ngOnInit():void{
  this.searchFormGroup=this.fb.group({
    keyword :this.fb.control("")});
this.customers=this.customerService.getCustomers().pipe(
  catchError(err =>{

    this.errorMessage=err.message;
    return  throwError(err);})

  );


  }
handleSearchCustomers(){}
}
