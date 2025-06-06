import { Component } from '@angular/core';
import { UsersService } from '../core/services/users.service';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { UserMapper } from 'src/app/@core/interfaces/user-mapper';
import { CommonModule } from '@angular/common';
import { GetMentorsRequestDTO, GetUserResponseDTO } from '../core/interfaces/users.interfaces';
import { MatTableModule } from '@angular/material/table';
import {MaterialModule} from 'src/app/material.module';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MaterialModule],
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent {

  users: GetUserResponseDTO[] = [];
  isLoading: boolean = false;
  constructor(private usersService: UsersService, private userService: CurrentUserService, private toastr:ToastrService) {
  }

  displayedColumns: string[] = ['assigned', 'email', 'actions'];

  ngOnInit(): void {
    this.isLoading = true;
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
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
        }
      });
    }
  }

  approveUser(user: GetUserResponseDTO): void {
    this.usersService.approveUser(user.id).subscribe({
      next: () => {
        console.log("User approved");
        this.loadMentors();
        this.toastr.success('User approved!', 'Success!');
      }
    });
  }

  declineUser(user: GetUserResponseDTO): void {
    this.usersService.declineUser(user.id).subscribe({
      next: () => {
        console.log("User declined");
        this.loadMentors();
        this.toastr.success('User declined!', 'Success!');
      }
    });
  }
    
}
