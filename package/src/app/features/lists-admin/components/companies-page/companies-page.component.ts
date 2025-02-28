import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListsService } from '../../core/services/lists.service';
import { ShortCompanyDTO, GetCompaniesResponseDTO } from '../../core/interfaces/get-companies.interface';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies-page',
  standalone: true,
  templateUrl: './companies-page.component.html',
  styleUrls: ['./companies-page.component.scss'],
  imports: [MaterialModule, CommonModule]
})
export class CompaniesPageComponent implements OnInit {
  companies: MatTableDataSource<ShortCompanyDTO>;
  displayedColumns: string[] = ['name', 'adminName', 'adminSurname', 'adminEmail', 'status'];
  pageSize: number = 5;
  currentPage: number = 0;
  totalCompanies: number = 0;
  totalActiveCompanies: number = 0;
  isLoading: boolean = false;
  searchTerm: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private listsService: ListsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.isLoading = true;
    const payload = {
      page: this.currentPage + 1,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm
    };

    this.listsService.getCompanies(payload).subscribe((response: GetCompaniesResponseDTO) => {
      this.companies = new MatTableDataSource(response.occupations);
      this.totalCompanies = response.totalNumber;
      this.totalActiveCompanies = response.totalActive;
      this.isLoading = false;
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchCompanies();
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.fetchCompanies();
  }

  createCompany(): void { 
  }

  goToCompanyDetails(companyId: number): void {
    this.router.navigate([`/lists/companies/${companyId}`]);
  }
}
