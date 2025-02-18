import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetRelatedQuestionResponseDto } from '../../../core/interfaces/get-related-questions.dto';
import { ForumService } from '../../../core/services/forum.service';
import { RelatedCardComponent } from '../related-card/related-card.component';
import { CommonModule } from '@angular/common';
import { Topic } from 'src/app/shared/enums/topic.enum';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RelatedCardComponent],
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent {
  titleFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  relatedQuestions: GetRelatedQuestionResponseDto[] = [];
  isLoadingRelatedQuestions: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddQuestionModalComponent>,
    private _formBuilder: FormBuilder,
    private forumService: ForumService
  ) {
    this.titleFormGroup = this._formBuilder.group({
      title: ['', Validators.required]
    });

    this.detailsFormGroup = this._formBuilder.group({
      details: ['', Validators.required]
    });
  }

  onFirstNext(): void {
    const title = this.titleFormGroup.value.title;
    if (!title) return;

    this.isLoadingRelatedQuestions = true;

    const request =
    {
      content: title,
      topic: Topic.Angular
    
    }

    this.forumService.getRelatedQuestions(request).subscribe({
      next: (questions) => {
        this.relatedQuestions = questions;
        this.isLoadingRelatedQuestions = false;
        console.log('Related questions loaded', questions);
      },
      error: () => {
        console.error('Failed to load related questions');
        this.isLoadingRelatedQuestions = true;
      }
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

  onSecondNext(): void {
    console.log('Second next');
  }
  
}
