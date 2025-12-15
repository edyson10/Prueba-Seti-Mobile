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
  IonButton,
  IonList
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
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
    IonButton,
    IonList,
    ExploreContainerComponent],
})
export class Tab2Page implements OnInit {

  form!: FormGroup;
  categories: Category[] = [];
  editing: Category | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      color: ['']
    });

    await this.load();
  }

  async load() {
    this.categories = await this.categoryService.getAll();
  }

  async save() {
    const { name, color } = this.form.value;

    if (this.editing) {
      await this.categoryService.update({ ...this.editing, name, color });
      this.editing = null;
    } else {
      await this.categoryService.add(name, color);
    }

    this.form.reset();
    await this.load();
  }

  edit(cat: Category) {
    this.editing = cat;
    this.form.setValue({
      name: cat.name,
      color: cat.color || ''
    });
  }

  async delete(cat: Category) {
    await this.categoryService.delete(cat.id);
    await this.load();
  }

  cancel() {
    this.editing = null;
    this.form.reset();
  }

}
