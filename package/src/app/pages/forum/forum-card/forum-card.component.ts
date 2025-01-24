import { Component, Input } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { MatCard } from '@angular/material/card';
import { JsonPipe } from '@angular/common';
import { GetQuestionResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { getTopicName, Topic } from 'src/app/shared/enums/topic.enum';

@Component({
  selector: 'app-forum-card',
  standalone: true,
  imports: [MaterialModule, MatCard, JsonPipe],
  templateUrl: './forum-card.component.html',
  styleUrls: ['./forum-card.component.scss'],
  
})
export class ForumCardComponent {
  topicsList: string[] = [];

  ngOnInit(): void {
    if (this.question?.topic) {
      this.topicsList = Array(5).fill(getTopicName(this.question.topic));
    } else {
      console.error('Question topic is not defined or invalid');
    }
  }
  @Input() question!: GetQuestionResponseDTO;
}
