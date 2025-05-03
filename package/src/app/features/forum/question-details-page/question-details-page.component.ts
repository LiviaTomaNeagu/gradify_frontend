import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../core/services/forum.service';
import { AddAnswerRequestDTO, GetAnswerResponseDTO, GetQuestionDetailsResponseDTO, GetQuestionResponseDTO } from '../core/interfaces/get-questions.dto';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { getTopicName, topicColors } from 'src/app/shared/enums/topic.enum';
import { ForumCardComponent } from "../forum-page/components/forum-card/forum-card.component";
import { getMatAutocompleteMissingPanelError } from '@angular/material/autocomplete';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-question-details-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule, ForumCardComponent, QuillModule],
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
    this.getAnswersForQuestion();
  }

  getAnswersForQuestion(): void{
    this.isLoading = true;
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
    this.isLoading = true;
  
    if (!this.newAnswer.trim()) {
      this.isLoading = false;
      return;
    }
  
    const newAnswerRequest: AddAnswerRequestDTO = {
      content: this.newAnswer.trim(),
    };
  
    this.newAnswer = '';
  
    const questionId = this.activeRoute.snapshot.paramMap.get('id');
    if (questionId) {
      this.forumService.addAnswer(questionId, newAnswerRequest).subscribe({
        next: () => {
          this.getAnswersForQuestion();
        },
        error: () => {
          this.isLoading = false;
        }
      });
    } else {
      this.isLoading = false;
    }
  }
  
  
  get questionAsResponse(): GetQuestionResponseDTO | null {
    return this.questionDetails;
  }
  
}
