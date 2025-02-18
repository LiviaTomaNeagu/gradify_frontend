import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { URLS } from 'src/app/shared/enums/url.enum';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { CurrentUserResponseInterfaceDTO } from '../interfaces/user.interface';
import { GetRefreshTokenPayload } from '../interfaces/refresh-token.interface';

@Injectable({
  providedIn: 'root',
})
export class UserApi {
  private readonly userPath = '/api/users';
  private readonly authPath = '/api/auth';
  private readonly urls = URLS;

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * ✅ Obține detaliile utilizatorului curent (fără mapper, folosește direct DTO-ul).
   */
  getCurrentUserDetails(): Promise<CurrentUserResponseInterfaceDTO | null> {
    return new Promise((resolve) => {
      this.http.get<CurrentUserResponseInterfaceDTO>(`${this.userPath}/get-current-user-details`)
        .subscribe({
          next: (responseDTO) => {
            LocalStorageHelper.saveUserIdToLocalStorage(responseDTO.id);
            resolve(responseDTO); // Returnăm direct DTO-ul, fără mapping
          },
          error: () => {
            this.logoutUser();
            resolve(null);
          },
        });
    });
  }

  /**
   * ✅ Obține un nou JWT folosind Refresh Token.
   */
  getJwtToken(getRefreshTokenPayload: GetRefreshTokenPayload): Promise<boolean> {
    return new Promise((resolve) => {
      this.http
        .post<{ accessToken: string; refreshToken: string }>(`${this.authPath}/refresh-token`, getRefreshTokenPayload)
        .subscribe({
          next: (responseDTO) => {
            if (responseDTO.accessToken && responseDTO.refreshToken) {
              LocalStorageHelper.saveTokensToLocalStorage(
                responseDTO.accessToken,
                responseDTO.refreshToken
              );
              resolve(true);
            } else {
              this.logoutUser();
              resolve(false);
            }
          },
          error: () => {
            this.logoutUser();
            resolve(false);
          },
        });
    });
  }

  /**
   * ✅ Deconectează utilizatorul și îl redirecționează către pagina de login.
   */
  private logoutUser() {
    LocalStorageHelper.removeTokensFromLocalStorage();
    this.router.navigate([this.urls.LOGIN_PATH]);
  }
}
