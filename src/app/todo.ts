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
