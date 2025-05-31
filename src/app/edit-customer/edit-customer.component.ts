import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customerId!: number;
  errorMessage!: string;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.customerForm = this.fb.group({
      id: [''],
      name: [''],
      email: ['']
    });

    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer) => {
        this.customerForm.patchValue({
          id: customer.id,
          name: customer.name,
          email: customer.email
        });
      },
      error: (err) => {
        this.errorMessage = err.message;
      }
    });
  }

  handleUpdateCustomer() {
    const customer = this.customerForm.value;
    this.customerService.updateCustomer(customer).subscribe({
      next: () => {
        this.router.navigateByUrl('/admin/customers');
      },
      error: (err) => {
        console.error('Update error:', err);
        this.errorMessage = 'Failed to update customer';
      }
    });
  }
}
