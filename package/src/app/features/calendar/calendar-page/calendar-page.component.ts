import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { AppFullcalendarComponent } from '../fullcalendar/fullcalendar.component';
import { CalendarService } from '../core/calendar.service';
import {
  CalendarA11y,
  CalendarEventTitleFormatter,
  CalendarUtils,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarEventDTO } from '../core/calendar.interfaces';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [CommonModule, MaterialModule, AppFullcalendarComponent],
  templateUrl: './calendar-page.component.html',
  styleUrl: './calendar-page.component.scss',
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
export class CalendarPageComponent implements OnInit {
  events: CalendarEventDTO[] = [];

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.calendarService.getEvents().subscribe(events => {
      this.events = events;
    });
  }
}
