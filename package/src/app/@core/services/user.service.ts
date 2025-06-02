import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApi } from '../api/user-api.service';
import { CurrentUserResponseInterfaceDTO } from '../interfaces/user.interface';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  currentUser$: BehaviorSubject<CurrentUserResponseInterfaceDTO | null> =
    new BehaviorSubject<CurrentUserResponseInterfaceDTO | null>(null);

  constructor(private userApi: UserApi, private router: Router) {}

  setCurrentUserInfo(user: CurrentUserResponseInterfaceDTO): void {
    this.currentUser$.next(user);
  }

  async initializeCurrentUser(): Promise<CurrentUserResponseInterfaceDTO | null> {
    if (this.currentUser$.value) {
      return this.currentUser$.value;
    } else {
      const response = await this.userApi.getCurrentUserDetails();
      console.log("Initialize current user", response);
      if (response === null) return null;
      this.setCurrentUserInfo(response);
      return response;
    }
  }

  updateCurrentUserName(name: string): void {
    const currentUser = this.currentUser$.value;
    if (currentUser) {
      currentUser.name = name;
      this.setCurrentUserInfo(currentUser);
    }
  }

  getCurrentUserInfo(): CurrentUserResponseInterfaceDTO | null {
    return this.currentUser$.value;
  }

  resetCurrentUser(): void {
    console.log("HERE")
    this.currentUser$.next(null);
  }

  logoutUser(): void {
    console.log("Logging out user");
    this.userApi.logoutUser();
  }
}

