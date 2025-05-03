import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetRelatedQuestionResponseDto } from '../../../core/interfaces/get-related-questions.dto';
import { ForumService } from '../../../core/services/forum.service';
import { RelatedCardComponent } from '../related-card/related-card.component';
import { CommonModule } from '@angular/common';
import { Topic, TopicCustomMapping } from 'src/app/shared/enums/topic.enum';
import { ToastrService } from 'ngx-toastr';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  standalone: true,
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RelatedCardComponent, QuillModule, FormsModule],
  styleUrls: ['./add-question-modal.component.scss']
})
export class AddQuestionModalComponent {
  titleFormGroup: FormGroup;
  relatedQuestions: GetRelatedQuestionResponseDto[] = [];
  isLoadingRelatedQuestions: boolean = false;
  questionDescription = '';
  attachedFiles: File[] = [];
  topicsList: { key: number, value: string }[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddQuestionModalComponent>,
    private _formBuilder: FormBuilder,
    private forumService: ForumService,
    private toastr: ToastrService
  ) {
    this.initializeTopics();
    this.titleFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      topic: [null, Validators.required]
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
        this.toastr.error('Failed to load related questions!', 'Oops!');
        this.isLoadingRelatedQuestions = true;
      }
    });
  }

  private initializeTopics(): void {
    this.topicsList = Object.entries(TopicCustomMapping).map(([key, value]) => ({
      key: +key,
      value: value
    }));
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    console.log('Submit clicked');
    if (this.titleFormGroup.valid) {
      console.log('Form submitted', this.attachedFiles, this.questionDescription);
      this.dialogRef.close({
        title: this.titleFormGroup.value.title,
        attachedFiles: this.attachedFiles,
        questionDescription: this.questionDescription,
        topic: this.titleFormGroup.value.topic
      });

    }
  }

  onSecondNext(): void {
    console.log('Second next');
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.add('dragover');
  }
  
  onDragLeave(event: DragEvent): void {
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');
  }
  
  onDrop(event: DragEvent): void {
    event.preventDefault();
    const dropZone = event.currentTarget as HTMLElement;
    dropZone.classList.remove('dragover');
  
    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }
  
  onFileSelected(event: any): void {
    if (event.target.files) {
      this.handleFiles(event.target.files);
    }
  }
  
  handleFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.attachedFiles.push(files.item(i)!);
    }
  }
  
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }


}
