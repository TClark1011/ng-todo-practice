import { Routes } from '@angular/router';
import { TodoListPageComponent } from './todo-list-page/todo-list-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TodoListPageComponent,
    title: 'Todo List',
  },
];
