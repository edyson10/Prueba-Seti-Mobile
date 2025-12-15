export interface TodoTask {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  categoryId?: string | null;
  createdAt: number;
}
