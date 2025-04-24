import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarA11y, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { MaterialModule } from 'src/app/material.module';
import { AppFullcalendarComponent } from '../components/fullcalendar/fullcalendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, CalendarModule, AppFullcalendarComponent],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory
    },
    CalendarUtils,
    CalendarA11y,
    CalendarEventTitleFormatter
  ]
})
export class MyProgressComponent {
  viewDate: Date = new Date();

  steps: string[] = [
    'Choose Topic',
    'Submit Proposal',
    'Start Research',
    'Write Chapters',
    'Submit Draft',
    'Review & Feedback',
    'Final Submission'
  ];

  selectedStep = 0;

  selectStep(index: number): void {
    this.selectedStep = index;
  }

  events: CalendarEvent[] = [
    {
      start: new Date(2025, 4, 5),
      end: new Date(2025, 4, 5),
      title: 'Meeting with Coordinator',
      color: { primary: '#1e90ff', secondary: '#D1E8FF' }
    },
    {
      start: new Date(2025, 4, 10),
      title: 'Progress Review',
      color: { primary: '#ad2121', secondary: '#FAE3E3' }
    }
  ];
}
