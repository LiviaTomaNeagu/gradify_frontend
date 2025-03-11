import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MentorResponseDTO } from './mentor.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private readonly apiUrl = `${environment.apiUrl}/users`;
      
  constructor(private http: HttpClient) {}

  getMentorStats(mentorId: string): Observable<MentorResponseDTO> {
    return this.http.get<MentorResponseDTO>(`${this.apiUrl}/stats/${mentorId}`);
  }
}
