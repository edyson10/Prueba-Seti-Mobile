import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { TodoTask } from '../models/todo-task.model';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private _storage: Storage | null = null;
  private tasks: TodoTask[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
    const stored = await this._storage.get(STORAGE_KEY);
    this.tasks = stored || [];
  }

  private async save() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    await this._storage?.set(STORAGE_KEY, this.tasks);
  }

  async getAll(): Promise<TodoTask[]> {
    if (!this._storage) {
      await this.init();
    }
    return [...this.tasks];
  }

  async add(title: string, description?: string, categoryId?: string | null): Promise<TodoTask> {
    const task: TodoTask = {
      id: uuidv4(),
      title,
      description,
      completed: false,
      categoryId: categoryId || null,
      createdAt: Date.now()
    };
    this.tasks.push(task);
    await this.save();
    return task;
  }

  async toggleCompleted(id: string): Promise<void> {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      await this.save();
    }
  }

  async delete(id: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.id !== id);
    await this.save();
  }

  async deleteByCategory(categoryId: string): Promise<void> {
    this.tasks = this.tasks.filter(t => t.categoryId !== categoryId);
    await this.save();
  }
}
