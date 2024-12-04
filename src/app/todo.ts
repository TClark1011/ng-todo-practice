import { Validators } from '@angular/forms';
import { CustomValidators } from './validators';

export interface Todo {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export type TodoCreationInput = Pick<Todo, 'label' | 'description'>;

export type TodoUpdateInput = Partial<
  Pick<Todo, 'label' | 'description' | 'completed'>
>;

export const todoLabelValidators = [
  CustomValidators.trimmedMinLength(1),
  Validators.maxLength(64),
];

export const todoDescriptionValidators = [Validators.maxLength(256)];
