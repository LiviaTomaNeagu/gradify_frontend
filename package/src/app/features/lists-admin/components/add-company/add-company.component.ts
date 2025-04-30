import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ListsService } from '../../core/services/lists.service';
import { AddCompanyResponseDTO } from '../../core/interfaces/get-companies.interface';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-company',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent {
  companyForm: FormGroup;

  constructor(private fb: FormBuilder, private listsService: ListsService, private router: Router, private toastr: ToastrService) {
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
          this.toastr.success('Company added successfully', 'Success!');
  
          const companyId = response.id;
  
          this.router.navigate([`/lists/companies/${companyId}`]);
        },
        error: (err) => {
          this.toastr.error(`${err.error.message}`, 'Oops!');
        }
      });
    }
  }
  
}
