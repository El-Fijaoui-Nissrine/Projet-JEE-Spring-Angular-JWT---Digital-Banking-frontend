import { Component,OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
          constructor(public authService: AuthService, private router:Router){}
           ngOnInit():void{


             }
           handleLogout(){
this.authService.logout();
this.router.navigateByUrl("/login");
             }
}
