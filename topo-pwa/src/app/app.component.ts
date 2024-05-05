import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule],
  template: '<div class="main"><router-outlet></router-outlet></div>',
  styles: [`
    .main {
      display: flex;
      flex-wrap: nowrap;
      align-content: center;
      justify-content: center;
      align-items: center;
    }
  `]
})
export class AppComponent {
  constructor() {
  }
}
