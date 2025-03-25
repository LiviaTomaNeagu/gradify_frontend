import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/material.module';
import { TopicCustomMapping, topicColors } from 'src/app/shared/enums/topic.enum';
import { AddTopicDialogComponent } from '../add-topic-dialog/add-topic-dialog.component';
import { AccountService } from '../../core/account.service';
import { AddTopicRequestDTO } from '../../core/account.interface';


@Component({
  selector: 'app-my-topics',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.scss']
})
export class MyTopicsComponent {
  @Input() topics: number[] = []; // Lista de topicuri ca ID-uri numerice

  constructor(public dialog: MatDialog, private service: AccountService) {}

  getTopicName(topicId: number): string {
    return TopicCustomMapping[topicId] || 'Unknown Topic';
  }

  getTopicColor(topicId: number): string {
    return topicColors[topicId] || '#ccc'; // Default color if not found
  }

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && !this.topics.includes(result)) {
        this.topics.push(result); 

        const request: AddTopicRequestDTO = {
          topic: result
        };
        
        this.service.addTopic(request).subscribe();
      }
    });
  }
}
