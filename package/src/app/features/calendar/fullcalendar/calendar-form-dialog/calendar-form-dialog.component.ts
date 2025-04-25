import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CalendarEvent } from 'angular-calendar';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { EgretCalendarEvent } from 'src/app/features/calendar/fullcalendar/event.model';
import { MaterialModule } from 'src/app/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TablerIconsModule } from 'angular-tabler-icons';

interface DialogData {
  event?: CalendarEvent;
  action?: string;
  date?: Date;
}

@Component({
    selector: 'app-calendar-form-dialog',
    templateUrl: './calendar-form-dialog.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        TablerIconsModule
    ],
    providers: [provideNativeDateAdapter()],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarFormDialogComponent {
  event = signal<any>(null);
  dialogTitle = signal<string>('');
  action = signal<any>('Add Event');
  eventForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<CalendarFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: UntypedFormBuilder
  ) {
    this.event.set(data.event);
    this.action.set(data.action);

    if (this.action() === 'edit') {
      this.dialogTitle.set(this.event().title);
    } else {
      this.dialogTitle.set('Add Event');
      this.event.set(
        new EgretCalendarEvent({
          start: data.date,
          end: data.date,
        })
      );
    }
    // console.log(data);
    this.eventForm = this.buildEventForm(this.event());
  }

  buildEventForm(event: any): any {
    console.log(event.color.primary);
    return new UntypedFormGroup({
      _id: new UntypedFormControl(event._id),
      title: new UntypedFormControl(event.title),
      start: new UntypedFormControl(event.start),
      end: new UntypedFormControl(event.end),
      allDay: new UntypedFormControl(event.allDay),
      color: this.formBuilder.group({
        primary: new UntypedFormControl(event.color?.primary),
        secondary: new UntypedFormControl(event.color?.secondary),
      }),
      meta: this.formBuilder.group({
        location: new UntypedFormControl(event.meta.location),
        notes: new UntypedFormControl(event.meta.notes),
      }),
      draggable: new UntypedFormControl(true),
    });
  }

  onSave(): void {
    console.log("open save");
    if (this.eventForm.invalid) return;
  
    const formValue = this.eventForm.value;
    
    const startDate = new Date(formValue.start);
    let endDate = new Date(formValue.end);

    if (endDate < startDate) {
      endDate = startDate;
    }

  
    const eventToReturn = {
      id: formValue._id,
      title: formValue.title,
      start: startDate,
      end: endDate,
      color: {
        primary: formValue.color.primary,
        secondary: formValue.color.secondary || formValue.color.primary
      },
      draggable: formValue.draggable,
      meta: {
        location: formValue.meta?.location || '',
        notes: formValue.meta?.notes || ''
      }
    };

    console.log('Event saved with color:', eventToReturn.color);
  
    this.dialogRef.close({
      action: this.action(),
      event: eventToReturn
    });
  }


  get primaryColor(): UntypedFormControl {
    return (this.eventForm.get('color') as UntypedFormGroup).get('primary') as UntypedFormControl;
  }
  
  
  
}
