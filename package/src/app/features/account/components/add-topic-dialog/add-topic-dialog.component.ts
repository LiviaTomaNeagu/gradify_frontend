import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Topic, TopicCustomMapping } from 'src/app/shared/enums/topic.enum';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-topic-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss'],
})
export class AddTopicDialogComponent {
  selectedTopic: string | null = null;

  topics = Object.entries(TopicCustomMapping).map(([key, value]) => ({
    id: Number(key),
    name: value,
  }));

  constructor(public dialogRef: MatDialogRef<AddTopicDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  addTopic(): void {
    if (this.selectedTopic !== null) {
      this.dialogRef.close(this.selectedTopic);
    }
  }
}
