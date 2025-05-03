import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  signal,
} from '@angular/core';
import { CommonModule, DOCUMENT, NgSwitch } from '@angular/common';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
} from '@angular/forms';
import { CalendarFormDialogComponent } from './calendar-form-dialog/calendar-form-dialog.component';
import {
  startOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  subMonths,
  addMonths,
} from 'date-fns';
import { Subject } from 'rxjs';
import {
  CalendarDateFormatter,
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarModule,
  CalendarView,
} from 'angular-calendar';
import { MaterialModule } from 'src/app/material.module';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TablerIconsModule } from 'angular-tabler-icons';
import { CurrentUserService } from 'src/app/@core/services/user.service';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';
import { CalendarEventDTO } from '../core/calendar.interfaces';
import { CalendarService } from '../core/calendar.service';

@Component({
    selector: 'app-calendar-dialog',
    templateUrl: './dialog.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatNativeDateModule,
        MatDialogModule,
        MatDatepickerModule,  TablerIconsModule
    ],
    providers: [provideNativeDateAdapter()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDialogComponent {
  options!: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    if (this.data.action === 'Edit') {
      if (!this.data.event.color) {
        this.data.event.color = {
          primary: '#000000',
          secondary: '#000000'
        };
      }
  
      console.log(this.data.event.color);
      this.dialogRef.close(this.data.event);
    } else {
      this.dialogRef.close('confirm');
    }
  }
  
}

@Component({
    selector: 'app-fullcalendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './fullcalendar.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        NgSwitch,
        CalendarModule,
        CommonModule,
        MatDatepickerModule,
        MatDialogModule,
        MatFormFieldModule,
    ],
    providers: [provideNativeDateAdapter(), CalendarDateFormatter]
})
export class AppFullcalendarComponent {
  dialogRef = signal<MatDialogRef<CalendarDialogComponent> | null>(null);
  dialogRef2 = signal<MatDialogRef<CalendarFormDialogComponent> | null>(null);
  view = signal<any>('month');
  viewDate = signal<any>(new Date());
  activeDayIsOpen = signal<boolean>(true);
  refresh: Subject<any> = new Subject();
  currentUser: any = this.currentUserService.getCurrentUserInfo();
  readonly RoleTypeEnum = RoleTypeEnum;
  events = signal<CalendarEventDTO[]>([]);
  actions: CalendarEventAction[] = [];

  config: MatDialogConfig = {
    disableClose: false,
    data: {
      action: '',
      event: [],
    },
  };

  constructor(
    public dialog: MatDialog,
    @Inject(DOCUMENT) private doc: any,
    private currentUserService: CurrentUserService,
    private calendarService: CalendarService
  ) {
    this.actions = [
      {
        label: '<span class="text-white link m-l-5">: Edit</span>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Edit', event);
        },
      },
      {
        label: '<span class="text-danger m-l-5">Delete</span>',
        onClick: ({ event }: { event: CalendarEvent }): void => {
          this.handleEvent('Deleted', event);
        },
      },
    ];

    this.loadEvents();
  }

  loadEvents(): void {
    this.calendarService.getEvents().subscribe((events) => {
      const formatted = events.map((e) => ({
        ...e,
        actions: this.currentUser?.role === RoleTypeEnum.COORDINATOR ? this.actions : [],
      }));
      this.events.set(formatted);
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate())) {
      if (
        (isSameDay(this.viewDate(), date) && this.activeDayIsOpen()) ||
        events.length === 0
      ) {
        this.activeDayIsOpen.set(false);
      } else {
        this.activeDayIsOpen.set(true);
        this.viewDate.set(date);
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    const castedEvent = event as CalendarEventDTO;
  
    const updatedEvent: CalendarEventDTO = {
      ...castedEvent,
      start: newStart,
      end: newEnd ?? newStart,
    };
  
    if (!updatedEvent.id) return; // de siguranță
  
    this.calendarService.updateEvent(updatedEvent).subscribe(() => {
      this.events.set(
        this.events().map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
      );
      this.refresh.next(null);
    });
  }
  

  handleEvent(action: string, event: CalendarEvent): void {
    const castedEvent = event as CalendarEventDTO;
  
    const isStudent = this.currentUser?.role === RoleTypeEnum.STUDENT;
    const dialogMode = isStudent ? 'view' : action;
  
    if (dialogMode === 'view') return;
  
    this.config.data = { action: dialogMode, event: castedEvent };
  
    if(dialogMode !== 'Deleted' && dialogMode !== 'Edit') 
      return;

    this.dialogRef.set(this.dialog.open(CalendarDialogComponent, this.config));
  
    this.dialogRef()
      ?.afterClosed()
      .subscribe((result: any) => {
        if (dialogMode === 'Deleted' && result === 'confirm' && castedEvent.id) {
          this.calendarService.deleteEvent(castedEvent.id).subscribe(() => {
            this.events.set(this.events().filter((e) => e.id !== castedEvent.id));
            this.refresh.next(null);
          });
        } else if (dialogMode === 'Edit' && result && castedEvent.id) {
          const updatedEvent: CalendarEventDTO = {
            ...result,
            id: castedEvent.id,
            actions: this.actions,
          };
          this.calendarService.updateEvent(updatedEvent).subscribe(() => {
            this.events.set(
              this.events().map((e) =>
                e.id === updatedEvent.id ? updatedEvent : e
              )
            );
            this.refresh.next(null);
          });
        }
  
        this.dialogRef.set(null);
      });
  }

  addEvent(): void {
    this.dialogRef2.set(
      this.dialog.open(CalendarFormDialogComponent, {
        panelClass: 'calendar-form-dialog',
        autoFocus: false,
        data: {
          action: 'add',
          date: new Date(),
        },
      })
    );
  
    this.dialogRef2()
      ?.afterClosed()
      .subscribe((res: { action: string; event: CalendarEventDTO }) => {
        if (!res || !res.event) return;
  
        const newEvent = {
          ...res.event,
          actions: this.actions
        };
  
        this.calendarService.createEvent(newEvent).subscribe(created => {
          const formatted: CalendarEventDTO = {
            ...created,
          };

          console.log("adding now event");
        
          this.events.set([...this.events(), formatted]);
          this.refresh.next(null);
        });
        
  
        this.dialogRef2.set(null);
      });
  }
  


  setView(view: any): void {
    this.view.set(view);
  }

  goToPreviousMonth(): void {
    this.viewDate.set(subMonths(this.viewDate(), 1));
  }

  goToNextMonth(): void {
    this.viewDate.set(addMonths(this.viewDate(), 1));
  }

  goToToday(): void {
    this.viewDate.set(new Date());
  }
}
