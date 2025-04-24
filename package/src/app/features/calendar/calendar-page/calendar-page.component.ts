import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { AppFullcalendarComponent } from '../fullcalendar/fullcalendar.component';
import { CalendarA11y, CalendarEventTitleFormatter, CalendarUtils, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@Component({
  selector: 'app-calendar-page',
  standalone: true,
  imports: [MaterialModule, AppFullcalendarComponent],
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
export class CalendarPageComponent {

}
