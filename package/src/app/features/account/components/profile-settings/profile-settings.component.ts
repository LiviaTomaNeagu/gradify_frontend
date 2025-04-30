import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import { AccountService } from '../../core/account.service';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports:[CommonModule, MaterialModule, TablerIconsModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  constructor(private accountService: AccountService, private currentUserService: CurrentUserService, private toastr: ToastrService) {}

  user = this.currentUserService.getCurrentUserInfo()!;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
  
      this.accountService.postAvatar(formData).subscribe({
        next: (response) => {
          this.user.avatarUrl = response.avatarUrl;
        },
        error: (err) => {
          this.toastr.error('Error uploading avatar!', 'Oops!');
        }
      });
    }
  }
  

  resetImage() {
    this.user.avatarUrl = '/assets/images/profile/user-2.jpg';
    this.accountService.deleteAvatar().subscribe({
      next: () => {
        this.fileInput.nativeElement.value = '';
        this.toastr.success(`Profile image successfully deleted!`, 'Succes');
      }
    });
  }
  
}
