import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ForumCardComponent } from './forum-card/forum-card.component';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GetQuestionsResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { ForumService } from 'src/app/features/forum/core/services/forum.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  standalone: true,
  imports: [ForumCardComponent, MaterialModule, JsonPipe, CommonModule],
  styleUrls: ['./forum.component.scss'],
})

export class ForumComponent implements OnInit {
  questionsResponse: GetQuestionsResponseDTO | null = null;
  topicsList: string[] = [];

  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  private loadQuestions(): void {
    this.forumService.getQuestions().subscribe({
      next: (response) => {
        this.questionsResponse = response;
        console.log('Questions loaded:', this.questionsResponse);
      },
      error: (err) => {
        console.error('Failed to load questions:', err);
        this.questionsResponse = null;
      },
    });
  }
}
