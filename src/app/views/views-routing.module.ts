import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { CommemtExerciseTableComponent } from './commemt-exercise-table/commemt-exercise-table.component';
import { CommemtFoodTableComponent } from './commemt-food-table/commemt-food-table.component';
import { ExerciseTableComponent } from './exercise-table/exercise-table.component';
import { FoodTableComponent } from './food-table/food-table.component';
import { ViewsComponent } from './views.component';

const routes: Routes = [
  { path: '', component:ViewsComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component:FoodTableComponent },
    { path: 'exercise', component:ExerciseTableComponent },
    { path: 'add_food', component:AddFoodComponent },
    { path: 'add_exercise', component:AddExerciseComponent },
    { path: 'comment_food', component:CommemtFoodTableComponent },
    { path: 'comment_exercise', component:CommemtExerciseTableComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule { }
