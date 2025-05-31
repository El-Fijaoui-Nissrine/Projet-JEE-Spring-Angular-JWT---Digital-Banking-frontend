import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerService } from '../services/customer.service';
import { catchError } from 'rxjs/operators';
import {  Observable,throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import {   ReactiveFormsModule,FormGroup ,FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {Customer } from '../model/customer.model';
import { Router } from '@angular/router';
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
constructor(private customerService: CustomerService,private fb:FormBuilder,private authService: AuthService,  private router: Router){}
ngOnInit():void{
  this.searchFormGroup=this.fb.group({
    keyword :this.fb.control("")});
this.handleSearchCustomers();


  }
handleSearchCustomers(){
let kw =this.searchFormGroup?.value.keyword;
this.customers=this.customerService.searchCustomers(kw).pipe(
                                                         catchError(err =>{

                                                           this.errorMessage=err.message;
                                                           return  throwError(err);})

                                                         );

  }
handleDeleteCustomers(c:Customer){
  let con=confirm("are you sure ?");
  if(!con) return;
this.customerService.deleteCustomer(c.id).subscribe({
  next:(resp)=>{
    this.customers=this.customers.pipe(map(data=>{let index=data.indexOf(c);
      data.slice(index,1)
      return data;})

  );
  },
error:err=>{console.log(err);}});}

isAdmin(): boolean {
  return this.authService.roles.includes('ADMIN');
}
 handleEditCustomer(customer: Customer) {
    this.router.navigate(['/admin/edit-customer', customer.id]);
  }
}
