import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { Todo, todoDescriptionValidators, todoLabelValidators } from '../todo';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-edit-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './todo-edit-page.component.html',
  styleUrl: './todo-edit-page.component.scss',
})
export class TodoEditPageComponent {
  router = inject(Router);
  route = inject(ActivatedRoute);
  todoService = inject(TodoService);
  todoId: string | undefined;
  todo: Todo | undefined;
  formHasBeenSubmitted = false;

  todoForm = new FormGroup({
    label: new FormControl('', todoLabelValidators),
    description: new FormControl('', todoDescriptionValidators),
  });

  constructor() {
    const todoId = this.route.snapshot.paramMap.get('id');

    this.todoId = todoId || undefined;

    if (todoId) {
      this.todoService.getTodoById(todoId).subscribe((todo) => {
        this.todo = todo;
        this.todoForm.setValue(todo);
      });
    }
  }

  get label() {
    return this.todoForm.get('label');
  }

  get description() {
    return this.todoForm.get('description');
  }

  submit(e: Event) {
    e.preventDefault();
    this.formHasBeenSubmitted = true;

    const { label, description = '' } = this.todoForm.value;

    if (typeof label !== 'string' || typeof description !== 'string') {
      return;
    }

    if (!this.todoId) {
      this.todoService
        .createTodo({
          label: label.trim(),
          description: description.trim(),
        })
        .subscribe((newTodo) => {
          this.router.navigate(['/todo', newTodo.id]);
        });
    }
  }
}
