import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetQuestionsResponseDTO } from '../interfaces/get-questions.dto';
import { GetQuestionsRequestDTO } from '../interfaces/get-questions.dto';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private readonly baseUrl = `${environment.apiUrl}/forum/questions`;

  constructor(private http: HttpClient) {
    console.log('Base URL:', this.baseUrl);
  }

  getQuestions(payload: GetQuestionsRequestDTO): Observable<GetQuestionsResponseDTO> {
    const body = {
      search: payload.search ?? '',
      page: payload.page,
      pageSize: payload.pageSize,
      topic: payload.topic ?? null
    };
    return this.http.post<GetQuestionsResponseDTO>(this.baseUrl, body);
  }
  
}
