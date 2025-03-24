import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CoordinatorService } from '../core/services/coordinator.service';
import { UserFullNameDTO } from '../core/interfaces/coordinator.interface';
import { GetUserResponseDTO } from '../../users/core/interfaces/users.interfaces';
import { GetUsersForRoleRequestDTO } from '../../lists-admin/core/interfaces/get-users-for-role.interface';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-my-students',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {
  displayedColumns: string[] = ['assigned', 'faculty', 'specialization', 'group', 'email'];
  dataSource = new MatTableDataSource<UserFullNameDTO>([]);
  searchControl = new FormControl('');
  isLoading: boolean = false;
  
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private coordinatorService: CoordinatorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadStudents();

    this.route.params.subscribe(() => {
      this.isLoading = true;
      console.log('Route params changed');
      this.loadStudents();
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(value => {
      this.dataSource.filter = value!.trim().toLowerCase();
    });
  }

  loadStudents() {
    this.isLoading = true;
    const request: GetUsersForRoleRequestDTO = { role: RoleTypeEnum.STUDENT, page: 1, pageSize: 100, searchTerm: '' };

    this.coordinatorService.getMyStudents(request).subscribe(response => {
      this.dataSource.data = response.users.map(student => ({
        ...student,
        photoUrl: this.getDefaultAvatar(student.name) // Aplicăm avatar implicit
      }));
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
    this.isLoading = false;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDefaultAvatar(name: string): string {
    const avatars = [
      '/assets/images/profile/user-1.jpg',
      '/assets/images/profile/user-2.jpg',
      '/assets/images/profile/user-3.jpg',
      '/assets/images/profile/user-4.jpg',
    ];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const index = Math.abs(hash) % avatars.length;
    return avatars[index]; 
  }
}
