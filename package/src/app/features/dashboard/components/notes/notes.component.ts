import { Component, computed, effect, OnInit, signal } from '@angular/core';
import { NoteDto, CreateNoteDto } from './note.interfaces';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { TablerIconsModule } from 'angular-tabler-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { NoteService } from '../notes/note.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgScrollbarModule,
    TablerIconsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AppNotesComponent {
  sidePanelOpened = signal(true);

  notes = signal<NoteDto[]>([]);
  selectedNote = signal<NoteDto | null>(null);

  active = signal<boolean>(false);
  searchText = signal<string>('');

  clrName = signal<string>('warning');
  isLoading = computed(() => this.noteService.isLoading());

  colors = [
    { colorName: 'primary' },
    { colorName: 'warning' },
    { colorName: 'secondary' },
    { colorName: 'error' },
    { colorName: 'success' },
  ];

  currentNoteTitle = signal<string>('');
  selectedColor = signal<string | null>(null);

  constructor(public noteService: NoteService, private toastr: ToastrService) {
    effect(
      () => {
        const notes = this.noteService.getNotes();
        this.notes.set(notes);

        if (!this.selectedNote()) {
          const currentNote = notes[0];
          if (currentNote) {
            this.selectedNote.set(currentNote);
            this.clrName.set(currentNote.color);
            this.selectedColor.set(currentNote.color);
            this.currentNoteTitle.set(currentNote.title);
          }
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.noteService.fetchNotes();
  }

  get currentNote(): NoteDto | null {
    return this.selectedNote();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.notes.set(this.filter(filterValue));
  }

  filter(v: string): NoteDto[] {
    return this.noteService
      .getNotes()
      .filter((x) => x.title.toLowerCase().includes(v.toLowerCase()));
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  onSelect(note: NoteDto): void {
    this.selectedNote.set(note);
    this.clrName.set(note.color);
    this.currentNoteTitle.set(note.title);
    this.selectedColor.set(note.color);
  }

  onSelectColor(colorName: string): void {
    this.clrName.set(colorName);
    this.selectedColor.set(colorName);
    const currentNote = this.selectedNote();
    if (currentNote) {
      currentNote.color = this.clrName();
      this.noteService.updateNote(currentNote);
    }
    this.active.set(!this.active());
  }

  removenote(note: NoteDto): void {
    this.noteService.removeNote(note.id);
    if (this.selectedNote() === note) {
      this.selectedNote.set(null);
      this.currentNoteTitle.set('');
    }
    this.toastr.success('Note deleted successfully!', 'Success!');
  }

  addNoteClick(): void {
    const newNote: CreateNoteDto = {
      color: this.clrName(),
      title: 'This is a new note',
      datef: new Date(),
    };
    this.noteService.addNote(newNote);
    this.toastr.success('Note added successfully!', 'Success!');
  }

  updateNoteTitle(newTitle: string): void {
    const currentNote = this.selectedNote();
    if (currentNote) {
      currentNote.title = newTitle;
      this.noteService.updateNote(currentNote);
    }
  }
}
