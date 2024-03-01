import { Component, inject } from '@angular/core';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'lucra';
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.init();
  }

  async init() {
    // await setDoc(doc(this.firestore, 'test', 'test'), { test: 'test' });
  }
}
