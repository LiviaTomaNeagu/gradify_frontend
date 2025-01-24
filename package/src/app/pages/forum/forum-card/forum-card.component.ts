import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { GetQuestionResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { getTopicName, Topic } from 'src/app/shared/enums/topic.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-forum-card',
  standalone: true,
  imports: [MaterialModule, MatCard, JsonPipe],
  providers: [DatePipe],
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  
})
export class ForumCardComponent {
  topicsList: string[] = [];
  formattedDate: string = '';
  constructor(private datePipe: DatePipe) {}


  ngOnInit(): void {
    if (this.question?.topic) {
      this.topicsList = Array(5).fill(getTopicName(this.question.topic));
      this.formattedDate = this.datePipe.transform(this.question.createdAt, 'dd-MMMM-yyyy') || '';
    } else {
      console.error('Question topic is not defined or invalid');
    }
  }
  @Input() question!: GetQuestionResponseDTO;
}
