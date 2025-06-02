import { Component, OnInit } from '@angular/core';
import { GetCompanyResponseDTO } from '../core/interfaces/get-company.interface';
import { CompanyService } from '../core/services/company.service';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { UpdateCompanyRequestDTO } from '../core/interfaces/get-company.interface';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, FormsModule, CommonModule],
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})

export class CompanyPageComponent implements OnInit {
  company!: GetCompanyResponseDTO;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private companyService: CompanyService, private toastr:ToastrService ) {}

  ngOnInit(): void {
    this.fetchCompanyData();
  }

  fetchCompanyData(): void {
    this.companyService.getMyCompany().subscribe({
      next: (data) => {
        this.company = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.toastr.error('Error fetching company data!', 'Oops!');
        this.errorMessage = "Nu s-a putut încărca profilul companiei.";
        this.isLoading = false;
      }
    });
  }

  saveCompanyDetails(): void {
  if (!this.company.name?.trim() || !this.company.address?.trim() || !this.company.city?.trim()) {
    this.toastr.error('Please fill in all required fields.', 'Validation Error');
    return;
  }

  const payload: UpdateCompanyRequestDTO = {
    occupationId: this.company.id,
    name: this.company.name.trim(),
    address: this.company.address.trim(),
    city: this.company.city.trim(),
    country: this.company.country.trim(),
    domain: this.company.domain?.trim(),
    adminName: this.company.adminName.trim(),
    adminSurname: this.company.adminSurname.trim()
  };

  this.companyService.updateCompanyDetails(payload).subscribe({
    complete: () => {
      console.log("Company details successfully updated.");
      this.toastr.success('Company details successfully updated!', 'Success!');
    },
    error: (error) => {
      this.toastr.error('Error updating company data!', 'Oops!');
    }
  });
}


}
