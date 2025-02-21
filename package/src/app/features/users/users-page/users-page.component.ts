import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { UserService } from 'src/app/@core/services/user.service';
import { UserMapper } from 'src/app/@core/interfaces/user-mapper';
import { CommonModule } from '@angular/common';
import { GetMentorsRequestDTO, GetUsersResponseDTO } from '../core/interfaces/users.interfaces';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  users: GetUsersResponseDTO[] = [];
  constructor(private usersService: UsersService, private userService: UserService) {
  }

  displayedColumns: string[] = ['assigned', 'role', 'status', 'actions'];

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
          this.users = response.mentors
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}
