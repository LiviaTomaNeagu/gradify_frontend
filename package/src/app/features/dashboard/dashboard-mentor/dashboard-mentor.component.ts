import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MentorService } from '../core/mentor.service';
import { MentorResponseDTO, GraphDataPoint, LatestQuestionDTO } from '../core/mentor.interfaces';
import { ShortUserDto } from '../../users/core/interfaces/users.interfaces';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { GetRelatedQuestionResponseDto } from '../../forum/core/interfaces/get-related-questions.dto';
import { RelatedCardComponent } from '../../forum/forum-page/components/related-card/related-card.component';
import { Topic, topicColors, getTopicName } from 'src/app/shared/enums/topic.enum';
import { ApexChart, ApexXAxis, ApexYAxis, ApexDataLabels, ApexTooltip, ApexStroke, ApexLegend, ApexPlotOptions, ApexGrid, ApexAxisChartSeries } from 'ng-apexcharts'; // ✅ Import ApexCharts types

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
  grid: ApexGrid;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-dashboard-mentor',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RelatedCardComponent,
    NgApexchartsModule  // ✅ Make sure it's imported
  ],
  templateUrl: './dashboard-mentor.component.html',
  styleUrls: ['./dashboard-mentor.component.scss']
})
export class DashboardMentorComponent implements OnInit {

  totalAnswers: number = 0;
  topUsers: ShortUserDto[] = [];
  latestQuestions: LatestQuestionDTO[] = [];
  activityGraph: GraphDataPoint[] = [];
  mentorId: string | null = null;
  latestQuestionsRelatedCard: GetRelatedQuestionResponseDto[] = [];
  favoriteTopics: Topic[];
  weekDaysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  totalUsersInteracted: number = 0;


  public chartOptions: any;
  

  constructor(private mentorService: MentorService, private userService: CurrentUserService) {}

  ngOnInit(): void {
    this.getCurrentUserId();
    this.initChart(); 
  }

  getCurrentUserId() {
    this.userService.currentUser$.subscribe(user => {
      if (user && user.role === RoleTypeEnum.MENTOR) {
        this.mentorId = user.id;
        this.loadMentorStats(this.mentorId);
      }
    });
  }

  loadMentorStats(mentorId: string) {
    this.mentorService.getMentorStats(mentorId).subscribe((stats: MentorResponseDTO) => {
      this.totalAnswers = stats.totalAnswers;
      this.topUsers = stats.topUsers;
      this.latestQuestions = stats.latestQuestions;
      this.activityGraph = stats.activityGraph;
      this.favoriteTopics = stats.favoriteTopics;
      this.totalUsersInteracted = this.topUsers.length;

      this.updateChart();
    });
  }

  initChart() {
    this.chartOptions = {
      series: [
        {
          name: "Answers",
          data: [0, 0, 0, 0, 0, 0, 0]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      xaxis: {
        categories: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      yaxis: {
        title: {
          text: "Number of Answers"
        }
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: true
      },
      stroke: {
        show: true,
        width: 2
      },
      legend: {
        position: "top"
      },
      grid: {
        show: true
      },
      plotOptions: {
        bar: {
          horizontal: false
        }
      }
    };
  }

  updateChart() {
    if (this.activityGraph.length) {
      // Sort the activityGraph based on weekDaysOrder
      const sortedData = this.activityGraph.sort((a, b) => {
        return this.weekDaysOrder.indexOf(a.name) - this.weekDaysOrder.indexOf(b.name);
      });
  
      // Update chart series and x-axis categories dynamically
      this.chartOptions = {
        ...this.chartOptions,  // Preserve existing chart settings
        series: [
          {
            name: "Answers",
            data: sortedData.map(data => data.value)  // Use sorted values
          }
        ],
        xaxis: {
          categories: sortedData.map(data => data.name)  // Use sorted categories
        }
      };
    }
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

  getLimitedTopics(favoriteTopics: Topic[]): Topic[] {
    return favoriteTopics.length >= 5 ? favoriteTopics.slice(0, 5) : favoriteTopics;
  }

  getLimitedUsers(users: ShortUserDto[]): ShortUserDto[] {
    return users.length >= 5 ? users.slice(0, 5) : users;
  }
  
  redirectToForum(): void {
    // Redirect
  }
  
}