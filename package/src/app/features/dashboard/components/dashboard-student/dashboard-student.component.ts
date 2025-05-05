import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AppNotesComponent } from '../notes/notes.component';
import { getTopicName, topicColors } from 'src/app/shared/enums/topic.enum';
import { RelatedCardComponent } from 'src/app/features/forum/forum-page/components/related-card/related-card.component';
import { Topic } from 'src/app/shared/enums/topic.enum';
import { LatestQuestionDTO } from 'src/app/features/dashboard/core/mentor.interfaces';
import { GetRelatedQuestionResponseDto } from 'src/app/features/forum/core/interfaces/get-related-questions.dto';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { StudentService } from '../../core/student.service';
import { GetStudentDashboardDTO } from '../../core/student.interfaces';
import { ShortUserDto } from 'src/app/features/users/core/interfaces/users.interfaces';

@Component({
  selector: 'app-dashboard-student',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    AppNotesComponent,
    RelatedCardComponent
  ],
  templateUrl: './dashboard-student.component.html',
  styleUrls: ['./dashboard-student.component.scss']
})
export class DashboardStudentComponent implements OnInit {
  totalQuestionsAsked = 0;
  totalMentorsAnswered = 0;
  currentStep = 0;
  latestQuestions: LatestQuestionDTO[] = [];
  topMentors: ShortUserDto[] = [];
  favoriteTopics: Topic[] = [];
  thesisSteps: string[] = [];
  isLoading:boolean = true;

  displayedColumns: string[] = ['profile', 'email'];

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.studentService.getStudentDashboard().subscribe((data: GetStudentDashboardDTO) => {
      this.totalQuestionsAsked = data.totalQuestionsAsked;
      this.totalMentorsAnswered = data.totalMentorsAnswered;
      this.currentStep = data.currentStep;
      this.latestQuestions = data.latestQuestions;
      this.topMentors = data.mentorInfo;
      this.favoriteTopics = data.favoriteTopics;
      this.thesisSteps = data.thesisSteps;
      this.isLoading = false;
    });

  }

  getDefaultAvatar(name: string): string {
    const avatars = [
      '/assets/images/profile/user-1.jpg',
      '/assets/images/profile/user-2.jpg',
      '/assets/images/profile/user-3.jpg',
      '/assets/images/profile/user-4.jpg',
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % avatars.length;
    return avatars[index];
  }

  getLimitedUsers(users: any[]): any[] {
    if (!users) return [];
    return users.slice(0, 3);
  }
  
  getLimitedTopics(topics: Topic[]): Topic[] {
    return topics.slice(0, 5);
  }

  redirectToForum(): void {
    // Redirecționează către pagina forumului
  }

  mapLatestQuestionsToRelatedCard(questions: LatestQuestionDTO[]): GetRelatedQuestionResponseDto[] {
    return questions.map(question => ({
      id: question.id,
      title: question.title,
      answersCount: question.answersCount,
      topic: question.topic
    }));
  }

  getTopicColor(topic: Topic): string {
    return topicColors[topic];
  }

  getTopicName(topic: Topic): string {
    return getTopicName(topic);
  }
}
