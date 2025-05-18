import { Component, OnInit  } from '@angular/core';
import { RouterOutlet ,RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CustomersComponent } from './customers/customers.component';
import { AccountsComponent } from './accounts/accounts.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,  RouterModule,NavbarComponent,CustomersComponent,AccountsComponent,HttpClientModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    constructor( private  authService: AuthService){}
          ngOnInit():void{
            this.authService.loadJwtToken();

       }
  title = 'digital-banking-web';
}
