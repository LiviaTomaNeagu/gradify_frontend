import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTopicDialogComponent } from '../add-topic-dialog/add-topic-dialog.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RoleTypeEnum } from 'src/app/shared/enums/role-type.enum';

@Component({
  selector: 'app-my-topics',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.scss']
})
export class MyTopicsComponent {
  @Input() topics: RoleTypeEnum[] = [];

  constructor(public dialog: MatDialog) {}

  openAddTopicDialog(): void {
    const dialogRef = this.dialog.open(AddTopicDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.topics.push(result);
      }
    });
  }
}
