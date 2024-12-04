import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { CommonModule } from '@angular/common';
import { LoadingPipe } from '../loading.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-todo-page',
  imports: [CommonModule, LoadingPipe],
  templateUrl: './single-todo-page.component.html',
  styleUrl: './single-todo-page.component.scss',
})
export class SingleTodoPageComponent {
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  todo$: Observable<Todo>;

  constructor() {
    const todoId = this.route.snapshot.paramMap.get('id');

    if (!todoId) {
      throw new Error('No todo ID provided');
    }

    this.todo$ = this.todoService.getTodoById(todoId);
  }
}
