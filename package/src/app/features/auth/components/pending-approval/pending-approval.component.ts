import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCard } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  standalone: true,
  imports: [MaterialModule, MatIconModule, MatCard],
  styleUrls: ['./pending-approval.component.scss']
})
export class PendingApprovalComponent {

  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/']);
  }
}
