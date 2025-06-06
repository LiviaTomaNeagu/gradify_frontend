import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/features/auth/core/services/auth.service';
import { LocalStorageHelper } from 'src/app/@core/helpers/local-storage.helper';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  loading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router, private currentUserService: CurrentUserService) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const credentials = {
      email: this.form.value.uname!.trim(),
      password: this.form.value.password!.trim(),
    };

    this.authService.login(credentials).subscribe({
      next: async (response) => {
        LocalStorageHelper.saveTokensToLocalStorage(response.accessToken, response.refreshToken);
        await this.currentUserService.initializeCurrentUser();
        if (response?.role === RoleTypeEnum.ADMIN) {
          this.router.navigate(['/lists/students']);
        } else {
          this.router.navigate(['/dashboard']);
        }
        console.log("Login successful, current user:", this.currentUserService.getCurrentUserInfo());
      },
      error: (err) => {
        this.errorMessage = err.error.message;  
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
