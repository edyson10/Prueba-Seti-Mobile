import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';
import { v4 as uuidv4 } from 'uuid';
import { TaskService } from './task.service';

const STORAGE_KEY = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private _storage: Storage | null = null;
  private categories: Category[] = [];

  constructor(
    private storage: Storage,
    private taskService: TaskService
  ) {
    this.init();
  }

  private async init() {
    this._storage = await this.storage.create();
    const stored = await this._storage.get(STORAGE_KEY);
    this.categories = stored || [];
  }

  private async save() {
    if (!this._storage) {
      this._storage = await this.storage.create();
    }
    await this._storage?.set(STORAGE_KEY, this.categories);
  }

  async getAll(): Promise<Category[]> {
    return [...this.categories];
  }

  async add(name: string, color?: string): Promise<Category> {
    const category: Category = {
      id: uuidv4(),
      name,
      color,
      createdAt: Date.now()
    };
    this.categories.push(category);
    await this.save();
    return category;
  }

  async update(category: Category): Promise<void> {
    const index = this.categories.findIndex(c => c.id === category.id);
    if (index !== -1) {
      this.categories[index] = category;
      await this.save();
    }
  }

  async delete(id: string): Promise<void> {
    this.categories = this.categories.filter(c => c.id !== id);
    await this.save();
    await this.taskService.deleteByCategory(id);
  }
}
