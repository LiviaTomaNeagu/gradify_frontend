import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetQuestionsResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { ForumService } from 'src/app/features/forum/core/services/forum.service';
import { Topic, TopicCustomMapping } from 'src/app/shared/enums/topic.enum';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ForumCardComponent } from './components/forum-card/forum-card.component';
import { MaterialModule } from 'src/app/material.module';
import { AddQuestionModalComponent } from './components/add-question-modal/add-question-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { ToastrService } from 'ngx-toastr';
import { AddQuestionRequestDTO } from '../core/interfaces/add-question.interfaces';

@Component({
  selector: 'app-forum',
  templateUrl: './forum-list-page.component.html',
  standalone: true,
  imports: [MaterialModule, CommonModule, ForumCardComponent],
  styleUrls: ['./forum-list-page.component.scss'],
})

export class ForumPageComponent implements OnInit {
  questionsResponse: GetQuestionsResponseDTO | null = null;
  topicsList: { key: number; value: string }[] = [];
  selectedTopics: { key: number; value: string }[] = [];
  searchText: string = '';
  pageSize: number = 5;
  currentPage: number = 0;
  totalQuestions: number = 0; 
  isLoading: boolean = false;
  isButtonVisible = false;

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private dialog: MatDialog,private forumService: ForumService, private userService: CurrentUserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.initializeTopics();
    this.loadQuestions();

    const currentUser = this.userService.getCurrentUserInfo();

    this.isButtonVisible = currentUser?.role === RoleTypeEnum.STUDENT;
  }

  private initializeTopics(): void {
    this.topicsList = Object.entries(TopicCustomMapping).map(([key, value]) => ({
      key: +key,
      value: value,
    }));
  }

  private loadQuestions(): void {
    this.isLoading = true;

    const selectedTopicIds = this.selectedTopics.map((topic) => topic.key);
    const payload = {
      search: this.searchText || null,
      page: this.currentPage + 1,
      pageSize: this.pageSize,
      topics: selectedTopicIds.length > 0 ? selectedTopicIds : null,
    };

    this.forumService.getQuestions(payload).subscribe({
      next: (response) => {
        this.questionsResponse = response;
        this.totalQuestions = response.totalQuestions;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Failed to load questions!', 'Oops!');
        this.questionsResponse = null;
      },
    });
  }

  addTopic(topic: { key: number; value: string }): void {
    if (!this.selectedTopics.find((t) => t.key === topic.key)) {
      this.selectedTopics.push(topic);
      this.resetPagination(); 
      this.loadQuestions();
    }
  }

  removeTopic(topic: { key: number; value: string }): void {
    this.selectedTopics = this.selectedTopics.filter((t) => t.key !== topic.key);
    this.resetPagination();
    this.loadQuestions();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value.toLowerCase();
    this.resetPagination();
    this.loadQuestions();
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadQuestions();
  }

  private resetPagination(): void {
    this.currentPage = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  openQuestionModal(): void {
    const dialogRef = this.dialog.open(AddQuestionModalComponent, {
      width: '700px',
      maxWidth: '90vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        const payload: AddQuestionRequestDTO = {
          title: result.title,
          descriptionHtml: result.questionDescription,
          topic: result.topic.key
        };
    
        this.forumService.addQuestion(payload, result.attachedFiles).subscribe({
          next: () => this.toastr.success('Question posted successfully!'),
          error: () => this.toastr.error('Failed to post question.')
        });

        this.loadQuestions(); // Reload questions after adding a new one
      }
    });
    
  }
}
