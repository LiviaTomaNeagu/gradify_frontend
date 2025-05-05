import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CalendarA11y, CalendarEvent, CalendarEventTitleFormatter, CalendarModule, CalendarUtils, DateAdapter } from 'angular-calendar';
import { MaterialModule } from 'src/app/material.module';
import { AppFullcalendarComponent } from '../../calendar/fullcalendar/fullcalendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { GetMyProgressDataResponseDTO } from '../core/progress.interfaces';
import { ProgressService } from '../core/progres.service';
import { ToastrService } from 'ngx-toastr';
import { AppKanbanComponent } from "../../kanban/kanban.component";

@Component({
  selector: 'app-my-progress',
  templateUrl: './my-progress.component.html',
  styleUrls: ['./my-progress.component.scss'],
  standalone: true,
  imports: [MaterialModule, CommonModule, CalendarModule, AppFullcalendarComponent, AppKanbanComponent],
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
  isLoading = true;

  selectedStep = 0;


  constructor(private progressService: ProgressService, private toastr: ToastrService) {} 

  loadedChildren = 0;

  onChildLoaded() {
    this.loadedChildren++;
    if (this.loadedChildren === 2) {
      this.isLoading = false;
    }
  }

  
}
