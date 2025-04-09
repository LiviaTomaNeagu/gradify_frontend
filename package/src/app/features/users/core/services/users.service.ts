import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GetMentorsRequestDTO, GetMentorsResponseDTO, GetShortUsersResponseDTO } from "../interfaces/users.interfaces";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})

export class UsersService {
  
    private readonly baseUrl = `${environment.apiUrl}/users`;
    
      constructor(private http: HttpClient) {
        console.log('Base URL:', this.baseUrl);
      }

      getMentors(payload: GetMentorsRequestDTO): Observable<GetMentorsResponseDTO> {
        return this.http.post<GetMentorsResponseDTO>(`${this.baseUrl}/get-mentors`, payload);
      }

      approveUser(userId: string) {
        return this.http.put<string>(`${this.baseUrl}/approve-user/${userId}`, {});
      }

      declineUser(userId: string) {
        return this.http.delete<string>(`${this.baseUrl}/decline-user/${userId}`, {});
      }

      getAllShortUsers(): Observable<GetShortUsersResponseDTO> {
        return this.http.get<GetShortUsersResponseDTO>(`${this.baseUrl}/get-all-short-users`);
      }

}