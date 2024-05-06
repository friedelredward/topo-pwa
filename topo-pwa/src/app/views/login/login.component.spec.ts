import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {BrowserDynamicTestingModule} from '@angular/platform-browser-dynamic/testing';
import {provideRouter, Router} from '@angular/router';
import {routes} from '../../app.routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormControl, FormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent,
        BrowserDynamicTestingModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule
      ],
      providers: [provideRouter(routes),
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to game route with username when goToGame is called', () => {
    const testUsername = 'testUser';
    component.username = new FormControl(testUsername, [Validators.required]);

    component.goToGame();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/game', testUsername]);
  });
});
