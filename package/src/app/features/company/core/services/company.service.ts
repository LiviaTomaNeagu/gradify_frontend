import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GetCompanyResponseDTO } from "../interfaces/get-company.interface";

@Injectable({
  providedIn: 'root',
})

export class CompanyService {
    private readonly baseUrl = `${environment.apiUrl}/users`;
    
      constructor(private http: HttpClient) {
        console.log('Base URL:', this.baseUrl);
      }

      getMyCompany(): Observable<GetCompanyResponseDTO> {
        return this.http.get<GetCompanyResponseDTO>(`${this.baseUrl}/get-my-company`);
      }

}