
import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { GetRelatedQuestionResponseDto } from '../../../core/interfaces/get-related-questions.dto';
import { getTopicName, Topic, topicColors } from 'src/app/shared/enums/topic.enum';
import { RouterModule } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-related-card',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterModule],
  templateUrl: './related-card.component.html',
  styleUrls: ['./related-card.component.scss']
})
export class RelatedCardComponent {
  @Input() question!: GetRelatedQuestionResponseDto;
  @Input() showReadMore: boolean = true;
  topicColor: string;
  topicName: string;

  constructor(
    @Optional() private dialogRef: MatDialogRef<any>
  ) {}

  ngOnInit(): void {
    if (this.question.topic) {
      this.topicName = getTopicName(this.question.topic);
      this.topicColor = topicColors[this.question.topic];
    } else {
      console.error('Question topic is not defined or invalid');
    }
  }

  closeModal(): void {
    this.dialogRef.close(); // Close modal before navigating
  }

}
