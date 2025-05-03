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
import { ProgressService } from '../progress/core/progres.service';
import { ToastrService } from 'ngx-toastr';
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
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    public taskService: KanbanService,
    private progressService: ProgressService,
    private toastr: ToastrService
  ) {
    this.loadTasks();
  }

  loadTasks(): void {
    this.isLoading = true;
    const allTasksGrouped = this.taskService.getAllTasks();
    const all = [
      ...allTasksGrouped.todos,
      ...allTasksGrouped.inProgress,
      ...allTasksGrouped.completed,
      ...allTasksGrouped.onHold,
    ];
  
    this.progressService.getMyProgress().subscribe({
      next: (res) => {
        if (!res.kanban || res.kanban.trim() === '') {
          this.todos = all;
          this.inprogress = [];
          this.onhold = [];
          this.completed = [];
        } else {
          let progress: any = {};
          try {
            progress = JSON.parse(res.kanban);
          } catch {
            progress = {};
          }
  
          this.todos = all.filter(t => (progress.todo || []).includes(t.id));
          this.inprogress = all.filter(t => (progress.inprogress || []).includes(t.id));
          this.onhold = all.filter(t => (progress.onhold || []).includes(t.id));
          this.completed = all.filter(t => (progress.completed || []).includes(t.id));
        }
      },
      error: () => {
        this.toastr.error('Failed to load progress', 'Oops!');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  

  drop(event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }

    console.log("moved");

    this.saveProgress();
  }

  saveProgress(): void {
    const payload = {
      kanban: JSON.stringify({
        todo: this.todos.map(t => t.id),
        inprogress: this.inprogress.map(t => t.id),
        onhold: this.onhold.map(t => t.id),
        completed: this.completed.map(t => t.id)
      })
    };

    this.progressService.addMyProgress(payload).subscribe({
      error: () => this.toastr.error('Failed to save progress', 'Oops!')
    });
  }


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
