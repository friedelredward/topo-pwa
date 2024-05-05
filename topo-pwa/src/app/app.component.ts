import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {CustomIconsService} from "./shared/services/custom-icons.service";

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
      background-image: url("/assets/img/green-bg2.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
    }
  `]
})
export class AppComponent {
  constructor(private customIcons: CustomIconsService
  ) {

  }
}
