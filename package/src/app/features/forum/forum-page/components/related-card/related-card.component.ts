
import { Component, Input, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { GetRelatedQuestionResponseDto } from '../../../core/interfaces/get-related-questions.dto';
import { getTopicName, Topic, topicColors } from 'src/app/shared/enums/topic.enum';
import { RouterModule } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

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
  isAnswerCountVisible: boolean = false;;

  constructor(
    @Optional() private dialogRef: MatDialogRef<any>,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    if (this.question.topic) {
      this.topicName = getTopicName(this.question.topic);
      this.topicColor = topicColors[this.question.topic];
    } else {
      this.toastr.error('Question topic is not defined or invalid!', 'Oops!');
    }

    if (this.question.answersCount && this.question.answersCount > 0) {
      this.isAnswerCountVisible = true;
    }
  }

  closeModal(): void {
    this.dialogRef.close(); // Close modal before navigating
  }

}
