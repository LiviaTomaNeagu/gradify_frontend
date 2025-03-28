import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListsService } from '../../core/services/lists.service';
import { MaterialModule } from 'src/app/material.module';
import { CompanyDetailsDTO } from '../../core/interfaces/get-companies.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-company-details',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  company: CompanyDetailsDTO;
  isLoading: boolean = false;

  constructor(private route: ActivatedRoute, private listsService: ListsService) {}
  
  ngOnInit(): void {
    this.isLoading = true;
    const companyId = this.route.snapshot.paramMap.get('id');
    console.log(companyId);
    if(companyId) {
      this.fetchCompanyDetails(companyId);
    }
  }

  fetchCompanyDetails(companyId: string): void {
    this.listsService.getCompanyDetails(companyId).subscribe((response) => {
      this.company = response;
      this.isLoading = false;
    });
  }

  get adminAvatar(): string {
    const avatars = [
      '/assets/images/profile/user-2.jpg',
      '/assets/images/profile/user-3.jpg'
    ];

    // Ensure we don't get errors if adminName is empty
    const index = this.company.name ? this.company.name.length % 2 : 0;
    return avatars[index];
  }

}