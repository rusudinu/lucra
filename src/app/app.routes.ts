import { Component } from '@angular/core';
import { Routes } from '@angular/router';

@Component({
  selector: 'app-dummy',
  standalone: true,
  template: '<h1>Dummy Component</h1>'
})
export class DummyComponent {
}

export const routes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'lucra', component: DummyComponent },
  { path: 'add-expense', component: DummyComponent },
  { path: 'add-income', component: DummyComponent },
  { path: 'investments-calculator', component: DummyComponent },
  { path: 'reports', component: DummyComponent },
  { path: 'pending-requests', component: DummyComponent },
  { path: 'previous-requests', component: DummyComponent }
];
