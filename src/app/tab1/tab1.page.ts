import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonList,
  IonCheckbox,
  IonSelect,
  IonSelectOption,
  IonSegment,
  IonSegmentButton
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { TaskService } from '../services/task.service';
import { FirebaseRemoteConfigService } from '../services/firebase-remote-config.service';
import { TodoTask } from '../models/todo-task.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonList,
    IonCheckbox,
    IonSelect,
    IonSelectOption,
    IonSegment,
    IonSegmentButton,
    ExploreContainerComponent],
})
export class Tab1Page implements OnInit {

  taskForm!: FormGroup;
  tasks: TodoTask[] = [];
  filteredTasks: TodoTask[] = [];
  categories: Category[] = [];

  selectedCategoryId: string | 'all' = 'all';
  showCategories = true;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private categoryService: CategoryService,
    private remoteConfig: FirebaseRemoteConfigService
  ) {}

  async ngOnInit() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      categoryId: [null]
    });

    await this.remoteConfig.loadFeatureFlags();
    this.showCategories = this.remoteConfig.getShowCategoriesFlag();

    await this.loadData();
  }

  async loadData() {
    this.tasks = await this.taskService.getAll();
    this.categories = this.showCategories
      ? await this.categoryService.getAll()
      : [];
    this.applyFilter();
  }

  async addTask() {
    if (this.taskForm.invalid) return;

    const { title, description, categoryId } = this.taskForm.value;
    await this.taskService.add(title, description, categoryId);
    this.taskForm.reset();
    this.applyFilter();
  }

  async toggleCompleted(task: TodoTask) {
    await this.taskService.toggleCompleted(task.id);
    this.applyFilter();
  }

  async deleteTask(task: TodoTask) {
    await this.taskService.delete(task.id);
    this.applyFilter();
  }

  applyFilter() {
    if (!this.showCategories || this.selectedCategoryId === 'all') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(
        t => t.categoryId === this.selectedCategoryId
      );
    }
  }

  getCategoryName(id?: string | null): string {
    const cat = this.categories.find(c => c.id === id);
    return cat ? cat.name : 'Sin categoría';
  }
}
