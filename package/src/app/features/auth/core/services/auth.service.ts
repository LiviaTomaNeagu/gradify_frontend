import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { LoginRequestDTO, LoginResponseDTO, RefreshTokenRequestDTO } from '../interfaces/login.dto';
import { RegisterRequestDTO, VerifyCodeRequestDTO } from '../interfaces/register.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {
    console.log('Base URL:', this.baseUrl);
  }

  login(payload: LoginRequestDTO): Observable<LoginResponseDTO> {
    return this.http.post<LoginResponseDTO>(`${this.baseUrl}/login`, payload);
  }

  register(payload:RegisterRequestDTO): Observable<void> {
    console.log('Register payload:', payload);
    return this.http.post<void>(`${this.baseUrl}/register`, payload);
  }

  refreshToken(refreshToken: RefreshTokenRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/refresh-token`, { refreshToken });
  }

  verifyActivationCode(activationCode: VerifyCodeRequestDTO): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/verify-activation-code`, activationCode);
  }
}
