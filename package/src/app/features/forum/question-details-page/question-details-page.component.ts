import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../core/services/forum.service';
import {
  AddAnswerRequestDTO,
  GetAnswerResponseDTO,
  GetQuestionDetailsResponseDTO,
  GetQuestionResponseDTO,
} from '../core/interfaces/get-questions.dto';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { getTopicName, topicColors } from 'src/app/shared/enums/topic.enum';
import { ForumCardComponent } from '../forum-page/components/forum-card/forum-card.component';
import { getMatAutocompleteMissingPanelError } from '@angular/material/autocomplete';
import { QuillModule } from 'ngx-quill';
import { BreadcrumbsComponent } from '../forum-page/components/breadcrumbs/breadcrumbs.component';
import { SmartSearchSessionService } from '../../advanced-search/core/smart-search-session.service';

@Component({
  selector: 'app-question-details-page',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ForumCardComponent,
    QuillModule,
    BreadcrumbsComponent,
  ],
  providers: [DatePipe],
  templateUrl: './question-details-page.component.html',
  styleUrls: ['./question-details-page.component.scss'],
})
export class QuestionDetailsPageComponent {
  orderId: string = '';
  questionDetails: GetQuestionDetailsResponseDTO | null = null;
  isLoading: boolean = false;
  newAnswer: string = '';
  formattedDate: string = '';
  topicName: string;
  topicColor: string;

  searchQuery: string | null = null;
  matchType: string | null = null;
  highlightSnippet: string | null = null;
  page: number | null = null;
  fileName: string | null = null;

  constructor(
    private datePipe: DatePipe,
    private forumService: ForumService,
    private activeRoute: ActivatedRoute,
    private sessionService: SmartSearchSessionService
  ) {
    this.orderId = this.activeRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    const context = this.sessionService.getSelectedQuestionContext();
    if (context) {
      this.searchQuery = this.sessionService.get()?.searchTerm || '';
      this.matchType = context.matchedSource;
      this.highlightSnippet = context.matchedSnippet;
      this.page = context.page || null;
      this.fileName = context.fileName || null;
      
      this.sessionService.clear();
    }
    this.getAnswersForQuestion();
  }

  getAnswersForQuestion(): void {
    this.isLoading = true;
    const questionId = this.activeRoute.snapshot.paramMap.get('id');
    if (questionId) {
      this.forumService.getQuestionDetails(questionId).subscribe({
        next: (data) => {
          this.questionDetails = data;
          this.formattedDate =
            this.datePipe.transform(
              this.questionDetails.createdAt,
              'dd-MMMM-yyyy'
            ) || '';
          this.topicName = getTopicName(this.questionDetails.topic);
          this.topicColor = topicColors[this.questionDetails.topic];
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        },
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
        },
      });
    } else {
      this.isLoading = false;
    }
  }

  get questionAsResponse(): GetQuestionResponseDTO | null {
    return this.questionDetails;
  }

  formatMatch(source: string): string {
    switch (source) {
      case 'title':
        return 'Title';
      case 'content':
        return 'Description';
      case 'image':
        return 'Image';
      case 'document':
        return 'Document';
      default:
        return 'Content';
    }
  }

  shouldShowSnippet(): boolean {
    return this.matchType !== 'title' && this.matchType !== 'content';
  }

  getContextMessage(): string {
    switch (this.matchType) {
      case 'document':
        return 'in the attached document:';
      case 'image':
        return 'in the image below';
      case 'content':
        return 'in the description below';
      case 'title':
        return 'in the title below';
      default:
        return '';
    }
  }
}
