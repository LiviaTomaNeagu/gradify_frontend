import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AppNotesComponent } from '../notes/notes.component';
import { getTopicName, topicColors } from 'src/app/shared/enums/topic.enum';
import { RelatedCardComponent } from 'src/app/features/forum/forum-page/components/related-card/related-card.component';
import { Topic } from 'src/app/shared/enums/topic.enum';
import { LatestQuestionDTO } from 'src/app/features/dashboard/core/mentor.interfaces';
import { GetRelatedQuestionResponseDto } from 'src/app/features/forum/core/interfaces/get-related-questions.dto';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';

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
export class DashboardStudentComponent {
  totalQuestionsAsked = 12;
  totalMentorsAnswered = 5;
  currentStep = 3;

  latestQuestions: LatestQuestionDTO[] = [
    {
      id: 'q1',
      title: 'How to connect Angular with SignalR?',
      topic: Topic.Angular,
      createdAt: new Date('2025-04-05T10:00:00'),
      answersCount: 2,
      author: {
        id: 'u1',
        name: 'Alex',
        surname: 'Ionescu',
        email: 'alex.ionescu@student.com',
        role: RoleTypeEnum.STUDENT,
        isApproved: true,
        occupationId: 'o1',
        occupation: {
          id: 'o1',
          name: 'Software Engineer',
          domain: 'Web Development',
          createdAt: new Date('2024-01-10')
        }
      }
    },
    {
      id: 'q2',
      title: 'C# async vs Task differences',
      topic: Topic.CSharp,
      createdAt: new Date('2025-04-06T15:30:00'),
      answersCount: 4,
      author: {
        id: 'u2',
        name: 'Maria',
        surname: 'Pop',
        email: 'maria.pop@student.com',
        role: RoleTypeEnum.STUDENT,
        isApproved: true,
        occupationId: 'o2',
        occupation: {
          id: 'o2',
          name: 'Backend Developer',
          domain: 'Enterprise Applications',
          createdAt: new Date('2023-11-20')
        }
      }
    }
  ];
  

  topMentors = [
    { name: 'Andrei', surname: 'Popescu', email: 'andrei@facultate.ro', occupation: { name: 'Mentor' } },
    { name: 'Elena', surname: 'Ionescu', email: 'elena@facultate.ro', occupation: { name: 'Professor' } }
  ];

  favoriteTopics = [Topic.Angular, Topic.CSharp, Topic.JavaScript, Topic.Python, Topic.Java];

  thesisSteps = [
    'Choose topic',
    'Find mentor',
    'Research',
    'Development',
    'Write thesis',
    'Defense'
  ];

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
