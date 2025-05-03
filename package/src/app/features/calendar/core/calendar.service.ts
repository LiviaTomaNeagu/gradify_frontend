import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CalendarEventDTO } from './calendar.interfaces';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CalendarService {
  private readonly apiUrl = `${environment.apiUrl}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Observable<CalendarEventDTO[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(events =>
        events.map(e => ({
          id: e.id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
          color: {
            primary: e.colorPrimary,
            secondary: e.colorPrimary
          },
          coordinatorId: e.coordinatorId
        }))
      )
    );
  }

  createEvent(event: CalendarEventDTO): Observable<CalendarEventDTO> {
    const payload = {
      title: event.title,
      start: event.start,
      end: event.end,
      colorPrimary: event.color.primary
    };

    console.log(payload);

    return this.http.post<any>(this.apiUrl, payload).pipe(
      map(e => ({
        id: e.id,
        title: e.title,
        start: new Date(e.start),
        end: new Date(e.end),
        color: {
          primary: e.colorPrimary,
          secondary: e.colorPrimary
        },
        coordinatorId: e.coordinatorId
      }))
    );
  }

  updateEvent(event: CalendarEventDTO): Observable<void> {
    const payload = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      colorPrimary: event.color.primary
    };

    return this.http.put<void>(`${this.apiUrl}/${event.id}`, payload);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
