export interface Todo {
  id?: number | string;
  title: string;
  tempTitle?: string;
  completed: boolean;
  // editing: boolean;
  user_id?: number | string;
}
