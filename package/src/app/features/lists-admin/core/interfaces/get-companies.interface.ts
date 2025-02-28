export interface ShortCompanyDTO {
  id: number;
  name: string;
  adminEmail: string;
  adminName: string;
  adminSurname: string;
  isActive: boolean;
}

export interface CompanyDetailsDTO {
    id: number;
    name: string;
    adminEmail: string;
    adminName: string;
    adminSurname: string;
    isActive: boolean;
    address: string;
    city: string;
    country: string;
    createdAt: string;
    domain: string;
    numberOfResponses: number;
}

export interface GetCompaniesResponseDTO {
    occupations: ShortCompanyDTO[];
    totalNumber: number;
    totalActive: number;
}

export interface GetCompaniesRequestDTO {
    page: number;
    pageSize: number;
    searchTerm: string;
}