import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoService } from './todo.service';
import { Todo } from './todo';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  todos: Todo[] = [];
  todoService = inject(TodoService);

  newTodoForm = new FormGroup({
    label: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required]),
  });

  constructor() {
    this.updateTodos();
  }

  async updateTodos() {
    this.todos = await this.todoService.getAllTodos();
  }

  onTodoSubmit(e: Event) {
    e.preventDefault();
    const { label, description } = this.newTodoForm.value;

    if (typeof label !== 'string' || typeof description !== 'string') {
      return;
    }

    this.todoService
      .createTodo({
        label,
        description,
      })
      .then((newTodo) => {
        this.todos.push(newTodo);
        this.newTodoForm.reset();
      });
  }
}
