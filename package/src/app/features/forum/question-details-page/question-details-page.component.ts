import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../core/services/forum.service';
import { GetAnswerResponseDTO, GetQuestionDetailsResponseDTO, GetQuestionResponseDTO } from '../core/interfaces/get-questions.dto';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { getTopicName, topicColors } from 'src/app/shared/enums/topic.enum';
import { ForumCardComponent } from "../forum-page/components/forum-card/forum-card.component";

@Component({
  selector: 'app-question-details-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ForumCardComponent],
  providers: [DatePipe],
  templateUrl: './question-details-page.component.html',
  styleUrls: ['./question-details-page.component.scss'],
})
export class QuestionDetailsPageComponent {
  orderId:string='';
  questionDetails: GetQuestionDetailsResponseDTO | null = null;
  isLoading: boolean = false;
  newAnswer: string = '';
  formattedDate: string = '';
  topicName: string;
  topicColor: string;

  constructor(private datePipe: DatePipe, private forumService: ForumService, private activeRoute:ActivatedRoute){
    this.orderId = this.activeRoute.snapshot.params['id'];
    console.log(this.orderId) 
  }

  ngOnInit(): void {
    const questionId = this.activeRoute.snapshot.paramMap.get('id');
    if (questionId) {
      this.forumService.getQuestionDetails(questionId).subscribe({
        next: (data) => {
          this.questionDetails = data;
          this.formattedDate = this.datePipe.transform(this.questionDetails.createdAt, 'dd-MMMM-yyyy') || '';
          this.topicName = getTopicName(this.questionDetails.topic);
          this.topicColor = topicColors[this.questionDetails.topic];
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  submitAnswer(): void {
    if (!this.newAnswer.trim()) {
      return;
    }

    const newAnswer: GetAnswerResponseDTO = {
      id: Math.random().toString(36).substr(2, 9),
      questionId: this.questionDetails?.id ?? '',
      content: this.newAnswer,
      createdAt: new Date().toISOString(),
      name: 'currentUserId',
      surname: '',
      occupationName: ''
    };

    // Simulăm adăugarea răspunsului (de obicei, ar trebui să fie apel API)
    this.questionDetails?.answers.push(newAnswer);
    this.newAnswer = '';
  }
  
  get questionAsResponse(): GetQuestionResponseDTO | null {
    return this.questionDetails;
  }
  
}
