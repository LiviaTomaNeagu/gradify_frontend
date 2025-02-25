import { Component, OnInit } from '@angular/core';
import { GetCompanyResponseDTO } from '../core/interfaces/get-company.interface';
import { CompanyService } from '../core/services/company.service';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';
import { UpdateCompanyRequestDTO } from '../core/interfaces/get-company.interface';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-page',
  standalone: true,
  imports: [MaterialModule, TablerIconsModule, FormsModule],
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.scss']
})

export class CompanyPageComponent implements OnInit {
  company!: GetCompanyResponseDTO;
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private companyService: CompanyService, private snackBar: MatSnackBar) {}

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
        console.error("Error fetching company data:", error);
        this.errorMessage = "Nu s-a putut încărca profilul companiei.";
        this.isLoading = false;
      }
    });
  }

  saveCompanyDetails(): void {
    console.log("Saving:", this.company);
    const payload: UpdateCompanyRequestDTO = {
      occupationId: this.company.id,
      name: this.company.name,
      address: this.company.address,
      city: this.company.city,
      country: this.company.country,
      domain: this.company.domain,
      adminName: this.company.adminName,
      adminSurname: this.company.adminSurname
    }

    this.companyService.updateCompanyDetails(payload).subscribe({
      complete: () => {
        console.log("Company details successfully updated.");
        this.showSuccessSnackBar("Company details successfully updated.");
      },
      error: (error) => {
        console.error("Error updating company details:", error);
      }
    });
    
  }

  showSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: 'snackbar-success'
    });
  }
}
