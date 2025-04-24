import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Specialization, StudentDetailsService, StudentDetails } from 'src/app/@core/services/student-details.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { StudentService } from '../../core/student.service';
import { AddStudentDetailsDTO } from '../../core/student.interfaces';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-details-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './student-details-dialog.component.html',
  styleUrls: ['./student-details-dialog.component.scss']
})
export class StudentDetailsDialogComponent {
  studentForm: FormGroup;
  specializations = Object.values(Specialization); // Dropdown cu specializările
  faculty: string = "Facultatea de Matematică și Informatică"; // Facultatea hardcodata

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<StudentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentDetails
  ) {
    // Blocăm ieșirea prin tastă ESC sau clic în afara dialogului
    dialogRef.disableClose = true;

    this.studentForm = this.fb.group({
      specialization: ['', Validators.required],
      group: ['', Validators.required]
    });
  }

  save() {
    if (this.studentForm.valid) {

      const details: AddStudentDetailsDTO = {
        specialization: this.studentForm.value.specialization,
        group: this.studentForm.value.group
      };

      this.studentService.addStudentDetails(details).subscribe(() => {
        this.dialogRef.close(details);
        this.toastr.success('Student details added successfully');
      }); 
  }
}
}
