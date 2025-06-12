import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateNoteDto, NoteDto } from './note.interfaces';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notes = signal<NoteDto[]>([]);
  isLoading = signal<boolean>(true);
  private apiUrl = `${environment.apiUrl}/notes`;

  constructor(private http: HttpClient) {}

  public fetchNotes(): void {
    this.isLoading.set(true);
     this.http.get<NoteDto[]>(`${this.apiUrl}/get-notes`).subscribe({
      next: (notes) => {
        this.isLoading.set(false);
        this.notes.set(notes);
      },
      error: (error) => {
         this.isLoading.set(false);
        console.error('Error fetching notes:', error);
      },
    })
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
