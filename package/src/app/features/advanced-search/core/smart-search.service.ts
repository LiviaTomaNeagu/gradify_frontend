import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SmartSearchRequestDto, SmartSearchResultDto } from './smart-search.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmartSearchService {
  private readonly baseUrl = `${environment.apiUrl}/forum/smart-search`;

  constructor(private http: HttpClient) {}

  smartSearch(query: string): Observable<SmartSearchResultDto[]> {
    const payload: SmartSearchRequestDto = {
      search: query,
    };
    return this.http.post<SmartSearchResultDto[]>(this.baseUrl, payload);
  }
}
