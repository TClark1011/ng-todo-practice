import { Injectable } from '@angular/core';
import { Todo, TodoCreationInput, TodoUpdateInput } from './todo';
import { generateId } from './utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getAllTodos() {
    return this.http.get<Todo[]>('http://localhost:3000/todos');
  }

  getTodoById(id: string) {
    return this.http.get<Todo>(`http://localhost:3000/todos/${id}`);
  }

  createTodo(newInput: TodoCreationInput) {
    const newTodo: Todo = {
      ...newInput,
      id: generateId(),
      completed: false,
    };

    return this.http.post<Todo>('http://localhost:3000/todos', newTodo);
  }

  updateTodoById(id: string, updateInput: TodoUpdateInput) {
    return this.http.patch<Todo>(
      `http://localhost:3000/todos/${id}`,
      updateInput
    );
  }
}
