import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category.model';
import { v4 as uuidv4 } from 'uuid';
import { BehaviorSubject } from 'rxjs';

const STORAGE_KEY = 'categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly STORAGE_KEY = 'categories';

  private categoriesSubject = new BehaviorSubject<Category[]>([]);
  categories$ = this.categoriesSubject.asObservable();

  constructor(private storage: Storage) {
    this.init();
  }

  private async init() {
    await this.storage.create();
    const stored = await this.storage.get(this.STORAGE_KEY);
    this.categoriesSubject.next(stored || []);
  }

  getSnapshot(): Category[] {
    return this.categoriesSubject.value;
  }

  async getAll(): Promise<Category[]> {
    return this.categoriesSubject.value;
  }

  async add(name: string, color?: string): Promise<Category> {
    const newCategory: Category = {
      id: uuidv4(),
      name,
      color,
      createdAt: Date.now()
    };

    const updated = [...this.categoriesSubject.value, newCategory];
    await this.storage.set(this.STORAGE_KEY, updated);
    this.categoriesSubject.next(updated);

    return newCategory;
  }

  async update(category: Category): Promise<void> {
    const updated = this.categoriesSubject.value.map(c =>
      c.id === category.id ? category : c
    );

    await this.storage.set(this.STORAGE_KEY, updated);
    this.categoriesSubject.next(updated);
  }

  async delete(id: string): Promise<void> {
    const updated = this.categoriesSubject.value.filter(c => c.id !== id);
    await this.storage.set(this.STORAGE_KEY, updated);
    this.categoriesSubject.next(updated);
  }
}
