import { Component, inject } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CustomValidators } from '../validators';
import { RouterModule } from '@angular/router';
import { LoadingPipe } from '../loading.pipe';

@Component({
  selector: 'app-todo-list-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, LoadingPipe],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss',
})
export class TodoListPageComponent {
  todoService = inject(TodoService);
  formHasBeenSubmitted = false;

  todos$ = this.fetchTodos();
  localTodos: Todo[] = []; // local copy that we can send updates to

  newTodoForm = new FormGroup({
    label: new FormControl('', [CustomValidators.nonEmpty]),
    description: new FormControl(''),
  });

  constructor() {}

  fetchTodos() {
    const result$ = this.todoService.getAllTodos();
    result$.subscribe((todos) => {
      this.localTodos = todos;
    });

    return result$;
  }

  get label() {
    return this.newTodoForm.get('label');
  }

  get description() {
    return this.newTodoForm.get('description');
  }

  onTodoSubmit(e: Event) {
    e.preventDefault();
    this.formHasBeenSubmitted = true;

    if (!this.newTodoForm.valid) return;

    const { label, description } = this.newTodoForm.value;

    if (typeof label !== 'string' || typeof description !== 'string') {
      return;
    }

    this.todoService
      .createTodo({
        label: label.trim(),
        description: description.trim(),
      })
      .subscribe((newTodo) => {
        this.localTodos.push(newTodo);
        this.todos$ = this.fetchTodos();
        this.newTodoForm.reset();
        this.formHasBeenSubmitted = false;
      });
  }

  onTodoToggle(e: Event, todoId: string, completed: boolean) {
    e.preventDefault();
    this.localTodos = this.localTodos.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        completed,
      };
    });
    this.todoService
      .updateTodoById(todoId, {
        completed,
      })
      .subscribe((newTodo) => {
        this.localTodos = this.localTodos.map((todo) => {
          if (todo.id !== todoId) return todo;
          return newTodo;
        });
        this.todos$ = this.fetchTodos();
      });
  }
}
