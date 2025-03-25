import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports:[CommonModule, MaterialModule],
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})
export class ProfileSettingsComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  user = {
    fullName: 'John Doe',
    occupation: 'Software Engineer',
    profileImage: '/assets/images/profile/user-1.jpg',
    defaultImage: '/assets/images/profile/user-1.jpg'
  };

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  resetImage() {
    this.user.profileImage = this.user.defaultImage;
    this.fileInput.nativeElement.value = '';
  }
}
