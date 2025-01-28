import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../../../material.module';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { GetQuestionResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { getTopicName, Topic, topicColors } from 'src/app/shared/enums/topic.enum';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forum-card',
  standalone: true,
  imports: [MaterialModule, MatCard, JsonPipe, CommonModule, RouterModule],
  providers: [DatePipe],
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  
})
export class ForumCardComponent {
  topicName: string;
  topicColor: string;
  formattedDate: string = '';
  constructor(private datePipe: DatePipe) {}


  ngOnInit(): void {
    if (this.question?.topic) {
      this.topicName = getTopicName(this.question.topic);
      this.topicColor = topicColors[this.question.topic];
      this.formattedDate = this.datePipe.transform(this.question.createdAt, 'dd-MMMM-yyyy') || '';
    } else {
      console.error('Question topic is not defined or invalid');
    }
  }
  @Input() question!: GetQuestionResponseDTO;
}
