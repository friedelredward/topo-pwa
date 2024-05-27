import {Routes} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {UploadJsonComponent} from './components/upload-json/upload-json.component';

export const routes: Routes = [
  {path: 'home', component: LoginComponent},
  {path: 'game/:id', loadComponent: () => import('./views/game/game.component').then(mod => mod.GameComponent)},
  {path: 'upload', component: UploadJsonComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: LoginComponent}
];
