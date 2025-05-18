import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerService } from '../services/customer.service';
import {   ReactiveFormsModule,FormGroup ,FormBuilder,Validators } from '@angular/forms';
import {Customer } from '../model/customer.model';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! :FormGroup ;
constructor(private customerService: CustomerService,private fb:FormBuilder){}
ngOnInit():void{
  this.newCustomerFormGroup=this.fb.group({
name:this.fb.control(null,[Validators.required]),
email:this.fb.control(null,[Validators.required,Validators.email])

  });

}
handleNewCustomer(){
  let customer:Customer=this.newCustomerFormGroup.value;
  this.customerService.saveCustomer(customer).subscribe({
    next: data=>{
      alert("Customer has been successfully saved!");
      this.newCustomerFormGroup.reset();
      },
      error : err=>{
        console.log(err);}

  });
}}
