import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent {
  titleFormGroup: FormGroup;
  detailsFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionModalComponent>,
    private _formBuilder: FormBuilder
  ) {
    this.titleFormGroup = this._formBuilder.group({
      title: ['', Validators.required]
    });

    this.detailsFormGroup = this._formBuilder.group({
      details: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.titleFormGroup.valid && this.detailsFormGroup.valid) {
      this.dialogRef.close({
        title: this.titleFormGroup.value.title,
        content: this.detailsFormGroup.value.details
      });
    }
  }
}
