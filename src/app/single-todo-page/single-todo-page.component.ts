import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-single-todo-page',
  imports: [],
  templateUrl: './single-todo-page.component.html',
  styleUrl: './single-todo-page.component.scss',
})
export class SingleTodoPageComponent {
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  todo: Todo | undefined;

  constructor() {
    const todoId = this.route.snapshot.paramMap.get('id');

    if (!todoId) {
      throw new Error('No todo ID provided');
    }

    this.todoService.getTodoById(todoId).subscribe((todo) => {
      this.todo = todo;
    });
  }
}
