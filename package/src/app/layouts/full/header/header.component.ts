import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgScrollbarModule, TablerIconsModule, MaterialModule],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {

  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  currentUser: any = null;
  readonly RoleTypeEnum = RoleTypeEnum;

  constructor(private router: Router, private currentUserService: CurrentUserService) {}

  ngOnInit() {
    this.currentUserService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }
  navigateToProfile() {
    this.router.navigate(['/my-profile']);
  }

  logout(){
    this.currentUserService.logoutUser();
  }
}