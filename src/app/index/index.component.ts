import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(public auth: AuthService) {}
}
