import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../core/services/lists.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCompanyResponseDTO } from '../../core/interfaces/get-companies.interface';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyForm: FormGroup;

  constructor(private fb: FormBuilder, private listsService: ListsService, private snackBar: MatSnackBar, private router: Router) {
    console.log('AddCompanyComponent constructor');
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      adminEmail: ['', [Validators.required, Validators.email]],
      adminName: ['', Validators.required],
      adminSurname: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.companyForm.value);
    if (this.companyForm.valid) {
      const companyData = this.companyForm.value;
  
      this.listsService.createCompany(companyData).subscribe({
        next: (response: AddCompanyResponseDTO) => {
          this.snackBar.open("Company added successfully", 'OK', {
            duration: 3000,
            panelClass: 'snackbar-success'
          });
  
          const companyId = response.id;
  
          this.router.navigate([`/lists/companies/${companyId}`]);
        },
        error: (err) => {
          this.snackBar.open(`${err.error.message}`, 'OK', {
            duration: 3000,
            panelClass: 'snackbar-error'
          });
        }
      });
    }
  }
  
}
