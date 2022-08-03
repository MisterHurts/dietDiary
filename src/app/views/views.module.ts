import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsRoutingModule } from './views-routing.module';
import { MianNavComponent } from './mian-nav/mian-nav.component';
import { FoodTableComponent } from './food-table/food-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ExerciseTableComponent } from './exercise-table/exercise-table.component';
import { ViewsComponent } from './views.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { AddFoodComponent } from './add-food/add-food.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { CommemtFoodTableComponent } from './commemt-food-table/commemt-food-table.component';
import { CommemtExerciseTableComponent } from './commemt-exercise-table/commemt-exercise-table.component';
import { FoodCategoryTableComponent } from './food-category-table/food-category-table.component';
import { FoodUnitTableComponent } from './food-unit-table/food-unit-table.component';


@NgModule({
  declarations: [
    ViewsComponent,
    MianNavComponent,
    FoodTableComponent,
    ExerciseTableComponent,
    AddFoodComponent,
    AddExerciseComponent,
    CommemtFoodTableComponent,
    CommemtExerciseTableComponent,
    FoodCategoryTableComponent,
    FoodUnitTableComponent
  ],
  imports: [
    CommonModule,
    ViewsRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatFormFieldModule
  ]
})
export class ViewsModule { }
