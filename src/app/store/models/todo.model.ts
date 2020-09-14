export interface Todo {
  id?: number | string;
  title: string;
  completed: boolean;
  editing: boolean;
  user_id?: number | string;
}
