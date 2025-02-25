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
import { AuthService } from 'src/app/features/auth/core/services/auth.service';
import { RoleTypeEnum, toRoleTypeEnum } from 'src/app/shared/enums/role-type.enum';

@Component({
  selector: 'app-side-register',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  loading = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    surname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get f() {
    return this.form.controls;
  }

  submit(role: string, event: Event) {
    event.preventDefault(); // Previne reîncărcarea paginii

    if (!this.form.valid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const userData = {
      name: this.form.value.uname!,
      surname: this.form.value.surname!,
      email: this.form.value.email!,
      password: this.form.value.password!,
      role: toRoleTypeEnum(role), // Adăugăm rolul ales
    };

    console.log('User data:', userData);
    this.authService.register(userData).subscribe({
      next: () => {
        this.redirectAfterRegister(toRoleTypeEnum(role), userData.email);
      },
      error: (err) => {
        console.error('Register error:', err);
      
        // Access the error message from the response body
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        }
        // Fallback: Access the error message from the headers
        else if (err.headers && err.headers.get('X-Error-Message')) {
          this.errorMessage = err.headers.get('X-Error-Message');
        }
        // Fallback: Use a generic error message
        else {
          this.errorMessage = 'An unexpected error occurred. Please try again.';
        }
      
        console.log('Error message:', this.errorMessage);
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  private redirectAfterRegister(role: RoleTypeEnum, email:string) {
    console.log('Redirecting to:', role);
    if (role === RoleTypeEnum.STUDENT) {
      this.router.navigate(['/auth/validate-code'],{ queryParams: { email: email } });
    } else if (role === RoleTypeEnum.COORDINATOR || role === RoleTypeEnum.MENTOR) {
      this.router.navigate(['/auth/pending-approval']);
    }
  }
}
