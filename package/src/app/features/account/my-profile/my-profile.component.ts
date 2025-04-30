import { Component, OnInit } from '@angular/core';
import { AccountService } from '../core/account.service';
import { GetAccountDetailsDTO } from '../core/account.interface';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { StepsAchievedComponent } from "../components/steps-achieved/steps-achieved.component";
import { ProfileSettingsComponent } from '../components/profile-settings/profile-settings.component';
import { MyTopicsComponent } from '../components/my-topics/my-topics.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, MaterialModule, TablerIconsModule, StepsAchievedComponent, ProfileSettingsComponent, MyTopicsComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
changeProfileImage($event: Event) {
throw new Error('Method not implemented.');
}
  userDetails: GetAccountDetailsDTO | null = null;
  isLoading: boolean = true;
  progressPercentage: number = 0;

  constructor(private accountService: AccountService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.accountService.getAccountDetails().subscribe(
      (data) => {
        this.userDetails = data;
        this.isLoading = false;
      },
      (error) => {        
        this.toastr.error('Error fetching account details!', 'Oops!');
        this.isLoading = false;
      }
    );
  }
}
