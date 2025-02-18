import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from, switchMap } from 'rxjs';
import { URLS } from 'src/app/shared/enums/url.enum';
import { UserApi } from '../api/user-api.service';
import { LocalStorageHelper } from '../helpers/local-storage.helper';
import { GetRefreshTokenPayload } from '../interfaces/refresh-token.interface';
import { UserService } from '../services/user.service';

export const AuthInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const userApi = inject(UserApi);
  const userService = inject(UserService);
  const router = inject(Router);

  // Nu interceptăm request-ul de refresh token
  if (req.url.includes('/api/auth/refresh-token')) {
    return next(req);
  }

  return from(handleRequestToken(req, userApi, userService, router)).pipe(
    switchMap((newRequest) => next(newRequest))
  );
};

async function handleRequestToken(
  request: HttpRequest<any>,
  userApi: UserApi,
  userService: UserService,
  router: Router
) {
  if (LocalStorageHelper.isJwtTokenValid()) {
    return addToken(request);
  }

  if (LocalStorageHelper.isRefreshTokenValid()) {
    try {
      const refreshPayload: GetRefreshTokenPayload = {
        refreshToken: LocalStorageHelper.getRefreshToken() || '',
        userId: LocalStorageHelper.getUserId() || '',
      };

      const success = await userApi.getJwtToken(refreshPayload);

      if (success) {
        return addToken(request);
      }
    } catch (error) {
      console.error('Refresh token failed:', error);
      LocalStorageHelper.removeTokensFromLocalStorage();
      userService.resetCurrentUser();
      router.navigate([URLS.LOGIN_PATH]);
    }
  }

  // Dacă nici refresh token-ul nu e valid, deconectăm utilizatorul
  LocalStorageHelper.removeTokensFromLocalStorage();
  userService.resetCurrentUser();
  router.navigate([URLS.LOGIN_PATH]);

  return request;
}

function addToken(request: HttpRequest<any>) {
  const jwtToken = LocalStorageHelper.getJwtToken();
  if (jwtToken) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
  }
  return request;
}
