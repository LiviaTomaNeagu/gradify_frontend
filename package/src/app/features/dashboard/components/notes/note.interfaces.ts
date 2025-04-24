export interface Note {
  color: string;
  title: string;
  datef: Date;
}

export interface NoteDto {
  id: string;
  title: string;
  color: string;
  datef: Date;
}

export interface CreateNoteDto {
  title: string;
  color: string;
  datef: Date;
}
