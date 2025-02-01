import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-question-modal',
  standalone: true,
  imports: [],
  templateUrl: './add-question-modal.component.html'
})
export class AddQuestionModalComponent {
  questionTitle: string = '';
  questionContent: string = '';

  constructor(
    public dialogRef: MatDialogRef<AddQuestionModalComponent>
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.questionTitle.trim() && this.questionContent.trim()) {
      this.dialogRef.close({
        title: this.questionTitle,
        content: this.questionContent
      });
    }
  }
}