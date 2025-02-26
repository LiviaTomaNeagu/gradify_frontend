import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { OnInit } from '@angular/core';
import { GetUserResponseDTO } from 'src/app/features/users/core/interfaces/users.interfaces';
import { ListsService } from '../../core/services/lists.service';
import { GetUsersForRoleRequestDTO } from '../../core/interfaces/get-users-for-role.interface';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { DatePipe } from '@angular/common';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})

export class StudentsPageComponent implements OnInit {
  students: MatTableDataSource<GetUserResponseDTO>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'joinedDate'];
  pageSize: number = 7;
  currentPage: number = 0;
  totalStudents: number = 0;
  searchTerm: string = '';
  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  private searchSubject = new Subject<string>();

  constructor(private listsService: ListsService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.fetchStudents();

    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((search) => {
      console.log(search); 
      this.searchTerm = search;
      this.fetchStudents();
    });
  }  

  fetchStudents(): void {
    this.isLoading = true;
    const payload: GetUsersForRoleRequestDTO = {
      role: RoleTypeEnum.STUDENT,
      page: this.currentPage + 1,
      pageSize: this.pageSize,
      searchTerm: this.searchTerm
    };
  
    this.listsService.getUsersByRole(payload).subscribe((response) => {
      this.students = new MatTableDataSource(response.users); 
      this.totalStudents = response.totalUsers;
      this.isLoading = false;
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.fetchStudents();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'N/A';
  }

  onSearchChange(event: any): void {
    this.searchSubject.next(event.target.value);
  }
}
