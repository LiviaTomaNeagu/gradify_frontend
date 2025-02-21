import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { BrandingComponent } from './branding.component';
import { NgIf } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { UserService } from 'src/app/@core/services/user.service';
import { Subscription } from 'rxjs';
import { CurrentUserResponseInterfaceDTO } from 'src/app/@core/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [BrandingComponent, TablerIconsModule, MaterialModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  @Input() showToggle = true;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  userDataIsLoading: boolean = true;
  private readonly subscription: Subscription = new Subscription();

  constructor(private userService: UserService) {
    this.subscription.add(
      this.userService.currentUser$.subscribe({
        next: (user: CurrentUserResponseInterfaceDTO | null) => {
          if (user) {
            this.userDataIsLoading = false;
          }
        },
        error: () => {
          this.userDataIsLoading = false;
        },
      })
    );
  }

  async ngOnInit(): Promise<void> {
    this.userService.initializeCurrentUser();
  }

}