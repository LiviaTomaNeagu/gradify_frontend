import { HttpInterceptorFn } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const GlobalInterceptor: HttpInterceptorFn = (req, next) => {
  const translateService = inject(TranslateService);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error) => {
      snackBar.open(
        error.error?.message ?? translateService.instant('somethingWentWrongMessage'),
        'OK',
        { duration: 3000, panelClass: ['error-snackbar'] }
      );
      return throwError(() => error);
    })
  );
};
