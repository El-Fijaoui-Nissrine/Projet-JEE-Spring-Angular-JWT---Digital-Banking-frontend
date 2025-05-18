import { Component } from '@angular/core';
import { RouterOutlet ,RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [RouterOutlet,  RouterModule,NavbarComponent],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
