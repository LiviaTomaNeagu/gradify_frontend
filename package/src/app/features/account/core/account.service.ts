import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTopicRequestDTO, GetAccountDetailsDTO } from './account.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private apiUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<GetAccountDetailsDTO> {
    return this.http.get<GetAccountDetailsDTO>(`${this.apiUrl}/get-account-details`);
  }
  
  addTopic(request: AddTopicRequestDTO):  Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/add-topic`, request);
  }

}
