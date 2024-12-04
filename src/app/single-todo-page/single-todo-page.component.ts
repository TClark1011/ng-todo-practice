import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  router = inject(Router);
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  todoId: string;
  todo$: Observable<Todo>;
  localTodo: Todo = {
    id: '',
    label: '',
    description: '',
    completed: false,
  };

  constructor() {
    const todoId = this.route.snapshot.paramMap.get('id');

    if (!todoId) {
      throw new Error('No todo ID provided');
    }

    this.todoId = todoId;
    this.todo$ = this.todoService.getTodoById(todoId);
    this.todo$.subscribe((todo) => {
      console.log({ todo });
      this.localTodo = todo;
    });
  }

  deleteTodo() {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodoById(this.todoId).subscribe(() => {
        this.router.navigate(['']);
      });
    }
  }

  toggleTodo(e: Event) {
    console.log('Toggled Todo');
    e.preventDefault();
    this.todoService
      .updateTodoById(this.todoId, {
        completed: !this.localTodo.completed,
      })
      .subscribe((updatedTodo) => {
        console.log({ updatedTodo });
      });

    this.localTodo.completed = !this.localTodo.completed;
  }
}
