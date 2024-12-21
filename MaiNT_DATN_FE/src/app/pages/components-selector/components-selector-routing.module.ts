import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsSelectorComponent } from './components-selector/components-selector.component';
import { Exception404Component } from '../../shared/exception/404.component';

const routes: Routes = [
  { path: '', component: ComponentsSelectorComponent },
  { path: '**', component: Exception404Component },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComponentsSelectorRoutingModule {}
