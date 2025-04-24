import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddMyProgressDataResponseDTO, GetMyProgressDataResponseDTO } from './progress.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProgressService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getMyProgress(): Observable<GetMyProgressDataResponseDTO> {
    return this.http.get<GetMyProgressDataResponseDTO>(`${this.baseUrl}/get-my-progress`);
  }

  addMyProgress(payload: AddMyProgressDataResponseDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/add-my-progress`, payload);
  }
}
