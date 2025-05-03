import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AppKanbanDialogComponent } from './kanban-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { TablerIconsModule } from 'angular-tabler-icons';
import { KanbanService } from './kanban.service';
import { Todos } from './kanban';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatFormFieldModule } from '@angular/material/form-field';
// tslint:disable-next-line - Disables all

@Component({
    selector: 'app-kanban',
    templateUrl: './kanban.component.html',
    standalone: true,
    imports: [
        MaterialModule,
        CommonModule,
        TablerIconsModule,
        DragDropModule,
        NgScrollbarModule,
        MatDialogModule,
        MatFormFieldModule 
    ]
})
export class AppKanbanComponent {
  todos: Todos[] = [];
  inprogress: Todos[] = [];
  completed: Todos[] = [];
  onhold: Todos[] = [];

  constructor(
    public dialog: MatDialog,
    public taskService: KanbanService,
    private snackBar: MatSnackBar
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    const allTasks = this.taskService.getAllTasks();

    this.todos = allTasks.todos;
    this.inprogress = allTasks.inProgress;
    this.completed = allTasks.completed;
    this.onhold = allTasks.onHold;
  }

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
  //taskProperty bgcolor
  getTaskClass(taskProperty: string | any): any {
    return taskProperty === 'Research'
      ? 'bg-success'
      : taskProperty === 'Planning'
      ? 'bg-primary'
      : taskProperty === 'Implementation'
      ? 'bg-warning'
      : taskProperty === 'Documentation'
      ? 'bg-error'
      : taskProperty === 'Presentation'
      ? 'bg-success'
      : taskProperty === 'Review'
      ? 'bg-primary'
      : '';
  }
}
