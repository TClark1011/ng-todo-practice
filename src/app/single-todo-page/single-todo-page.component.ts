import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { loadingState, ObservableLoader } from '../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-single-todo-page',
  imports: [CommonModule],
  templateUrl: './single-todo-page.component.html',
  styleUrl: './single-todo-page.component.scss',
})
export class SingleTodoPageComponent {
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  todo$: ObservableLoader<Todo>;

  constructor() {
    const todoId = this.route.snapshot.paramMap.get('id');

    if (!todoId) {
      throw new Error('No todo ID provided');
    }

    this.todo$ = loadingState(this.todoService.getTodoById(todoId));
  }
}
