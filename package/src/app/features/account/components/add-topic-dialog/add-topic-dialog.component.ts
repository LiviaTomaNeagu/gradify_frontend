import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-add-topic-dialog',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-topic-dialog.component.html',
  styleUrls: ['./add-topic-dialog.component.scss']
})
export class AddTopicDialogComponent {
  selectedTopic: string = '';

  topics = ['React', 'Vue', 'Django', 'Spring Boot', 'Python', 'C++'];

  constructor(public dialogRef: MatDialogRef<AddTopicDialogComponent>) {}

  close(): void {
    this.dialogRef.close();
  }

  addTopic(): void {
    if (this.selectedTopic) {
      this.dialogRef.close(this.selectedTopic);
    }
  }
}
