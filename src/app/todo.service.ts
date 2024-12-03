import { Injectable } from '@angular/core';
import { Todo, TodoCreationInput, TodoUpdateInput } from './todo';
import { generateId } from './utils';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor() {}

  async getAllTodos(): Promise<Todo[]> {
    const response = await fetch('http://localhost:3000/todos');
    return response.json();
  }

  async getTodoById(id: string): Promise<Todo> {
    const response = await fetch(`http://localhost:3000/todos/${id}`);
    return response.json();
  }

  async createTodo(newInput: TodoCreationInput): Promise<Todo> {
    const newTodo: Todo = {
      ...newInput,
      id: generateId(),
      completed: false,
    };

    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    });
    return response.json();
  }

  async updateTodoById(
    id: string,
    updateInput: TodoUpdateInput
  ): Promise<Todo> {
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateInput),
    });
    return response.json();
  }
}
