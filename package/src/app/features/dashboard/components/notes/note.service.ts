import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateNoteDto, NoteDto } from './note.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = signal<NoteDto[]>([]);
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  public fetchNotes(): void {
    this.http.get<NoteDto[]>(`${this.apiUrl}/get-notes`).subscribe((data) => {
      console.log('Notes fetched from backend:', data);
      this.notes.set(data);
    });
  }
  

  public getNotes(): NoteDto[] {
    return this.notes();
  }

  public addNote(note: CreateNoteDto): void {
    this.http.post<NoteDto>(`${this.apiUrl}/create-note`, note).subscribe((newNote) => {
      this.notes.update((currentNotes) => [newNote, ...currentNotes]);
    });
  }
  
  
  public removeNote(id: string): void {
    this.http.delete(`${this.apiUrl}/delete-note/${id}`).subscribe(() => {
      this.notes.update((currentNotes) => currentNotes.filter((n) => n.id !== id));
    });
  }

  public updateNote(updatedNote: NoteDto): void {
    this.http.put<NoteDto>(`${this.apiUrl}/update-note`, updatedNote).subscribe((updated) => {
      this.notes.update((currentNotes) =>
        currentNotes.map((n) => (n.id === updated.id ? updated : n))
      );
    });
  }
}
