import { Component, OnInit } from '@angular/core';
import { GetCompanyResponseDTO } from '../core/interfaces/get-company.interface';
import { CompanyService } from '../core/services/company.service';
import { MaterialModule } from 'src/app/material.module';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule } from '@angular/forms';

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

  constructor(private companyService: CompanyService) {}

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
    // Implement save logic here, calling a service to update company data
  }
}
