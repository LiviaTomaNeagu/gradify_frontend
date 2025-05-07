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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-students-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  providers: [DatePipe],
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})

export class StudentsPageComponent implements OnInit {
  students: MatTableDataSource<GetUserResponseDTO>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'group','joinedDate'];
  pageSize: number = 7;
  currentPage: number = 0;
  totalStudents: number = 0;
  filteredStudents: number = 0;
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
      console.log(response.users);
      this.students = new MatTableDataSource(response.users); 
      this.totalStudents = response.totalUsers;
      this.filteredStudents = response.filteredUsers;
      this.isLoading = false;
    });
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log(event);
    this.fetchStudents();
  }

  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy') || 'N/A';
  }

  onSearchChange(event: any): void {
    this.searchTerm = event.target.value;  // Salvează valoarea în searchTerm
    this.searchSubject.next(this.searchTerm);
    this.resetPagination();
}


  private resetPagination(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

}
