import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CoordinatorService } from '../core/services/coordinator.service';
import { GetStudentResponseDTO, UserFullNameDTO} from '../core/interfaces/coordinator.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ShortUserDto } from '../../users/core/interfaces/users.interfaces';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppFormToastrComponent } from 'src/app/components/form-toastr/form-toastr.component';

@Component({
  selector: 'app-add-student-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.scss'],
  animations: [
    trigger('searchBarAnimation', [
      state('center', style({
        transform: 'translateY(50%)',
        width: '60%',
        margin: '0 auto'
      })),
      state('top', style({
        transform: 'translateY(0)',
        width: '100%'
      })),
      transition('center => top', animate('300ms ease-in')),
      transition('top => center', animate('300ms ease-out'))
    ])
  ]
})
export class AddStudentPageComponent implements OnInit {
  studentControl = new FormControl('');
  filteredStudents!: Observable<UserFullNameDTO[]>;
  students: UserFullNameDTO[] = [];
  groupedStudents: { group: string; students: UserFullNameDTO[] }[] = [];
  selectedStudent: GetStudentResponseDTO | null = null;
  searchBarState: 'center' | 'top' = 'center';

  constructor(private coordinatorService: CoordinatorService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    this.coordinatorService.getAvailableStudents().subscribe(response => {
      this.students = response.userFullNames;
      this.groupedStudents = this.groupStudentsBySurname(this.students);

      this.studentControl.valueChanges.subscribe(value => {
        this.filterStudents(value || '');
      });
    });
  }

  private filterStudents(value: string) {
    const filterValue = value.toLowerCase();
    const filtered = this.students.filter(student =>
      `${student.name} ${student.surname}`.toLowerCase().includes(filterValue)
    );

    this.groupedStudents = this.groupStudentsBySurname(filtered);
  }

  private groupStudentsBySurname(students: UserFullNameDTO[]) {
    const groups: { [key: string]: UserFullNameDTO[] } = {};

    students.forEach(student => {
      const firstLetter = student.surname.charAt(0).toUpperCase();
      if (!groups[firstLetter]) {
        groups[firstLetter] = [];
      }
      groups[firstLetter].push(student);
    });

    return Object.keys(groups)
      .sort()
      .map(letter => ({
        group: letter,
        students: groups[letter]
      }));
  }

  selectStudent(student: UserFullNameDTO) {
    this.searchBarState = 'top';

    this.coordinatorService.getStudent(student.id).subscribe(response => {
      this.selectedStudent = response;
    });
  }

  addStudent() {
    if (this.selectedStudent) {
      this.coordinatorService.addStudent(this.selectedStudent.id).subscribe(() => {
        this.toastr.success(`${this.selectedStudent?.name} a fost adăugat cu succes!`, 'Succes');

        this.selectedStudent = null;
        this.searchBarState = 'center';
        this.studentControl.setValue('');
      });
    }
    this.router.navigate(['/coordinator/my-students']);
  }
}
