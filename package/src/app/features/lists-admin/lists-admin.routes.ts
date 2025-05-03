import { Routes } from '@angular/router';

export const ListsAdminRoutes: Routes = [
  {
    path: '',
    redirectTo:'teachers',
    pathMatch:'full'
    
  },
  {
    path:'teachers',
    loadComponent:()=>import('./components/teachers-page/teachers-page.component').then(c => c.TeachersPageComponent)
  },
  {
    path:'students',
    loadComponent:()=>import('./components/students-page/students-page.component').then(c => c.StudentsPageComponent)
  },
  {
    path:'companies',
    loadComponent:()=>import('./components/companies-page/companies-page.component').then(c => c.CompaniesPageComponent)
  },
  {
    path:'companies/add',
    loadComponent:()=>import('./components/add-company/add-company.component').then(c => c.AddCompanyComponent)
  },
  {
    path:'companies/:id',
    loadComponent:()=>import('./components/company-details/company-details.component').then(c => c.CompanyDetailsComponent)
  },
  {
    path:'groups',
    loadComponent:()=>import('./components/groups-page/groups-page.component').then(c => c.GroupsPageComponent)
  },
  
];
