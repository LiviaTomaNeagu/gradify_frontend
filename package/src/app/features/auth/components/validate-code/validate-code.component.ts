import { Component } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../../core/services/auth.service';
import { VerifyCodeRequestDTO } from '../../core/interfaces/register.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-validate-code',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss']
})

export class ValidateCodeComponent {
  validateForm: FormGroup;
  email: string = '';
  errorMessage: string | null = null;
  loading: boolean = false;

  constructor(private authService: AuthService , private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
    console.log('ValidateCodeComponent');
    this.validateForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Retrieve the email from query parameters
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      console.log('Email received:', this.email);
    });
  }


  validateCode() {
    this.loading = true;
      if (this.validateForm.valid) {
      console.log('Code entered:', this.validateForm.value.code);

     const request: VerifyCodeRequestDTO = {
        code: this.validateForm.value.code,
        email: this.email
      };

      this.authService.verifyActivationCode(request).subscribe({
        next: () => {
          console.log('Code is valid!');
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (err) => {
          console.error('Code is invalid:', err);
          this.validateForm.get('code')?.setErrors({ invalidCode: true });
          this.loading = false;
        }
      });
    }
  }

  resendCode() {
    console.log('Resending validation code...');
    // Aici poți apela API-ul pentru a retrimite codul

  }
}
