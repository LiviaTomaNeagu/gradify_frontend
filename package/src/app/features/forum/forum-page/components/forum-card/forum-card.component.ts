import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { GetQuestionResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { getTopicName, Topic, topicColors } from 'src/app/shared/enums/topic.enum';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum-card',
  standalone: true,
  imports: [MaterialModule, MatCard, CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  
})
export class ForumCardComponent {
  topicName: string;
  topicColor: string;
  formattedDate: string = '';
  constructor(private datePipe: DatePipe, private toastr: ToastrService) {}


  ngOnInit(): void {
    if (this.question?.topic) {
      this.topicName = getTopicName(this.question.topic);
      this.topicColor = topicColors[this.question.topic];
      this.formattedDate = this.datePipe.transform(this.question.createdAt, 'dd-MMMM-yyyy') || '';
    } else {
      this.toastr.error('Question topic is not defined or invalid!', 'Oops!');
    }
  }
  @Input() question!: GetQuestionResponseDTO;
  @Input() showReadMore: boolean = false;

  isImage(fileName: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);
  }
  
}
