import { Component, inject } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CustomValidators } from '../validators';

@Component({
  selector: 'app-todo-list-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-list-page.component.html',
  styleUrl: './todo-list-page.component.scss',
})
export class TodoListPageComponent {
  todos: Todo[] = [];
  todoService = inject(TodoService);
  formHasBeenSubmitted = false;

  newTodoForm = new FormGroup({
    label: new FormControl('', [CustomValidators.nonEmpty]),
    description: new FormControl(''),
  });

  constructor() {
    this.updateTodos();
  }

  async updateTodos() {
    this.todos = await this.todoService.getAllTodos();
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
      .then((newTodo) => {
        this.todos.push(newTodo);
        this.newTodoForm.reset();
        this.formHasBeenSubmitted = false;
      });
  }
}
