import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CoordinatorService } from '../core/services/coordinator.service';
import { UserFullNameDTO} from '../core/interfaces/coordinator.interface';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-student-page',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-student-page.component.html',
  styleUrls: ['./add-student-page.component.scss']
})
export class AddStudentPageComponent implements OnInit {
  studentControl = new FormControl('');
  filteredStudents!: Observable<UserFullNameDTO[]>;
  students: UserFullNameDTO[] = [];
  groupedStudents: { group: string; students: UserFullNameDTO[] }[] = [];

  constructor(private coordinatorService: CoordinatorService) {}

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

  
}
