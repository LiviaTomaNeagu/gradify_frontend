import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddTopicRequestDTO, GetAccountDetailsDTO, UploadAvatarResponse } from './account.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private apiUrl = `${environment.apiUrl}/users`;
  private filesUrl = `${environment.apiUrl}/files`;

  constructor(private http: HttpClient) {}

  getAccountDetails(): Observable<GetAccountDetailsDTO> {
    return this.http.get<GetAccountDetailsDTO>(`${this.apiUrl}/get-account-details`);
  }
  
  addTopic(request: AddTopicRequestDTO):  Observable<void>{
    return this.http.post<void>(`${this.apiUrl}/add-topic`, request);
  }

  postAvatar(formData: FormData): Observable<UploadAvatarResponse> {
    return this.http.post<UploadAvatarResponse>(`${this.filesUrl}/upload-avatar`, formData)
  }

  deleteAvatar(): Observable<void> {
    return this.http.delete<void>(`${this.filesUrl}/delete-avatar`)
  }

}
