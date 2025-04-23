import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddStudentDetailsDTO, GetStudentDashboardDTO, HasDetailsResponseDTO } from './student.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
      
  constructor(private http: HttpClient) {}

  hasDetails(): Observable<HasDetailsResponseDTO> {
    return this.http.get<HasDetailsResponseDTO>(`${this.apiUrl}/has-student-details`);
  }

  addStudentDetails(details: AddStudentDetailsDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/add-student-details`, details);
  }

  getStudentDashboard(): Observable<GetStudentDashboardDTO> {
    return this.http.get<GetStudentDashboardDTO>(`${this.apiUrl}/student-dashboard`);
  }
}
