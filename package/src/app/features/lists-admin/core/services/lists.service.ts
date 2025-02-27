import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { GetUsersForRoleRequestDTO, GetUsersResponseDTO } from "../interfaces/get-users-for-role.interface";
import { GetCompaniesRequestDTO, GetCompaniesResponseDTO } from "../interfaces/get-companies.interface";

@Injectable({
  providedIn: 'root',
})

export class ListsService {
    private readonly usersUrl = `${environment.apiUrl}/users`;
    
    private readonly occupationsUrl = `${environment.apiUrl}/users`;
    
      constructor(private http: HttpClient) {}

      getUsersByRole(payload: GetUsersForRoleRequestDTO): Observable<GetUsersResponseDTO> {
        return this.http.post<GetUsersResponseDTO>(`${this.usersUrl}/get-users-for-role`, payload);
      }

      getCompanies(payload: GetCompaniesRequestDTO): Observable<GetCompaniesResponseDTO> {
        return this.http.post<GetCompaniesResponseDTO>(`${this.occupationsUrl}/get-companies`, payload);
      }
}