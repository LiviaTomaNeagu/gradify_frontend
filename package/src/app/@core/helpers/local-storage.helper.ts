import { JwtHelperService } from '@auth0/angular-jwt';

export class LocalStorageHelper {
  private static readonly jwtToken = 'accessToken';
  private static readonly refreshToken = 'refreshToken';
  private static readonly userId = 'userId';

  private static readonly jwtHelper = new JwtHelperService();

  public static getJwtToken(): string | null {
    return localStorage.getItem(LocalStorageHelper.jwtToken);
  }

  public static getRefreshToken(): string | null {
    return localStorage.getItem(LocalStorageHelper.refreshToken);
  }

  public static getUserId(): string | null {
    return localStorage.getItem(LocalStorageHelper.userId);
  }

  public static saveTokensToLocalStorage(
    jwtToken: string,
    refreshToken: string
  ): void {
    localStorage.setItem(LocalStorageHelper.jwtToken, jwtToken);
    localStorage.setItem(LocalStorageHelper.refreshToken, refreshToken);
  }

  public static saveJwtTokenToLocalStorage(jwtToken: string): void {
    localStorage.setItem(LocalStorageHelper.jwtToken, jwtToken);
  }

  public static saveUserIdToLocalStorage(userId: string): void {
    localStorage.setItem(LocalStorageHelper.userId, userId);
  }

  public static removeTokensFromLocalStorage(): void {
    localStorage.removeItem(LocalStorageHelper.jwtToken);
    localStorage.removeItem(LocalStorageHelper.refreshToken);
    localStorage.removeItem(LocalStorageHelper.userId);
  }

  public static isJwtTokenValid(): boolean {
    const token = LocalStorageHelper.getJwtToken();
    return token ? !LocalStorageHelper.jwtHelper.isTokenExpired(token) : false;
  }

  public static isRefreshTokenValid(): boolean {
    const token = LocalStorageHelper.getRefreshToken();
    return token ? !LocalStorageHelper.jwtHelper.isTokenExpired(token) : false;
  }
}
