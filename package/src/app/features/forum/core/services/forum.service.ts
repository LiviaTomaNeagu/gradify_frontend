import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddAnswerRequestDTO, GetQuestionsResponseDTO } from '../interfaces/get-questions.dto';
import { GetQuestionDetailsResponseDTO } from '../interfaces/get-questions.dto';
import { GetQuestionsRequestDTO } from '../interfaces/get-questions.dto';
import { environment } from '../../../../../environments/environment';
import { GetRelatedQuestionResponseDto, GetRelatedQuestionsRequestDto } from '../interfaces/get-related-questions.dto';
import { AddQuestionRequestDTO } from '../interfaces/add-question.interfaces';

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
      topics: payload.topics
    };
    return this.http.post<GetQuestionsResponseDTO>(this.baseUrl, body);
  }

  getQuestionDetails(questionId: string): Observable<GetQuestionDetailsResponseDTO> {
    return this.http.get<GetQuestionDetailsResponseDTO>(`${this.baseUrl}/${questionId}/details`);
  }

  addAnswer(questionId: string, payload: AddAnswerRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${questionId}/details`, payload);
  }

  getRelatedQuestions(payload: GetRelatedQuestionsRequestDto): Observable<GetRelatedQuestionResponseDto[]> {
    console.log('Payload:', payload);
    return this.http.post<GetRelatedQuestionResponseDto[]>(`${environment.apiUrl}/forum/get-related-questions`, payload);
  }

  addQuestion(payload: AddQuestionRequestDTO, files?: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('descriptionHtml', payload.descriptionHtml);
    formData.append('topic', payload.topic.toString());

  
    if (files) {
      files.forEach(file => formData.append('attachments', file));
    }
  
    return this.http.post(`${this.baseUrl}/add`, formData);
  }
  
}
