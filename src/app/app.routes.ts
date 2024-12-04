import { Routes } from '@angular/router';
import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';
import { SingleTodoPageComponent } from './single-todo-page/single-todo-page.component';
import { TodoEditPageComponent } from './todo-edit-page/todo-edit-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListPageComponent,
    title: 'Todo List',
  },
  {
    path: 'todo/new',
    component: TodoEditPageComponent,
  },
  {
    path: 'todo/:id',
    component: SingleTodoPageComponent,
  },
  {
    path: 'todo/:id/edit',
    component: TodoEditPageComponent,
  },
];
