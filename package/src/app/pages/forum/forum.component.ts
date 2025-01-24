import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { ForumCardComponent } from './forum-card/forum-card.component';
import { JsonPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { GetQuestionsResponseDTO } from 'src/app/features/forum/core/interfaces/get-questions.dto';
import { ForumService } from 'src/app/features/forum/core/services/forum.service';
import { TopicCustomMapping } from 'src/app/shared/enums/topic.enum';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  standalone: true,
  imports: [ForumCardComponent, MaterialModule, JsonPipe, CommonModule],
  styleUrls: ['./forum.component.scss'],
})

export class ForumComponent implements OnInit {
  questionsResponse: GetQuestionsResponseDTO | null = null;
  filteredQuestions: any[] = [];
  topicsList: { key: number; value: string }[] = [];
  selectedTopics: { key: number; value: string }[] = [];
  searchText: string = '';


  constructor(private forumService: ForumService) {}

  ngOnInit(): void {
    this.initializeTopics();
    this.loadQuestions();
  }

  private initializeTopics(): void {
    this.topicsList = Object.entries(TopicCustomMapping).map(([key, value]) => ({
      key: +key,
      value: value,
    }));
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
  addTopic(topic: { key: number; value: string }): void {
    if (!this.selectedTopics.find((t) => t.key === topic.key)) {
      this.selectedTopics.push(topic);
      this.filterQuestions();
    }
  }

  removeTopic(topic: { key: number; value: string }): void {
    this.selectedTopics = this.selectedTopics.filter((t) => t.key !== topic.key);
    this.filterQuestions();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchText = target.value.toLowerCase();
    this.filterQuestions();
  }
  

  private filterQuestions(): void {
    if (this.selectedTopics.length === 0) {
      this.filteredQuestions = this.questionsResponse?.questions || [];
    } else {
      const selectedKeys = this.selectedTopics.map((t) => t.key);
      this.filteredQuestions =
        this.questionsResponse?.questions.filter((q) =>
          selectedKeys.includes(q.topic)
        ) || [];
    }
  }
}
