import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { StudentDetailsDialogComponent } from 'src/app/features/dashboard/components/student-details-dialog/student-details-dialog.component';

export enum Specialization {
  INFORMATICA = 'Informatica',
  INFORMATICA_APLICATA = 'Informatica Aplicată',
  MATEMATICA_INFO = 'Matematică-Info',
  INFORMATICA_GERMANA = 'Informatică în lb. germană'
}

export interface StudentDetails {
  id: string;
  faculty: string;
  specialization?: Specialization;
  group?: string;
  enrollmentDate: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentDetailsService {
  constructor(private dialog: MatDialog) {}

  openStudentDetailsDialog(): Observable<StudentDetails | undefined> {
    return this.dialog.open(StudentDetailsDialogComponent, {
      width: '400px',
      data: {},
      disableClose: true
    }).afterClosed();
  }
}
