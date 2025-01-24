import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetQuestionsResponseDTO } from '../interfaces/get-questions.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private readonly baseUrl = `${environment.apiUrl}/forum/questions`;

  constructor(private http: HttpClient) {
    console.log('Base URL:', this.baseUrl); // Verifică URL-ul
  }

  getQuestions(): Observable<GetQuestionsResponseDTO> {
    return this.http.get<GetQuestionsResponseDTO>(this.baseUrl);
  }
}
