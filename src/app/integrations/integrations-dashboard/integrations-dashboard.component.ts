import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-integrations-dashboard',
  templateUrl: './integrations-dashboard.component.html',
  styleUrls: ['./integrations-dashboard.component.scss']
})
export class IntegrationsDashboardComponent {
  constructor(public auth: AuthService) { }
}
