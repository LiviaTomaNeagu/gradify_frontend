import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Topic } from 'src/app/shared/enums/topic.enum';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-topic-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss']
})
export class AddTopicDialogComponent {
  selectedTopic: string | null = null;

  // Generăm lista de topicuri folosind cheile enum-ului
  topics = Object.keys(Topic)
    .filter(key => isNaN(Number(key))) // Excludem valorile numerice
    .map(key => key); // Luăm doar cheile ca string

  constructor(public dialogRef: MatDialogRef<AddTopicDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  addTopic(): void {
    if (this.selectedTopic !== null) {
      const topicEnumValue = Topic[this.selectedTopic as keyof typeof Topic]; 
      this.dialogRef.close(topicEnumValue);
    }
  }
}
