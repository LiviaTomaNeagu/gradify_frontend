import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarA11y, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { MaterialModule } from 'src/app/material.module';
import { AppFullcalendarComponent } from '../../calendar/fullcalendar/fullcalendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GetMyProgressDataResponseDTO } from '../core/progress.interfaces';
import { ProgressService } from '../core/progres.service';
import { ToastrService } from 'ngx-toastr';

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
export class MyProgressComponent implements OnInit {
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

  constructor(private progressService: ProgressService, private toastr: ToastrService) {} 

  ngOnInit(): void {
    this.progressService.getMyProgress().subscribe({
      next: (data: GetMyProgressDataResponseDTO) => {
        this.selectedStep = data.currentStep ?? 0;
        console.log('Current step:', this.selectedStep);
      },
      error: (err) => {
        this.toastr.error('Failed to fetch progress!', 'Oops!');

      }
    });
  }

  selectStep(index: number): void {
    this.selectedStep = index;
    this.progressService.addMyProgress({ currentStep: index }).subscribe({
      next: () => {
        console.log('Progress updated successfully');
      },
      error: (err) => {
        this.toastr.error('Failed to update progress!', 'Oops!');
      }
    });
  }
  
}
