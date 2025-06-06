import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListsService } from '../../core/services/lists.service';
import { GetUsersForRoleRequestDTO } from '../../core/interfaces/get-users-for-role.interface';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/features/users/core/services/users.service';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-teachers-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss'],
  providers: [DatePipe]
})
export class TeachersPageComponent implements OnInit {
  teachers: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'joinedDate', 'actions'];
  pageSize: number = 5;
  currentPage: number = 0;
  totalTeachers: number = 0;
  filteredTeachers: number = 0; 
  searchTerm: string = '';
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private listsService: ListsService, private datePipe: DatePipe, private usersService: UsersService, private toastr: ToastrService, private dialog: MatDialog) {}

  
    private searchSubject = new Subject<string>();
    
  ngOnInit(): void {
    this.fetchTeachers();

    this.searchSubject.pipe(
          debounceTime(300),
          distinctUntilChanged()
        ).subscribe((search) => {
          console.log(search); 
          this.searchTerm = search;
          this.fetchTeachers();
        });
  }

  fetchTeachers(): void {
    this.isLoading = true;
    const payload: GetUsersForRoleRequestDTO = {
      role: RoleTypeEnum.COORDINATOR,
      page: this.currentPage + 1,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm
    };

    this.listsService.getUsersByRole(payload).subscribe((response) => {
      this.teachers = new MatTableDataSource(response.users);
      this.totalTeachers = response.totalUsers;
      this.filteredTeachers = response.filteredUsers;
      this.isLoading = false;
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchTeachers();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'N/A';
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;
    this.searchSubject.next(this.searchTerm);
    this.resetPagination();
}


  approveTeacher(teacher: any): void {
    this.usersService.approveUser(teacher.id).subscribe(() => {
      teacher.isApproved = true;
      this.toastr.success('User approved!', 'Success!');
    });
  }

  declineTeacher(teacher: any): void {
    this.usersService.declineUser(teacher.id).subscribe(() => {
      this.fetchTeachers();
    });

    this.toastr.success('User declined!', 'Success!');

  }

  deleteTeacher(teacher: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${teacher.name} ${teacher.surname}?`
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usersService.declineUser(teacher.id).subscribe(() => {
          this.toastr.success('User deleted!', 'Success!');
          this.fetchTeachers();
        });
      }
    });
  }
  

  resetPagination(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
