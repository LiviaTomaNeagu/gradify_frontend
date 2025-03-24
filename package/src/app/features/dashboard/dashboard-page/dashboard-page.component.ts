import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { DashboardMentorComponent } from '../dashboard-mentor/dashboard-mentor.component';
import { MaterialModule } from 'src/app/material.module';
import { StudentDetailsService } from 'src/app/@core/services/student-details.service';
import { StudentService } from '../core/student.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, DashboardMentorComponent, MaterialModule], // Importă componenta mentorului
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  isMentor: boolean = false;
  isStudent: boolean = false;
  isCoordinator: boolean = false;

  constructor(private currentUserService: CurrentUserService, private studentDetailsService: StudentDetailsService, private studentService: StudentService) {}

  ngOnInit() {
    const currentUser = this.currentUserService.getCurrentUserInfo();
    this.isMentor = currentUser?.role === RoleTypeEnum.MENTOR || currentUser?.role === RoleTypeEnum.ADMIN_CORPORATE;
    this.isStudent = currentUser?.role === RoleTypeEnum.STUDENT;
    this.isCoordinator = currentUser?.role === RoleTypeEnum.COORDINATOR;

    if(this.isStudent) {
      this.studentService.hasDetails().subscribe(hasStudentDetails => {
        if(!hasStudentDetails.hasDetails) {
          this.studentDetailsService.openStudentDetailsDialog().subscribe(updatedStudent => {
            if (updatedStudent) {
              console.log('Updated Student Details:', updatedStudent);
            }
          });
        }
      });
    }
  }
}
