import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-validate-code',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  templateUrl: './validate-code.component.html',
  styleUrls: ['./validate-code.component.scss']
})

export class ValidateCodeComponent {
  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    console.log('ValidateCodeComponent');
    this.validateForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  validateCode() {
    if (this.validateForm.valid) {
      console.log('Code entered:', this.validateForm.value.code);
      // Simulare validare cod
      this.router.navigate(['/dashboard']);
    }
  }

  resendCode() {
    console.log('Resending validation code...');
    // Aici poți apela API-ul pentru a retrimite codul
  }
}
