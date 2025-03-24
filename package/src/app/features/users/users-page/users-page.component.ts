import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { UserMapper } from 'src/app/@core/interfaces/user-mapper';
import { CommonModule } from '@angular/common';
import { GetMentorsRequestDTO, GetUserResponseDTO } from '../core/interfaces/users.interfaces';
import { MatTableModule } from '@angular/material/table';
import {MaterialModule} from 'src/app/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MaterialModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  users: GetUserResponseDTO[] = [];
  constructor(private usersService: UsersService, private userService: CurrentUserService, private snackBar: MatSnackBar) {
  }

  displayedColumns: string[] = ['assigned', 'email', 'actions'];

  ngOnInit(): void {
    this.loadMentors();
  }

  loadMentors(): void {

    const currentUser = this.userService.getCurrentUserInfo();

    console.log("Current user", currentUser);
    if(currentUser) {
      const payload: GetMentorsRequestDTO = {
        page: 1,
        pageSize: 15,
        adminUser: UserMapper.mapFromCurrentUserToShortUserDto(currentUser)
      }

      console.log("Payload", payload);
      this.usersService.getMentors(payload).subscribe({
        next: (response) => {
          this.users = response.users;
          console.log("Mentors", this.users);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  approveUser(user: GetUserResponseDTO): void {
    this.usersService.approveUser(user.id).subscribe({
      next: () => {
        console.log("User approved");
        this.loadMentors();
        this.snackBar.open("User approved!", 'OK', {
          duration: 3000,
          panelClass: 'snackbar-success'
        });
      }
    });
  }

  declineUser(user: GetUserResponseDTO): void {
    this.usersService.declineUser(user.id).subscribe({
      next: () => {
        console.log("User declined");
        this.loadMentors();
        this.snackBar.open("User declined!", 'OK', {
          duration: 3000,
          panelClass: 'snackbar-error'
        });
      }
    });
  }

  showSuccessSnackBar(message: string) {
    
  }
}
