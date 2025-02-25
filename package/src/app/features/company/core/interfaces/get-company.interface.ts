export interface GetCompanyResponseDTO {
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    domain: string;
    totalUsers: number;
    totalResponses: number;
    adminName: string;
    adminEmail: string;
    adminSurname: string;
}

export interface UpdateCompanyRequestDTO {
    occupationId:string
    name: string;
    address: string;
    city: string;
    country: string;
    domain: string;
    adminName: string;
    adminSurname: string;
}
