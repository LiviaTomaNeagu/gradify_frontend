import { Injectable, signal } from '@angular/core';
import { Todos } from './kanban';
import {
  todos,
  inprogress,
  completed,
  onhold,
} from './kanbanData';

@Injectable({
  providedIn: 'root',
})
export class KanbanService {
  todos = signal<Todos[] | any>(todos);
  inProgress = signal<Todos[] | any>(inprogress);
  completed = signal<Todos[] | any>(completed);
  onHold = signal<Todos[] | any>(onhold);

  constructor() {}

  getAllTasks(): {
    todos: Todos[];
    inProgress: Todos[];
    completed: Todos[];
    onHold: Todos[];
  } {
    return {
      todos: this.todos(),
      inProgress: this.inProgress(),
      completed: this.completed(),
      onHold: this.onHold(),
    };
  }

}
