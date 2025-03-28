import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs"; 
import { GetAvailableStudentsResponseDTO, GetStudentResponseDTO } from "../interfaces/coordinator.interface";
import { GetUsersForRoleRequestDTO, GetUsersResponseDTO } from "src/app/features/lists-admin/core/interfaces/get-users-for-role.interface";
import { ShortUserDto } from "src/app/features/users/core/interfaces/users.interfaces";

@Injectable({
  providedIn: 'root',
})

export class CoordinatorService {
    private readonly baseUrl = `${environment.apiUrl}/coordinator`;
    
      constructor(private http: HttpClient) {
        console.log('Base URL:', this.baseUrl);
      }

      getAvailableStudents(): Observable<GetAvailableStudentsResponseDTO> {
        return this.http.get<GetAvailableStudentsResponseDTO>(`${this.baseUrl}/get-available-students`);
      }

      getMyStudents(company: GetUsersForRoleRequestDTO): Observable<GetUsersResponseDTO> {
        return this.http.post<GetUsersResponseDTO>(`${this.baseUrl}/get-my-students`, company);
      }

      getStudent(studentId: string): Observable<GetStudentResponseDTO> {
        return this.http.get<GetStudentResponseDTO>(`${this.baseUrl}/get-student/${studentId}`);
      }

      addStudent(studentId: string): Observable<void> {
        return this.http.get<void>(`${this.baseUrl}/add-my-student/${studentId}`);
      }

      removeStudent(studentId: string): Observable<void> {
        return this.http.get<void>(`${this.baseUrl}/remove-my-student/${studentId}`);
      }

}